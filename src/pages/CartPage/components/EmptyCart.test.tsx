import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { describe, it, expect, vi } from "vitest";
import EmptyCart from "./EmptyCart";
import userEvent from "@testing-library/user-event";

const mockNavigate = vi.fn();

vi.mock("react-router", async () => {
  const actual = await vi.importActual("react-router");
  return {
    ...actual,
    useNavigate: () => mockNavigate
  };
});

describe("EmptyCart", () => {
  beforeEach(() => {
    mockNavigate.mockClear();
  });

  it("should render correctly", () => {
    render(
      <MemoryRouter>
        <EmptyCart />
      </MemoryRouter>
    );

    expect(screen.getByText("Your cart is empty")).toBeInTheDocument();
    expect(
      screen.getByText("Add some products to your cart to start shopping.")
    ).toBeInTheDocument();
    expect(screen.getByTestId("ShoppingCartIcon")).toBeInTheDocument();
    expect(screen.getByText("Continue Shopping")).toBeInTheDocument();
  });

  it("should navigate to home when continue shopping button is clicked", async () => {
    render(
      <MemoryRouter>
        <EmptyCart />
      </MemoryRouter>
    );

    const continueButton = screen.getByText("Continue Shopping");
    await userEvent.click(continueButton);

    expect(mockNavigate).toHaveBeenCalledWith("/");
  });
});
