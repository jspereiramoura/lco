import { Box, Card, CardContent, IconButton, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import DeleteIcon from "@mui/icons-material/Delete";

interface CartItemProps {
  item: CartItem;
  onIncrement: (productId: number) => void;
  onDecrement: (productId: number) => void;
  onRemove: (productId: number) => void;
}

export default function CartItem({
  item,
  onIncrement,
  onDecrement,
  onRemove
}: CartItemProps) {
  return (
    <Card sx={{ mb: 2, position: "relative" }}>
      <CardContent>
        <Box display="flex" alignItems="center" gap={2}>
          <Box
            component="img"
            src={item.product.images[0]}
            alt={item.product.title}
            sx={{
              width: 120,
              height: 120,
              objectFit: "cover",
              borderRadius: 1
            }}
          />

          <Box flex={1} maxWidth={{ xs: 150, sm: 250, md: 400 }}>
            <Typography variant="body1" gutterBottom noWrap>
              {item.product.title}
            </Typography>
            <Box
              display={{ xs: "flex", md: "block" }}
              alignItems="center"
              justifyContent="space-between"
            >
              <Typography variant="body2" color="text.secondary">
                {item.product.category.name}
              </Typography>
              <Typography variant="body1" color="primary" mt={{ xs: 0, md: 1 }}>
                ${item.product.price.toFixed(2)}
              </Typography>
            </Box>
          </Box>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 2,
              ml: "auto",
              position: { xs: "absolute", md: "static" },
              right: { xs: 10, md: "auto" },
              bottom: { xs: 20, md: "auto" }
            }}
          >
            <Box display="flex" alignItems="center" gap={1}>
              <IconButton
                onClick={() => onDecrement(item.product.id)}
                size="small"
                color="primary"
              >
                <RemoveIcon />
              </IconButton>

              <Typography
                variant="body1"
                sx={{ minWidth: 30, textAlign: "center" }}
              >
                {item.quantity}
              </Typography>

              <IconButton
                onClick={() => onIncrement(item.product.id)}
                size="small"
                color="primary"
              >
                <AddIcon />
              </IconButton>
            </Box>

            <IconButton
              onClick={() => onRemove(item.product.id)}
              color="error"
              size="small"
            >
              <DeleteIcon />
            </IconButton>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}
