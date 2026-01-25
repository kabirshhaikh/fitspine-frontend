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
        background: `
          radial-gradient(circle at 20% 50%, rgba(120, 119, 198, 0.3) 0%, transparent 50%),
          radial-gradient(circle at 80% 20%, rgba(255, 119, 198, 0.3) 0%, transparent 50%),
          radial-gradient(circle at 40% 80%, rgba(120, 219, 255, 0.3) 0%, transparent 50%),
          linear-gradient(135deg, #0f0f23 0%, #1a1a2e 25%, #16213e 50%, #0f3460 75%, #533483 100%)
        `,
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      {/* Animated Background Particles */}
      <Box
        sx={{
          position: 'absolute',
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
          backgroundRepeat: 'repeat',
          backgroundSize: '200px 200px',
          animation: 'sparkle 20s linear infinite',
          zIndex: 1,
        }}
      />
      
      {/* Floating Orbs */}
      <Box
        sx={{
          position: 'absolute',
          top: '10%',
          left: '10%',
          width: 300,
          height: 300,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(120, 119, 198, 0.1) 0%, transparent 70%)',
          animation: 'float 15s ease-in-out infinite',
          filter: 'blur(1px)',
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          bottom: '20%',
          right: '15%',
          width: 200,
          height: 200,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255, 119, 198, 0.1) 0%, transparent 70%)',
          animation: 'float 12s ease-in-out infinite reverse',
          filter: 'blur(1px)',
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          top: '60%',
          left: '70%',
          width: 150,
          height: 150,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(120, 219, 255, 0.1) 0%, transparent 70%)',
          animation: 'float 18s ease-in-out infinite',
          filter: 'blur(1px)',
        }}
      />
      
      <Navbar />
      <Toolbar />
      <Container 
        maxWidth="lg" 
        sx={{ 
          py: { xs: 0, sm: 2, md: 3 },
          pt: { xs: 0, sm: 2, md: 3 },
          position: 'relative',
          zIndex: 2,
        }}
      >
        {children}
      </Container>
    </Box>
  );
}
