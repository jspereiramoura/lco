import {
  Alert,
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  CircularProgress,
  Grid,
  Typography
} from "@mui/material";
import { Link, useLocation, useNavigate, useParams } from "react-router";
import Section from "../components/Section";
import InfiniteScrollTrigger from "../components/InfiniteScrollTrigger";
import AddToCartButton from "./CartPage/components/AddToCartButton";
import { useInfiniteScroll } from "../hooks/useInfiniteScroll";
import { useAutoInfiniteScroll } from "../hooks/useAutoInfiniteScroll";
import { getProductsByCategoryPaginated } from "../services/categoryService";

const ProductsByCategoryPage = () => {
  const navigate = useNavigate();
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

  const handleProductClick = (productId: number) => {
    navigate(`/products/${productId}`);
  };

  if (error) {
    return <Alert severity="error">Fail to load products: {error}</Alert>;
  }

  if (!products.length && !loading) {
    return <Alert severity="warning">No products to display.</Alert>;
  }

  return (
    <Section
      backPath="/"
      backTo="Categories"
      title={
        state?.categoryName ? `${state?.categoryName} Store` : "Product List"
      }
    >
      {loading && products.length === 0 && (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          minHeight="200px"
        >
          <CircularProgress />
        </Box>
      )}

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
