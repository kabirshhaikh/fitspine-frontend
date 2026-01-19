import React, { useEffect } from "react";
import { Box, Container, Typography, Button, alpha } from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import "../styles/new-landing.css";

const Terms = () => {
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
            <strong>Version:</strong> v1.0 | <strong>Last Updated:</strong> {new Date().toLocaleDateString()}
          </Typography>

          <Typography variant="body1" sx={{ mb: 4, lineHeight: 1.8, color: "rgba(255, 255, 255, 0.9)" }}>
            Welcome to Sphinic ("Sphinic," "we," "our," or "us"). These Terms and Conditions ("Terms") govern your access to and use of the Sphinic website, applications, and services (collectively, the "Service").
          </Typography>

          <Typography variant="body1" sx={{ mb: 4, lineHeight: 1.8, color: "rgba(255, 255, 255, 0.9)" }}>
            By accessing or using Sphinic, you agree to be bound by these Terms. If you do not agree, do not use the Service.
          </Typography>

          <Typography variant="h6" sx={{ mb: 2, mt: 4, color: "#4facfe", fontWeight: 600 }}>
            1. Description of the Service
          </Typography>
          <Typography variant="body1" sx={{ mb: 2, lineHeight: 1.8, color: "rgba(255, 255, 255, 0.8)" }}>
            Sphinic is a wellness and data-analysis platform designed to analyze user-provided information and generate informational insights, patterns, and trends related to wellness and physical activity data.
          </Typography>
          <Typography variant="body1" sx={{ mb: 3, lineHeight: 1.8, color: "rgba(255, 255, 255, 0.8)" }}>
            Sphinic is not a medical device, does not provide medical advice, and is not intended to diagnose, treat, cure, prevent, or manage any disease or medical condition.
          </Typography>

          <Typography variant="h6" sx={{ mb: 2, mt: 4, color: "#4facfe", fontWeight: 600 }}>
            2. No Medical Advice or Healthcare Services
          </Typography>
          <Typography variant="body1" sx={{ mb: 2, lineHeight: 1.8, color: "rgba(255, 255, 255, 0.8)" }}>
            The Service is provided for informational and educational purposes only.
          </Typography>
          <Typography variant="body1" sx={{ mb: 1, lineHeight: 1.8, color: "rgba(255, 255, 255, 0.8)" }}>
            Sphinic does not:
          </Typography>
          <Box component="ul" sx={{ mb: 2, pl: 3, color: "rgba(255, 255, 255, 0.8)" }}>
            <li>Provide medical advice</li>
            <li>Provide diagnoses</li>
            <li>Provide treatment recommendations</li>
            <li>Replace professional medical judgment</li>
          </Box>
          <Typography variant="body1" sx={{ mb: 1, lineHeight: 1.8, color: "rgba(255, 255, 255, 0.8)" }}>
            You acknowledge and agree that:
          </Typography>
          <Box component="ul" sx={{ mb: 3, pl: 3, color: "rgba(255, 255, 255, 0.8)" }}>
            <li>Any insights, outputs, or information provided by Sphinic are not medical or clinical advice</li>
            <li>You should always consult a qualified healthcare professional regarding any medical concerns or decisions</li>
            <li>You assume full responsibility for how you interpret and use any information provided by the Service</li>
          </Box>

          <Typography variant="h6" sx={{ mb: 2, mt: 4, color: "#4facfe", fontWeight: 600 }}>
            3. Use of Artificial Intelligence and Automated Processing
          </Typography>
          <Typography variant="body1" sx={{ mb: 2, lineHeight: 1.8, color: "rgba(255, 255, 255, 0.8)" }}>
            Sphinic uses automated systems and artificial intelligence technologies to analyze user-provided data and generate insights.
          </Typography>
          <Typography variant="body1" sx={{ mb: 1, lineHeight: 1.8, color: "rgba(255, 255, 255, 0.8)" }}>
            By using the Service, you acknowledge and agree that:
          </Typography>
          <Box component="ul" sx={{ mb: 3, pl: 3, color: "rgba(255, 255, 255, 0.8)" }}>
            <li>Your data may be processed by automated systems, including AI-based models</li>
            <li>Sphinic may use third-party AI service providers to support data analysis</li>
            <li>Data shared with AI systems is used solely to generate insights and analytics for the Service</li>
            <li>Sphinic does not represent or guarantee that AI-generated outputs are accurate, complete, or suitable for any specific purpose.</li>
          </Box>

          <Typography variant="h6" sx={{ mb: 2, mt: 4, color: "#4facfe", fontWeight: 600 }}>
            4. User Data and Consent
          </Typography>
          <Typography variant="body1" sx={{ mb: 1, lineHeight: 1.8, color: "rgba(255, 255, 255, 0.8)" }}>
            By using Sphinic, you grant us permission to:
          </Typography>
          <Box component="ul" sx={{ mb: 2, pl: 3, color: "rgba(255, 255, 255, 0.8)" }}>
            <li>Collect, process, and analyze the data you provide</li>
            <li>Use automated systems to generate insights from that data</li>
            <li>Share data with trusted third-party service providers, including AI providers, solely to operate and improve the Service</li>
          </Box>
          <Typography variant="body1" sx={{ mb: 1, lineHeight: 1.8, color: "rgba(255, 255, 255, 0.8)" }}>
            You acknowledge that:
          </Typography>
          <Box component="ul" sx={{ mb: 2, pl: 3, color: "rgba(255, 255, 255, 0.8)" }}>
            <li>AI-generated insights are probabilistic and may contain errors</li>
            <li>Outputs depend on the quality and completeness of the data you provide</li>
            <li>You remain solely responsible for decisions made based on the Service</li>
          </Box>
          <Typography variant="body1" sx={{ mb: 3, lineHeight: 1.8, color: "rgba(255, 255, 255, 0.8)" }}>
            For details on data handling, storage, and user rights, please review our Privacy Policy.
          </Typography>

          <Typography variant="h6" sx={{ mb: 2, mt: 4, color: "#4facfe", fontWeight: 600 }}>
            5. Accuracy and Reliability Disclaimer
          </Typography>
          <Typography variant="body1" sx={{ mb: 1, lineHeight: 1.8, color: "rgba(255, 255, 255, 0.8)" }}>
            Sphinic does not guarantee that:
          </Typography>
          <Box component="ul" sx={{ mb: 3, pl: 3, color: "rgba(255, 255, 255, 0.8)" }}>
            <li>Insights will be accurate or complete</li>
            <li>Patterns identified will apply to your individual circumstances</li>
            <li>The Service will identify all relevant signals or trends</li>
          </Box>
          <Typography variant="body1" sx={{ mb: 3, lineHeight: 1.8, color: "rgba(255, 255, 255, 0.8)" }}>
            The Service may contain inaccuracies, delays, or limitations inherent to automated and AI-based systems.
          </Typography>

          <Typography variant="h6" sx={{ mb: 2, mt: 4, color: "#4facfe", fontWeight: 600 }}>
            6. User Responsibilities
          </Typography>
          <Typography variant="body1" sx={{ mb: 1, lineHeight: 1.8, color: "rgba(255, 255, 255, 0.8)" }}>
            You agree to:
          </Typography>
          <Box component="ul" sx={{ mb: 3, pl: 3, color: "rgba(255, 255, 255, 0.8)" }}>
            <li>Use the Service only for lawful purposes</li>
            <li>Provide accurate and truthful information to the best of your ability</li>
            <li>Not misuse the Service or rely on it for medical decisions</li>
            <li>Not attempt to reverse engineer, interfere with, or disrupt the Service</li>
          </Box>

          <Typography variant="h6" sx={{ mb: 2, mt: 4, color: "#4facfe", fontWeight: 600 }}>
            7. Limitation of Liability
          </Typography>
          <Typography variant="body1" sx={{ mb: 1, lineHeight: 1.8, color: "rgba(255, 255, 255, 0.8)" }}>
            To the maximum extent permitted by law, Sphinic and its affiliates shall not be liable for any:
          </Typography>
          <Box component="ul" sx={{ mb: 2, pl: 3, color: "rgba(255, 255, 255, 0.8)" }}>
            <li>Health outcomes</li>
            <li>Injuries or damages</li>
            <li>Medical decisions</li>
            <li>Losses arising from reliance on the Service or its outputs</li>
          </Box>
          <Typography variant="body1" sx={{ mb: 3, lineHeight: 1.8, color: "rgba(255, 255, 255, 0.8)" }}>
            Use of the Service is at your own risk.
          </Typography>

          <Typography variant="h6" sx={{ mb: 2, mt: 4, color: "#4facfe", fontWeight: 600 }}>
            8. Account Suspension and Termination
          </Typography>
          <Typography variant="body1" sx={{ mb: 1, lineHeight: 1.8, color: "rgba(255, 255, 255, 0.8)" }}>
            We reserve the right to suspend or terminate access to the Service at any time if:
          </Typography>
          <Box component="ul" sx={{ mb: 3, pl: 3, color: "rgba(255, 255, 255, 0.8)" }}>
            <li>These Terms are violated</li>
            <li>The Service is misused</li>
            <li>Required by law or security concerns</li>
          </Box>

          <Typography variant="h6" sx={{ mb: 2, mt: 4, color: "#4facfe", fontWeight: 600 }}>
            9. Changes to the Service and Terms
          </Typography>
          <Typography variant="body1" sx={{ mb: 2, lineHeight: 1.8, color: "rgba(255, 255, 255, 0.8)" }}>
            We may modify, update, or discontinue any part of the Service at any time.
          </Typography>
          <Typography variant="body1" sx={{ mb: 3, lineHeight: 1.8, color: "rgba(255, 255, 255, 0.8)" }}>
            We may also update these Terms from time to time. Continued use of the Service after changes constitutes acceptance of the updated Terms.
          </Typography>

          <Typography variant="h6" sx={{ mb: 2, mt: 4, color: "#4facfe", fontWeight: 600 }}>
            10. Governing Law
          </Typography>
          <Typography variant="body1" sx={{ mb: 3, lineHeight: 1.8, color: "rgba(255, 255, 255, 0.8)" }}>
            These Terms shall be governed by and construed in accordance with the laws of the Commonwealth of Massachusetts, United States, without regard to its conflict of law principles.
          </Typography>

          <Typography variant="h6" sx={{ mb: 2, mt: 4, color: "#4facfe", fontWeight: 600 }}>
            11. Contact Information
          </Typography>
          <Typography variant="body1" sx={{ mb: 2, lineHeight: 1.8, color: "rgba(255, 255, 255, 0.8)" }}>
            If you have questions about these Terms, please contact us at:
          </Typography>
          <Typography variant="body1" sx={{ mb: 3, lineHeight: 1.8, color: "#4facfe" }}>
            support@sphinic.com
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Terms;
