import React from "react";
import { Box, Container, Typography } from "@mui/material";
import FloatingOrbs from "./FloatingOrbs";
import "../../styles/cta.css";

const CTASection = () => {
  return (
    <Box className="cta-section section-background-3">
      <FloatingOrbs />
      <Container 
        maxWidth="lg" 
        sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          width: '100%',
          height: '100%',
          px: { xs: 2, sm: 3, md: 4 }
        }}
      >
        <Box className="animate-on-scroll cta-content">
          {/* CTA Content - No Card Background */}
          <Box className="cta-main-content">
            <Typography 
              variant="h2" 
              className="cta-title gradient-text"
            >
              Your back pain doesn't define you.
            </Typography>

            <Typography 
              variant="h6" 
              className="cta-subtitle"
            >
              We understand the frustration of chronic back pain. That's why
              we built Sphinic - to give you control over your spine health
              through data, insights, and personalized recommendations. Start
              with simple daily logs, connect your wearable device, and watch
              as your understanding of your body transforms into actionable
              insights.
            </Typography>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default CTASection;

