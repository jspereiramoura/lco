import { lazy, StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter, Route, Routes } from "react-router";
import { Provider } from "react-redux";
import { persistor, store } from "./store/index.ts";
import CategoryPage from "./pages/CategoryPage.tsx";
import { PersistGate } from "redux-persist/integration/react";

const ProductDetailPage = lazy(() => import("./pages/ProductDetailPage.tsx"));
const ProductsByCategoryPage = lazy(
  () => import("./pages/ProductsByCategoryPage.tsx")
);
const CartPage = lazy(() => import("./pages/CartPage/CartPage"));
const NotFoundPage = lazy(() => import("./pages/NotFoundPage.tsx"));

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={null}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<App />}>
              <Route index element={<CategoryPage />} />
              <Route
                path="categories/:id/products"
                element={<ProductsByCategoryPage />}
              />
              <Route path="products/:id" element={<ProductDetailPage />} />
              <Route path="cart" element={<CartPage />} />
            </Route>
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  </StrictMode>
);
