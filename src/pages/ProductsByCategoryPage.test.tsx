import { vi, type Mock } from "vitest";
import { useFetch } from "../hooks/useFetch";
import { render, screen } from "@testing-library/react";
import ProductsByCategoryPage from "./ProductsByCategoryPage";
import { useLocation, useNavigate, useParams } from "react-router";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "../store/slices/cartSlice";

vi.mock("../hooks/useFetch");
vi.mock("react-router");

const createMockStore = () => {
  return configureStore({
    reducer: {
      cart: cartSlice
    }
  });
};

const renderWithProvider = (component: React.ReactElement) => {
  const store = createMockStore();
  return render(<Provider store={store}>{component}</Provider>);
};

describe("ProductsByCategory Page", () => {
  beforeEach(() => {
    (useLocation as Mock).mockReturnValue({
      state: { categoryName: "Test Category" }
    });
    (useParams as Mock).mockReturnValue({ id: "1" });
    (useFetch as Mock).mockReturnValue({
      data: null,
      loading: true,
      error: null
    });
  });

  it("should render loading state", () => {
    render(<ProductsByCategoryPage />);
    expect(screen.getByRole("progressbar")).toBeInTheDocument();
  });

  it("should render error state", () => {
    (useFetch as Mock).mockReturnValue({
      data: null,
      loading: false,
      error: "Error fetching products"
    });
    render(<ProductsByCategoryPage />);
    expect(screen.getByText(/Error fetching products/)).toBeInTheDocument();
  });

  it("should render `no products` state", () => {
    (useFetch as Mock).mockReturnValue({
      data: [],
      loading: false,
      error: null
    });
    render(<ProductsByCategoryPage />);
    expect(screen.getByText("No products to display.")).toBeInTheDocument();
  });

  it("should render products list", () => {
    const mockProducts = [
      { id: "1", title: "Product 1", images: ["image1.jpg"], price: 10.0 },
      { id: "2", title: "Product 2", images: ["image2.jpg"], price: 20.0 }
    ];
    (useFetch as Mock).mockReturnValue({
      data: mockProducts,
      loading: false,
      error: null
    });
    renderWithProvider(<ProductsByCategoryPage />);

    expect(screen.getByText("Product 1")).toBeInTheDocument();
    expect(screen.getByText("Product 2")).toBeInTheDocument();
    expect(screen.getByRole("img", { name: "Product 1" })).toBeInTheDocument();
    expect(screen.getByRole("img", { name: "Product 2" })).toBeInTheDocument();
    expect(screen.getByText("R$ 10.00")).toBeInTheDocument();
    expect(screen.getByText("R$ 20.00")).toBeInTheDocument();
  });

  it("should navigate to product detail on product click", () => {
    const mockProducts = [
      { id: "1", title: "Product 1", images: ["image1.jpg"], price: 10.0 }
    ];
    (useFetch as Mock).mockReturnValue({
      data: mockProducts,
      loading: false,
      error: null
    });
    const navigateSpy = vi.fn();
    (useNavigate as Mock).mockReturnValue(navigateSpy);

    renderWithProvider(<ProductsByCategoryPage />);

    const productCard = screen.getByText("Product 1");
    productCard.click();

    expect(navigateSpy).toHaveBeenCalledWith("/products/1");
  });
});
