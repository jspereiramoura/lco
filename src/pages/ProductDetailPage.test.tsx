import { configureStore } from "@reduxjs/toolkit";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { useParams } from "react-router";
import { vi, type Mock } from "vitest";
import { GlobalLoader } from "../components/GlobalLoader/GlobalLoader";
import { useAppSelector } from "../hooks/redux";
import { useFetch } from "../hooks/useFetch";
import cartSlice from "../store/slices/cartSlice";
import globalLoaderSlice from "../store/slices/globalLoaderSlice";
import ProductDetailPage from "./ProductDetailPage";

vi.mock("../hooks/useFetch");
vi.mock("react-router");

const createMockStore = () => {
  return configureStore({
    reducer: {
      cart: cartSlice,
      globalLoader: globalLoaderSlice
    }
  });
};

const TestWrapper = ({ children }: { children: React.ReactNode }) => {
  const { isLoading, message } = useAppSelector(state => state.globalLoader);

  return (
    <>
      {children}
      <GlobalLoader isVisible={isLoading} message={message} />
    </>
  );
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
    renderWithProvider(
      <TestWrapper>
        <ProductDetailPage />
      </TestWrapper>
    );
    expect(screen.getByText("Loading product details...")).toBeInTheDocument();
  });

  it("should render error state", () => {
    (useFetch as Mock).mockReturnValue({
      data: null,
      loading: false,
      error: "Error fetching product"
    });
    renderWithProvider(<ProductDetailPage />);
    expect(screen.getByText("Error fetching product")).toBeInTheDocument();
  });

  it("should render `no product` state", () => {
    (useFetch as Mock).mockReturnValue({
      data: null,
      loading: false,
      error: null
    });
    renderWithProvider(<ProductDetailPage />);
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
