import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { BrowserRouter } from "react-router";
import { describe, it, expect } from "vitest";
import Header from "./Header";
import cartReducer from "../store/slices/cartSlice";

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

const renderWithProviders = (cartState?: Partial<CartState>) => {
  const store = createMockStore(cartState);
  return render(
    <Provider store={store}>
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    </Provider>
  );
};

describe("Header", () => {
  it("should render the header with correct title", () => {
    renderWithProviders();

    const headerLink = screen.getByRole("link", { name: "Challenge LOC Labs" });
    expect(headerLink).toBeInTheDocument();
    expect(headerLink).toHaveAttribute("href", "/");
  });

  it("should render the shopping cart icon", () => {
    renderWithProviders();

    const cartLink = screen.getByRole("link", { name: "Shopping Cart" });
    expect(cartLink).toBeInTheDocument();
    expect(cartLink).toHaveAttribute("href", "/cart");
  });
});
