// src/layout/DashboardLayout.jsx
import { Box, Container, Toolbar } from "@mui/material";
import Navbar from "../components/Navbar";

export default function DashboardLayout({ children }) {
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
      <Container maxWidth="lg" sx={{ py: 3 }}>
        {children}
      </Container>
    </Box>
  );
}
