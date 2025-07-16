import {
  Alert,
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Grid,
  Typography
} from "@mui/material";
import { useEffect } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router";
import InfiniteScrollTrigger from "../components/InfiniteScrollTrigger";
import Section from "../components/Section";
import { useAppDispatch } from "../hooks/redux";
import { useAutoInfiniteScroll } from "../hooks/useAutoInfiniteScroll";
import { useInfiniteScroll } from "../hooks/useInfiniteScroll";
import { getProductsByCategoryPaginated } from "../services/categoryService";
import { hideLoader, showLoader } from "../store/slices/globalLoaderSlice";
import AddToCartButton from "./CartPage/components/AddToCartButton";

const ProductsByCategoryPage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { state } = useLocation();
  const { id: categoryId } = useParams<{ id: string }>();

  const {
    data: products,
    loading,
    error,
    hasMore,
    loadMore
  } = useInfiniteScroll((offset: number, limit: number) =>
    getProductsByCategoryPaginated(categoryId!, offset, limit)
  );

  const triggerRef = useAutoInfiniteScroll({
    loading,
    hasMore,
    onLoadMore: loadMore
  });

  useEffect(() => {
    if (loading && products.length === 0) {
      dispatch(showLoader("Loading products..."));
    } else {
      dispatch(hideLoader());
    }
  }, [loading, products.length, dispatch]);

  const handleProductClick = (productId: number) => {
    navigate(`/products/${productId}`);
  };

  if (error) {
    return <Alert severity="error">Fail to load products: {error}</Alert>;
  }

  if (!products.length && !loading) {
    return (
      <>
        <Alert severity="warning">No products to display.</Alert>
        <Button
          variant="contained"
          onClick={() => navigate("/")}
          sx={{ mt: 4 }}
          fullWidth
        >
          Go to Home
        </Button>
      </>
    );
  }

  return (
    <Section
      backPath="/"
      backTo="Categories"
      title={
        state?.categoryName ? `${state?.categoryName} Store` : "Product List"
      }
    >
      <Grid container spacing={4}>
        {products.map((product: Product) => (
          <Grid key={product.id} size={{ xs: 12, sm: 6, md: 4 }}>
            <Card
              sx={{ height: "100%", display: "flex", flexDirection: "column" }}
            >
              <CardActionArea
                sx={{
                  ":hover img": {
                    transform: "scale(1.2)",
                    transition: "transform 0.3s",
                    zIndex: 0
                  }
                }}
                onClick={() => handleProductClick(product.id)}
              >
                <CardMedia
                  component="img"
                  height="240"
                  image={product.images[0]}
                  alt={product.title}
                />
                <CardContent
                  sx={{
                    backgroundColor: "background.default",
                    zIndex: 1,
                    position: "relative"
                  }}
                >
                  <Typography gutterBottom variant="h6" component="div">
                    {product.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    R$ {product.price.toFixed(2)}
                  </Typography>
                </CardContent>
              </CardActionArea>
              <Box p={2} sx={{ marginTop: "auto" }}>
                <Box display="flex" gap={1}>
                  <Button
                    component={Link}
                    to={`/products/${product.id}`}
                    variant="outlined"
                    fullWidth
                    onClick={() => handleProductClick(product.id)}
                  >
                    Details
                  </Button>
                  <AddToCartButton
                    product={product}
                    variant="contained"
                    fullWidth
                  />
                </Box>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>

      <InfiniteScrollTrigger
        ref={triggerRef}
        loading={loading}
        hasMore={hasMore}
      />
    </Section>
  );
};

export default ProductsByCategoryPage;
