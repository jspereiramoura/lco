import {
  Alert,
  Box,
  Card,
  CardMedia,
  CircularProgress,
  Grid,
  Typography
} from "@mui/material";
import { useParams } from "react-router";
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
            <CardMedia
              component="img"
              image={product.images[0]}
              alt={product.title}
              sx={{ width: "100%", height: "auto" }}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <Typography variant="h4" component="h1" gutterBottom>
              {product.title}
            </Typography>
            <Typography variant="h5" color="primary" gutterBottom>
              R$ {product.price.toFixed(2)}
            </Typography>
            <Typography variant="body1">{product.description}</Typography>
            <Typography variant="subtitle2" color="text.secondary">
              Category: {product.category.name}
            </Typography>
          </Grid>
        </Grid>
      </Card>
    </Section>
  );
};

export default ProductDetailPage;
