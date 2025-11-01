import React from "react";
import { Box, Container, Typography } from "@mui/material";
import { TrendingUp, FitnessCenter, Psychology } from "@mui/icons-material";
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
        "FitSpine's AI studies patterns in your sleep, activity, heart rate and daily logs to uncover early signs of strain and stress. It turns your data into daily Disc Protection Insights — showing what's improving, what needs attention, and how your habits shape your recovery journey. Gentle nudges help you stay consistent and protect your spine over time.",
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
        <Box className="features-timeline">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <Box
                key={feature.id}
                className="animate-on-scroll feature-item"
                sx={{
                  opacity: 0,
                  transform: index % 2 === 0 ? "translateX(-50px)" : "translateX(50px)",
                  transition: "all 0.8s ease-out",
                  "&.animate-in": {
                    opacity: 1,
                    transform: "translateX(0)",
                  },
                }}
              >
                <Box className="feature-item-content">
                  <Box className="feature-icon-wrapper">
                    <Box
                      className="feature-icon-circle"
                      sx={{
                        background: feature.gradient,
                        boxShadow: `0 4px 20px ${feature.color}40`,
                      }}
                    >
                      <IconComponent
                        sx={{
                          color: "white",
                          fontSize: { xs: 28, md: 36 },
                        }}
                      />
                    </Box>
                    {index < features.length - 1 && (
                      <Box className="feature-connector-line" />
                    )}
                  </Box>

                  <Box className="feature-text-content">
                    <Box className="feature-text-header">
                      <Typography
                        variant="h4"
                        className="feature-item-title"
                        sx={{ color: feature.color }}
                      >
                        {feature.title}
                      </Typography>
                    </Box>

                    <Typography variant="body1" className="feature-item-description">
                      {feature.description}
                    </Typography>

                    {/* Score Demo Animation */}
                    {feature.showScoreDemo && (
                      <Box className="score-demo">
                        <Box className="progress-ring-container">
                          <Box className="progress-ring-wrapper">
                            <Box className="progress-ring-bg" />
                            <Box className="progress-ring-fill" />
                            <Box
                              sx={{
                                position: 'absolute',
                                top: '50%',
                                left: '50%',
                                transform: 'translate(-50%, -50%)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                zIndex: 10,
                                width: '100%',
                                height: '100%',
                                pointerEvents: 'none'
                              }}
                            >
                              <Typography 
                                variant="h3" 
                                className="progress-score"
                                sx={{ 
                                  textAlign: 'center',
                                  margin: 0,
                                  lineHeight: 1,
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center'
                                }}
                              >
                                85
                              </Typography>
                            </Box>
                          </Box>
                          <Box className="score-breakdown">
                            <Typography 
                              variant="body2" 
                              className="score-label"
                              sx={{ 
                                textAlign: 'center',
                                width: '100%',
                                margin: 0
                              }}
                            >
                              Disc Protection Score
                            </Typography>
                            <Box 
                              className="score-metrics"
                              sx={{ 
                                width: '100%',
                                textAlign: 'center'
                              }}
                            >
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

                    {/* Wearable Animation */}
                    {feature.showSpineAnimation && (
                      <Box className="wearable-animation-container">
                        <Box className="wearable-devices">
                          <Box className="wearable-device">
                            <Typography sx={{ fontSize: { xs: 24, md: 32 } }}>⌚</Typography>
                            <Typography variant="caption" className="wearable-label">
                              Apple Watch
                            </Typography>
                          </Box>
                          
                          <Box className="wearable-device">
                            <Typography sx={{ fontSize: { xs: 24, md: 32 } }}>⌚</Typography>
                            <Typography variant="caption" className="wearable-label">
                              Fitbit
                            </Typography>
                          </Box>
                          
                          <Box className="wearable-device">
                            <Typography sx={{ fontSize: { xs: 24, md: 32 } }}>⌚</Typography>
                            <Typography variant="caption" className="wearable-label">
                              Garmin
                            </Typography>
                          </Box>
                          
                          <Box className="wearable-device">
                            <Typography sx={{ fontSize: { xs: 24, md: 32 } }}>⌚</Typography>
                            <Typography variant="caption" className="wearable-label">
                              Whoop
                            </Typography>
                          </Box>
                        </Box>
                        
                        <Box className="sync-indicator">
                          <Box className="sync-dot"></Box>
                          <Typography variant="caption" className="sync-text">
                            Syncing...
                          </Typography>
                        </Box>
                      </Box>
                    )}

                    {/* Brain Animation Placeholder */}
                    {feature.showBrainAnimation && (
                      <Box className="ai-animation-container">
                        <Box className="ai-core">
                          <Psychology sx={{ color: "white", fontSize: { xs: 40, md: 50 } }} />
                        </Box>
                        <Box className="ai-particles">
                          {[0, 1, 2, 3].map((index) => (
                            <Box
                              key={index}
                              className="ai-particle"
                              sx={{ animationDelay: `${index * 0.3}s` }}
                            />
                          ))}
                        </Box>
                        <Typography variant="caption" className="ai-status">
                          AI Processing...
                        </Typography>
                      </Box>
                    )}
                  </Box>
                </Box>
              </Box>
            );
          })}
        </Box>
      </Container>
    </Box>
  );
};

export default FeaturesSection;

