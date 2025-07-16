import apiClient from "./utils/apiClient";

export const getCategories = async (): Promise<Category[]> => {
  const response = await apiClient.get("/categories");
  return response.data;
};

export const getCategoryById = async (id: string): Promise<Category> => {
  const response = await apiClient.get(`/categories/${id}`);
  return response.data;
};

export const getProductsByCategory = async (
  categoryId: string
): Promise<Product[]> => {
  const response = await apiClient.get(`/categories/${categoryId}/products`);
  return response.data;
};

export const getProductsByCategoryPaginated = async (
  categoryId: string,
  offset: number,
  limit: number
): Promise<Product[]> => {
  const response = await apiClient.get(
    `/categories/${categoryId}/products?offset=${offset}&limit=${limit}`
  );
  return response.data;
};
