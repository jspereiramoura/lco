import { Box, Button, Container, Typography } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useNavigate } from "react-router";

export default function EmptyCart() {
  const navigate = useNavigate();

  const handleGoToCategories = () => {
    navigate("/");
  };

  return (
    <Container
      maxWidth="lg"
      sx={{
        py: 4,
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}
    >
      <Box textAlign="center">
        <Box
          sx={{
            mb: 3,
            display: "flex",
            justifyContent: "center",
            "& svg": {
              fontSize: 120,
              color: "text.secondary",
              opacity: 0.5
            }
          }}
        >
          <ShoppingCartIcon />
        </Box>

        <Typography variant="h4" gutterBottom>
          Your cart is empty
        </Typography>

        <Typography
          variant="body1"
          color="text.secondary"
          gutterBottom
          sx={{ mb: 3 }}
        >
          Add some products to your cart to start shopping.
        </Typography>

        <Button
          variant="contained"
          size="large"
          onClick={handleGoToCategories}
          sx={{ px: 4, py: 1.5 }}
        >
          Continue Shopping
        </Button>
      </Box>
    </Container>
  );
}
