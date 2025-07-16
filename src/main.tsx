import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter, Route, Routes } from "react-router";
import { Provider } from "react-redux";
import { store } from "./store/index.ts";
import ProductDetailPage from "./pages/ProductDetailPage.tsx";
import ProductsByCategoryPage from "./pages/ProductsByCategoryPage.tsx";
import CategoryPage from "./pages/CategoryPage.tsx";
import CartPage from "./pages/CartPage/CartPage";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
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
        </Routes>
      </BrowserRouter>
    </Provider>
  </StrictMode>
);
