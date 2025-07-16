import {
  Alert,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Grid,
  Typography
} from "@mui/material";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import Section from "../components/Section";
import { useAppDispatch } from "../hooks/redux";
import { useFetch } from "../hooks/useFetch";
import { getCategories } from "../services/categoryService";
import { hideLoader, showLoader } from "../store/slices/globalLoaderSlice";

const CategoryPage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { data: categories, loading, error } = useFetch(getCategories);

  useEffect(() => {
    if (loading) {
      dispatch(showLoader("Loading categories..."));
    } else {
      dispatch(hideLoader());
    }
  }, [loading, dispatch]);

  const handleCategoryClick = (categoryId: number, categoryName: string) => {
    navigate(`/categories/${categoryId}/products`, {
      state: { categoryId, categoryName }
    });
  };

  if (loading) {
    return null;
  }

  if (error) {
    return <Alert severity="error">{error}</Alert>;
  }

  return (
    <Section title="Category Page" mustShowBackButton={false}>
      <Grid container spacing={2}>
        {categories!.map(category => (
          <Grid size={{ xs: 12, sm: 6, md: 4 }} key={category.id}>
            <Card>
              <CardActionArea
                sx={{
                  ":hover img": {
                    transform: "scale(1.2)",
                    transition: "transform 0.3s ease-in-out"
                  },
                  ":hover .category-name": { textDecoration: "underline" }
                }}
                onClick={() => handleCategoryClick(category.id, category.name)}
              >
                <CardMedia
                  component="img"
                  height="140"
                  image={category.image}
                  alt={category.name}
                />
                <CardContent
                  sx={{
                    zIndex: 1,
                    position: "relative",
                    background: "#fff"
                  }}
                >
                  <Typography
                    className="category-name"
                    variant="h6"
                    color="primary"
                  >
                    {category.name}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Section>
  );
};

export default CategoryPage;
