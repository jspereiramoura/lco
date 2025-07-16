import { vi, type Mock } from "vitest";
import ProductDetailPage from "./ProductDetailPage";
import { render, screen } from "@testing-library/react";
import { useParams } from "react-router";
import { useFetch } from "../hooks/useFetch";
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

const mockProduct = {
  id: "1",
  title: "Test Product",
  images: ["image1.jpg"],
  price: 100.0,
  description: "This is a test product.",
  category: { id: "1", name: "Test Category" }
};

describe("ProductDetail Page", () => {
  beforeEach(() => {
    (useParams as Mock).mockReturnValue({ id: "1" });
    (useFetch as Mock).mockReturnValue({
      data: null,
      loading: false,
      error: null
    });
  });

  it("should render loading state", () => {
    (useFetch as Mock).mockReturnValue({
      data: null,
      loading: true,
      error: null
    });
    render(<ProductDetailPage />);
    expect(screen.getByRole("progressbar")).toBeInTheDocument();
  });

  it("should render error state", () => {
    (useFetch as Mock).mockReturnValue({
      data: null,
      loading: false,
      error: "Error fetching product"
    });
    render(<ProductDetailPage />);
    expect(screen.getByText("Error fetching product")).toBeInTheDocument();
  });

  it("should render `no product` state", () => {
    (useFetch as Mock).mockReturnValue({
      data: null,
      loading: false,
      error: null
    });
    render(<ProductDetailPage />);
    expect(screen.getByText("No product to display.")).toBeInTheDocument();
  });

  it("should render product details", () => {
    (useFetch as Mock).mockReturnValue({
      data: mockProduct,
      loading: false,
      error: null
    });

    renderWithProvider(<ProductDetailPage />);

    expect(screen.getByText("Test Product")).toBeInTheDocument();
    expect(screen.getByText("This is a test product.")).toBeInTheDocument();
    expect(screen.getByText("R$ 100.00", { trim: true })).toBeInTheDocument();
    expect(
      screen.getByText("Test Category", { exact: false })
    ).toBeInTheDocument();
    expect(screen.getByRole("img", { name: "Test Product" })).toHaveAttribute(
      "src",
      "image1.jpg"
    );
    expect(screen.getByText("Buy")).toBeInTheDocument();
  });
});
