import React from "react";
import { Box } from "@mui/material";
import "../../styles/animations.css";

const FloatingOrbs = () => {
  return (
    <>
      {/* Floating Orb 1 */}
      <Box
        sx={{
          position: "absolute",
          top: { xs: "5%", md: "10%" },
          left: { xs: "5%", md: "10%" },
          width: { xs: 150, md: 300 },
          height: { xs: 150, md: 300 },
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(120, 119, 198, 0.1) 0%, transparent 70%)",
          animation: "float 15s ease-in-out infinite",
          filter: "blur(1px)",
          zIndex: 1,
        }}
      />

      {/* Floating Orb 2 */}
      <Box
        sx={{
          position: "absolute",
          bottom: { xs: "10%", md: "20%" },
          right: { xs: "10%", md: "15%" },
          width: { xs: 100, md: 200 },
          height: { xs: 100, md: 200 },
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(255, 119, 198, 0.1) 0%, transparent 70%)",
          animation: "float 12s ease-in-out infinite reverse",
          filter: "blur(1px)",
          zIndex: 1,
        }}
      />

      {/* Floating Orb 3 */}
      <Box
        sx={{
          position: "absolute",
          top: { xs: "50%", md: "60%" },
          left: { xs: "65%", md: "70%" },
          width: { xs: 75, md: 150 },
          height: { xs: 75, md: 150 },
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(120, 219, 255, 0.1) 0%, transparent 70%)",
          animation: "float 18s ease-in-out infinite",
          filter: "blur(1px)",
          zIndex: 1,
        }}
      />
    </>
  );
};

export default FloatingOrbs;

