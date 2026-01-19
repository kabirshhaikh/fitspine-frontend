import React, { useEffect } from "react";
import { Box, Container, Typography, Button, alpha } from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import "../styles/new-landing.css";

const Privacy = () => {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #0f0f23 0%, #1a1a2e 25%, #16213e 50%, #0f3460 75%, #533483 100%)",
        color: "white",
        pt: { xs: 10, md: 12 },
        pb: 6,
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
      }}
    >
      <Container maxWidth="md" sx={{ width: "100%" }}>
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
            <strong>Version:</strong> v1.0 | <strong>Last Updated:</strong> {new Date().toLocaleDateString()}
          </Typography>

          <Typography variant="body1" sx={{ mb: 4, lineHeight: 1.8, color: "rgba(255, 255, 255, 0.9)" }}>
            Sphinic ("Sphinic," "we," "our," or "us") respects your privacy. This Privacy Policy explains how we collect, use, disclose, and protect your information when you use our website, applications, and services (collectively, the "Service").
          </Typography>

          <Typography variant="body1" sx={{ mb: 4, lineHeight: 1.8, color: "rgba(255, 255, 255, 0.9)" }}>
            By using Sphinic, you agree to the practices described in this Privacy Policy.
          </Typography>

          <Typography variant="h6" sx={{ mb: 2, mt: 4, color: "#4facfe", fontWeight: 600 }}>
            1. Information We Collect
          </Typography>
          <Typography variant="body1" sx={{ mb: 2, lineHeight: 1.8, color: "rgba(255, 255, 255, 0.8)" }}>
            We may collect the following categories of information:
          </Typography>
          
          <Typography variant="body1" sx={{ mb: 1, mt: 2, lineHeight: 1.8, color: "rgba(255, 255, 255, 0.8)", fontWeight: 500 }}>
            a. Information You Provide
          </Typography>
          <Box component="ul" sx={{ mb: 2, pl: 3, color: "rgba(255, 255, 255, 0.8)" }}>
            <li>Account information (such as email address)</li>
            <li>User-entered wellness or activity data</li>
            <li>Feedback, messages, or support requests</li>
          </Box>

          <Typography variant="body1" sx={{ mb: 1, mt: 2, lineHeight: 1.8, color: "rgba(255, 255, 255, 0.8)", fontWeight: 500 }}>
            b. Automatically Collected Information
          </Typography>
          <Box component="ul" sx={{ mb: 2, pl: 3, color: "rgba(255, 255, 255, 0.8)" }}>
            <li>Device information (browser type, operating system)</li>
            <li>Usage data (pages visited, interactions, timestamps)</li>
            <li>Log data and basic analytics information</li>
          </Box>

          <Typography variant="body1" sx={{ mb: 3, lineHeight: 1.8, color: "rgba(255, 255, 255, 0.8)" }}>
            We do not knowingly collect sensitive personal data such as government identifiers or payment information unless explicitly stated.
          </Typography>

          <Typography variant="h6" sx={{ mb: 2, mt: 4, color: "#4facfe", fontWeight: 600 }}>
            2. How We Use Your Information
          </Typography>
          <Typography variant="body1" sx={{ mb: 1, lineHeight: 1.8, color: "rgba(255, 255, 255, 0.8)" }}>
            We use your information to:
          </Typography>
          <Box component="ul" sx={{ mb: 2, pl: 3, color: "rgba(255, 255, 255, 0.8)" }}>
            <li>Provide and operate the Service</li>
            <li>Analyze data to generate informational insights and patterns</li>
            <li>Improve functionality, performance, and user experience</li>
            <li>Respond to support requests</li>
            <li>Maintain security and prevent misuse</li>
          </Box>
          <Typography variant="body1" sx={{ mb: 3, lineHeight: 1.8, color: "rgba(255, 255, 255, 0.8)" }}>
            Sphinic does not use your data to provide medical advice, diagnosis, or treatment.
          </Typography>

          <Typography variant="h6" sx={{ mb: 2, mt: 4, color: "#4facfe", fontWeight: 600 }}>
            3. Use of Artificial Intelligence
          </Typography>
          <Typography variant="body1" sx={{ mb: 2, lineHeight: 1.8, color: "rgba(255, 255, 255, 0.8)" }}>
            Sphinic uses automated systems and artificial intelligence technologies to analyze user-provided data and generate insights.
          </Typography>
          <Typography variant="body1" sx={{ mb: 1, lineHeight: 1.8, color: "rgba(255, 255, 255, 0.8)" }}>
            This means:
          </Typography>
          <Box component="ul" sx={{ mb: 3, pl: 3, color: "rgba(255, 255, 255, 0.8)" }}>
            <li>Your data may be processed by algorithmic and AI-based systems</li>
            <li>We may use trusted third-party AI service providers to support analysis</li>
            <li>AI systems are used solely to generate informational insights and analytics</li>
            <li>AI-generated outputs are probabilistic and may not always be accurate or complete.</li>
          </Box>

          <Typography variant="h6" sx={{ mb: 2, mt: 4, color: "#4facfe", fontWeight: 600 }}>
            4. Data Sharing and Disclosure
          </Typography>
          <Typography variant="body1" sx={{ mb: 1, lineHeight: 1.8, color: "rgba(255, 255, 255, 0.8)" }}>
            We may share your information only in the following circumstances:
          </Typography>
          <Box component="ul" sx={{ mb: 2, pl: 3, color: "rgba(255, 255, 255, 0.8)" }}>
            <li>With trusted third-party service providers (including cloud infrastructure and AI providers) solely to operate and support the Service</li>
            <li>When required by law, regulation, or legal process</li>
            <li>To protect the rights, safety, or security of Sphinic, our users, or others</li>
          </Box>
          <Typography variant="body1" sx={{ mb: 3, lineHeight: 1.8, color: "rgba(255, 255, 255, 0.8)" }}>
            We do not sell your personal data.
          </Typography>

          <Typography variant="h6" sx={{ mb: 2, mt: 4, color: "#4facfe", fontWeight: 600 }}>
            5. Data Retention
          </Typography>
          <Typography variant="body1" sx={{ mb: 1, lineHeight: 1.8, color: "rgba(255, 255, 255, 0.8)" }}>
            We retain personal data only for as long as necessary to:
          </Typography>
          <Box component="ul" sx={{ mb: 2, pl: 3, color: "rgba(255, 255, 255, 0.8)" }}>
            <li>Provide the Service</li>
            <li>Comply with legal obligations</li>
            <li>Resolve disputes</li>
            <li>Enforce our agreements</li>
          </Box>
          <Typography variant="body1" sx={{ mb: 3, lineHeight: 1.8, color: "rgba(255, 255, 255, 0.8)" }}>
            You may request deletion of your data, subject to legal and operational requirements.
          </Typography>

          <Typography variant="h6" sx={{ mb: 2, mt: 4, color: "#4facfe", fontWeight: 600 }}>
            6. Data Security
          </Typography>
          <Typography variant="body1" sx={{ mb: 2, lineHeight: 1.8, color: "rgba(255, 255, 255, 0.8)" }}>
            We use reasonable administrative, technical, and organizational measures to protect your information.
          </Typography>
          <Typography variant="body1" sx={{ mb: 3, lineHeight: 1.8, color: "rgba(255, 255, 255, 0.8)" }}>
            However, no system is completely secure, and we cannot guarantee absolute security of your data.
          </Typography>

          <Typography variant="h6" sx={{ mb: 2, mt: 4, color: "#4facfe", fontWeight: 600 }}>
            7. Your Rights and Choices
          </Typography>
          <Typography variant="body1" sx={{ mb: 1, lineHeight: 1.8, color: "rgba(255, 255, 255, 0.8)" }}>
            Depending on your location, you may have the right to:
          </Typography>
          <Box component="ul" sx={{ mb: 2, pl: 3, color: "rgba(255, 255, 255, 0.8)" }}>
            <li>Access the personal data we hold about you</li>
            <li>Request correction or deletion of your data</li>
            <li>Object to or restrict certain processing activities</li>
          </Box>
          <Typography variant="body1" sx={{ mb: 2, lineHeight: 1.8, color: "rgba(255, 255, 255, 0.8)" }}>
            Requests can be made by contacting us at{" "}
            <Box component="span" sx={{ color: "#4facfe" }}>support@sphinic.com</Box>.
          </Typography>

          <Typography variant="h6" sx={{ mb: 2, mt: 4, color: "#4facfe", fontWeight: 600 }}>
            8. Children's Privacy
          </Typography>
          <Typography variant="body1" sx={{ mb: 3, lineHeight: 1.8, color: "rgba(255, 255, 255, 0.8)" }}>
            Sphinic is not intended for use by individuals under the age of 18. We do not knowingly collect personal data from children.
          </Typography>

          <Typography variant="h6" sx={{ mb: 2, mt: 4, color: "#4facfe", fontWeight: 600 }}>
            9. Third-Party Services
          </Typography>
          <Typography variant="body1" sx={{ mb: 2, lineHeight: 1.8, color: "rgba(255, 255, 255, 0.8)" }}>
            The Service may rely on third-party services (such as hosting providers, analytics tools, or AI providers). Their use of data is governed by their own privacy policies.
          </Typography>
          <Typography variant="body1" sx={{ mb: 3, lineHeight: 1.8, color: "rgba(255, 255, 255, 0.8)" }}>
            Sphinic is not responsible for third-party privacy practices.
          </Typography>

          <Typography variant="h6" sx={{ mb: 2, mt: 4, color: "#4facfe", fontWeight: 600 }}>
            10. Changes to This Privacy Policy
          </Typography>
          <Typography variant="body1" sx={{ mb: 2, lineHeight: 1.8, color: "rgba(255, 255, 255, 0.8)" }}>
            We may update this Privacy Policy from time to time. Changes will be reflected by updating the "Last Updated" date.
          </Typography>
          <Typography variant="body1" sx={{ mb: 3, lineHeight: 1.8, color: "rgba(255, 255, 255, 0.8)" }}>
            Continued use of the Service after changes constitutes acceptance of the updated Privacy Policy.
          </Typography>

          <Typography variant="h6" sx={{ mb: 2, mt: 4, color: "#4facfe", fontWeight: 600 }}>
            11. Contact Us
          </Typography>
          <Typography variant="body1" sx={{ mb: 2, lineHeight: 1.8, color: "rgba(255, 255, 255, 0.8)" }}>
            If you have questions about this Privacy Policy or our data practices, contact us at:
          </Typography>
          <Typography variant="body1" sx={{ mb: 3, lineHeight: 1.8, color: "#4facfe" }}>
            support@sphinic.com
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Privacy;
