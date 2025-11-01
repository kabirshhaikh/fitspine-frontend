import React from "react";
import { Box, Container, Typography, Grid, CardContent } from "@mui/material";
import { TrendingUp, FitnessCenter, Psychology } from "@mui/icons-material";
import GlassCard from "./GlassCard";
import "../../styles/features.css";

const FeaturesSection = () => {
  const features = [
    {
      id: 1,
      icon: TrendingUp,
      title: "Your habits tell the story",
      description:
        "Every day, just log how your spine feels — pain level, stiffness, sitting hours, or stress. FitSpine learns from these entries and combines them with your wearable data to generate your daily Disc Protection Score and actionable insights. Small habits, big awareness.",
      color: "#4fc3f7",
      hoverColor: "rgba(79, 195, 247, 0.4)",
      borderHoverColor: "rgba(79, 195, 247, 0.3)",
      gradient: "linear-gradient(135deg, #4fc3f7, #29b6f6)",
      showScoreDemo: true,
    },
    {
      id: 2,
      icon: FitnessCenter,
      title: "Connect your wearables",
      description:
        "Your Fitbit, Garmin, or Apple Watch automatically adds movement and sleep data — no extra effort needed.",
      color: "#9c27b0",
      hoverColor: "rgba(156, 39, 176, 0.4)",
      borderHoverColor: "rgba(156, 39, 176, 0.3)",
      gradient: "linear-gradient(135deg, #9c27b0, #7b1fa2)",
      showSecurity: true,
      showSpineAnimation: true,
    },
    {
      id: 3,
      icon: Psychology,
      title: "AI that learns from your lifestyle",
      description:
        "FitSpine's AI studies patterns in your sleep, activity, posture, and daily logs to uncover early signs of strain and stress. It turns your data into daily Disc Protection Insights — showing what's improving, what needs attention, and how your habits shape your recovery journey. Gentle nudges help you stay consistent and protect your spine over time.",
      color: "#4caf50",
      hoverColor: "rgba(76, 175, 80, 0.4)",
      borderHoverColor: "rgba(76, 175, 80, 0.3)",
      gradient: "linear-gradient(135deg, #4caf50, #66bb6a)",
      showBrainAnimation: true,
    },
  ];

  return (
    <Box className="features-section section-background-2">
      <Container maxWidth="lg">
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Grid container spacing={6}>
            {features.map((feature) => {
              const IconComponent = feature.icon;
              return (
                <Grid item xs={12} key={feature.id}>
                  <GlassCard
                    className="animate-on-scroll"
                    hoverColor={feature.hoverColor}
                    borderHoverColor={feature.borderHoverColor}
                    sx={{
                      opacity: 0,
                      transform: "translateY(50px)",
                      transition: "all 1s cubic-bezier(0.4, 0, 0.2, 1)",
                      animation: "morphing 12s ease-in-out infinite",
                      "&.animate-in": {
                        opacity: 1,
                        transform: "translateY(0)",
                      },
                      "&:hover": {
                        transform: "translateY(-8px) scale(1.01)",
                        animation: "none",
                      },
                      "&::before": {
                        background: `linear-gradient(90deg, transparent, ${feature.color}80, transparent)`,
                      },
                    }}
                  >
                    <CardContent sx={{ p: 4 }}>
                      <Box className="feature-header" sx={{ color: feature.color }}>
                        <IconComponent
                          sx={{
                            fontSize: { xs: 32, md: 40 },
                            mr: 2,
                            filter: `drop-shadow(0 0 8px ${feature.color}80)`,
                          }}
                        />
                        <Typography
                          variant="h4"
                          className="feature-title"
                          sx={{ color: feature.color }}
                        >
                          {feature.title}
                        </Typography>
                      </Box>

                      <Typography variant="body1" className="feature-description">
                        {feature.description}
                      </Typography>

                      {/* Score Demo Animation */}
                      {feature.showScoreDemo && (
                        <Box className="score-demo">
                          <Box className="progress-ring-container">
                            <Box className="progress-ring-wrapper">
                              <Box className="progress-ring-bg" />
                              <Box className="progress-ring-fill" />
                              <Typography variant="h3" className="progress-score">
                                85
                              </Typography>
                            </Box>
                            <Box className="score-breakdown">
                              <Typography variant="body2" className="score-label">
                                Disc Protection Score
                              </Typography>
                              <Box className="score-metrics">
                                <span>Pain: 80%</span>
                                <span>Posture: 90%</span>
                                <span>Activity: 85%</span>
                              </Box>
                            </Box>
                          </Box>
                        </Box>
                      )}

                      {/* Security Message */}
                      {feature.showSecurity && (
                        <Box className="security-banner">
                          <Box className="security-icon">🔒</Box>
                          <Typography variant="body2" className="security-text">
                            FitSpine connects securely using official APIs and
                            never stores your wearable credentials. Your health
                            data remains private and encrypted.
                          </Typography>
                        </Box>
                      )}

                      {/* Spine Animation Placeholder */}
                      {feature.showSpineAnimation && (
                        <Box className="spine-animation-placeholder">
                          <Typography variant="body2" sx={{ color: "#666", textAlign: "center" }}>
                            Spine visualization animation
                          </Typography>
                        </Box>
                      )}

                      {/* Brain Animation Placeholder */}
                      {feature.showBrainAnimation && (
                        <Box className="brain-animation-placeholder">
                          <Box className="ai-brain-icon">
                            <Psychology sx={{ color: "white", fontSize: 30 }} />
                          </Box>
                          <Typography variant="body2" className="learning-indicator">
                            🧠 Learning Your Patterns...
                          </Typography>
                        </Box>
                      )}
                    </CardContent>
                  </GlassCard>
                </Grid>
              );
            })}
          </Grid>
        </Box>
      </Container>
    </Box>
  );
};

export default FeaturesSection;

