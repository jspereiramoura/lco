import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import CartItem from "./CartItem";

const mockProduct: Product = {
  id: 1,
  title: "Test Product",
  slug: "test-product",
  price: 29.99,
  description: "Test description",
  category: {
    id: 1,
    name: "Test Category",
    slug: "test-category",
    image: "test-image.jpg",
    creationAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z"
  },
  images: ["test-image.jpg"],
  creationAt: "2024-01-01T00:00:00Z",
  updatedAt: "2024-01-01T00:00:00Z"
};

const mockCartItem: CartItem = {
  product: mockProduct,
  quantity: 2
};

describe("CartItem", () => {
  const mockOnIncrement = vi.fn();
  const mockOnDecrement = vi.fn();
  const mockOnRemove = vi.fn();

  beforeEach(() => {
    mockOnIncrement.mockClear();
    mockOnDecrement.mockClear();
    mockOnRemove.mockClear();
  });

  it("should render product information", () => {
    render(
      <CartItem
        item={mockCartItem}
        onIncrement={mockOnIncrement}
        onDecrement={mockOnDecrement}
        onRemove={mockOnRemove}
      />
    );

    expect(screen.getByText("Test Product")).toBeInTheDocument();
    expect(screen.getByText("Test Category")).toBeInTheDocument();
    expect(screen.getByText("$29.99")).toBeInTheDocument();
    expect(screen.getByText("2")).toBeInTheDocument();
  });

  it("should display product image", () => {
    render(
      <CartItem
        item={mockCartItem}
        onIncrement={mockOnIncrement}
        onDecrement={mockOnDecrement}
        onRemove={mockOnRemove}
      />
    );

    const image = screen.getByAltText("Test Product");
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute("src", "test-image.jpg");
  });

  it("should call onIncrement when increment button is clicked", () => {
    render(
      <CartItem
        item={mockCartItem}
        onIncrement={mockOnIncrement}
        onDecrement={mockOnDecrement}
        onRemove={mockOnRemove}
      />
    );

    const incrementButton = screen.getByTestId("AddIcon").closest("button");
    fireEvent.click(incrementButton!);

    expect(mockOnIncrement).toHaveBeenCalledWith(1);
  });

  it("should call onDecrement when decrement button is clicked", () => {
    render(
      <CartItem
        item={mockCartItem}
        onIncrement={mockOnIncrement}
        onDecrement={mockOnDecrement}
        onRemove={mockOnRemove}
      />
    );

    const decrementButton = screen.getByTestId("RemoveIcon").closest("button");
    fireEvent.click(decrementButton!);

    expect(mockOnDecrement).toHaveBeenCalledWith(1);
  });

  it("should call onRemove when remove button is clicked", () => {
    render(
      <CartItem
        item={mockCartItem}
        onIncrement={mockOnIncrement}
        onDecrement={mockOnDecrement}
        onRemove={mockOnRemove}
      />
    );

    const removeButton = screen.getByTestId("DeleteIcon").closest("button");
    fireEvent.click(removeButton!);

    expect(mockOnRemove).toHaveBeenCalledWith(1);
  });
});
