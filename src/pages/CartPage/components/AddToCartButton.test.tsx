import { configureStore } from "@reduxjs/toolkit";
import { render, screen } from "@testing-library/react";
import { SnackbarProvider } from "notistack";
import { Provider } from "react-redux";
import { describe, expect, it, vi, beforeEach } from "vitest";
import cartReducer, { addToCart } from "../../../store/slices/cartSlice";
import AddToCartButton from "./AddToCartButton";
import userEvent from "@testing-library/user-event";

vi.mock("react-redux", async () => {
  const actual = await vi.importActual("react-redux");
  return {
    ...actual,
    useDispatch: vi.fn()
  };
});

import { useDispatch } from "react-redux";
const mockUseDispatch = vi.mocked(useDispatch);

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
  images: ["image1.jpg", "image2.jpg"],
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
    <Provider store={store}>
      <SnackbarProvider>{component}</SnackbarProvider>
    </Provider>
  );
};

describe("AddToCartButton", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render "Buy" when product is not in cart', () => {
    renderWithProvider(<AddToCartButton product={mockProduct} />);

    expect(screen.getByText("Buy")).toBeInTheDocument();
    expect(screen.getByTestId("AddIcon")).toBeInTheDocument();
  });

  it("should dispatch addToCart action when clicked", async () => {
    const mockDispatch = vi.fn();
    mockUseDispatch.mockReturnValue(mockDispatch);

    renderWithProvider(<AddToCartButton product={mockProduct} />, {
      items: [],
      total: 0,
      itemCount: 0
    });

    const button = screen.getByText("Buy");
    await userEvent.click(button);

    expect(mockDispatch).toHaveBeenCalledWith(addToCart(mockProduct));
  });

  it("should show success snackbar when product is added to cart", async () => {
    const mockDispatch = vi.fn();
    mockUseDispatch.mockReturnValue(mockDispatch);

    renderWithProvider(<AddToCartButton product={mockProduct} />, {
      items: [],
      total: 0,
      itemCount: 0
    });

    const button = screen.getByText("Buy");
    await userEvent.click(button);

    expect(screen.getByText("Product added to cart!")).toBeInTheDocument();
  });
});
