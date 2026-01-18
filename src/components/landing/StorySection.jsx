import React from "react";
import { Box, Container, Typography } from "@mui/material";
import {
  FitnessCenter,
  SmartToy,
  TrendingUp,
  NotificationsActive,
} from "@mui/icons-material";
import "../../styles/story.css";

const StorySection = () => {
  const storySteps = [
    {
      id: 1,
      icon: FitnessCenter,
      title: "Now Available",
      subtitle: "Fitbit Integration",
      description:
        "Seamlessly sync your daily activity, sleep patterns, and heart rate data from your Fitbit device. No manual entry required.",
      color: "#4fc3f7",
      hoverColor: "rgba(79, 195, 247, 0.4)",
      borderHoverColor: "rgba(79, 195, 247, 0.3)",
      gradient: "linear-gradient(135deg, #4fc3f7, #29b6f6)",
      animationDirection: "translateX(-50px)",
    },
    {
      id: 2,
      icon: SmartToy,
      title: "Coming Soon",
      subtitle: "Garmin, Apple Watch & Whoop",
      description:
        "Expanding our ecosystem to support Garmin, Apple Watch, and Whoop devices. More data sources mean better insights for your spine health.",
      color: "#9c27b0",
      hoverColor: "rgba(156, 39, 176, 0.4)",
      borderHoverColor: "rgba(156, 39, 176, 0.3)",
      gradient: "linear-gradient(45deg, #9c27b0, #7b1fa2)",
      animationDirection: "translateX(50px)",
    },
    {
      id: 3,
      icon: TrendingUp,
      title: "Daily Disc Score",
      subtitle: "& Flare-up Insights",
      description:
        "Your Disc Protection Score is a personalized wellness indicator designed to help you understand trends in your posture, stress, and recovery habits. It is not a medical or diagnostic score.",
      color: "#4caf50",
      hoverColor: "rgba(76, 175, 80, 0.4)",
      borderHoverColor: "rgba(76, 175, 80, 0.3)",
      gradient: "linear-gradient(45deg, #4caf50, #388e3c)",
      animationDirection: "translateX(-50px)",
    },
    {
      id: 4,
      icon: NotificationsActive,
      title: "Enhanced Insights",
      subtitle: "Connect + Log for Best Results",
      description:
        "Sphinic's AI combines your daily logs and wearable data to create meaningful insights — tracking what's improving, what's worsening, and what may be causing your flare-ups. You'll receive personalized summaries each day, including your Disc Protection Score, recovery insights, and simple, data-backed advice to help you protect your spine.",
      additionalText:
        "For the most accurate results, we recommend connecting your wearable device along with adding manual logs about your pain levels, posture, and activities — the more context you provide, the smarter your insights become.",
      color: "#ff9800",
      hoverColor: "rgba(255, 152, 0, 0.4)",
      borderHoverColor: "rgba(255, 152, 0, 0.3)",
      gradient: "linear-gradient(45deg, #ff9800, #f57c00)",
      animationDirection: "translateX(50px)",
    },
  ];

  return (
    <Box className="story-section section-background-1">
      <Container maxWidth="lg">
        <Box className="animate-on-scroll story-header">
          <Typography variant="h2" className="story-title gradient-text">
            Your Journey to Better Spine Health
          </Typography>
          <Typography 
            variant="h6" 
            className="story-subtitle"
            sx={{
              textAlign: 'center',
              display: 'block',
              width: '100%',
              mx: 'auto'
            }}
          >
            From data collection to actionable insights - see how Sphinic transforms your daily habits into powerful health intelligence.
          </Typography>
        </Box>

        {/* Timeline Story */}
        <Box className="story-timeline">
          {storySteps.map((step, index) => {
            const IconComponent = step.icon;
            return (
              <Box
                key={step.id}
                className="animate-on-scroll story-item"
                sx={{
                  opacity: 0,
                  transform: step.animationDirection,
                  transition: "all 0.8s ease-out",
                  "&.animate-in": {
                    opacity: 1,
                    transform: "translateX(0)",
                  },
                }}
              >
                <Box className="story-item-content">
                  <Box className="story-icon-wrapper">
                    <Box
                      className="story-icon-circle"
                      sx={{
                        background: step.gradient,
                        boxShadow: `0 4px 20px ${step.color}40`,
                      }}
                    >
                      <IconComponent
                        sx={{
                          color: "white",
                          fontSize: { xs: 28, md: 36 },
                        }}
                      />
                    </Box>
                    {index < storySteps.length - 1 && (
                      <Box className="story-connector-line" />
                    )}
                  </Box>

                  <Box className="story-text-content">
                    <Box className="story-text-header">
                      <Typography
                        variant="h5"
                        className="story-item-title"
                        sx={{ color: step.color }}
                      >
                        {step.title}
                      </Typography>
                      <Typography
                        variant="body1"
                        className="story-item-subtitle"
                      >
                        {step.subtitle}
                      </Typography>
                    </Box>

                    <Typography variant="body1" className="story-item-description">
                      {step.description}
                    </Typography>

                    {step.additionalText && (
                      <Typography
                        variant="body2"
                        className="story-item-additional"
                      >
                        {step.additionalText}
                      </Typography>
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

export default StorySection;

