import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import createIdbStorage from "redux-persist-indexeddb-storage";
import persistStore from "redux-persist/es/persistStore";
import { INDEXED_DB_STORAGE_KEYS } from "../utils/consts";
import cartReducer from "./slices/cartSlice";
import globalLoaderReducer from "./slices/globalLoaderSlice";

const storage = createIdbStorage(INDEXED_DB_STORAGE_KEYS.REDUX_STORE, "redux");

const persistedReducers = {
  cart: persistReducer({ key: "cart", storage }, cartReducer)
};

export const store = configureStore({
  reducer: combineReducers({
    ...persistedReducers,
    globalLoader: globalLoaderReducer
  }),
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({ serializableCheck: false })
});

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
