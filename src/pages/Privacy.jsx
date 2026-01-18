import React from "react";
import { Box, Container, Typography, Button, alpha } from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import "../styles/new-landing.css";

const Privacy = () => {
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
          Privacy Policy
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
            1. Information We Collect
          </Typography>
          <Typography variant="body1" sx={{ mb: 3, lineHeight: 1.8, color: "rgba(255, 255, 255, 0.8)" }}>
            We collect information that you provide directly to us, including your name, email address, health data, activity logs, and any other information you choose to provide. We also collect data from connected wearable devices (such as Fitbit) with your permission.
          </Typography>

          <Typography variant="h6" sx={{ mb: 2, mt: 4, color: "#4facfe", fontWeight: 600 }}>
            2. How We Use Your Information
          </Typography>
          <Typography variant="body1" sx={{ mb: 3, lineHeight: 1.8, color: "rgba(255, 255, 255, 0.8)" }}>
            We use the information we collect to provide, maintain, and improve our services, generate personalized insights, communicate with you, and ensure the security of our platform.
          </Typography>

          <Typography variant="h6" sx={{ mb: 2, mt: 4, color: "#4facfe", fontWeight: 600 }}>
            3. Data Storage and Security
          </Typography>
          <Typography variant="body1" sx={{ mb: 3, lineHeight: 1.8, color: "rgba(255, 255, 255, 0.8)" }}>
            We implement appropriate technical and organizational measures to protect your personal information. However, no method of transmission over the Internet is 100% secure, and we cannot guarantee absolute security.
          </Typography>

          <Typography variant="h6" sx={{ mb: 2, mt: 4, color: "#4facfe", fontWeight: 600 }}>
            4. Sharing Your Information
          </Typography>
          <Typography variant="body1" sx={{ mb: 3, lineHeight: 1.8, color: "rgba(255, 255, 255, 0.8)" }}>
            We do not sell your personal information. We may share your information only in limited circumstances, such as with your consent, to comply with legal obligations, or to protect our rights and safety.
          </Typography>

          <Typography variant="h6" sx={{ mb: 2, mt: 4, color: "#4facfe", fontWeight: 600 }}>
            5. Your Rights
          </Typography>
          <Typography variant="body1" sx={{ mb: 3, lineHeight: 1.8, color: "rgba(255, 255, 255, 0.8)" }}>
            You have the right to access, update, or delete your personal information at any time through your account settings. You may also opt out of certain data collection practices.
          </Typography>

          <Typography variant="h6" sx={{ mb: 2, mt: 4, color: "#4facfe", fontWeight: 600 }}>
            6. Cookies and Tracking
          </Typography>
          <Typography variant="body1" sx={{ mb: 3, lineHeight: 1.8, color: "rgba(255, 255, 255, 0.8)" }}>
            We use cookies and similar tracking technologies to track activity on our service and hold certain information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.
          </Typography>

          <Typography variant="h6" sx={{ mb: 2, mt: 4, color: "#4facfe", fontWeight: 600 }}>
            7. Third-Party Services
          </Typography>
          <Typography variant="body1" sx={{ mb: 3, lineHeight: 1.8, color: "rgba(255, 255, 255, 0.8)" }}>
            Our service may contain links to third-party websites or services. We are not responsible for the privacy practices of these third parties. We encourage you to read their privacy policies.
          </Typography>

          <Typography variant="h6" sx={{ mb: 2, mt: 4, color: "#4facfe", fontWeight: 600 }}>
            8. Children's Privacy
          </Typography>
          <Typography variant="body1" sx={{ mb: 3, lineHeight: 1.8, color: "rgba(255, 255, 255, 0.8)" }}>
            Our service is not intended for children under the age of 13. We do not knowingly collect personal information from children under 13.
          </Typography>

          <Typography variant="h6" sx={{ mb: 2, mt: 4, color: "#4facfe", fontWeight: 600 }}>
            9. Changes to This Policy
          </Typography>
          <Typography variant="body1" sx={{ mb: 3, lineHeight: 1.8, color: "rgba(255, 255, 255, 0.8)" }}>
            We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date.
          </Typography>

          <Typography variant="h6" sx={{ mb: 2, mt: 4, color: "#4facfe", fontWeight: 600 }}>
            10. Contact Us
          </Typography>
          <Typography variant="body1" sx={{ mb: 3, lineHeight: 1.8, color: "rgba(255, 255, 255, 0.8)" }}>
            If you have any questions about this Privacy Policy, please contact us through the feedback form on our website.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Privacy;
