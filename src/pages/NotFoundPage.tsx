import { Box, Typography, Button, Container } from "@mui/material";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { useNavigate } from "react-router";
import notFoundSvg from "../assets/404.svg";
import Header from "../components/Header";
import { appTheme } from "../utils/theme";

function NotFoundPage() {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate("/");
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <ThemeProvider theme={appTheme}>
      <CssBaseline />
      <Header />
      <Container maxWidth="sm">
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          minHeight="80vh"
          textAlign="center"
          gap={3}
        >
          <img
            src={notFoundSvg}
            alt="Page not found"
            style={{ width: 200, height: 200 }}
          />
          <Typography variant="h4" color="primary" gutterBottom>
            Page not found
          </Typography>
          <Typography variant="body1" color="text.secondary" gutterBottom>
            The page you are looking for does not exist or has been moved.
          </Typography>
          <Box display="flex" gap={2} flexWrap="wrap" justifyContent="center">
            <Button
              variant="contained"
              color="primary"
              onClick={handleGoHome}
              size="large"
            >
              Go to Home
            </Button>
            <Button
              variant="outlined"
              color="primary"
              onClick={handleGoBack}
              size="large"
            >
              Go Back
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default NotFoundPage;
