import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import CartSummary from "./CartSummary";

describe("CartSummary", () => {
  const mockOnClearCart = vi.fn();

  beforeEach(() => {
    mockOnClearCart.mockClear();
  });

  it("should render order summary with correct information", () => {
    render(
      <CartSummary total={99.98} itemCount={3} onClearCart={mockOnClearCart} />
    );

    expect(screen.getByText("Order Summary")).toBeInTheDocument();
    expect(screen.getByText("Subtotal (3 items):")).toBeInTheDocument();
    expect(screen.getAllByText("$99.98")).toHaveLength(2);
    expect(screen.getByText("Total:")).toBeInTheDocument();
  });

  it("should display singular item text for single item", () => {
    render(
      <CartSummary total={29.99} itemCount={1} onClearCart={mockOnClearCart} />
    );

    expect(screen.getByText("Subtotal (1 item):")).toBeInTheDocument();
  });

  it("should have checkout button", () => {
    render(
      <CartSummary total={99.98} itemCount={3} onClearCart={mockOnClearCart} />
    );

    expect(screen.getByText("Checkout")).toBeInTheDocument();
  });

  it("should have clear cart button", () => {
    render(
      <CartSummary total={99.98} itemCount={3} onClearCart={mockOnClearCart} />
    );

    expect(screen.getByText("Clear Cart")).toBeInTheDocument();
  });

  it("should call onClearCart when clear cart button is clicked", async () => {
    render(
      <CartSummary total={99.98} itemCount={3} onClearCart={mockOnClearCart} />
    );

    const clearButton = screen.getByText("Clear Cart");
    await userEvent.click(clearButton);

    expect(mockOnClearCart).toHaveBeenCalledTimes(1);
  });
});
