import React, { useEffect, useRef } from "react";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import { Box, Container, Typography, Button, Grid, Card, Link } from "@mui/material";
import { ArrowForward, Psychology, Shield, Assessment, Watch, TrendingUp, LocalHospital, SmartToy, Analytics, Warning, ErrorOutline, HelpOutline, PersonOff, Route } from "@mui/icons-material";
import "../styles/new-landing.css";

const NewLanding = () => {
  const navigate = useNavigate();
  const observerRef = useRef();

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-in");
          }
        });
      },
      { threshold: 0.1 }
    );

    const animatedElements = document.querySelectorAll(".animate-on-scroll");
    animatedElements.forEach((el) => observerRef.current.observe(el));

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  const handleGetStarted = () => {
    navigate("/login");
  };

  const features = [
    {
      icon: <Psychology />,
      title: "AI-Powered Daily Insights",
      description: "Personalized insights analyzing your day against a 7-day baseline with recovery trajectory analysis and clinically-informed recommendations."
    },
    {
      icon: <Shield />,
      title: "Disc Protection Score",
      description: "Daily score (0-100) measuring how well-protected your spine was based on activity, sleep, stress, and pain metrics."
    },
    {
      icon: <Assessment />,
      title: "Comprehensive Symptom Tracking",
      description: "Track pain levels, flare-ups, numbness, stiffness, stress, activity, sleep, and more with detailed daily logs."
    },
    {
      icon: <Watch />,
      title: "Wearable Device Integration",
      description: "Seamless Fitbit connection with automatic data collection for steps, heart rate, sleep quality, and activity."
    },
    {
      icon: <Warning />,
      title: "Flare-Up Management",
      description: "Identifies potential triggers before flare-ups occur and provides early warning based on activity, sleep, and stress patterns."
    },
    {
      icon: <TrendingUp />,
      title: "Risk Forecasting",
      description: "Predictive analytics forecasting flare-up risk (0-10 scale) with risk buckets: Safe, Caution, Elevated, High Risk."
    },
    {
      icon: <LocalHospital />,
      title: "Personalized Medical Profile",
      description: "Track spine injuries, affected disc levels, and surgery history. Platform adjusts recommendations based on your condition."
    },
    {
      icon: <SmartToy />,
      title: "Actionable Interventions",
      description: "Daily recommendations for spine-safe activities with timing, duration guidance, and physiological rationale."
    },
    {
      icon: <Analytics />,
      title: "Comprehensive Dashboard",
      description: "Weekly trend graphs, pain patterns, activity correlation, heart rate insights, and sleep quality trends."
    }
  ];

  const steps = [
    { number: "1", title: "Connect Wearable", description: "Link your Fitbit device for automatic data collection" },
    { number: "2", title: "Log Symptoms", description: "Quick daily logs for pain, stiffness, and activity" },
    { number: "3", title: "Get AI Insights", description: "Receive personalized, clinically-informed recommendations" },
    { number: "4", title: "Track Progress", description: "Monitor your recovery trajectory and disc protection score" }
  ];

  return (
    <Box className="new-landing-container">
      {/* Hero Section */}
      <Box className="hero-section-new">
        <Container maxWidth="lg" sx={{ px: { xs: 2, sm: 3, md: 4 } }}>
          <Box className="hero-content-new animate-on-scroll">
            <Typography 
              variant="h1" 
              className="hero-title-new"
              sx={{ 
                wordBreak: "break-word",
                overflowWrap: "break-word",
                maxWidth: "100%"
              }}
            >
              AI-Powered Spine Health Tracking
            </Typography>
            <Typography variant="h5" className="hero-subtitle-new">
              Prevent flare-ups, understand your triggers, and get personalized, clinically-informed advice for your spine health.
            </Typography>
            <Button
              variant="contained"
              size="large"
              onClick={handleGetStarted}
              endIcon={<ArrowForward />}
              className="cta-button-new"
              sx={{ fontSize: { xs: "0.95rem", sm: "1.1rem", md: "1.4rem" } }}
            >
              Start Tracking Your Spine Health
            </Button>
          </Box>
        </Container>
      </Box>

      {/* Problem Statement */}
      <Box className="section-new section-alt">
        <Container maxWidth="lg" sx={{ px: { xs: 2, sm: 3, md: 4 }, height: "100%", display: "flex", alignItems: "center" }}>
          <Box className="section-content animate-on-scroll">
            <Typography variant="h2" className="section-title">
              Living with Spine Conditions is Challenging
            </Typography>
            <Box sx={{ mt: { xs: 4, md: 6 }, display: "flex", flexDirection: "column", gap: { xs: 4, md: 6 } }}>
              {/* First Row */}
              <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, justifyContent: "space-between", gap: { xs: 3, md: 4 } }}>
                <Box className="problem-item-new" sx={{ flex: 1, maxWidth: { md: "48%" } }}>
                  <Box className="problem-icon-new">
                    <ErrorOutline sx={{ fontSize: { xs: 56, md: 72 }, color: "rgba(255, 87, 87, 0.9)" }} />
                  </Box>
                  <Typography variant="h4" sx={{ 
                    mb: 2, 
                    fontSize: { xs: "1.5rem", md: "2rem" }, 
                    fontWeight: 700,
                    background: "linear-gradient(135deg, #ff5757 0%, #ff8a80 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text"
                  }}>
                    Unexpected Flare-Ups
                  </Typography>
                  <Typography variant="body1" sx={{ 
                    color: "rgba(255,255,255,0.85)", 
                    fontSize: { xs: "1rem", md: "1.125rem" }, 
                    lineHeight: 1.8
                  }}>
                    Pain can strike without warning, disrupting your life and recovery progress.
                  </Typography>
                </Box>
                <Box className="problem-item-new" sx={{ flex: 1, maxWidth: { md: "48%" } }}>
                  <Box className="problem-icon-new">
                    <HelpOutline sx={{ fontSize: { xs: 56, md: 72 }, color: "rgba(255, 193, 7, 0.9)" }} />
                  </Box>
                  <Typography variant="h4" sx={{ 
                    mb: 2, 
                    fontSize: { xs: "1.5rem", md: "2rem" }, 
                    fontWeight: 700,
                    background: "linear-gradient(135deg, #ffc107 0%, #ffd54f 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text"
                  }}>
                    Uncertainty About Triggers
                  </Typography>
                  <Typography variant="body1" sx={{ 
                    color: "rgba(255,255,255,0.85)", 
                    fontSize: { xs: "1rem", md: "1.125rem" }, 
                    lineHeight: 1.8
                  }}>
                    It's hard to know what activities or patterns lead to increased pain or inflammation.
                  </Typography>
                </Box>
              </Box>

              {/* Second Row */}
              <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, justifyContent: "space-between", gap: { xs: 3, md: 4 } }}>
                <Box className="problem-item-new" sx={{ flex: 1, maxWidth: { md: "48%" } }}>
                  <Box className="problem-icon-new">
                    <PersonOff sx={{ fontSize: { xs: 56, md: 72 }, color: "rgba(156, 39, 176, 0.9)" }} />
                  </Box>
                  <Typography variant="h4" sx={{ 
                    mb: 2, 
                    fontSize: { xs: "1.5rem", md: "2rem" }, 
                    fontWeight: 700,
                    background: "linear-gradient(135deg, #9c27b0 0%, #ba68c8 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text"
                  }}>
                    Lack of Personalized Guidance
                  </Typography>
                  <Typography variant="body1" sx={{ 
                    color: "rgba(255,255,255,0.85)", 
                    fontSize: { xs: "1rem", md: "1.125rem" }, 
                    lineHeight: 1.8
                  }}>
                    Generic wellness tips don't address your specific condition, injury history, or recovery needs.
                  </Typography>
                </Box>
                <Box className="problem-item-new" sx={{ flex: 1, maxWidth: { md: "48%" } }}>
                  <Box className="problem-icon-new">
                    <Route sx={{ fontSize: { xs: 56, md: 72 }, color: "rgba(0, 188, 212, 0.9)" }} />
                  </Box>
                  <Typography variant="h4" sx={{ 
                    mb: 2, 
                    fontSize: { xs: "1.5rem", md: "2rem" }, 
                    fontWeight: 700,
                    background: "linear-gradient(135deg, #00bcd4 0%, #4dd0e1 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text"
                  }}>
                    No Clear Recovery Path
                  </Typography>
                  <Typography variant="body1" sx={{ 
                    color: "rgba(255,255,255,0.85)", 
                    fontSize: { xs: "1rem", md: "1.125rem" }, 
                    lineHeight: 1.8
                  }}>
                    Without clear tracking and insights, it's difficult to know if you're making progress or what steps to take next in your recovery journey.
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Box>
        </Container>
      </Box>

      {/* Solution Overview */}
      <Box className="section-new section-alt">
        <Container maxWidth="lg" sx={{ px: { xs: 2, sm: 3, md: 4 }, height: "100%", display: "flex", alignItems: "center" }}>
          <Box className="section-content animate-on-scroll">
            <Typography variant="h2" className="section-title">
              Sphinic: Your AI-Powered Spine Health Partner
            </Typography>
            <Typography variant="body1" className="section-description">
              Sphinic combines manual symptom tracking, wearable device integration, and AI-powered clinical insights 
              to help you manage chronic spine conditions, recover from injuries, and prevent flare-ups. Our platform 
              thinks like a spine surgeon and physiotherapist combined, providing personalized recommendations based on 
              biomechanical and neurological principles.
            </Typography>
          </Box>
        </Container>
      </Box>

      {/* Key Features */}
      <Box className="section-new">
        <Container maxWidth="lg" sx={{ px: { xs: 2, sm: 3, md: 4 }, height: "100%", display: "flex", alignItems: "center" }}>
          <Box className="section-content animate-on-scroll">
            <Typography variant="h2" className="section-title">
              Comprehensive Features for Spine Health
            </Typography>
            <Box sx={{ mt: { xs: 4, md: 6 }, display: "flex", flexDirection: "column", gap: { xs: 4, md: 6 } }}>
              {/* Row 1 */}
              <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, justifyContent: "space-between", gap: { xs: 3, md: 4 } }}>
                <Box className="problem-item-new" sx={{ flex: 1, maxWidth: { md: "48%" } }}>
                  <Box className="problem-icon-new">
                    <Box sx={{ fontSize: { xs: "56px", md: "72px" }, color: "rgba(102, 126, 234, 0.9)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      {features[0].icon}
                    </Box>
                  </Box>
                  <Typography variant="h4" sx={{ 
                    mb: 2, 
                    fontSize: { xs: "1.5rem", md: "2rem" }, 
                    fontWeight: 700,
                    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text"
                  }}>
                    {features[0].title}
                  </Typography>
                  <Typography variant="body1" sx={{ 
                    color: "rgba(255,255,255,0.85)", 
                    fontSize: { xs: "1rem", md: "1.125rem" }, 
                    lineHeight: 1.8
                  }}>
                    {features[0].description}
                  </Typography>
                </Box>
                <Box className="problem-item-new" sx={{ flex: 1, maxWidth: { md: "48%" } }}>
                  <Box className="problem-icon-new">
                    <Box sx={{ fontSize: { xs: "56px", md: "72px" }, color: "rgba(102, 126, 234, 0.9)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      {features[1].icon}
                    </Box>
                  </Box>
                  <Typography variant="h4" sx={{ 
                    mb: 2, 
                    fontSize: { xs: "1.5rem", md: "2rem" }, 
                    fontWeight: 700,
                    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text"
                  }}>
                    {features[1].title}
                  </Typography>
                  <Typography variant="body1" sx={{ 
                    color: "rgba(255,255,255,0.85)", 
                    fontSize: { xs: "1rem", md: "1.125rem" }, 
                    lineHeight: 1.8
                  }}>
                    {features[1].description}
                  </Typography>
                </Box>
              </Box>

              {/* Row 2 */}
              <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, justifyContent: "space-between", gap: { xs: 3, md: 4 } }}>
                <Box className="problem-item-new" sx={{ flex: 1, maxWidth: { md: "48%" } }}>
                  <Box className="problem-icon-new">
                    <Box sx={{ fontSize: { xs: "56px", md: "72px" }, color: "rgba(102, 126, 234, 0.9)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      {features[2].icon}
                    </Box>
                  </Box>
                  <Typography variant="h4" sx={{ 
                    mb: 2, 
                    fontSize: { xs: "1.5rem", md: "2rem" }, 
                    fontWeight: 700,
                    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text"
                  }}>
                    {features[2].title}
                  </Typography>
                  <Typography variant="body1" sx={{ 
                    color: "rgba(255,255,255,0.85)", 
                    fontSize: { xs: "1rem", md: "1.125rem" }, 
                    lineHeight: 1.8
                  }}>
                    {features[2].description}
                  </Typography>
                </Box>
                <Box className="problem-item-new" sx={{ flex: 1, maxWidth: { md: "48%" } }}>
                  <Box className="problem-icon-new">
                    <Box sx={{ fontSize: { xs: "56px", md: "72px" }, color: "rgba(102, 126, 234, 0.9)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      {features[3].icon}
                    </Box>
                  </Box>
                  <Typography variant="h4" sx={{ 
                    mb: 2, 
                    fontSize: { xs: "1.5rem", md: "2rem" }, 
                    fontWeight: 700,
                    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text"
                  }}>
                    {features[3].title}
                  </Typography>
                  <Typography variant="body1" sx={{ 
                    color: "rgba(255,255,255,0.85)", 
                    fontSize: { xs: "1rem", md: "1.125rem" }, 
                    lineHeight: 1.8
                  }}>
                    {features[3].description}
                  </Typography>
                </Box>
              </Box>

              {/* Row 3 */}
              <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, justifyContent: "space-between", gap: { xs: 3, md: 4 } }}>
                <Box className="problem-item-new" sx={{ flex: 1, maxWidth: { md: "48%" } }}>
                  <Box className="problem-icon-new">
                    <Box sx={{ fontSize: { xs: "56px", md: "72px" }, color: "rgba(102, 126, 234, 0.9)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      {features[4].icon}
                    </Box>
                  </Box>
                  <Typography variant="h4" sx={{ 
                    mb: 2, 
                    fontSize: { xs: "1.5rem", md: "2rem" }, 
                    fontWeight: 700,
                    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text"
                  }}>
                    {features[4].title}
                  </Typography>
                  <Typography variant="body1" sx={{ 
                    color: "rgba(255,255,255,0.85)", 
                    fontSize: { xs: "1rem", md: "1.125rem" }, 
                    lineHeight: 1.8
                  }}>
                    {features[4].description}
                  </Typography>
                </Box>
                <Box className="problem-item-new" sx={{ flex: 1, maxWidth: { md: "48%" } }}>
                  <Box className="problem-icon-new">
                    <Box sx={{ fontSize: { xs: "56px", md: "72px" }, color: "rgba(102, 126, 234, 0.9)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      {features[5].icon}
                    </Box>
                  </Box>
                  <Typography variant="h4" sx={{ 
                    mb: 2, 
                    fontSize: { xs: "1.5rem", md: "2rem" }, 
                    fontWeight: 700,
                    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text"
                  }}>
                    {features[5].title}
                  </Typography>
                  <Typography variant="body1" sx={{ 
                    color: "rgba(255,255,255,0.85)", 
                    fontSize: { xs: "1rem", md: "1.125rem" }, 
                    lineHeight: 1.8
                  }}>
                    {features[5].description}
                  </Typography>
                </Box>
              </Box>

              {/* Row 4 */}
              <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, justifyContent: "space-between", gap: { xs: 3, md: 4 } }}>
                <Box className="problem-item-new" sx={{ flex: 1, maxWidth: { md: "48%" } }}>
                  <Box className="problem-icon-new">
                    <Box sx={{ fontSize: { xs: "56px", md: "72px" }, color: "rgba(102, 126, 234, 0.9)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      {features[6].icon}
                    </Box>
                  </Box>
                  <Typography variant="h4" sx={{ 
                    mb: 2, 
                    fontSize: { xs: "1.5rem", md: "2rem" }, 
                    fontWeight: 700,
                    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text"
                  }}>
                    {features[6].title}
                  </Typography>
                  <Typography variant="body1" sx={{ 
                    color: "rgba(255,255,255,0.85)", 
                    fontSize: { xs: "1rem", md: "1.125rem" }, 
                    lineHeight: 1.8
                  }}>
                    {features[6].description}
                  </Typography>
                </Box>
                <Box className="problem-item-new" sx={{ flex: 1, maxWidth: { md: "48%" } }}>
                  <Box className="problem-icon-new">
                    <Box sx={{ fontSize: { xs: "56px", md: "72px" }, color: "rgba(102, 126, 234, 0.9)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      {features[7].icon}
                    </Box>
                  </Box>
                  <Typography variant="h4" sx={{ 
                    mb: 2, 
                    fontSize: { xs: "1.5rem", md: "2rem" }, 
                    fontWeight: 700,
                    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text"
                  }}>
                    {features[7].title}
                  </Typography>
                  <Typography variant="body1" sx={{ 
                    color: "rgba(255,255,255,0.85)", 
                    fontSize: { xs: "1rem", md: "1.125rem" }, 
                    lineHeight: 1.8
                  }}>
                    {features[7].description}
                  </Typography>
                </Box>
              </Box>

              {/* Row 5 - Single item centered */}
              <Box sx={{ display: "flex", justifyContent: "center" }}>
                <Box className="problem-item-new" sx={{ maxWidth: { md: "48%" } }}>
                  <Box className="problem-icon-new">
                    <Box sx={{ fontSize: { xs: "56px", md: "72px" }, color: "rgba(102, 126, 234, 0.9)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      {features[8].icon}
                    </Box>
                  </Box>
                  <Typography variant="h4" sx={{ 
                    mb: 2, 
                    fontSize: { xs: "1.5rem", md: "2rem" }, 
                    fontWeight: 700,
                    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text"
                  }}>
                    {features[8].title}
                  </Typography>
                  <Typography variant="body1" sx={{ 
                    color: "rgba(255,255,255,0.85)", 
                    fontSize: { xs: "1rem", md: "1.125rem" }, 
                    lineHeight: 1.8
                  }}>
                    {features[8].description}
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Box>
        </Container>
      </Box>

      {/* How It Works */}
      <Box className="section-new section-alt">
        <Container maxWidth="lg" sx={{ px: { xs: 2, sm: 3, md: 4 }, height: "100%", display: "flex", alignItems: "center" }}>
          <Box className="section-content animate-on-scroll">
            <Typography variant="h2" className="section-title">
              How It Works
            </Typography>
            <Box sx={{ mt: { xs: 3, md: 4 }, display: "flex", flexDirection: "column", gap: { xs: 4, md: 6 } }}>
              {/* First Row */}
              <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, justifyContent: "space-between", gap: { xs: 3, md: 4 } }}>
                <Box className="problem-item-new" sx={{ flex: 1, maxWidth: { md: "48%" } }}>
                  <Box className="problem-icon-new">
                    <Typography sx={{ 
                      fontSize: { xs: "56px", md: "72px" }, 
                      fontWeight: 700,
                      color: "rgba(102, 126, 234, 0.9)",
                      lineHeight: 1
                    }}>
                      {steps[0].number}
                    </Typography>
                  </Box>
                  <Typography variant="h4" sx={{ 
                    mb: 2, 
                    fontSize: { xs: "1.5rem", md: "2rem" }, 
                    fontWeight: 700,
                    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text"
                  }}>
                    {steps[0].title}
                  </Typography>
                  <Typography variant="body1" sx={{ 
                    color: "rgba(255,255,255,0.85)", 
                    fontSize: { xs: "1rem", md: "1.125rem" }, 
                    lineHeight: 1.8
                  }}>
                    {steps[0].description}
                  </Typography>
                </Box>
                <Box className="problem-item-new" sx={{ flex: 1, maxWidth: { md: "48%" } }}>
                  <Box className="problem-icon-new">
                    <Typography sx={{ 
                      fontSize: { xs: "56px", md: "72px" }, 
                      fontWeight: 700,
                      color: "rgba(102, 126, 234, 0.9)",
                      lineHeight: 1
                    }}>
                      {steps[1].number}
                    </Typography>
                  </Box>
                  <Typography variant="h4" sx={{ 
                    mb: 2, 
                    fontSize: { xs: "1.5rem", md: "2rem" }, 
                    fontWeight: 700,
                    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text"
                  }}>
                    {steps[1].title}
                  </Typography>
                  <Typography variant="body1" sx={{ 
                    color: "rgba(255,255,255,0.85)", 
                    fontSize: { xs: "1rem", md: "1.125rem" }, 
                    lineHeight: 1.8
                  }}>
                    {steps[1].description}
                  </Typography>
                </Box>
              </Box>

              {/* Second Row */}
              <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, justifyContent: "space-between", gap: { xs: 3, md: 4 } }}>
                <Box className="problem-item-new" sx={{ flex: 1, maxWidth: { md: "48%" } }}>
                  <Box className="problem-icon-new">
                    <Typography sx={{ 
                      fontSize: { xs: "56px", md: "72px" }, 
                      fontWeight: 700,
                      color: "rgba(102, 126, 234, 0.9)",
                      lineHeight: 1
                    }}>
                      {steps[2].number}
                    </Typography>
                  </Box>
                  <Typography variant="h4" sx={{ 
                    mb: 2, 
                    fontSize: { xs: "1.5rem", md: "2rem" }, 
                    fontWeight: 700,
                    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text"
                  }}>
                    {steps[2].title}
                  </Typography>
                  <Typography variant="body1" sx={{ 
                    color: "rgba(255,255,255,0.85)", 
                    fontSize: { xs: "1rem", md: "1.125rem" }, 
                    lineHeight: 1.8
                  }}>
                    {steps[2].description}
                  </Typography>
                </Box>
                <Box className="problem-item-new" sx={{ flex: 1, maxWidth: { md: "48%" } }}>
                  <Box className="problem-icon-new">
                    <Typography sx={{ 
                      fontSize: { xs: "56px", md: "72px" }, 
                      fontWeight: 700,
                      color: "rgba(102, 126, 234, 0.9)",
                      lineHeight: 1
                    }}>
                      {steps[3].number}
                    </Typography>
                  </Box>
                  <Typography variant="h4" sx={{ 
                    mb: 2, 
                    fontSize: { xs: "1.5rem", md: "2rem" }, 
                    fontWeight: 700,
                    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text"
                  }}>
                    {steps[3].title}
                  </Typography>
                  <Typography variant="body1" sx={{ 
                    color: "rgba(255,255,255,0.85)", 
                    fontSize: { xs: "1rem", md: "1.125rem" }, 
                    lineHeight: 1.8
                  }}>
                    {steps[3].description}
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Box>
        </Container>
      </Box>

      {/* Integration Showcase */}
      <Box className="section-new section-alt">
        <Container maxWidth="lg" sx={{ px: { xs: 2, sm: 3, md: 4 }, height: "100%", display: "flex", alignItems: "center" }}>
          <Box className="section-content animate-on-scroll">
            <Typography variant="h2" className="section-title">
              Seamless Wearable Integration
            </Typography>
            <Box sx={{ mt: { xs: 4, md: 6 }, display: "flex", flexDirection: "column", gap: { xs: 4, md: 6 } }}>
              {/* Row 1 */}
              <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, justifyContent: "space-between", gap: { xs: 3, md: 4 } }}>
                <Box className="problem-item-new" sx={{ flex: 1, maxWidth: { md: "48%" } }}>
                  <Box className="problem-icon-new">
                    <Box sx={{ fontSize: { xs: "56px", md: "72px" }, color: "rgba(102, 126, 234, 0.9)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <Watch />
                    </Box>
                  </Box>
                  <Box sx={{ mb: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 1 }}>
                    <Typography variant="h4" sx={{ 
                      fontSize: { xs: "1.5rem", md: "2rem" }, 
                      fontWeight: 700,
                      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text"
                    }}>
                      Fitbit
                    </Typography>
                    <Typography variant="body2" sx={{ 
                      color: "rgba(76, 175, 80, 0.9)",
                      fontSize: { xs: "0.75rem", md: "0.875rem" },
                      fontWeight: 600,
                      textTransform: "uppercase",
                      letterSpacing: "0.5px"
                    }}>
                      Ready to Use
                    </Typography>
                  </Box>
                  <Typography variant="body1" sx={{ 
                    color: "rgba(255,255,255,0.85)", 
                    fontSize: { xs: "1rem", md: "1.125rem" }, 
                    lineHeight: 1.8
                  }}>
                    Fully supported with automatic data collection for steps, heart rate, sleep quality, and activity. Connect in seconds via OAuth 2.0.
                  </Typography>
                </Box>
                <Box className="problem-item-new" sx={{ flex: 1, maxWidth: { md: "48%" } }}>
                  <Box className="problem-icon-new">
                    <Box sx={{ fontSize: { xs: "56px", md: "72px" }, color: "rgba(102, 126, 234, 0.9)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <Watch />
                    </Box>
                  </Box>
                  <Box sx={{ mb: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 1 }}>
                    <Typography variant="h4" sx={{ 
                      fontSize: { xs: "1.5rem", md: "2rem" }, 
                      fontWeight: 700,
                      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text"
                    }}>
                      Whoop
                    </Typography>
                    <Typography variant="body2" sx={{ 
                      color: "rgba(102, 126, 234, 0.9)",
                      fontSize: { xs: "0.75rem", md: "0.875rem" },
                      fontWeight: 600,
                      textTransform: "uppercase",
                      letterSpacing: "0.5px"
                    }}>
                      Upcoming
                    </Typography>
                  </Box>
                  <Typography variant="body1" sx={{ 
                    color: "rgba(255,255,255,0.85)", 
                    fontSize: { xs: "1rem", md: "1.125rem" }, 
                    lineHeight: 1.8
                  }}>
                    Coming soon: Advanced recovery and strain tracking with continuous heart rate monitoring and sleep analysis. Integration in development.
                  </Typography>
                </Box>
              </Box>

              {/* Row 2 */}
              <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, justifyContent: "space-between", gap: { xs: 3, md: 4 } }}>
                <Box className="problem-item-new" sx={{ flex: 1, maxWidth: { md: "48%" } }}>
                  <Box className="problem-icon-new">
                    <Box sx={{ fontSize: { xs: "56px", md: "72px" }, color: "rgba(102, 126, 234, 0.9)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <Watch />
                    </Box>
                  </Box>
                  <Box sx={{ mb: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 1 }}>
                    <Typography variant="h4" sx={{ 
                      fontSize: { xs: "1.5rem", md: "2rem" }, 
                      fontWeight: 700,
                      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text"
                    }}>
                      Oura Ring
                    </Typography>
                    <Typography variant="body2" sx={{ 
                      color: "rgba(102, 126, 234, 0.9)",
                      fontSize: { xs: "0.75rem", md: "0.875rem" },
                      fontWeight: 600,
                      textTransform: "uppercase",
                      letterSpacing: "0.5px"
                    }}>
                      Upcoming
                    </Typography>
                  </Box>
                  <Typography variant="body1" sx={{ 
                    color: "rgba(255,255,255,0.85)", 
                    fontSize: { xs: "1rem", md: "1.125rem" }, 
                    lineHeight: 1.8
                  }}>
                    Coming soon: Comprehensive sleep tracking, recovery metrics, and activity monitoring in a sleek ring form factor. Currently in development.
                  </Typography>
                </Box>
                <Box className="problem-item-new" sx={{ flex: 1, maxWidth: { md: "48%" } }}>
                  <Box className="problem-icon-new">
                    <Box sx={{ fontSize: { xs: "56px", md: "72px" }, color: "rgba(102, 126, 234, 0.9)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <Watch />
                    </Box>
                  </Box>
                  <Box sx={{ mb: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 1 }}>
                    <Typography variant="h4" sx={{ 
                      fontSize: { xs: "1.5rem", md: "2rem" }, 
                      fontWeight: 700,
                      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text"
                    }}>
                      Apple Watch
                    </Typography>
                    <Typography variant="body2" sx={{ 
                      color: "rgba(102, 126, 234, 0.9)",
                      fontSize: { xs: "0.75rem", md: "0.875rem" },
                      fontWeight: 600,
                      textTransform: "uppercase",
                      letterSpacing: "0.5px"
                    }}>
                      Upcoming
                    </Typography>
                  </Box>
                  <Typography variant="body1" sx={{ 
                    color: "rgba(255,255,255,0.85)", 
                    fontSize: { xs: "1rem", md: "1.125rem" }, 
                    lineHeight: 1.8
                  }}>
                    Coming soon: Seamless integration with Apple Health for automatic data collection including activity, heart rate, sleep, and more. We're actively working on this integration.
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Box>
        </Container>
      </Box>

      {/* Final CTA */}
      <Box className="section-new cta-section">
        <Container maxWidth="lg" sx={{ px: { xs: 2, sm: 3, md: 4 }, height: "100%", display: "flex", alignItems: "center" }}>
          <Box className="section-content animate-on-scroll">
            <Typography variant="h2" className="section-title">
              Ready to Take Control of Your Spine Health?
            </Typography>
            <Typography variant="h6" className="section-description" sx={{ mb: 4, fontSize: { xs: "1rem", md: "1.25rem" } }}>
              Start your journey to better spine health. Understand your patterns, get personalized AI-powered insights, and prevent flare-ups proactively.
            </Typography>
            <Button
              variant="contained"
              size="large"
              onClick={handleGetStarted}
              endIcon={<ArrowForward />}
              className="cta-button-new"
            >
              Get Started Free
            </Button>
          </Box>
        </Container>
      </Box>

      {/* Footer */}
      <Box className="footer-new">
        <Container maxWidth="lg" sx={{ px: { xs: 2, sm: 3, md: 4 } }}>
          <Box sx={{ py: { xs: 3, md: 4 }, textAlign: "center", px: { xs: 2, md: 0 } }}>
            <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.6)", mb: 2, fontSize: { xs: "0.75rem", md: "0.875rem" }, lineHeight: 1.6 }}>
              Sphinic is an informational wellness and data-analysis platform. The content, insights, and outputs provided by Sphinic are for general informational purposes only and are not intended to diagnose, treat, cure, prevent, or manage any disease or medical condition. Sphinic is not a medical device and does not provide medical or clinical advice. Users should not rely on Sphinic for medical decisions and should always consult a qualified healthcare professional for medical concerns.
            </Typography>
            <Box sx={{ mb: 2 }}>
              <Link
                component={RouterLink}
                to="/feedback"
                sx={{
                  color: "rgba(255,255,255,0.7)",
                  textDecoration: "none",
                  fontSize: { xs: "0.75rem", md: "0.875rem" },
                  "&:hover": {
                    color: "#4facfe",
                    textDecoration: "underline",
                  },
                }}
              >
                Share Feedback
              </Link>
            </Box>
            <Box sx={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 2, alignItems: "center" }}>
              <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.5)", fontSize: { xs: "0.75rem", md: "0.875rem" } }}>
                © 2026 Sphinic. All rights reserved.
              </Typography>
              <Link
                component={RouterLink}
                to="/privacy"
                sx={{
                  color: "rgba(255,255,255,0.7)",
                  textDecoration: "none",
                  fontSize: { xs: "0.75rem", md: "0.875rem" },
                  "&:hover": {
                    color: "#4facfe",
                    textDecoration: "underline",
                  },
                }}
              >
                Privacy Policy
              </Link>
              <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.5)", fontSize: { xs: "0.75rem", md: "0.875rem" } }}>
                |
              </Typography>
              <Link
                component={RouterLink}
                to="/terms"
                sx={{
                  color: "rgba(255,255,255,0.7)",
                  textDecoration: "none",
                  fontSize: { xs: "0.75rem", md: "0.875rem" },
                  "&:hover": {
                    color: "#4facfe",
                    textDecoration: "underline",
                  },
                }}
              >
                Terms of Service
              </Link>
            </Box>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default NewLanding;

