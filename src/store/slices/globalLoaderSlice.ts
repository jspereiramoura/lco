import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface GlobalLoaderState {
  isLoading: boolean;
  message: string;
}

const initialState: GlobalLoaderState = {
  isLoading: false,
  message: "Loading..."
};

const globalLoaderSlice = createSlice({
  name: "globalLoader",
  initialState,
  reducers: {
    showLoader: (state, action: PayloadAction<string | undefined>) => {
      state.isLoading = true;
      state.message = action.payload ?? "Loading...";
    },
    hideLoader: state => {
      state.isLoading = false;
    }
  }
});

export const { showLoader, hideLoader } = globalLoaderSlice.actions;
export default globalLoaderSlice.reducer;
