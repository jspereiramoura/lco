import { combineReducers, configureStore } from "@reduxjs/toolkit";
import cartReducer from "./slices/cartSlice";
import globalLoaderReducer from "./slices/globalLoaderSlice";

export const store = configureStore({
  reducer: combineReducers({
    cart: cartReducer,
    globalLoader: globalLoaderReducer
  }),
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({ serializableCheck: false })
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
