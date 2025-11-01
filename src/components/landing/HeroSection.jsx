import React from "react";
import { Box, Container, Typography, Button } from "@mui/material";
import { ArrowForward } from "@mui/icons-material";
import "../../styles/hero.css";

const HeroSection = ({ onGetStarted }) => {
  return (
    <Box className="hero-section">
      <Container 
        maxWidth="lg"
        sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          width: '100%',
          px: { xs: 2, sm: 3, md: 4 }
        }}
      >
        <Box className="animate-on-scroll hero-content">
          {/* Hero Content - No Card Background */}
          <Box className="hero-main-content">
            <Typography 
              variant="h1" 
              className="hero-title gradient-text"
            >
              Your Spine, Your Strength.
            </Typography>

            <Typography 
              variant="h5" 
              className="hero-subtitle"
            >
              Discover patterns, track progress, and gain daily insights that
              help you protect and strengthen your spine.
            </Typography>

            <Button
              variant="contained"
              size="large"
              onClick={onGetStarted}
              endIcon={<ArrowForward />}
              className="modern-cta-button"
            >
              Get My Insights
            </Button>
          </Box>

          {/* Pro Tip Banner - Redesigned */}
          <Box className="pro-tip-banner">
            <Box className="pro-tip-icon">
              <Typography sx={{ fontSize: { xs: 20, md: 24 } }}>💡</Typography>
            </Box>
            <Box className="pro-tip-content">
              <Typography variant="body1" className="pro-tip-title">
                Pro Tip for Best Results
              </Typography>
              <Typography variant="body2" className="pro-tip-text">
                Connect a wearable device and log daily for the most accurate
                Disc Protection Score and personalized insights.
              </Typography>
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default HeroSection;

