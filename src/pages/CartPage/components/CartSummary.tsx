import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Typography
} from "@mui/material";

interface CartSummaryProps {
  total: number;
  itemCount: number;
  onClearCart: () => void;
}

export default function CartSummary({
  total,
  itemCount,
  onClearCart
}: CartSummaryProps) {
  return (
    <Card sx={{ maxHeight: "fit-content", minWidth: 288 }} variant="outlined">
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Order Summary
        </Typography>

        <Divider sx={{ my: 2 }} />

        <Box display="flex" justifyContent="space-between" mb={1}>
          <Typography variant="body1">
            Subtotal ({itemCount} {itemCount === 1 ? "item" : "items"}):
          </Typography>
          <Typography variant="body1" fontWeight="bold">
            ${total.toFixed(2)}
          </Typography>
        </Box>

        <Divider sx={{ my: 2 }} />

        <Box display="flex" justifyContent="space-between" mb={2}>
          <Typography variant="h6">Total:</Typography>
          <Typography variant="h6" color="primary">
            ${total.toFixed(2)}
          </Typography>
        </Box>

        <Button variant="contained" fullWidth size="large" sx={{ mb: 2 }}>
          Checkout
        </Button>

        <Button
          variant="outlined"
          fullWidth
          color="error"
          onClick={onClearCart}
        >
          Clear Cart
        </Button>
      </CardContent>
    </Card>
  );
}
