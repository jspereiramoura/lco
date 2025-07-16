import {
  Alert,
  Box,
  Card,
  CircularProgress,
  Grid,
  Typography
} from "@mui/material";
import { useParams } from "react-router";
import AddToCartButton from "./CartPage/components/AddToCartButton";
import InfiniteImageCarousel from "../components/InfiniteCarousel";
import Section from "../components/Section";
import { useFetch } from "../hooks/useFetch";
import { getProductById } from "../services/productService";

const ProductDetailPage = () => {
  const { id } = useParams<{ id: string }>();

  const { data: product, loading, error } = useFetch(getProductById, id);

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return <Alert severity="error">{error}</Alert>;
  }

  if (!product) {
    return <Alert severity="warning">No product to display.</Alert>;
  }

  return (
    <Section
      title="Product Details"
      backPath={`/categories/${product.category.id}/products`}
      backTo={`${product.category.name} Store`}
    >
      <Card sx={{ mt: 2, p: 2 }}>
        <Grid container spacing={4}>
          <Grid size={{ xs: 12, md: 6 }}>
            <InfiniteImageCarousel
              items={product.images.map((image, index) => ({
                id: index.toString(),
                title: product.title,
                content: image
              }))}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <Typography variant="h4" component="h1" gutterBottom>
              {product.title}
            </Typography>
            <Typography variant="h5" color="primary" gutterBottom>
              R$ {product.price.toFixed(2)}
            </Typography>
            <Typography variant="body1" sx={{ mb: 2 }}>
              {product.description}
            </Typography>
            <Typography
              variant="subtitle2"
              color="text.secondary"
              sx={{ mb: 2 }}
            >
              Category: {product.category.name}
            </Typography>
            <Box sx={{ mt: 2 }}>
              <AddToCartButton product={product} size="large" fullWidth />
            </Box>
          </Grid>
        </Grid>
      </Card>
    </Section>
  );
};

export default ProductDetailPage;
