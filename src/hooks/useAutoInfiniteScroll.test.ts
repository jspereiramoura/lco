import { renderHook } from "@testing-library/react";
import { act } from "react";
import { vi } from "vitest";
import { useAutoInfiniteScroll } from "./useAutoInfiniteScroll";

const mockIntersectionObserver = vi.fn();
const mockObserver = {
  observe: vi.fn(),
  disconnect: vi.fn(),
  unobserve: vi.fn()
};
let intersectionCallback: (entries: unknown[]) => void = () => {};
mockIntersectionObserver.mockImplementation(callback => {
  intersectionCallback = callback;
  return mockObserver;
});
window.IntersectionObserver = mockIntersectionObserver;

describe("useAutoInfiniteScroll", () => {
  const mockOnLoadMore = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    vi.useRealTimers();
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("should create IntersectionObserver when not loading and hasMore is true", () => {
    const { result } = renderHook(() =>
      useAutoInfiniteScroll({
        loading: false,
        hasMore: true,
        onLoadMore: mockOnLoadMore
      })
    );

    expect(mockIntersectionObserver).toHaveBeenCalledWith(
      expect.any(Function),
      { threshold: expect.any(Number), rootMargin: expect.any(String) }
    );
    expect(result.current.current).toBe(null);
  });

  it("should not create IntersectionObserver when loading", () => {
    renderHook(() =>
      useAutoInfiniteScroll({
        loading: true,
        hasMore: true,
        onLoadMore: mockOnLoadMore
      })
    );

    expect(mockIntersectionObserver).not.toHaveBeenCalled();
  });

  it("should not create IntersectionObserver when hasMore is false", () => {
    renderHook(() =>
      useAutoInfiniteScroll({
        loading: false,
        hasMore: false,
        onLoadMore: mockOnLoadMore
      })
    );

    expect(mockIntersectionObserver).not.toHaveBeenCalled();
  });

  it("should call onLoadMore when element intersects", async () => {
    renderHook(() =>
      useAutoInfiniteScroll({
        loading: false,
        hasMore: true,
        onLoadMore: mockOnLoadMore
      })
    );

    await act(async () => {
      intersectionCallback([{ isIntersecting: true }]);
    });

    await act(async () => {
      vi.advanceTimersByTime(300);
    });

    expect(mockOnLoadMore).toHaveBeenCalledTimes(1);
  });

  it("should debounce multiple rapid intersections", async () => {
    renderHook(() =>
      useAutoInfiniteScroll({
        loading: false,
        hasMore: true,
        onLoadMore: mockOnLoadMore
      })
    );

    await act(async () => {
      intersectionCallback([{ isIntersecting: true }]);
      intersectionCallback([{ isIntersecting: true }]);
      intersectionCallback([{ isIntersecting: true }]);
    });

    await act(async () => {
      vi.advanceTimersByTime(300);
    });

    expect(mockOnLoadMore).toHaveBeenCalledTimes(1);
  });

  it("should not call onLoadMore when element does not intersect", () => {
    renderHook(() =>
      useAutoInfiniteScroll({
        loading: false,
        hasMore: true,
        onLoadMore: mockOnLoadMore
      })
    );

    intersectionCallback([{ isIntersecting: false }]);

    expect(mockOnLoadMore).not.toHaveBeenCalled();
  });

  it("should disconnect observer on unmount", () => {
    const { unmount } = renderHook(() =>
      useAutoInfiniteScroll({
        loading: false,
        hasMore: true,
        onLoadMore: mockOnLoadMore
      })
    );

    unmount();

    expect(mockObserver.disconnect).toHaveBeenCalledTimes(1);
  });

  it("should clear debounce timer on unmount", () => {
    const clearTimeout = vi.spyOn(global, "clearTimeout");
    clearTimeout.mockClear();

    const { unmount } = renderHook(() =>
      useAutoInfiniteScroll({
        loading: false,
        hasMore: true,
        onLoadMore: mockOnLoadMore
      })
    );

    intersectionCallback([{ isIntersecting: true }]);
    unmount();

    expect(mockObserver.disconnect).toHaveBeenCalledTimes(1);
    expect(clearTimeout).toHaveBeenCalledTimes(1);
  });
});
