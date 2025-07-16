import { Box } from "@mui/material";
import { useSnackbar } from "notistack";
import CartItems from "./components/CartItems";
import CartSummary from "./components/CartSummary";
import EmptyCart from "./components/EmptyCart";
import Section from "../../components/Section";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import {
  clearCart,
  decrementQuantity,
  incrementQuantity,
  removeFromCart,
  selectCartItemCount,
  selectCartItems,
  selectCartTotal
} from "../../store/slices/cartSlice";

export default function CartPage() {
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector(selectCartItems);
  const total = useAppSelector(selectCartTotal);
  const itemCount = useAppSelector(selectCartItemCount);
  const { enqueueSnackbar } = useSnackbar();

  const handleIncrement = (productId: number) => {
    dispatch(incrementQuantity(productId));
  };

  const handleDecrement = (productId: number) => {
    dispatch(decrementQuantity(productId));
  };

  const handleRemove = (productId: number) => {
    dispatch(removeFromCart(productId));
    enqueueSnackbar("Product removed from cart!", { variant: "success" });
  };

  const handleClearCart = () => {
    dispatch(clearCart());
    enqueueSnackbar("Cart cleared successfully!", { variant: "success" });
  };

  if (cartItems.length === 0) {
    return <EmptyCart />;
  }
  return (
    <Section
      title="Shopping Cart"
      mustShowBackButton={false}
      description={`${itemCount} ${itemCount === 1 ? "item" : "items"} in cart`}
      sx={{
        py: 4,
        height: `calc(100vh - 64px - 64px)`,
        display: "flex",
        flexDirection: "column"
      }}
    >
      <Box
        display="flex"
        gap={3}
        sx={{
          mt: 3,
          pb: { xs: 4, lg: 0 },
          flex: 1,
          overflow: { lg: "hidden" },
          flexDirection: { xs: "column", lg: "row" }
        }}
      >
        <CartItems
          items={cartItems}
          onIncrement={handleIncrement}
          onDecrement={handleDecrement}
          onRemove={handleRemove}
        />

        <CartSummary
          total={total}
          itemCount={itemCount}
          onClearCart={handleClearCart}
        />
      </Box>
    </Section>
  );
}
