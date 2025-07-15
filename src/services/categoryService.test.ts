import {
  getCategories,
  getCategoryById,
  getProductsByCategory
} from "./categoryService";

describe("Category Service", () => {
  it("should fetch categories", async () => {
    const categories = await getCategories();
    expect(categories).toBeDefined();
    expect(categories).toHaveLength(2);
  });

  it("should fetch a category by ID", async () => {
    const category = await getCategoryById("1");
    expect(category).toBeDefined();
    expect(category).toEqual({
      id: 1,
      name: "Roupas",
      slug: "roupas",
      image: "https://example.com/categoria.jpg",
      creationAt: expect.any(String),
      updatedAt: expect.any(String)
    });
  });

  it("should fetch products by category ID", async () => {
    const products = await getProductsByCategory("1");
    expect(products).toBeDefined();
    expect(products).toHaveLength(2);
    expect(products[0]).toEqual({
      id: 101,
      title: "Camiseta básica",
      slug: "camiseta-basica",
      price: 59.9,
      description: "Camiseta confortável e leve",
      category: expect.any(Object),
      images: ["https://example.com/produto1.jpg"],
      creationAt: expect.any(String),
      updatedAt: expect.any(String)
    });
  });
});
