import { getProductById, getProducts } from "./productService";

describe("Product Service", () => {
  it("should fetch products", async () => {
    const products = await getProducts();
    expect(products).toBeDefined();
    expect(products).toHaveLength(20);
  });

  it("should fetch a product by ID", async () => {
    const product = await getProductById("1");
    expect(product).toBeDefined();
    expect(product).toEqual({
      id: 1,
      title: "Produto 1",
      slug: "produto-1",
      price: 10,
      description: "Descrição do Produto 1",
      category: expect.any(Object),
      images: ["https://example.com/produto-1.jpg"],
      creationAt: expect.any(String),
      updatedAt: expect.any(String)
    });
  });
});
