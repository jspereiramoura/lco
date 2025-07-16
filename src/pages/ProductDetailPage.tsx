import { Alert, Box, Card, Grid, Typography } from "@mui/material";
import { useEffect } from "react";
import { useParams } from "react-router";
import InfiniteImageCarousel from "../components/InfiniteCarousel";
import Section from "../components/Section";
import { useAppDispatch } from "../hooks/redux";
import { useFetch } from "../hooks/useFetch";
import { getProductById } from "../services/productService";
import { hideLoader, showLoader } from "../store/slices/globalLoaderSlice";
import AddToCartButton from "./CartPage/components/AddToCartButton";

const ProductDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();

  const { data: product, loading, error } = useFetch(getProductById, id);

  useEffect(() => {
    if (loading) {
      dispatch(showLoader("Loading product details..."));
    } else {
      dispatch(hideLoader());
    }
  }, [loading, dispatch]);

  if (error) {
    return <Alert severity="error">{error}</Alert>;
  }

  if (loading) {
    return null;
  }

  if (!product) {
    return <Alert severity="warning">No product to display.</Alert>;
  }

  return (
    <>
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
    </>
  );
};

export default ProductDetailPage;
