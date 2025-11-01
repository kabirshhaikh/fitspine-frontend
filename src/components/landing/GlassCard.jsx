import React from "react";
import { Card } from "@mui/material";
import "../../styles/landing.css";

const GlassCard = ({
  children,
  className = "",
  hoverColor = "rgba(79, 195, 247, 0.4)",
  borderHoverColor = "rgba(79, 195, 247, 0.3)",
  sx = {},
  ...props
}) => {
  return (
    <Card
      className={`glass-card-base ${className}`}
      sx={{
        background: "rgba(255, 255, 255, 0.05)",
        backdropFilter: "blur(20px)",
        border: "1px solid rgba(255, 255, 255, 0.1)",
        borderRadius: "20px",
        boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        position: "relative",
        overflow: "hidden",
        transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
        "&:hover": {
          transform: "translateY(-8px) scale(1.02)",
          boxShadow: `0 20px 60px ${hoverColor}`,
          border: `1px solid ${borderHoverColor}`,
        },
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "1px",
          background:
            "linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent)",
        },
        ...sx,
      }}
      {...props}
    >
      {children}
    </Card>
  );
};

export default GlassCard;

