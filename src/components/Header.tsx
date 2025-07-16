import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Badge,
  Box,
  Container
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Link } from "react-router";
import { useAppSelector } from "../hooks/redux";
import { selectCartItemCount } from "../store/slices/cartSlice";

export default function Header() {
  const itemCount = useAppSelector(selectCartItemCount);

  return (
    <AppBar position="static">
      <Container maxWidth="lg">
        <Toolbar>
          <Typography
            variant="h6"
            to="/"
            component={Link}
            sx={{
              flexGrow: 1,
              textDecoration: "none",
              color: "inherit",
              "&:hover": { textDecoration: "underline" }
            }}
          >
            Challenge LOC Labs
          </Typography>

          <Box>
            <IconButton
              color="inherit"
              size="large"
              component={Link}
              to="/cart"
              aria-label={"Shopping Cart"}
            >
              <Badge badgeContent={itemCount} color="secondary">
                <ShoppingCartIcon />
              </Badge>
            </IconButton>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
