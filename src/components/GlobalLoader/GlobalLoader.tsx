import React from "react";
import {
  Backdrop,
  CircularProgress,
  Box,
  Typography,
  useTheme
} from "@mui/material";

interface GlobalLoaderProps {
  isVisible: boolean;
  message?: string;
}

export const GlobalLoader: React.FC<GlobalLoaderProps> = ({
  isVisible,
  message = "Loading..."
}) => {
  const theme = useTheme();

  return (
    <Backdrop
      sx={{
        color: "#fff",
        zIndex: theme => theme.zIndex.drawer + 1,
        backgroundColor: "rgba(0, 0, 0, 0.5)"
      }}
      open={isVisible}
    >
      <Box display="flex" flexDirection="column" alignItems="center" gap={2}>
        <CircularProgress
          size={48}
          thickness={4}
          sx={{
            color: theme.palette.primary.main
          }}
        />
        <Typography
          variant="body1"
          color="white"
          fontWeight={500}
          textAlign="center"
        >
          {message}
        </Typography>
      </Box>
    </Backdrop>
  );
};
