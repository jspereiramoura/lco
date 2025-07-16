import { renderHook, act } from "@testing-library/react";
import { vi } from "vitest";
import { useInfiniteScroll } from "./useInfiniteScroll";

describe("useInfiniteScroll", () => {
  const mockFetchFunction = vi.fn();

  beforeEach(() => {
    mockFetchFunction.mockClear();
  });

  it("should initialize with empty data", () => {
    mockFetchFunction.mockResolvedValueOnce([]);

    const { result } = renderHook(() =>
      useInfiniteScroll(mockFetchFunction, 10)
    );

    expect(result.current.data).toEqual([]);
    expect(result.current.loading).toBe(true);
    expect(result.current.error).toBe(null);
    expect(result.current.hasMore).toBe(true);
    expect(typeof result.current.loadMore).toBe("function");
  });

  it("should load initial data automatically", async () => {
    const mockData = [
      { id: 1, name: "Item 1" },
      { id: 2, name: "Item 2" }
    ];
    mockFetchFunction.mockResolvedValueOnce(mockData);

    const { result } = renderHook(() =>
      useInfiniteScroll(mockFetchFunction, 10)
    );

    await act(async () => {});

    expect(mockFetchFunction).toHaveBeenCalledWith(0, 10);
    expect(result.current.data).toEqual(mockData);
    expect(result.current.loading).toBe(false);
  });

  it("should load more data when loadMore is called", async () => {
    const initialData = [{ id: 1, name: "Item 1" }];
    const newData = [{ id: 2, name: "Item 2" }];

    mockFetchFunction
      .mockResolvedValueOnce(initialData)
      .mockResolvedValueOnce(newData);

    const { result } = renderHook(() =>
      useInfiniteScroll(mockFetchFunction, 1)
    );

    await act(async () => {});

    await act(async () => {
      result.current.loadMore();
    });

    expect(mockFetchFunction).toHaveBeenCalledTimes(2);
    expect(mockFetchFunction).toHaveBeenNthCalledWith(1, 0, 1);
    expect(mockFetchFunction).toHaveBeenNthCalledWith(2, 1, 1);
    expect(result.current.data).toEqual([...initialData, ...newData]);
  });

  it("should set hasMore to false when less data is returned", async () => {
    const mockData = [{ id: 1, name: "Item 1" }];
    mockFetchFunction.mockResolvedValueOnce(mockData);

    const { result } = renderHook(() =>
      useInfiniteScroll(mockFetchFunction, 10)
    );

    await act(async () => {});

    expect(result.current.hasMore).toBe(false);
  });

  it("should handle errors correctly", async () => {
    const errorMessage = "Network error";
    mockFetchFunction.mockRejectedValueOnce(new Error(errorMessage));

    const { result } = renderHook(() =>
      useInfiniteScroll(mockFetchFunction, 10)
    );

    await act(async () => {});

    expect(result.current.error).toBe(errorMessage);
    expect(result.current.loading).toBe(false);
  });

  it("should not load more when already loading", async () => {
    mockFetchFunction.mockImplementation(
      () => new Promise(resolve => setTimeout(() => resolve([]), 100))
    );

    const { result } = renderHook(() =>
      useInfiniteScroll(mockFetchFunction, 10)
    );

    await act(async () => {
      result.current.loadMore();
      result.current.loadMore();
    });

    expect(mockFetchFunction).toHaveBeenCalledTimes(1);
  });

  it("should not load more when hasMore is false", async () => {
    const mockData = [{ id: 1, name: "Item 1" }];
    mockFetchFunction.mockResolvedValueOnce(mockData);

    const { result } = renderHook(() =>
      useInfiniteScroll(mockFetchFunction, 10)
    );

    await act(async () => {});

    await act(async () => {
      result.current.loadMore();
    });

    expect(mockFetchFunction).toHaveBeenCalledTimes(1);
  });
});
