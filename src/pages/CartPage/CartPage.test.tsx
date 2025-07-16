import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { describe, it, expect } from "vitest";
import { SnackbarProvider } from "notistack";
import { MemoryRouter } from "react-router";
import CartPage from "./CartPage";
import cartReducer from "../../store/slices/cartSlice";

const mockProduct1: Product = {
  id: 1,
  title: "Test Product 1",
  slug: "test-product-1",
  price: 29.99,
  description: "Test description 1",
  category: {
    id: 1,
    name: "Test Category",
    slug: "test-category",
    image: "test-image.jpg",
    creationAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z"
  },
  images: ["image1.jpg", "image2.jpg"],
  creationAt: "2024-01-01T00:00:00Z",
  updatedAt: "2024-01-01T00:00:00Z"
};

const mockProduct2: Product = {
  id: 2,
  title: "Test Product 2",
  slug: "test-product-2",
  price: 49.99,
  description: "Test description 2",
  category: {
    id: 1,
    name: "Test Category",
    slug: "test-category",
    image: "test-image.jpg",
    creationAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z"
  },
  images: ["image3.jpg", "image4.jpg"],
  creationAt: "2024-01-01T00:00:00Z",
  updatedAt: "2024-01-01T00:00:00Z"
};

const createMockStore = (cartState?: Partial<CartState>) => {
  return configureStore({
    reducer: {
      cart: cartReducer
    },
    preloadedState: {
      cart: {
        items: [],
        total: 0,
        itemCount: 0,
        ...cartState
      }
    }
  });
};

const renderWithProvider = (
  component: React.ReactElement,
  cartState?: Partial<CartState>
) => {
  const store = createMockStore(cartState);
  return render(
    <MemoryRouter>
      <Provider store={store}>
        <SnackbarProvider>{component}</SnackbarProvider>
      </Provider>
    </MemoryRouter>
  );
};

describe("CartPage", () => {
  it("should display empty cart message when cart is empty", () => {
    renderWithProvider(<CartPage />);

    expect(screen.getByText("Your cart is empty")).toBeInTheDocument();
    expect(screen.getByText("Continue Shopping")).toBeInTheDocument();
  });

  it("should display cart items when cart has products", () => {
    const cartState = {
      items: [
        { product: mockProduct1, quantity: 2 },
        { product: mockProduct2, quantity: 1 }
      ],
      total: 109.97,
      itemCount: 3
    };

    renderWithProvider(<CartPage />, cartState);

    expect(screen.getByText("Shopping Cart")).toBeInTheDocument();
    expect(screen.getByText("3 items in cart")).toBeInTheDocument();
    expect(screen.getByText(mockProduct1.title)).toBeInTheDocument();
    expect(screen.getByText(mockProduct2.title)).toBeInTheDocument();
  });

  it("should display correct item count text for single item", () => {
    const cartState = {
      items: [{ product: mockProduct1, quantity: 1 }],
      total: 29.99,
      itemCount: 1
    };

    renderWithProvider(<CartPage />, cartState);

    expect(screen.getByText("1 item in cart")).toBeInTheDocument();
  });

  it("should display product information correctly", () => {
    const cartState = {
      items: [{ product: mockProduct1, quantity: 2 }],
      total: 59.98,
      itemCount: 2
    };

    renderWithProvider(<CartPage />, cartState);

    expect(screen.getByText(mockProduct1.title)).toBeInTheDocument();
    expect(screen.getByText(mockProduct1.category.name)).toBeInTheDocument();
    expect(screen.getByText("$29.99")).toBeInTheDocument();
    expect(screen.getByText("2")).toBeInTheDocument();
  });

  it("should display order summary correctly", () => {
    const cartState = {
      items: [
        { product: mockProduct1, quantity: 2 },
        { product: mockProduct2, quantity: 1 }
      ],
      total: 109.97,
      itemCount: 3
    };

    renderWithProvider(<CartPage />, cartState);

    expect(screen.getByText("Order Summary")).toBeInTheDocument();
    expect(screen.getByText("Subtotal (3 items):")).toBeInTheDocument();
    expect(screen.getAllByText("$109.97")).toHaveLength(2);
    expect(screen.getByText("Total:")).toBeInTheDocument();
  });

  it("should have increment, decrement, and remove buttons for each item", () => {
    const cartState = {
      items: [{ product: mockProduct1, quantity: 2 }],
      total: 59.98,
      itemCount: 2
    };

    renderWithProvider(<CartPage />, cartState);

    expect(screen.getByTestId("AddIcon")).toBeInTheDocument();
    expect(screen.getByTestId("RemoveIcon")).toBeInTheDocument();
    expect(screen.getByTestId("DeleteIcon")).toBeInTheDocument();
  });

  it("should have checkout and clear cart buttons", () => {
    const cartState = {
      items: [{ product: mockProduct1, quantity: 1 }],
      total: 29.99,
      itemCount: 1
    };

    renderWithProvider(<CartPage />, cartState);

    expect(screen.getByText("Checkout")).toBeInTheDocument();
    expect(screen.getByText("Clear Cart")).toBeInTheDocument();
  });

  it("should display product images", () => {
    const cartState = {
      items: [{ product: mockProduct1, quantity: 1 }],
      total: 29.99,
      itemCount: 1
    };

    renderWithProvider(<CartPage />, cartState);

    const image = screen.getByAltText(mockProduct1.title);
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute("src", mockProduct1.images[0]);
  });
});
