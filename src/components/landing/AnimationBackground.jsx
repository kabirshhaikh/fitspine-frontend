import React from "react";
import { Box } from "@mui/material";
import "../../styles/animations.css";

const AnimationBackground = () => {
  return (
    <Box
      sx={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: `
          radial-gradient(2px 2px at 20px 30px, rgba(255,255,255,0.3), transparent),
          radial-gradient(2px 2px at 40px 70px, rgba(255,255,255,0.2), transparent),
          radial-gradient(1px 1px at 90px 40px, rgba(255,255,255,0.4), transparent),
          radial-gradient(1px 1px at 130px 80px, rgba(255,255,255,0.3), transparent),
          radial-gradient(2px 2px at 160px 30px, rgba(255,255,255,0.2), transparent)
        `,
        backgroundRepeat: "repeat",
        backgroundSize: { xs: "150px 150px", md: "200px 200px" },
        animation: "sparkle 20s linear infinite",
        zIndex: 1,
      }}
    />
  );
};

export default AnimationBackground;

