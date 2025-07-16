declare interface CartItem {
  product: Product;
  quantity: number;
}

declare interface CartState {
  items: CartItem[];
  total: number;
  itemCount: number;
}
