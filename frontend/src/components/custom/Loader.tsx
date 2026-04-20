import React from "react";
import { Box } from "@mui/material";
import { keyframes } from "@mui/system";

interface LoaderProps {
  size?: number;
  borderColor?: string;
  centerColor?: string;
  speed?: number;
}

const rotate = keyframes`
from { transform: translateY(-100%) rotate(0deg); }
to { transform: translateY(-100%) rotate(360deg); }
`;

const pulse = keyframes`
0% { transform: scale(1); opacity: .6 }
70% { transform: scale(1.4); opacity: 0 }
100% { transform: scale(1.4); opacity: 0 }
`;

const Loader: React.FC<LoaderProps> = ({
  size = 120,
  borderColor = "#2c3e50",
  centerColor = "#3f51b5",
  speed = 1,
}) => {
  return (
    <Box
      sx={{
        position: "relative",
        width: size,
        height: size,
        margin: "60px auto",
      }}
    >
      {/* Pulse rings */}
      {[0, 1].map((i) => (
        <Box
          key={i}
          sx={{
            position: "absolute",
            inset: 0,
            borderRadius: "50%",
            border: `2px solid ${centerColor}`,
            animation: `${pulse} ${2.5}s ${i * 1.2}s infinite`,
          }}
        />
      ))}

      {/* Watch */}
      <Box
        sx={{
          position: "relative",
          width: "100%",
          height: "100%",
          border: `4px solid ${borderColor}`,
          borderRadius: "50%",
          background: "#fff",
          boxShadow: "0 6px 18px rgba(0,0,0,0.08)",
        }}
      >
        {/* center */}
        <Box
          sx={{
            width: 10,
            height: 10,
            bgcolor: centerColor,
            borderRadius: "50%",
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        />

        {/* minute hand */}
        <Box
          sx={{
            position: "absolute",
            width: 4,
            height: size * 0.4,
            bgcolor: "#34495e",
            top: "50%",
            left: "50%",
            transformOrigin: "bottom center",
            transform: "translateY(-100%)",
            borderRadius: 2,
            animation: `${rotate} ${4 / speed}s linear infinite`,
          }}
        />

        {/* hour hand */}
        <Box
          sx={{
            position: "absolute",
            width: 4,
            height: size * 0.28,
            bgcolor: "#34495e",
            top: "50%",
            left: "50%",
            transformOrigin: "bottom center",
            transform: "translateY(-100%)",
            borderRadius: 2,
            animation: `${rotate} ${16 / speed}s linear infinite`,
          }}
        />
      </Box>
    </Box>
  );
};

export default Loader;