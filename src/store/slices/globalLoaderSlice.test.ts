import { describe, it, expect } from "vitest";
import globalLoaderReducer, {
  showLoader,
  hideLoader
} from "./globalLoaderSlice";

describe("globalLoaderSlice", () => {
  const initialState = {
    isLoading: false,
    message: "Loading..."
  };

  it("should handle showLoader with default message", () => {
    const action = showLoader();
    const newState = globalLoaderReducer(initialState, action);

    expect(newState.isLoading).toBe(true);
    expect(newState.message).toBe("Loading...");
  });

  it("should handle showLoader with custom message", () => {
    const customMessage = "Saving data...";
    const action = showLoader(customMessage);
    const newState = globalLoaderReducer(initialState, action);

    expect(newState.isLoading).toBe(true);
    expect(newState.message).toBe(customMessage);
  });

  it("should handle hideLoader", () => {
    const loadingState = {
      isLoading: true,
      message: "Loading..."
    };

    const action = hideLoader();
    const newState = globalLoaderReducer(loadingState, action);

    expect(newState.isLoading).toBe(false);
    expect(newState.message).toBe("Loading...");
  });
});
