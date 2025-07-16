import { Box, CircularProgress, Typography } from "@mui/material";
import { forwardRef } from "react";

interface InfiniteScrollTriggerProps {
  loading: boolean;
  hasMore: boolean;
}

const InfiniteScrollTrigger = forwardRef<
  HTMLDivElement,
  InfiniteScrollTriggerProps
>(({ loading, hasMore }, ref) => {
  if (!hasMore) {
    return (
      <Box
        ref={ref}
        display="flex"
        justifyContent="center"
        alignItems="center"
        mt={4}
        p={2}
      >
        <Typography variant="body2" color="text.secondary">
          No more products to load
        </Typography>
      </Box>
    );
  }

  if (loading) {
    return (
      <Box
        ref={ref}
        display="flex"
        justifyContent="center"
        alignItems="center"
        mt={4}
        p={2}
      >
        <CircularProgress size={24} />
        <Typography variant="body2" color="text.secondary" ml={2}>
          Loading more products...
        </Typography>
      </Box>
    );
  }

  return <div ref={ref} style={{ height: 1 }} />;
});

InfiniteScrollTrigger.displayName = "InfiniteScrollTrigger";

export default InfiniteScrollTrigger;
