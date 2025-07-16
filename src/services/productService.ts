import apiClient from "./utils/apiClient";

export const getProducts = async (): Promise<Product[]> => {
  const response = await apiClient.get("/products?offset=0&limit=20");
  return response.data;
};

export const getProductById = async (id: string): Promise<Product> => {
  const response = await apiClient.get(`/products/${id}`);
  return response.data;
};
