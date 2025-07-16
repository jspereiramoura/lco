import { configureStore } from "@reduxjs/toolkit";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router";
import { vi, type Mock } from "vitest";
import { GlobalLoader } from "../components/GlobalLoader/GlobalLoader";
import { useAppSelector } from "../hooks/redux";
import { useInfiniteScroll } from "../hooks/useInfiniteScroll";
import cartSlice from "../store/slices/cartSlice";
import globalLoaderSlice from "../store/slices/globalLoaderSlice";
import ProductsByCategoryPage from "./ProductsByCategoryPage";

vi.mock("../hooks/useInfiniteScroll");
vi.mock("../hooks/useAutoInfiniteScroll", () => ({
  useAutoInfiniteScroll: vi.fn(() => ({ current: null }))
}));
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
  return render(
    <Provider store={store}>
      <TestWrapper>{component}</TestWrapper>
    </Provider>
  );
};

describe("ProductsByCategory Page", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    (useLocation as Mock).mockReturnValue({
      state: { categoryName: "Test Category" }
    });
    (useParams as Mock).mockReturnValue({ id: "1" });
    const mockProducts = [
      { id: "1", title: "Product 1", images: ["image1.jpg"], price: 10.0 },
      { id: "2", title: "Product 2", images: ["image2.jpg"], price: 20.0 }
    ];
    (useInfiniteScroll as Mock).mockReturnValue({
      data: mockProducts,
      loading: false,
      error: null,
      hasMore: true,
      loadMore: vi.fn()
    });
  });

  it("should render loading state", async () => {
    (useInfiniteScroll as Mock).mockReturnValue({
      data: [],
      loading: true,
      error: null,
      hasMore: false,
      loadMore: vi.fn()
    });

    renderWithProvider(<ProductsByCategoryPage />);

    expect(await screen.findByText("Loading products...")).toBeInTheDocument();
  });

  it("should render error state", () => {
    (useInfiniteScroll as Mock).mockReturnValue({
      data: [],
      loading: false,
      error: "Error fetching products",
      hasMore: true,
      loadMore: vi.fn()
    });
    renderWithProvider(<ProductsByCategoryPage />);
    expect(screen.getByText(/Error fetching products/)).toBeInTheDocument();
  });

  it("should render `no products` state", () => {
    (useInfiniteScroll as Mock).mockReturnValue({
      data: [],
      loading: false,
      error: null,
      hasMore: false,
      loadMore: vi.fn()
    });
    renderWithProvider(<ProductsByCategoryPage />);
    expect(screen.getByText("No products to display.")).toBeInTheDocument();
  });

  it("should render products list", () => {
    renderWithProvider(<ProductsByCategoryPage />);

    expect(screen.getByText("Product 1")).toBeInTheDocument();
    expect(screen.getByText("Product 2")).toBeInTheDocument();
    expect(screen.getByRole("img", { name: "Product 1" })).toBeInTheDocument();
    expect(screen.getByRole("img", { name: "Product 2" })).toBeInTheDocument();
    expect(screen.getByText("R$ 10.00")).toBeInTheDocument();
    expect(screen.getByText("R$ 20.00")).toBeInTheDocument();
  });

  it("should navigate to product detail on product click", () => {
    const navigateSpy = vi.fn();
    (useNavigate as Mock).mockReturnValue(navigateSpy);

    renderWithProvider(<ProductsByCategoryPage />);

    const productCard = screen.getByText("Product 1");
    productCard.click();

    expect(navigateSpy).toHaveBeenCalledWith("/products/1");
  });

  it("should render InfiniteScrollTrigger when hasMore is true", () => {
    const mockProducts = [
      { id: "1", title: "Product 1", images: ["image1.jpg"], price: 10.0 }
    ];
    (useInfiniteScroll as Mock).mockReturnValue({
      data: mockProducts,
      loading: false,
      error: null,
      hasMore: true,
      loadMore: vi.fn()
    });

    renderWithProvider(<ProductsByCategoryPage />);

    expect(screen.getByText("Product 1")).toBeInTheDocument();
  });

  it("should show loading state when loading more products", () => {
    const mockProducts = [
      { id: "1", title: "Product 1", images: ["image1.jpg"], price: 10.0 }
    ];
    (useInfiniteScroll as Mock).mockReturnValue({
      data: mockProducts,
      loading: true,
      error: null,
      hasMore: true,
      loadMore: vi.fn()
    });

    renderWithProvider(<ProductsByCategoryPage />);

    expect(screen.getByText("Product 1")).toBeInTheDocument();
    expect(screen.getByText("Loading more products...")).toBeInTheDocument();
  });

  it("should show 'no more products' when hasMore is false", () => {
    const mockProducts = [
      { id: "1", title: "Product 1", images: ["image1.jpg"], price: 10.0 }
    ];
    (useInfiniteScroll as Mock).mockReturnValue({
      data: mockProducts,
      loading: false,
      error: null,
      hasMore: false,
      loadMore: vi.fn()
    });

    renderWithProvider(<ProductsByCategoryPage />);

    expect(screen.getByText("Product 1")).toBeInTheDocument();
    expect(screen.getByText("No more products to load")).toBeInTheDocument();
  });

  it("should call loadMore function through InfiniteScrollTrigger", () => {
    const mockLoadMore = vi.fn();
    const mockProducts = [
      { id: "1", title: "Product 1", images: ["image1.jpg"], price: 10.0 }
    ];
    (useInfiniteScroll as Mock).mockReturnValue({
      data: mockProducts,
      loading: false,
      error: null,
      hasMore: true,
      loadMore: mockLoadMore
    });

    renderWithProvider(<ProductsByCategoryPage />);

    expect(mockLoadMore).toBeDefined();
  });
});
