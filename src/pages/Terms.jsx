import React from "react";
import { Box, Container, Typography, Button, alpha } from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import "../styles/new-landing.css";

const Terms = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #0f0f23 0%, #1a1a2e 25%, #16213e 50%, #0f3460 75%, #533483 100%)",
        color: "white",
        pt: { xs: 10, md: 12 },
        pb: 6,
      }}
    >
      <Container maxWidth="md">
        <Button
          startIcon={<ArrowBack />}
          onClick={() => navigate(-1)}
          sx={{
            mb: 4,
            color: "rgba(255, 255, 255, 0.7)",
            "&:hover": {
              color: "#4facfe",
              background: alpha("#4facfe", 0.1),
            },
          }}
        >
          Back
        </Button>

        <Typography
          variant="h3"
          sx={{
            fontWeight: 900,
            mb: 4,
            background: "linear-gradient(135deg, #ffffff 0%, #a8edea 50%, #fed6e3 100%)",
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Terms of Service
        </Typography>

        <Box
          sx={{
            background: `linear-gradient(135deg, ${alpha("#ffffff", 0.1)}, ${alpha("#ffffff", 0.05)})`,
            backdropFilter: "blur(20px)",
            border: `1px solid ${alpha("#ffffff", 0.2)}`,
            borderRadius: 4,
            p: 4,
          }}
        >
          <Typography variant="body1" sx={{ mb: 3, lineHeight: 1.8, color: "rgba(255, 255, 255, 0.9)" }}>
            <strong>Last Updated:</strong> {new Date().toLocaleDateString()}
          </Typography>

          <Typography variant="h6" sx={{ mb: 2, mt: 4, color: "#4facfe", fontWeight: 600 }}>
            1. Acceptance of Terms
          </Typography>
          <Typography variant="body1" sx={{ mb: 3, lineHeight: 1.8, color: "rgba(255, 255, 255, 0.8)" }}>
            By accessing and using FitSpine, you accept and agree to be bound by the terms and provision of this agreement.
          </Typography>

          <Typography variant="h6" sx={{ mb: 2, mt: 4, color: "#4facfe", fontWeight: 600 }}>
            2. Use License
          </Typography>
          <Typography variant="body1" sx={{ mb: 3, lineHeight: 1.8, color: "rgba(255, 255, 255, 0.8)" }}>
            Permission is granted to temporarily use FitSpine for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title.
          </Typography>

          <Typography variant="h6" sx={{ mb: 2, mt: 4, color: "#4facfe", fontWeight: 600 }}>
            3. Medical Disclaimer
          </Typography>
          <Typography variant="body1" sx={{ mb: 3, lineHeight: 1.8, color: "rgba(255, 255, 255, 0.8)" }}>
            FitSpine provides insights and recommendations based on your data but does not replace professional medical advice. Always consult with your healthcare provider for medical decisions. The information provided is for informational purposes only and is not intended as medical advice, diagnosis, or treatment.
          </Typography>

          <Typography variant="h6" sx={{ mb: 2, mt: 4, color: "#4facfe", fontWeight: 600 }}>
            4. User Account
          </Typography>
          <Typography variant="body1" sx={{ mb: 3, lineHeight: 1.8, color: "rgba(255, 255, 255, 0.8)" }}>
            You are responsible for maintaining the confidentiality of your account and password. You agree to accept responsibility for all activities that occur under your account.
          </Typography>

          <Typography variant="h6" sx={{ mb: 2, mt: 4, color: "#4facfe", fontWeight: 600 }}>
            5. Data and Privacy
          </Typography>
          <Typography variant="body1" sx={{ mb: 3, lineHeight: 1.8, color: "rgba(255, 255, 255, 0.8)" }}>
            Your use of FitSpine is also governed by our Privacy Policy. Please review our Privacy Policy to understand our practices regarding the collection and use of your data.
          </Typography>

          <Typography variant="h6" sx={{ mb: 2, mt: 4, color: "#4facfe", fontWeight: 600 }}>
            6. Limitation of Liability
          </Typography>
          <Typography variant="body1" sx={{ mb: 3, lineHeight: 1.8, color: "rgba(255, 255, 255, 0.8)" }}>
            In no event shall FitSpine or its suppliers be liable for any damages arising out of the use or inability to use FitSpine, even if FitSpine has been notified of the possibility of such damage.
          </Typography>

          <Typography variant="h6" sx={{ mb: 2, mt: 4, color: "#4facfe", fontWeight: 600 }}>
            7. Changes to Terms
          </Typography>
          <Typography variant="body1" sx={{ mb: 3, lineHeight: 1.8, color: "rgba(255, 255, 255, 0.8)" }}>
            FitSpine reserves the right to revise these terms at any time without notice. By using this service, you are agreeing to be bound by the then current version of these Terms of Service.
          </Typography>

          <Typography variant="h6" sx={{ mb: 2, mt: 4, color: "#4facfe", fontWeight: 600 }}>
            8. Contact Information
          </Typography>
          <Typography variant="body1" sx={{ mb: 3, lineHeight: 1.8, color: "rgba(255, 255, 255, 0.8)" }}>
            If you have any questions about these Terms of Service, please contact us through the feedback form on our website.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Terms;
