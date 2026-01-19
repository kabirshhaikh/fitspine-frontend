import React, { useEffect, useRef } from "react";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import { Box, Container, Typography, Button, Grid, Card, Link } from "@mui/material";
import { ArrowForward, Psychology, Shield, Assessment, Watch, TrendingUp, LocalHospital, SmartToy, Analytics, Warning, ErrorOutline, HelpOutline, PersonOff, Route } from "@mui/icons-material";
import "../styles/new-landing.css";

const NewLanding = () => {
  const navigate = useNavigate();
  const observerRef = useRef();

  useEffect(() => {
    document.title = 'Sphinic - AI-Powered Spine Health Tracking';
  }, []);

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
      description: "Daily educational insights that analyze your activity patterns against a rolling 7-day baseline, highlighting recovery trends and behavioral signals for spine health awareness."
    },
    {
      icon: <Shield />,
      title: "Disc Protection Score",
      description: "A daily informational score (0–100) reflecting spine-supportive habits based on activity, sleep, stress, and self-reported discomfort metrics."
    },
    {
      icon: <Assessment />,
      title: "Comprehensive Symptom Tracking",
      description: "Track pain levels, flare-ups, numbness, stiffness, stress, activity, and sleep through detailed daily logs to better understand personal patterns over time."
    },
    {
      icon: <Watch />,
      title: "Wearable Device Integration",
      description: "Seamless Fitbit integration with automatic collection of steps, heart rate, sleep quality, and activity data."
    },
    {
      icon: <Warning />,
      title: "Flare-Up Pattern Awareness",
      description: "Highlights activity, sleep, and stress patterns commonly associated with flare-ups to support early awareness and habit adjustments."
    },
    {
      icon: <TrendingUp />,
      title: "Risk Awareness Indicators",
      description: "Trend-based risk signals (0–10 scale) that categorize flare-up-related patterns into awareness levels such as Safe, Caution, Elevated, and High."
    },
    {
      icon: <LocalHospital />,
      title: "Personal Spine Profile",
      description: "Track spine injuries, affected disc levels, and surgery history to personalize data visualization and insight context."
    },
    {
      icon: <SmartToy />,
      title: "Actionable Wellness Guidance",
      description: "Daily spine-friendly activity suggestions with general timing and duration context, designed for education and habit support."
    },
    {
      icon: <Analytics />,
      title: "Comprehensive Dashboard",
      description: "Weekly trend visualizations covering pain patterns, activity correlations, heart rate metrics, and sleep quality insights."
    }
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
              Sphinic: AI-Powered Spine Health Tracking
            </Typography>
            <Typography variant="body1" className="hero-subtitle-new" sx={{ 
              fontSize: { xs: "1rem", sm: "1.1rem", md: "1.2rem" },
              maxWidth: "700px",
              lineHeight: 1.7,
              color: "rgba(255, 255, 255, 0.85)",
              mt: 2
            }}>
              Track your symptoms, connect your wearable, and get AI-powered insights to prevent flare-ups and protect your spine.
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

      {/* Product Showcase - Visual Demo */}
      <Box className="section-new section-showcase" sx={{ minHeight: "100vh" }}>
        <Container maxWidth="lg" sx={{ px: { xs: 2, sm: 3, md: 4 }, height: "100%", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Box className="section-content animate-on-scroll" sx={{ width: "100%" }}>
            <Typography 
              variant="h2" 
              className="section-title"
              sx={{ 
                mb: { xs: 3, sm: 4, md: 5, lg: 6 },
                fontSize: { xs: "1.75rem", sm: "2.25rem", md: "2.75rem", lg: "3.5rem" },
                lineHeight: { xs: 1.3, md: 1.2 },
                px: { xs: 2, sm: 0 }
              }}
            >
              See Sphinic In Action
            </Typography>
            <Typography 
              variant="h6" 
              className="section-description" 
              sx={{ 
                mb: { xs: 5, sm: 6, md: 7, lg: 8 }, 
                fontSize: { xs: "0.95rem", sm: "1.1rem", md: "1.2rem", lg: "1.25rem" },
                lineHeight: { xs: 1.6, md: 1.7 },
                maxWidth: { xs: "100%", sm: "90%", md: "800px" },
                mx: "auto",
                px: { xs: 2, sm: 0 },
                color: "rgba(255, 255, 255, 0.85)"
              }}
            >
              Experience how Sphinic transforms your daily data into actionable spine health insights
            </Typography>
            
            <Box sx={{ 
              display: "grid", 
              gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" }, 
              gap: { xs: 3, sm: 4, md: 5, lg: 6 },
              mt: { xs: 2, sm: 3, md: 4, lg: 6 },
              px: { xs: 1, sm: 0 }
            }}>
              {/* Disc Protection Score Mockup */}
              <Box className="product-mockup-card">
                <Box sx={{ 
                  background: "linear-gradient(135deg, rgba(79, 172, 254, 0.15) 0%, rgba(0, 242, 254, 0.15) 100%)",
                  backdropFilter: "blur(20px)",
                  border: "1px solid rgba(79, 172, 254, 0.3)",
                  borderRadius: "24px",
                  padding: { xs: 3, md: 4 },
                  textAlign: "center",
                  position: "relative",
                  overflow: "hidden",
                  "&::before": {
                    content: '""',
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    height: "1px",
                    background: "linear-gradient(90deg, transparent, rgba(79, 172, 254, 0.5), transparent)",
                  }
                }}>
                  <Typography variant="h6" sx={{ 
                    color: "rgba(255,255,255,0.9)", 
                    mb: { xs: 2.5, sm: 3, md: 3.5 }, 
                    fontWeight: 600,
                    fontSize: { xs: "0.95rem", sm: "1.1rem", md: "1.2rem", lg: "1.25rem" }
                  }}>
                    Disc Protection Score
                  </Typography>
                  
                  {/* Animated Score Circle */}
                  <Box sx={{ 
                    position: "relative", 
                    display: "inline-flex", 
                    mb: { xs: 2.5, sm: 3, md: 3.5 },
                    width: { xs: 120, sm: 150, md: 160, lg: 180 },
                    height: { xs: 120, sm: 150, md: 160, lg: 180 }
                  }}>
                    <Box
                      sx={{
                        position: "absolute",
                        width: "100%",
                        height: "100%",
                        borderRadius: "50%",
                        background: `conic-gradient(from 0deg, #4facfe 0%, #00f2fe 85%, rgba(255,255,255,0.1) 85%, rgba(255,255,255,0.1) 100%)`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        animation: "scorePulse 3s ease-in-out infinite",
                        "@keyframes scorePulse": {
                          "0%, 100%": { transform: "scale(1)", opacity: 1 },
                          "50%": { transform: "scale(1.05)", opacity: 0.9 },
                        },
                        "&::before": {
                          content: '""',
                          position: "absolute",
                          width: "70%",
                          height: "70%",
                          borderRadius: "50%",
                          background: "rgba(15, 15, 35, 0.8)",
                          backdropFilter: "blur(10px)",
                        }
                      }}
                    >
                      <Typography 
                        variant="h2" 
                        sx={{
                          position: "relative",
                          zIndex: 1,
                          fontWeight: 800,
                          background: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
                          WebkitBackgroundClip: "text",
                          WebkitTextFillColor: "transparent",
                          backgroundClip: "text",
                          fontSize: { xs: "2.5rem", sm: "3rem", md: "3.5rem", lg: "4rem" }
                        }}
                      >
                        85
                      </Typography>
                    </Box>
                  </Box>
                  
                  <Typography variant="body2" sx={{ 
                    color: "rgba(255,255,255,0.7)", 
                    fontSize: { xs: "0.8rem", sm: "0.85rem", md: "0.9rem", lg: "0.95rem" },
                    fontStyle: "italic",
                    lineHeight: 1.5
                  }}>
                    Real-time tracking of your spine health
                  </Typography>
                </Box>
              </Box>

              {/* Dashboard Preview Mockup */}
              <Box className="product-mockup-card">
                <Box sx={{ 
                  background: "linear-gradient(135deg, rgba(156, 39, 176, 0.15) 0%, rgba(123, 31, 162, 0.15) 100%)",
                  backdropFilter: "blur(20px)",
                  border: "1px solid rgba(156, 39, 176, 0.3)",
                  borderRadius: "24px",
                  padding: { xs: 3, md: 4 },
                  position: "relative",
                  overflow: "hidden",
                  "&::before": {
                    content: '""',
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    height: "1px",
                    background: "linear-gradient(90deg, transparent, rgba(156, 39, 176, 0.5), transparent)",
                  }
                }}>
                  <Typography variant="h6" sx={{ 
                    color: "rgba(255,255,255,0.9)", 
                    mb: { xs: 2.5, sm: 3, md: 3.5 }, 
                    fontWeight: 600,
                    fontSize: { xs: "0.95rem", sm: "1.1rem", md: "1.2rem", lg: "1.25rem" },
                    textAlign: "center"
                  }}>
                    AI-Powered Insights
                  </Typography>
                  
                  {/* Mini Chart/Graph Mockup */}
                  <Box sx={{ 
                    height: { xs: 100, sm: 120, md: 140, lg: 150 },
                    position: "relative",
                    mb: { xs: 1.5, sm: 2 }
                  }}>
                    <Box sx={{
                      position: "absolute",
                      bottom: 0,
                      left: 0,
                      right: 0,
                      height: "100%",
                      display: "flex",
                      alignItems: "flex-end",
                      justifyContent: "space-around",
                      gap: 1,
                      padding: "0 8px"
                    }}>
                      {[65, 72, 68, 80, 75, 85, 88].map((height, index) => (
                        <Box
                          key={index}
                          sx={{
                            flex: 1,
                            height: `${height}%`,
                            background: "linear-gradient(180deg, #9c27b0 0%, #7b1fa2 100%)",
                            borderRadius: "4px 4px 0 0",
                            minWidth: "20px",
                            animation: `barGrow 1s ease-out ${index * 0.1}s both`,
                            "@keyframes barGrow": {
                              "0%": { height: "0%" },
                              "100%": { height: `${height}%` },
                            },
                            boxShadow: "0 2px 8px rgba(156, 39, 176, 0.4)",
                          }}
                        />
                      ))}
                    </Box>
                    {/* Grid lines */}
                    <Box sx={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      opacity: 0.1,
                      backgroundImage: `
                        linear-gradient(to bottom, rgba(255,255,255,0.1) 1px, transparent 1px),
                        linear-gradient(to right, rgba(255,255,255,0.1) 1px, transparent 1px)
                      `,
                      backgroundSize: "20px 20px",
                      pointerEvents: "none"
                    }} />
                  </Box>
                  
                  <Box sx={{ 
                    display: "flex", 
                    justifyContent: "space-between", 
                    alignItems: "center",
                    mt: { xs: 1.5, sm: 2 },
                    padding: { xs: "10px", sm: "12px" },
                    background: "rgba(156, 39, 176, 0.1)",
                    borderRadius: { xs: "10px", sm: "12px" },
                    border: "1px solid rgba(156, 39, 176, 0.2)"
                  }}>
                    <Box>
                      <Typography variant="caption" sx={{ 
                        color: "rgba(255,255,255,0.6)", 
                        display: "block",
                        fontSize: { xs: "0.7rem", sm: "0.75rem" }
                      }}>
                        Trend
                      </Typography>
                      <Typography variant="body2" sx={{ 
                        color: "#4caf50", 
                        fontWeight: 600,
                        fontSize: { xs: "0.8rem", sm: "0.875rem", md: "0.95rem" }
                      }}>
                        ↗ Improving
                      </Typography>
                    </Box>
                    <Box sx={{ textAlign: "right" }}>
                      <Typography variant="caption" sx={{ 
                        color: "rgba(255,255,255,0.6)", 
                        display: "block",
                        fontSize: { xs: "0.7rem", sm: "0.75rem" }
                      }}>
                        Risk Level
                      </Typography>
                      <Typography variant="body2" sx={{ 
                        color: "#4facfe", 
                        fontWeight: 600,
                        fontSize: { xs: "0.8rem", sm: "0.875rem", md: "0.95rem" }
                      }}>
                        Low
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Box>

            {/* Feature Highlights Row */}
            <Box sx={{ 
              display: "grid", 
              gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr", md: "1fr 1fr 1fr" }, 
              gap: { xs: 2.5, sm: 3, md: 4, lg: 5 },
              mt: { xs: 4, sm: 5, md: 6, lg: 7 },
              px: { xs: 1, sm: 0 }
            }}>
              {[
                { icon: "📊", title: "Daily Tracking", desc: "Log symptoms in seconds" },
                { icon: "🤖", title: "AI Analysis", desc: "Personalized insights" },
                { icon: "📈", title: "Trend Analysis", desc: "See your progress" }
              ].map((item, index) => (
                <Box 
                  key={index}
                  sx={{
                    textAlign: "center",
                    padding: { xs: 2, sm: 2.5, md: 3, lg: 3.5 },
                    background: "rgba(255, 255, 255, 0.05)",
                    backdropFilter: "blur(10px)",
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                    borderRadius: { xs: "12px", sm: "14px", md: "16px" },
                    transition: "all 0.3s ease",
                    "&:hover": {
                      transform: "translateY(-4px)",
                      background: "rgba(255, 255, 255, 0.08)",
                      borderColor: "rgba(102, 126, 234, 0.4)",
                      boxShadow: "0 8px 24px rgba(102, 126, 234, 0.2)",
                    }
                  }}
                >
                  <Typography sx={{ 
                    fontSize: { xs: "2rem", sm: "2.5rem", md: "2.75rem", lg: "3rem" }, 
                    mb: { xs: 0.75, sm: 1 },
                    lineHeight: 1
                  }}>
                    {item.icon}
                  </Typography>
                  <Typography variant="h6" sx={{ 
                    color: "rgba(255,255,255,0.9)", 
                    mb: { xs: 0.75, sm: 1 }, 
                    fontWeight: 600,
                    fontSize: { xs: "0.95rem", sm: "1rem", md: "1.1rem", lg: "1.125rem" },
                    lineHeight: 1.3
                  }}>
                    {item.title}
                  </Typography>
                  <Typography variant="body2" sx={{ 
                    color: "rgba(255,255,255,0.6)",
                    fontSize: { xs: "0.8rem", sm: "0.85rem", md: "0.9rem", lg: "0.95rem" },
                    lineHeight: 1.5
                  }}>
                    {item.desc}
                  </Typography>
                </Box>
              ))}
            </Box>
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
      <Box className="section-new cta-section section-cta-final" sx={{ minHeight: "100vh" }}>
        <Container maxWidth="lg" sx={{ px: { xs: 2, sm: 3, md: 4 }, height: "100%", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Box className="section-content animate-on-scroll" sx={{ width: "100%", textAlign: "center" }}>
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

