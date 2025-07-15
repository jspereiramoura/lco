import { http, HttpResponse } from "msw";

const now = new Date().toISOString();

const mockCategory: Category = {
  id: 1,
  name: "Roupas",
  slug: "roupas",
  image: "https://example.com/categoria.jpg",
  creationAt: now,
  updatedAt: now
};

const mockCategories: Category[] = [
  mockCategory,
  {
    id: 2,
    name: "Eletrônicos",
    slug: "eletronicos",
    image: "https://example.com/eletronicos.jpg",
    creationAt: now,
    updatedAt: now
  }
];

const mockProductsByCategory: Product[] = [
  {
    id: 101,
    title: "Camiseta básica",
    slug: "camiseta-basica",
    price: 59.9,
    description: "Camiseta confortável e leve",
    category: mockCategory,
    images: ["https://example.com/produto1.jpg"],
    creationAt: now,
    updatedAt: now
  },
  {
    id: 102,
    title: "Calça jeans",
    slug: "calca-jeans",
    price: 129.9,
    description: "Calça jeans azul escuro",
    category: mockCategory,
    images: ["https://example.com/produto2.jpg"],
    creationAt: now,
    updatedAt: now
  }
];

const mockProducts: Product[] = Array.from({ length: 20 }, (_, i) => ({
  id: i + 1,
  title: `Produto ${i + 1}`,
  slug: `produto-${i + 1}`,
  price: (i + 1) * 10,
  description: `Descrição do Produto ${i + 1}`,
  category: mockCategories[i % mockCategories.length],
  images: [`https://example.com/produto-${i + 1}.jpg`],
  creationAt: now,
  updatedAt: now
}));

export const handlers = [
  http.get("https://api.escuelajs.co/api/v1/categories", () => {
    return HttpResponse.json(mockCategories);
  }),

  http.get("https://api.escuelajs.co/api/v1/categories/:id", ({ params }) => {
    const { id } = params;
    const category = mockCategories.find(c => c.id === Number(id));
    return category ? HttpResponse.json(category) : HttpResponse.error();
  }),

  http.get(
    "https://api.escuelajs.co/api/v1/categories/:categoryId/products",
    () => {
      return HttpResponse.json(mockProductsByCategory);
    }
  ),

  http.get("https://api.escuelajs.co/api/v1/products", ({ request }) => {
    const url = new URL(request.url);
    const offset = Number(url.searchParams.get("offset") || 0);
    const limit = Number(url.searchParams.get("limit") || 20);
    const paginated = mockProducts.slice(offset, offset + limit);
    return HttpResponse.json(paginated);
  }),

  http.get("https://api.escuelajs.co/api/v1/products/:id", ({ params }) => {
    const { id } = params;
    const product = mockProducts.find(p => p.id === Number(id));
    return product ? HttpResponse.json(product) : HttpResponse.error();
  })
];
