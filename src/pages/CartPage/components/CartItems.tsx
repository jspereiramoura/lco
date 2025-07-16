import { Box } from "@mui/material";
import CartItem from "./CartItem";

interface CartItemsProps {
  items: CartItem[];
  onIncrement: (productId: number) => void;
  onDecrement: (productId: number) => void;
  onRemove: (productId: number) => void;
}

export default function CartItems({
  items,
  onIncrement,
  onDecrement,
  onRemove
}: CartItemsProps) {
  return (
    <Box
      flex={1}
      sx={{
        display: "flex",
        flexDirection: "column"
      }}
    >
      <Box
        sx={{
          flex: 1,
          gap: 2,
          overflow: { sm: "auto" },
          p: { sm: 1, md: 2 }
        }}
      >
        {items.map(item => (
          <CartItem
            key={item.product.id}
            item={item}
            onIncrement={onIncrement}
            onDecrement={onDecrement}
            onRemove={onRemove}
          />
        ))}
      </Box>
    </Box>
  );
}
