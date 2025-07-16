import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";
import { BrowserRouter } from "react-router";
import { Provider } from "react-redux";
import { store } from "../store";
import ErrorBoundary from "./ErrorBoundary";

const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {});

const mockReload = vi.fn();
Object.defineProperty(window, "location", {
  value: { reload: mockReload },
  writable: true
});

function renderWithProviders(component: React.ReactElement) {
  return render(
    <Provider store={store}>
      <BrowserRouter>{component}</BrowserRouter>
    </Provider>
  );
}

function ThrowError(): never {
  throw new Error("Test error");
}

function WorkingComponent() {
  return <div>Working component</div>;
}

describe("ErrorBoundary", () => {
  beforeEach(() => {
    consoleSpy.mockClear();
    mockReload.mockClear();
  });

  afterAll(() => {
    consoleSpy.mockRestore();
  });

  it("should render correctly when there is no error", () => {
    renderWithProviders(
      <ErrorBoundary>
        <WorkingComponent />
      </ErrorBoundary>
    );

    expect(screen.getByText("Working component")).toBeInTheDocument();
  });

  it("should render error UI when there is an error", () => {
    renderWithProviders(
      <ErrorBoundary>
        <ThrowError />
      </ErrorBoundary>
    );

    expect(screen.getByText("Oops! Something went wrong")).toBeInTheDocument();
    expect(
      screen.getByText("An unexpected error occurred. Please try again.")
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Reload Page" })
    ).toBeInTheDocument();
  });

  it("should reload page when reload button is clicked", async () => {
    const user = userEvent.setup();

    renderWithProviders(
      <ErrorBoundary>
        <ThrowError />
      </ErrorBoundary>
    );

    const reloadButton = screen.getByRole("button", { name: "Reload Page" });
    await user.click(reloadButton);

    expect(mockReload).toHaveBeenCalledTimes(1);
  });

  it("should log error to console", () => {
    renderWithProviders(
      <ErrorBoundary>
        <ThrowError />
      </ErrorBoundary>
    );

    expect(consoleSpy).toHaveBeenCalled();
  });
});
