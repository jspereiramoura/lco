import { configureStore } from "@reduxjs/toolkit";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import { useNavigate } from "react-router";
import { vi, type Mock } from "vitest";
import { GlobalLoader } from "../components/GlobalLoader/GlobalLoader";
import { useAppSelector } from "../hooks/redux";
import { useFetch } from "../hooks/useFetch";
import cartSlice from "../store/slices/cartSlice";
import globalLoaderSlice from "../store/slices/globalLoaderSlice";
import CategoryPage from "./CategoryPage";

vi.mock("react-router");
vi.mock("../hooks/useFetch");

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

const mockedUseFetch = useFetch as Mock;

describe("Category Page", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should render a loading spinner while fetching data", () => {
    mockedUseFetch.mockReturnValue({
      data: null,
      loading: true,
      error: null
    });

    renderWithProvider(
      <TestWrapper>
        <CategoryPage />
      </TestWrapper>
    );

    expect(screen.getByText("Loading categories...")).toBeInTheDocument();
  });

  it("should render an error message when fetching fails", () => {
    const errorMessage = "Network Error";
    mockedUseFetch.mockReturnValue({
      data: null,
      loading: false,
      error: errorMessage
    });

    renderWithProvider(<CategoryPage />);

    expect(screen.getByRole("alert")).toBeInTheDocument();
    expect(screen.getByText(errorMessage)).toBeInTheDocument();
  });

  it("should render a list of categories on successful fetch", () => {
    const mockCategories = [
      {
        id: 1,
        name: "Electronics",
        image: "https://example.com/electronics.jpg"
      },
      { id: 2, name: "Books", image: "https://example.com/books.jpg" }
    ];
    mockedUseFetch.mockReturnValue({
      data: mockCategories,
      loading: false,
      error: null
    });

    renderWithProvider(<CategoryPage />);

    expect(screen.getByText("Category Page")).toBeInTheDocument();
    expect(screen.getByText("Electronics")).toBeInTheDocument();
    expect(screen.getByText("Books")).toBeInTheDocument();

    expect(screen.getByAltText("Electronics")).toBeInTheDocument();
    expect(screen.getByAltText("Books")).toBeInTheDocument();

    expect(screen.queryByRole("progressbar")).not.toBeInTheDocument();
    expect(screen.queryByRole("alert")).not.toBeInTheDocument();
  });

  it("should navigate to the products page when a category is clicked", async () => {
    const mockCategories = [
      {
        id: 1,
        name: "Electronics",
        image: "https://example.com/electronics.jpg"
      }
    ];
    mockedUseFetch.mockReturnValue({
      data: mockCategories,
      loading: false,
      error: null
    });

    const navigateSpy = vi.fn();
    (useNavigate as Mock).mockReturnValue(navigateSpy);

    renderWithProvider(<CategoryPage />);

    const categoryCard = screen.getByText("Electronics").closest("button");
    expect(categoryCard).toBeInTheDocument();
    await userEvent.click(categoryCard!);

    expect(navigateSpy).toHaveBeenCalledTimes(1);
    expect(navigateSpy).toHaveBeenCalledWith("/categories/1/products", {
      state: { categoryId: 1, categoryName: "Electronics" }
    });
  });
});
