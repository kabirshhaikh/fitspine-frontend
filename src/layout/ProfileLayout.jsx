// src/layout/ProfileLayout.jsx
import { Box, Container, Toolbar } from "@mui/material";
import Navbar from "../components/Navbar";

export default function ProfileLayout({ children }) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        bgcolor: "background.default",
      }}
    >
      <Navbar />
      <Toolbar />
      {children}
    </Box>
  );
}
