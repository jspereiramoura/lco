import { renderHook, waitFor } from "@testing-library/react";
import { vi } from "vitest";
import { useFetch } from "./useFetch";

describe("useFetch", () => {
  it("should return the initial state correctly", () => {
    const mockFetchPromise = vi.fn(() => new Promise(() => {}));

    const { result } = renderHook(() => useFetch(mockFetchPromise));

    expect(result.current.loading).toBe(true);
    expect(result.current.data).toBeNull();
    expect(result.current.error).toBeNull();
  });

  it("should return data after a successful fetch", async () => {
    const mockData = { id: 1, message: "Success!" };
    const mockFetchPromise = vi.fn().mockResolvedValue(mockData);

    const { result } = renderHook(() => useFetch(mockFetchPromise));

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.data).toEqual(mockData);
    expect(result.current.error).toBeNull();
    expect(mockFetchPromise).toHaveBeenCalledTimes(1);
  });

  it("should return an error when the fetch fails with an Error instance", async () => {
    const errorMessage = "Network request failed";
    const mockFetchPromise = vi.fn().mockRejectedValue(new Error(errorMessage));

    const { result } = renderHook(() => useFetch(mockFetchPromise));

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.data).toBeNull();
    expect(result.current.error).toBe(errorMessage);
  });

  it("should return a generic error for non-Error rejections", async () => {
    const mockFetchPromise = vi.fn().mockRejectedValue("Not a Error instance");

    const { result } = renderHook(() => useFetch(mockFetchPromise));

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.data).toBeNull();
    expect(result.current.error).toBe("Ocorreu um erro desconhecido.");
  });

  it("should pass params to the fetch promise function", async () => {
    const mockData = { user: "test-user" };
    const params = { userId: 123 };
    const mockFetchPromise = vi.fn().mockResolvedValue(mockData);

    const { result } = renderHook(() => useFetch(mockFetchPromise, params));

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(mockFetchPromise).toHaveBeenCalledWith(params);
  });

  it("should re-fetch when params change", async () => {
    const mockFetchPromise = vi
      .fn()
      .mockResolvedValueOnce({ data: "first call" })
      .mockResolvedValueOnce({ data: "second call" });

    const initialParams = { id: 1 };

    const { result, rerender } = renderHook(
      props => useFetch(mockFetchPromise, props.params),
      { initialProps: { params: initialParams } }
    );

    await waitFor(() => {
      expect(result.current.data).toEqual({ data: "first call" });
    });

    expect(mockFetchPromise).toHaveBeenCalledTimes(1);
    expect(mockFetchPromise).toHaveBeenCalledWith(initialParams);

    const newParams = { id: 2 };
    rerender({ params: newParams });

    await waitFor(() => {
      expect(result.current.data).toEqual({ data: "second call" });
    });
    expect(mockFetchPromise).toHaveBeenCalledTimes(2);
    expect(mockFetchPromise).toHaveBeenCalledWith(newParams);
  });
});
