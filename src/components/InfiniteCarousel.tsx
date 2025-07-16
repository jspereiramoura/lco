import ArrowBackIos from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIos from "@mui/icons-material/ArrowForwardIos";
import { Box, CardMedia, IconButton } from "@mui/material";
import { useEffect, useState } from "react";

const InfiniteImageCarousel = ({
  items
}: {
  items: {
    title: string;
    id: string;
    content: string;
  }[];
}) => {
  const [index, setIndex] = useState(0);

  const handlePrev = () => {
    setIndex(prev => (prev - 1 + items.length) % items.length);
  };

  const handleNext = () => {
    setIndex(prev => (prev + 1) % items.length);
  };

  useEffect(() => {
    const interval = setInterval(handleNext, 5000);
    return () => clearInterval(interval);
  }, [handleNext]);

  return (
    <Box position="relative" overflow="hidden" borderRadius={2}>
      <Box
        display="flex"
        width={`${items.length * 100}%`}
        sx={{
          transform: `translateX(-${index * (100 / items.length)}%)`,
          transition: "transform 0.5s ease-in-out"
        }}
      >
        {items.map((item, i) => (
          <CardMedia
            component="img"
            image={item.content}
            alt={item.title}
            sx={{
              opacity: index === i ? 1 : 0.5,
              maxWidth: `calc(100% / ${items.length})`,
              transition: "opacity 0.5s ease"
            }}
            key={item.id}
          />
        ))}
      </Box>

      <IconButton
        onClick={handlePrev}
        sx={{
          position: "absolute",
          top: "50%",
          left: 0,
          transform: "translateY(-50%)"
        }}
      >
        <ArrowBackIos />
      </IconButton>

      <IconButton
        onClick={handleNext}
        sx={{
          position: "absolute",
          top: "50%",
          right: 0,
          transform: "translateY(-50%)"
        }}
      >
        <ArrowForwardIos />
      </IconButton>
    </Box>
  );
};

export default InfiniteImageCarousel;
