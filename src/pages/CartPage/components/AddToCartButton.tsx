import { Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useSnackbar } from "notistack";
import { useAppDispatch } from "../../../hooks/redux";
import { addToCart } from "../../../store/slices/cartSlice";

interface AddToCartButtonProps {
  product: Product;
  variant?: "contained" | "outlined" | "text";
  size?: "small" | "medium" | "large";
  fullWidth?: boolean;
}

export default function AddToCartButton({
  product,
  variant = "contained",
  size = "medium",
  fullWidth = false
}: AddToCartButtonProps) {
  const dispatch = useAppDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const handleAddToCart = () => {
    dispatch(addToCart(product));
    enqueueSnackbar("Product added to cart!", { variant: "success" });
  };

  return (
    <Button
      variant={variant}
      size={size}
      fullWidth={fullWidth}
      startIcon={<AddIcon />}
      color="primary"
      onClick={handleAddToCart}
    >
      Buy
    </Button>
  );
}
