import { describe, it, expect } from "vitest";
import cartReducer, {
  addToCart,
  removeFromCart,
  incrementQuantity,
  decrementQuantity,
  clearCart,
  selectCartItems,
  selectCartTotal,
  selectCartItemCount,
  selectCartItemById,
  selectIsInCart
} from "./cartSlice";

const mockProduct1: Product = {
  id: 1,
  title: "Test Product 1",
  slug: "test-product-1",
  price: 29.99,
  description: "Test description 1",
  category: {
    id: 1,
    name: "Test Category",
    slug: "test-category",
    image: "test-image.jpg",
    creationAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z"
  },
  images: ["image1.jpg", "image2.jpg"],
  creationAt: "2024-01-01T00:00:00Z",
  updatedAt: "2024-01-01T00:00:00Z"
};

const mockProduct2: Product = {
  id: 2,
  title: "Test Product 2",
  slug: "test-product-2",
  price: 49.99,
  description: "Test description 2",
  category: {
    id: 1,
    name: "Test Category",
    slug: "test-category",
    image: "test-image.jpg",
    creationAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z"
  },
  images: ["image3.jpg", "image4.jpg"],
  creationAt: "2024-01-01T00:00:00Z",
  updatedAt: "2024-01-01T00:00:00Z"
};

const initialState: CartState = {
  items: [],
  total: 0,
  itemCount: 0
};

describe("Cart Slice", () => {
  describe("reducers", () => {
    it("should return the initial state", () => {
      expect(cartReducer(undefined, { type: "unknown" })).toEqual(initialState);
    });

    describe("addToCart", () => {
      it("should add a new product to the cart", () => {
        const action = addToCart(mockProduct1);
        const state = cartReducer(initialState, action);

        expect(state.items).toHaveLength(1);
        expect(state.items[0]).toEqual({
          product: mockProduct1,
          quantity: 1
        });
        expect(state.total).toBe(mockProduct1.price);
        expect(state.itemCount).toBe(1);
      });

      it("should increment quantity when product already exists", () => {
        const stateWithProduct: CartState = {
          items: [{ product: mockProduct1, quantity: 1 }],
          total: mockProduct1.price,
          itemCount: 1
        };

        const action = addToCart(mockProduct1);
        const state = cartReducer(stateWithProduct, action);

        expect(state.items).toHaveLength(1);
        expect(state.items[0].quantity).toBe(2);
        expect(state.total).toBe(mockProduct1.price * 2);
        expect(state.itemCount).toBe(2);
      });

      it("should add multiple different products", () => {
        const stateWithProduct: CartState = {
          items: [{ product: mockProduct1, quantity: 1 }],
          total: mockProduct1.price,
          itemCount: 1
        };

        const action = addToCart(mockProduct2);
        const state = cartReducer(stateWithProduct, action);

        expect(state.items).toHaveLength(2);
        expect(state.items[1]).toEqual({
          product: mockProduct2,
          quantity: 1
        });
        expect(state.total).toBe(79.98);
        expect(state.itemCount).toBe(2);
      });
    });

    describe("removeFromCart", () => {
      it("should remove a product from the cart", () => {
        const stateWithProducts: CartState = {
          items: [
            { product: mockProduct1, quantity: 2 },
            { product: mockProduct2, quantity: 1 }
          ],
          total: mockProduct1.price * 2 + mockProduct2.price,
          itemCount: 3
        };

        const action = removeFromCart(mockProduct1.id);
        const state = cartReducer(stateWithProducts, action);

        expect(state.items).toHaveLength(1);
        expect(state.items[0].product.id).toBe(mockProduct2.id);
        expect(state.total).toBe(mockProduct2.price);
        expect(state.itemCount).toBe(1);
      });

      it("should handle removing non-existent product", () => {
        const stateWithProduct: CartState = {
          items: [{ product: mockProduct1, quantity: 1 }],
          total: 29.99,
          itemCount: 1
        };

        const action = removeFromCart(999);
        const state = cartReducer(stateWithProduct, action);

        expect(state.items).toHaveLength(1);
        expect(state.total).toBe(mockProduct1.price);
        expect(state.itemCount).toBe(1);
      });
    });

    describe("incrementQuantity", () => {
      it("should increment quantity of existing product", () => {
        const stateWithProduct: CartState = {
          items: [{ product: mockProduct1, quantity: 1 }],
          total: mockProduct1.price,
          itemCount: 1
        };

        const action = incrementQuantity(mockProduct1.id);
        const state = cartReducer(stateWithProduct, action);

        expect(state.items[0].quantity).toBe(2);
        expect(state.total).toBe(mockProduct1.price * 2);
        expect(state.itemCount).toBe(2);
      });

      it("should handle incrementing non-existent product", () => {
        const stateWithProduct: CartState = {
          items: [{ product: mockProduct1, quantity: 1 }],
          total: mockProduct1.price,
          itemCount: 1
        };

        const action = incrementQuantity(999);
        const state = cartReducer(stateWithProduct, action);

        expect(state.items[0].quantity).toBe(1);
        expect(state.total).toBe(mockProduct1.price);
        expect(state.itemCount).toBe(1);
      });
    });

    describe("decrementQuantity", () => {
      it("should decrement quantity when quantity > 1", () => {
        const stateWithProduct: CartState = {
          items: [{ product: mockProduct1, quantity: 3 }],
          total: mockProduct1.price * 3,
          itemCount: 3
        };

        const action = decrementQuantity(mockProduct1.id);
        const state = cartReducer(stateWithProduct, action);

        expect(state.items[0].quantity).toBe(2);
        expect(state.total).toBe(mockProduct1.price * 2);
        expect(state.itemCount).toBe(2);
      });

      it("should remove product when quantity = 1", () => {
        const stateWithProduct: CartState = {
          items: [{ product: mockProduct1, quantity: 1 }],
          total: mockProduct1.price,
          itemCount: 1
        };

        const action = decrementQuantity(mockProduct1.id);
        const state = cartReducer(stateWithProduct, action);

        expect(state.items).toHaveLength(0);
        expect(state.total).toBe(0);
        expect(state.itemCount).toBe(0);
      });

      it("should handle decrementing non-existent product", () => {
        const stateWithProduct: CartState = {
          items: [{ product: mockProduct1, quantity: 1 }],
          total: mockProduct1.price,
          itemCount: 1
        };

        const action = decrementQuantity(999);
        const state = cartReducer(stateWithProduct, action);

        expect(state.items[0].quantity).toBe(1);
        expect(state.total).toBe(mockProduct1.price);
        expect(state.itemCount).toBe(1);
      });
    });

    describe("clearCart", () => {
      it("should clear all items from the cart", () => {
        const stateWithProducts: CartState = {
          items: [
            { product: mockProduct1, quantity: 2 },
            { product: mockProduct2, quantity: 1 }
          ],
          total: mockProduct1.price * 2 + mockProduct2.price,
          itemCount: 3
        };

        const action = clearCart();
        const state = cartReducer(stateWithProducts, action);

        expect(state).toEqual(initialState);
      });
    });
  });

  describe("selectors", () => {
    const mockState = {
      cart: {
        items: [
          { product: mockProduct1, quantity: 2 },
          { product: mockProduct2, quantity: 1 }
        ],
        total: mockProduct1.price * 2 + mockProduct2.price,
        itemCount: 3
      }
    };

    describe("selectCartItems", () => {
      it("should return cart items", () => {
        const result = selectCartItems(mockState);
        expect(result).toEqual(mockState.cart.items);
      });
    });

    describe("selectCartTotal", () => {
      it("should return cart total", () => {
        const result = selectCartTotal(mockState);
        expect(result).toBe(mockState.cart.total);
      });
    });

    describe("selectCartItemCount", () => {
      it("should return cart item count", () => {
        const result = selectCartItemCount(mockState);
        expect(result).toBe(mockState.cart.itemCount);
      });
    });

    describe("selectCartItemById", () => {
      it("should return cart item by id", () => {
        const result = selectCartItemById(mockState, mockProduct1.id);
        expect(result).toEqual({ product: mockProduct1, quantity: 2 });
      });

      it("should return undefined for non-existent item", () => {
        const result = selectCartItemById(mockState, 999);
        expect(result).toBeUndefined();
      });
    });

    describe("selectIsInCart", () => {
      it("should return true if item is in cart", () => {
        const result = selectIsInCart(mockState, mockProduct1.id);
        expect(result).toBe(true);
      });

      it("should return false if item is not in cart", () => {
        const result = selectIsInCart(mockState, 999);
        expect(result).toBe(false);
      });
    });
  });

  describe("automatic total calculation", () => {
    it("should calculate totals automatically after addToCart", () => {
      const action = addToCart(mockProduct1);
      const state = cartReducer(initialState, action);

      expect(state.total).toBe(mockProduct1.price);
      expect(state.itemCount).toBe(1);
    });

    it("should calculate totals automatically after removeFromCart", () => {
      const stateWithProducts: CartState = {
        items: [
          { product: mockProduct1, quantity: 2 },
          { product: mockProduct2, quantity: 1 }
        ],
        total: 0,
        itemCount: 0
      };

      const action = removeFromCart(mockProduct1.id);
      const state = cartReducer(stateWithProducts, action);

      expect(state.total).toBe(mockProduct2.price);
      expect(state.itemCount).toBe(1);
    });

    it("should calculate totals automatically after incrementQuantity", () => {
      const stateWithProduct: CartState = {
        items: [{ product: mockProduct1, quantity: 1 }],
        total: 0,
        itemCount: 0
      };

      const action = incrementQuantity(mockProduct1.id);
      const state = cartReducer(stateWithProduct, action);

      expect(state.total).toBe(mockProduct1.price * 2);
      expect(state.itemCount).toBe(2);
    });

    it("should calculate totals automatically after decrementQuantity", () => {
      const stateWithProduct: CartState = {
        items: [{ product: mockProduct1, quantity: 3 }],
        total: 0,
        itemCount: 0
      };

      const action = decrementQuantity(mockProduct1.id);
      const state = cartReducer(stateWithProduct, action);

      expect(state.total).toBe(mockProduct1.price * 2);
      expect(state.itemCount).toBe(2);
    });

    it("should not recalculate totals after clearCart", () => {
      const stateWithProducts: CartState = {
        items: [{ product: mockProduct1, quantity: 2 }],
        total: mockProduct1.price * 2,
        itemCount: 2
      };

      const action = clearCart();
      const state = cartReducer(stateWithProducts, action);

      expect(state.total).toBe(0);
      expect(state.itemCount).toBe(0);
    });
  });
});
