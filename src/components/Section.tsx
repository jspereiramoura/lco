import ArrowBack from "@mui/icons-material/ArrowBack";
import { Box, Button, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router";

const Section = ({
  title,
  children,
  backPath = "/",
  backTo = "Home",
  mustShowBackButton = true
}: {
  title: string;
  backTo?: string;
  backPath?: string;
  children?: React.ReactNode;
  mustShowBackButton?: boolean;
}) => {
  return (
    <Box component="section">
      <Box
        component="header"
        sx={{
          display: "flex",
          marginBottom: { xs: "1rem", sm: "2rem" },
          justifyContent: "space-between"
        }}
      >
        <Typography
          color="primary"
          variant="h4"
          component="h1"
          fontSize={{ xs: "1.4rem", sm: "2rem", md: "2.5rem" }}
        >
          {title}
        </Typography>

        {mustShowBackButton && (
          <Box display="flex" alignItems="center">
            <Button
              component={RouterLink}
              to={backPath}
              sx={{
                gap: 1,
                display: "flex",
                fontSize: { xs: "0.6rem", sm: "1rem", md: "1.2rem" }
              }}
              color="primary"
            >
              <ArrowBack fontSize="small" sx={{ marginRight: 0 }} />
              <Typography
                color="primary"
                variant="body2"
                sx={{ display: { xs: "none", sm: "block" } }}
              >
                Back to {backTo}
              </Typography>
            </Button>
          </Box>
        )}
      </Box>

      {children}
    </Box>
  );
};

export default Section;
