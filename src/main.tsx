import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter, Route, Routes } from "react-router";
import ProductDetailPage from "./pages/ProductDetailPage.tsx";
import ProductsByCategoryPage from "./pages/ProductsByCategoryPage.tsx";
import CategoryPage from "./pages/CategoryPage.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<CategoryPage />} />
          <Route
            path="categories/:id/products"
            element={<ProductsByCategoryPage />}
          />
          <Route path="products/:id" element={<ProductDetailPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
