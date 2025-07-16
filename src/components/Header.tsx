import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import {
  AppBar,
  Badge,
  Box,
  Container,
  IconButton,
  Toolbar
} from "@mui/material";
import { Link } from "react-router";
import Logo from "../assets/Logo";
import { useAppSelector } from "../hooks/redux";
import { selectCartItemCount } from "../store/slices/cartSlice";

export default function Header() {
  const itemCount = useAppSelector(selectCartItemCount);

  return (
    <AppBar position="static">
      <Container maxWidth="lg">
        <Toolbar>
          <Box
            to="/"
            component={Link}
            sx={{
              flexGrow: 1
            }}
            aria-label="Go to Home"
          >
            <Logo />
          </Box>
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
