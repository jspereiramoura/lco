import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";
import { BrowserRouter } from "react-router";
import { Provider } from "react-redux";
import { store } from "../store";
import NotFoundPage from "./NotFoundPage";

const mockNavigate = vi.fn();
vi.mock("react-router", async () => {
  const actual = await vi.importActual("react-router");
  return {
    ...actual,
    useNavigate: () => mockNavigate
  };
});

function renderWithRouter(component: React.ReactElement) {
  return render(
    <Provider store={store}>
      <BrowserRouter>{component}</BrowserRouter>
    </Provider>
  );
}

describe("NotFoundPage", () => {
  beforeEach(() => {
    mockNavigate.mockClear();
  });

  it("should render 404 page elements", () => {
    renderWithRouter(<NotFoundPage />);

    expect(screen.getByText("Page not found")).toBeInTheDocument();
    expect(
      screen.getByText(
        "The page you are looking for does not exist or has been moved."
      )
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Go to Home" })
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Go Back" })).toBeInTheDocument();
  });

  it("should navigate to home when 'Go to Home' button is clicked", async () => {
    const user = userEvent.setup();
    renderWithRouter(<NotFoundPage />);

    const homeButton = screen.getByRole("button", { name: "Go to Home" });
    await user.click(homeButton);

    expect(mockNavigate).toHaveBeenCalledWith("/");
  });

  it("should navigate back when 'Go Back' button is clicked", async () => {
    const user = userEvent.setup();
    renderWithRouter(<NotFoundPage />);

    const backButton = screen.getByRole("button", { name: "Go Back" });
    await user.click(backButton);

    expect(mockNavigate).toHaveBeenCalledWith(-1);
  });
});
