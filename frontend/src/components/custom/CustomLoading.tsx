import React from "react";
import { Box, Typography } from "@mui/material";

type LoaderSize = "sm" | "md" | "lg" | "xl";

interface CustomLoadingProps {
  size?: LoaderSize;
  text?: string;
}

const sizeMap: Record<LoaderSize, number> = {
  sm: 24,
  md: 40,
  lg: 64,
  xl: 96,
};

const CustomLoading: React.FC<CustomLoadingProps> = ({
  size = "md",
  text = "Loading...",
}) => {
  const dimension = sizeMap[size];

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        p: 2,
      }}
    >
      <Box
        sx={{
          position: "relative",
          width: dimension,
          height: dimension,
        }}
      >
        {/* Spinner */}
        <Box
          sx={{
            width: "100%",
            height: "100%",
            borderRadius: "50%",
            border: "4px solid",
            borderColor: "primary.main",
            borderTopColor: "transparent",
            animation: "spin 1s linear infinite",
            "@keyframes spin": {
              from: { transform: "rotate(0deg)" },
              to: { transform: "rotate(360deg)" },
            },
          }}
        />

        {/* Inner circle */}
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Box
            sx={{
              width: "60%",
              height: "60%",
              borderRadius: "50%",
              backgroundColor: "rgba(255,255,255,0.3)",
            }}
          />
        </Box>
      </Box>

      {text && (
        <Typography
          sx={{
            mt: 2,
            color: "text.secondary",
            fontWeight: 500,
          }}
        >
          {text}
        </Typography>
      )}
    </Box>
  );
};

{/* import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Button from '@mui/material/Button';

export default function SimpleBackdrop() {
  const [open, setOpen] = React.useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <div>
      <Button onClick={handleOpen}>Show backdrop</Button>
      <Backdrop
        sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
        open={open}
        onClick={handleClose}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
} */}

export default CustomLoading;