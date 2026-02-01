import React, { useEffect, useRef } from "react";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import { Box, Container, Typography, Button, Grid, Card, Link } from "@mui/material";
import { ArrowForward, Psychology, Shield, Assessment, Watch, SmartToy, Login, EditNote, Lightbulb } from "@mui/icons-material";
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

  return (
    <Box className="new-landing-container">
      {/* Hero Section */}
      <Box className="hero-section-new">
        <Container maxWidth="xl" sx={{ px: { xs: 2, sm: 3, md: 4 }, height: "100%" }}>
          <Box 
            sx={{ 
              display: "grid",
              gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
              gap: { xs: 3, sm: 4, md: 6, lg: 8 },
              alignItems: { xs: "flex-start", md: "center" },
              minHeight: { xs: "auto", md: "100vh" },
              py: { xs: 4, sm: 5, md: 8 }
            }}
          >
            {/* Left Side - Content */}
            <Box 
              className="hero-content-new animate-on-scroll"
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: { xs: 3, sm: 4, md: 5 },
                order: { xs: 1, md: 1 },
                textAlign: { xs: "center", md: "left" }
              }}
            >
              {/* Main Headline */}
              <Typography 
                variant="h1" 
                sx={{ 
                  fontSize: { xs: "2.5rem", sm: "3.5rem", md: "4.5rem", lg: "5.5rem" },
                  fontWeight: 900,
                  lineHeight: 1.1,
                  letterSpacing: "-0.02em",
                  background: "linear-gradient(135deg, #ffffff 0%, #a8edea 30%, #4facfe 60%, #00f2fe 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  mb: { xs: 1, sm: 2 }
                }}
              >
                Take Control of Your Spine Health
              </Typography>

              {/* Subheadline */}
              <Typography 
                variant="h5"
                sx={{ 
                  fontSize: { xs: "1.125rem", sm: "1.25rem", md: "1.5rem" },
                  fontWeight: 400,
                  lineHeight: 1.6,
                  color: "rgba(255, 255, 255, 0.8)",
                  maxWidth: { xs: "100%", md: "600px" },
                  mx: { xs: "auto", md: 0 }
                }}
              >
                Real-time tracking, AI insights, and personalized guidance to prevent flare-ups and protect your spine.
              </Typography>

              {/* CTA Button */}
              <Box
                sx={{
                  mt: { xs: 2, sm: 3 },
                  display: "flex",
                  justifyContent: { xs: "center", md: "flex-start" }
                }}
              >
                <Button
                  variant="contained"
                  size="large"
                  onClick={handleGetStarted}
                  endIcon={<ArrowForward />}
                  className="cta-button-new"
                  sx={{ 
                    fontSize: { xs: "1rem", sm: "1.125rem", md: "1.25rem" },
                    padding: { xs: "14px 32px", sm: "16px 40px" },
                    borderRadius: "12px",
                    textTransform: "none",
                    fontWeight: 600,
                    width: { xs: "100%", sm: "auto" },
                    maxWidth: { xs: "320px", sm: "none" }
                  }}
                >
                  Try for Free
                </Button>
              </Box>
            </Box>

            {/* Right Side - Medical Dashboard Preview */}
            <Box
              sx={{
                position: "relative",
                order: { xs: 2, md: 2 },
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                minHeight: { xs: "350px", sm: "450px", md: "600px" },
                width: "100%",
                padding: { xs: 1, sm: 2, md: 0 },
                mt: { xs: 2, md: 0 }
              }}
            >
              {/* Medical Dashboard Container */}
              <Box
                sx={{
                  position: "relative",
                  width: "100%",
                  maxWidth: { xs: "100%", md: "600px", lg: "650px" },
                  height: "100%",
                  minHeight: { xs: "350px", sm: "450px", md: "600px" },
                  background: "linear-gradient(135deg, rgba(15, 23, 42, 0.95) 0%, rgba(30, 41, 59, 0.95) 100%)",
                  backdropFilter: "blur(20px)",
                  borderRadius: { xs: "16px", md: "24px" },
                  border: "1px solid rgba(79, 172, 254, 0.2)",
                  boxShadow: { xs: "0 15px 40px rgba(0, 0, 0, 0.3), 0 0 30px rgba(79, 172, 254, 0.1)", md: "0 25px 80px rgba(0, 0, 0, 0.4), 0 0 60px rgba(79, 172, 254, 0.15)" },
                  padding: { xs: 2, sm: 3, md: 5 },
                  display: "flex",
                  flexDirection: "column",
                  gap: { xs: 2, sm: 2.5, md: 3 },
                  overflow: "hidden",
                  "&::before": {
                    content: '""',
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    height: "2px",
                    background: "linear-gradient(90deg, transparent, rgba(79, 172, 254, 0.6), transparent)",
                    zIndex: 1
                  }
                }}
              >
                {/* Dashboard Header */}
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1 }}>
                  <Typography
                    sx={{
                      fontSize: { xs: "1rem", sm: "1.125rem", md: "1.25rem" },
                      fontWeight: 700,
                      color: "rgba(255, 255, 255, 0.95)",
                      letterSpacing: "0.5px"
                    }}
                  >
                    Dashboard
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      gap: 1,
                      alignItems: "center"
                    }}
                  >
                    <Box
                      sx={{
                        width: 8,
                        height: 8,
                        borderRadius: "50%",
                        background: "#4caf50",
                        boxShadow: "0 0 8px rgba(76, 175, 80, 0.6)",
                        animation: "pulse 2s ease-in-out infinite"
                      }}
                    />
                    <Typography
                      sx={{
                        fontSize: { xs: "0.75rem", sm: "0.875rem" },
                        color: "rgba(255, 255, 255, 0.7)",
                        fontWeight: 500
                      }}
                    >
                      Live
                    </Typography>
                  </Box>
                </Box>

                {/* Main Metrics Grid */}
                <Box
                  sx={{
                    display: "grid",
                    gridTemplateColumns: { xs: "1fr 1fr", sm: "1fr 1fr" },
                    gap: { xs: 2, sm: 2.5, md: 3 },
                    flex: 1
                  }}
                >
                  {/* Disc Protection Score Card */}
                  <Box
                    sx={{
                      background: "linear-gradient(135deg, rgba(79, 172, 254, 0.15) 0%, rgba(0, 242, 254, 0.15) 100%)",
                      border: "1px solid rgba(79, 172, 254, 0.3)",
                      borderRadius: "16px",
                      padding: { xs: 2, sm: 2.5, md: 3 },
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      position: "relative",
                      overflow: "hidden",
                      "&::before": {
                        content: '""',
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        height: "1px",
                        background: "linear-gradient(90deg, transparent, rgba(79, 172, 254, 0.5), transparent)"
                      }
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: { xs: "0.75rem", sm: "0.875rem" },
                        color: "rgba(255, 255, 255, 0.7)",
                        mb: 1.5,
                        fontWeight: 500
                      }}
                    >
                      Disc Protection
                    </Typography>
                    <Box
                      sx={{
                        position: "relative",
                        width: { xs: 80, sm: 100, md: 120 },
                        height: { xs: 80, sm: 100, md: 120 },
                        mb: 1.5
                      }}
                    >
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
                            "50%": { transform: "scale(1.05)", opacity: 0.95 }
                          },
                          "&::before": {
                            content: '""',
                            position: "absolute",
                            width: "70%",
                            height: "70%",
                            borderRadius: "50%",
                            background: "rgba(15, 23, 42, 0.9)",
                            backdropFilter: "blur(10px)"
                          }
                        }}
                      >
                        <Typography
                          sx={{
                            position: "relative",
                            zIndex: 1,
                            fontWeight: 800,
                            background: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                            backgroundClip: "text",
                            fontSize: { xs: "1.75rem", sm: "2.25rem", md: "2.75rem" }
                          }}
                        >
                          85
                        </Typography>
                      </Box>
                    </Box>
                    <Typography
                      sx={{
                        fontSize: { xs: "0.7rem", sm: "0.75rem" },
                        color: "#4caf50",
                        fontWeight: 600
                      }}
                    >
                      ✓ Optimal
                    </Typography>
                  </Box>

                  {/* Activity Level Card */}
                  <Box
                    sx={{
                      background: "linear-gradient(135deg, rgba(156, 39, 176, 0.15) 0%, rgba(123, 31, 162, 0.15) 100%)",
                      border: "1px solid rgba(156, 39, 176, 0.3)",
                      borderRadius: "16px",
                      padding: { xs: 2, sm: 2.5, md: 3 },
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                      position: "relative",
                      overflow: "hidden",
                      "&::before": {
                        content: '""',
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        height: "1px",
                        background: "linear-gradient(90deg, transparent, rgba(156, 39, 176, 0.5), transparent)"
                      }
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: { xs: "0.75rem", sm: "0.875rem" },
                        color: "rgba(255, 255, 255, 0.7)",
                        mb: 1.5,
                        fontWeight: 500
                      }}
                    >
                      Activity Level
                    </Typography>
                    <Box sx={{ mb: 1.5 }}>
                      <Typography
                        sx={{
                          fontSize: { xs: "1.5rem", sm: "1.75rem", md: "2rem" },
                          fontWeight: 700,
                          color: "rgba(255, 255, 255, 0.95)",
                          mb: 0.5
                        }}
                      >
                        8,247
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: { xs: "0.65rem", sm: "0.7rem" },
                          color: "rgba(255, 255, 255, 0.6)"
                        }}
                      >
                        steps today
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        height: { xs: 4, sm: 5 },
                        background: "rgba(255, 255, 255, 0.1)",
                        borderRadius: "4px",
                        overflow: "hidden",
                        position: "relative"
                      }}
                    >
                      <Box
                        sx={{
                          height: "100%",
                          width: "72%",
                          background: "linear-gradient(90deg, #9c27b0 0%, #7b1fa2 100%)",
                          borderRadius: "4px",
                          animation: "barGrow 1.5s ease-out",
                          "@keyframes barGrow": {
                            "0%": { width: "0%" },
                            "100%": { width: "72%" }
                          }
                        }}
                      />
                    </Box>
                  </Box>

                  {/* Sleep Quality Card */}
                  <Box
                    sx={{
                      background: "linear-gradient(135deg, rgba(33, 150, 243, 0.15) 0%, rgba(25, 118, 210, 0.15) 100%)",
                      border: "1px solid rgba(33, 150, 243, 0.3)",
                      borderRadius: "16px",
                      padding: { xs: 2, sm: 2.5, md: 3 },
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                      position: "relative",
                      overflow: "hidden",
                      "&::before": {
                        content: '""',
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        height: "1px",
                        background: "linear-gradient(90deg, transparent, rgba(33, 150, 243, 0.5), transparent)"
                      }
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: { xs: "0.75rem", sm: "0.875rem" },
                        color: "rgba(255, 255, 255, 0.7)",
                        mb: 1.5,
                        fontWeight: 500
                      }}
                    >
                      Sleep Quality
                    </Typography>
                    <Box sx={{ mb: 1.5 }}>
                      <Typography
                        sx={{
                          fontSize: { xs: "1.5rem", sm: "1.75rem", md: "2rem" },
                          fontWeight: 700,
                          color: "rgba(255, 255, 255, 0.95)",
                          mb: 0.5
                        }}
                      >
                        7.5h
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: { xs: "0.65rem", sm: "0.7rem" },
                          color: "rgba(255, 255, 255, 0.6)"
                        }}
                      >
                        last night
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        gap: 0.5,
                        alignItems: "flex-end",
                        height: { xs: 24, sm: 28 }
                      }}
                    >
                      {[65, 72, 68, 80, 75, 85, 88].map((height, index) => (
                        <Box
                          key={index}
                          sx={{
                            flex: 1,
                            height: `${height}%`,
                            background: "linear-gradient(180deg, #2196f3 0%, #1976d2 100%)",
                            borderRadius: "2px 2px 0 0",
                            minWidth: "8px",
                            animation: `barGrow 1s ease-out ${index * 0.1}s both`,
                            "@keyframes barGrow": {
                              "0%": { height: "0%" },
                              "100%": { height: `${height}%` }
                            },
                            boxShadow: "0 2px 4px rgba(33, 150, 243, 0.3)"
                          }}
                        />
                      ))}
                    </Box>
                  </Box>

                  {/* Risk Assessment Card */}
                  <Box
                    sx={{
                      background: "linear-gradient(135deg, rgba(76, 175, 80, 0.15) 0%, rgba(56, 142, 60, 0.15) 100%)",
                      border: "1px solid rgba(76, 175, 80, 0.3)",
                      borderRadius: "16px",
                      padding: { xs: 2, sm: 2.5, md: 3 },
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                      position: "relative",
                      overflow: "hidden",
                      "&::before": {
                        content: '""',
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        height: "1px",
                        background: "linear-gradient(90deg, transparent, rgba(76, 175, 80, 0.5), transparent)"
                      }
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: { xs: "0.75rem", sm: "0.875rem" },
                        color: "rgba(255, 255, 255, 0.7)",
                        mb: 1.5,
                        fontWeight: 500
                      }}
                    >
                      Risk Level
                    </Typography>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: 1
                      }}
                    >
                      <Box
                        sx={{
                          width: { xs: 60, sm: 70, md: 80 },
                          height: { xs: 60, sm: 70, md: 80 },
                          borderRadius: "12px",
                          background: "linear-gradient(135deg, rgba(76, 175, 80, 0.3) 0%, rgba(56, 142, 60, 0.3) 100%)",
                          border: "2px solid rgba(76, 175, 80, 0.5)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          mb: 1,
                          boxShadow: "0 0 20px rgba(76, 175, 80, 0.3)"
                        }}
                      >
                        <Typography
                          sx={{
                            fontSize: { xs: "1.5rem", sm: "1.75rem", md: "2rem" },
                            fontWeight: 800,
                            color: "#4caf50"
                          }}
                        >
                          Low
                        </Typography>
                      </Box>
                      <Typography
                        sx={{
                          fontSize: { xs: "0.65rem", sm: "0.7rem" },
                          color: "rgba(255, 255, 255, 0.6)",
                          textAlign: "center"
                        }}
                      >
                        All metrics stable
                      </Typography>
                    </Box>
                  </Box>
                </Box>

                {/* Bottom Status Bar */}
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: { xs: 1.5, sm: 2 },
                    background: "rgba(255, 255, 255, 0.05)",
                    borderRadius: "12px",
                    border: "1px solid rgba(255, 255, 255, 0.1)"
                  }}
                >
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                    <Box
                      sx={{
                        width: 6,
                        height: 6,
                        borderRadius: "50%",
                        background: "#4caf50",
                        boxShadow: "0 0 6px rgba(76, 175, 80, 0.6)"
                      }}
                    />
                    <Typography
                      sx={{
                        fontSize: { xs: "0.7rem", sm: "0.75rem" },
                        color: "rgba(255, 255, 255, 0.7)"
                      }}
                    >
                      AI Analysis Active
                    </Typography>
                  </Box>
                </Box>

                {/* Subtle Animated Background Elements */}
                <Box
                  sx={{
                    position: "absolute",
                    top: "20%",
                    right: "10%",
                    width: 100,
                    height: 100,
                    background: "radial-gradient(circle, rgba(79, 172, 254, 0.1) 0%, transparent 70%)",
                    borderRadius: "50%",
                    filter: "blur(20px)",
                    animation: "float 6s ease-in-out infinite",
                    zIndex: 0,
                    "@keyframes float": {
                      "0%, 100%": { transform: "translate(0, 0) scale(1)" },
                      "50%": { transform: "translate(20px, -20px) scale(1.1)" }
                    }
                  }}
                />
                <Box
                  sx={{
                    position: "absolute",
                    bottom: "15%",
                    left: "8%",
                    width: 80,
                    height: 80,
                    background: "radial-gradient(circle, rgba(156, 39, 176, 0.1) 0%, transparent 70%)",
                    borderRadius: "50%",
                    filter: "blur(15px)",
                    animation: "float 8s ease-in-out infinite reverse",
                    zIndex: 0,
                    "@keyframes float": {
                      "0%, 100%": { transform: "translate(0, 0) scale(1)" },
                      "50%": { transform: "translate(-15px, 15px) scale(1.1)" }
                    }
                  }}
                />
              </Box>
            </Box>
          </Box>
        </Container>
      </Box>

      {/* Live Dashboard Preview - Option C */}
      <Box className="section-new section-alt">
        <Container maxWidth="lg" sx={{ px: { xs: 2, sm: 3, md: 4 }, height: "100%", display: "flex", alignItems: "center" }}>
          <Box className="section-content animate-on-scroll" sx={{ width: "100%" }}>
            <Box sx={{ textAlign: "center", mb: { xs: 3, sm: 4, md: 5 } }}>
              <Typography variant="h2" className="section-title">
                Your Spine Health, At a Glance
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  color: "rgba(255,255,255,0.75)",
                  fontSize: { xs: "1rem", md: "1.125rem" },
                  maxWidth: 600,
                  mx: "auto",
                }}
              >
                Real-time metrics and AI insights—see what Sphinic delivers
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  color: "rgba(255,255,255,0.9)",
                  fontSize: { xs: "1rem", md: "1.125rem" },
                  maxWidth: 560,
                  mx: "auto",
                  mt: 2,
                  lineHeight: 1.7,
                  fontStyle: "italic",
                }}
              >
                Flare-ups feel random. Triggers are unclear. Recovery feels like guesswork.{" "}
                <Box component="span" sx={{ fontStyle: "normal", fontWeight: 600, color: "#4fc3f7" }}>
                  Sphinic changes that.
                </Box>
              </Typography>
            </Box>

            {/* Metric Cards Grid */}
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: { xs: "repeat(2, 1fr)", sm: "repeat(2, 1fr)", md: "repeat(4, 1fr)" },
                gap: { xs: 2, sm: 3, md: 4 },
                mb: { xs: 3, md: 4 },
              }}
            >
              {/* Pain Level Card */}
              <Box className="metric-card">
                <Box className="metric-card-header" sx={{ color: "#60a5fa" }}>
                  <Box className="metric-dot" sx={{ background: "#60a5fa" }} />
                  Pain Level
                </Box>
                <Typography className="metric-value">2/10</Typography>
                <Box className="sparkline-wrap">
                  <svg viewBox="0 0 100 24" preserveAspectRatio="none" className="sparkline-svg">
                    <path
                      d="M0,18 L20,14 L40,16 L60,10 L80,12 L100,6"
                      fill="none"
                      stroke="url(#painGrad)"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="sparkline-path"
                    />
                    <defs>
                      <linearGradient id="painGrad" x1="0" y1="0" x2="1" y2="0">
                        <stop offset="0%" stopColor="#60a5fa" />
                        <stop offset="100%" stopColor="#a78bfa" />
                      </linearGradient>
                    </defs>
                  </svg>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, mt: 1 }}>
                  <Typography variant="caption" sx={{ color: "#4ade80", fontWeight: 600 }}>
                    −23% ↓
                  </Typography>
                  <Typography variant="caption" sx={{ color: "rgba(255,255,255,0.6)" }}>
                    this week
                  </Typography>
                </Box>
              </Box>

              {/* Activity Card */}
              <Box className="metric-card">
                <Box className="metric-card-header" sx={{ color: "#4ade80" }}>
                  <Box className="metric-dot" sx={{ background: "#4ade80" }} />
                  Activity
                </Box>
                <Typography className="metric-value">8,247</Typography>
                <Typography variant="caption" sx={{ color: "rgba(255,255,255,0.7)" }}>steps today</Typography>
                <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, mt: 1 }}>
                  <Typography variant="caption" sx={{ color: "#4ade80", fontWeight: 600 }}>
                    +12% ↑
                  </Typography>
                  <Typography variant="caption" sx={{ color: "rgba(255,255,255,0.6)" }}>
                    vs yesterday
                  </Typography>
                </Box>
              </Box>

              {/* Sleep Card */}
              <Box className="metric-card">
                <Box className="metric-card-header" sx={{ color: "#a78bfa" }}>
                  <Box className="metric-dot" sx={{ background: "#a78bfa" }} />
                  Sleep
                </Box>
                <Typography className="metric-value">7.5h</Typography>
                <Typography variant="caption" sx={{ color: "rgba(255,255,255,0.7)" }}>last night</Typography>
                <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, mt: 1 }}>
                  <Typography variant="caption" sx={{ color: "#4ade80", fontWeight: 600 }}>
                    Optimal
                  </Typography>
                </Box>
              </Box>

              {/* Heart Rate Card */}
              <Box className="metric-card">
                <Box className="metric-card-header" sx={{ color: "#f87171" }}>
                  <Box className="metric-dot" sx={{ background: "#f87171" }} />
                  Heart Rate
                </Box>
                <Typography className="metric-value">62</Typography>
                <Typography variant="caption" sx={{ color: "rgba(255,255,255,0.7)" }}>bpm resting</Typography>
                <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, mt: 1 }}>
                  <Typography variant="caption" sx={{ color: "#4ade80", fontWeight: 600 }}>
                    Stable
                  </Typography>
                </Box>
              </Box>
            </Box>

            {/* AI Analysis Card - Full Width */}
            <Box className="ai-insight-card">
              <Box sx={{ display: "flex", alignItems: "flex-start", gap: 2, flexDirection: { xs: "column", sm: "row" } }}>
                <Box
                  sx={{
                    flexShrink: 0,
                    width: 44,
                    height: 44,
                    borderRadius: "12px",
                    background: "linear-gradient(135deg, rgba(102, 126, 234, 0.3) 0%, rgba(118, 75, 162, 0.3) 100%)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <SmartToy sx={{ color: "#a78bfa", fontSize: 24 }} />
                </Box>
                <Box sx={{ flex: 1, minWidth: 0, width: "100%" }}>
                  <Typography variant="subtitle2" sx={{ color: "rgba(255,255,255,0.5)", mb: 0.5 }}>
                    AI Analysis Active
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{
                      color: "rgba(255,255,255,0.95)",
                      lineHeight: 1.6,
                      textAlign: { xs: "justify", sm: "left" },
                      textJustify: "inter-word",
                      hyphens: "auto",
                    }}
                  >
                    Your resting heart rate (62 bpm) and sleep quality are in sync with lower pain scores this week. When pain is low, keeping activity moderate—heart rate in a comfortable zone—along with light stretching tends to reduce stiffness without overloading your spine.
                  </Typography>
                </Box>
              </Box>
            </Box>

            {/* Risk Level Bar */}
            <Box
              sx={{
                mt: { xs: 3, md: 4 },
                p: { xs: 2, sm: 3 },
                borderRadius: "16px",
                background: "rgba(255,255,255,0.04)",
                backdropFilter: "blur(12px)",
                border: "1px solid rgba(255,255,255,0.08)",
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 2 }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                  <Box
                    sx={{
                      width: 10,
                      height: 10,
                      borderRadius: "50%",
                      background: "#4ade80",
                      boxShadow: "0 0 12px rgba(74, 222, 128, 0.6)",
                      animation: "pulse-dot 2s ease-in-out infinite",
                    }}
                  />
                  <Typography variant="body1" sx={{ color: "rgba(255,255,255,0.95)", fontWeight: 600 }}>
                    Risk Level: Low
                  </Typography>
                </Box>
                <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.6)" }}>
                  All metrics stable — keep up your routine
                </Typography>
              </Box>
            </Box>
          </Box>
        </Container>
      </Box>

      {/* How It Works + Key Capabilities */}
      <Box className="section-new">
        <Container maxWidth="lg" sx={{ px: { xs: 2, sm: 3, md: 4 }, height: "100%", display: "flex", alignItems: "center" }}>
          <Box className="section-content animate-on-scroll" sx={{ width: "100%" }}>
            <Typography variant="h2" className="section-title">
              Simple. Powerful. Personalized.
            </Typography>
            <Typography variant="body1" sx={{ color: "rgba(255,255,255,0.7)", textAlign: "center", mb: { xs: 4, md: 6 }, maxWidth: 560, mx: "auto" }}>
              Three steps to understanding your spine health—and taking control.
            </Typography>

            {/* How It Works - 3 Steps */}
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: { xs: "1fr", sm: "repeat(3, 1fr)" },
                gap: { xs: 3, sm: 4 },
                mb: { xs: 6, md: 8 },
              }}
            >
              {[
                { icon: <Login />, step: "1", title: "Connect", desc: "Link your wearable or log manually. Your data, your control.", color: "#60a5fa" },
                { icon: <EditNote />, step: "2", title: "Track", desc: "Log pain, sleep, activity in seconds. Build your baseline over time.", color: "#a78bfa" },
                { icon: <Lightbulb />, step: "3", title: "Get Insights", desc: "AI spots patterns you’d miss. Personalized guidance every day.", color: "#4ade80" },
              ].map((item) => (
                <Box
                  key={item.step}
                  className="how-step-card"
                  sx={{
                    position: "relative",
                    p: { xs: 3, md: 4 },
                    borderRadius: "20px",
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    backdropFilter: "blur(12px)",
                    transition: "all 0.4s cubic-bezier(0.4,0,0.2,1)",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: { xs: "center", sm: "flex-start" },
                    textAlign: { xs: "center", sm: "left" },
                    "&:hover": {
                      transform: "translateY(-6px)",
                      borderColor: `${item.color}40`,
                      boxShadow: `0 20px 40px rgba(0,0,0,0.2), 0 0 30px ${item.color}20`,
                    },
                  }}
                >
                  <Box
                    sx={{
                      width: 48,
                      height: 48,
                      borderRadius: "14px",
                      background: `${item.color}20`,
                      border: `1px solid ${item.color}40`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      mb: 2,
                    }}
                  >
                    {React.cloneElement(item.icon, { sx: { fontSize: 24, color: item.color } })}
                  </Box>
                  <Typography variant="overline" sx={{ color: "rgba(255,255,255,0.5)", fontWeight: 700, letterSpacing: 1 }}>
                    Step {item.step}
                  </Typography>
                  <Typography variant="h5" sx={{ color: "white", fontWeight: 700, mb: 1, fontSize: { xs: "1.25rem", md: "1.5rem" } }}>
                    {item.title}
                  </Typography>
                  <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.75)", lineHeight: 1.6 }}>
                    {item.desc}
                  </Typography>
                </Box>
              ))}
            </Box>

            {/* What You Get - Aligned Grid */}
            <Typography variant="h3" sx={{ fontSize: { xs: "1.5rem", md: "1.9rem" }, fontWeight: 700, color: "white", textAlign: "center", mb: { xs: 3, md: 4 } }}>
              What You Get
            </Typography>
            <Box
              className="bento-grid"
              sx={{
                display: "grid",
                gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)", md: "repeat(3, 1fr)" },
                gridAutoRows: { xs: "minmax(120px, auto)", md: "minmax(160px, auto)" },
                alignItems: "stretch",
                gap: { xs: 2, sm: 3, md: 4 },
                width: "100%",
              }}
            >
              {/* Row 1: Hero card - full width */}
              <Box
                className="bento-card bento-fullwidth"
                sx={{
                  gridColumn: { xs: "1", sm: "1 / -1", md: "1 / -1" },
                  p: { xs: 3, md: 4 },
                  alignItems: { xs: "center", sm: "flex-start" },
                  textAlign: { xs: "center", sm: "left" },
                }}
              >
                <Box sx={{ display: "flex", alignItems: { xs: "center", sm: "flex-start" }, gap: { xs: 2, md: 3 }, flexDirection: { xs: "column", sm: "row" } }}>
                  <Shield sx={{ fontSize: { xs: 36, md: 44 }, color: "#4fc3f7", flexShrink: 0 }} />
                  <Box>
                    <Typography variant="h6" sx={{ color: "white", fontWeight: 600, mb: 0.5, fontSize: { xs: "1.1rem", md: "1.35rem" } }}>Disc Protection Score</Typography>
                    <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.7)", lineHeight: 1.6, fontSize: { xs: "0.875rem", md: "1rem" } }}>Daily 0–100 score based on activity, sleep, stress & pain—your spine health at a glance.</Typography>
                  </Box>
                </Box>
              </Box>

              {/* Row 2: Three equal cards */}
              <Box className="bento-card bento-equal" sx={{ p: { xs: 3, md: 4 }, alignItems: { xs: "center", sm: "flex-start" }, textAlign: { xs: "center", sm: "left" } }}>
                <Psychology sx={{ fontSize: { xs: 28, md: 36 }, color: "#a78bfa", mb: 1 }} />
                <Typography variant="subtitle1" sx={{ color: "white", fontWeight: 600, fontSize: { xs: "1rem", md: "1.15rem" } }}>AI Insights</Typography>
                <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.7)", lineHeight: 1.5, fontSize: { xs: "0.875rem", md: "1rem" } }}>Patterns & recovery trends.</Typography>
              </Box>
              <Box className="bento-card bento-equal" sx={{ p: { xs: 3, md: 4 }, alignItems: { xs: "center", sm: "flex-start" }, textAlign: { xs: "center", sm: "left" } }}>
                <Assessment sx={{ fontSize: { xs: 28, md: 36 }, color: "#4ade80", mb: 1 }} />
                <Typography variant="subtitle1" sx={{ color: "white", fontWeight: 600, fontSize: { xs: "1rem", md: "1.15rem" } }}>Symptom Tracking</Typography>
                <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.7)", lineHeight: 1.5, fontSize: { xs: "0.875rem", md: "1rem" } }}>Pain, stiffness, flare-ups.</Typography>
              </Box>
              <Box className="bento-card bento-equal" sx={{ p: { xs: 3, md: 4 }, alignItems: { xs: "center", sm: "flex-start" }, textAlign: { xs: "center", sm: "left" } }}>
                <Watch sx={{ fontSize: { xs: 28, md: 36 }, color: "#60a5fa", mb: 1 }} />
                <Typography variant="subtitle1" sx={{ color: "white", fontWeight: 600, fontSize: { xs: "1rem", md: "1.15rem" } }}>Wearable Sync</Typography>
                <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.7)", lineHeight: 1.5, fontSize: { xs: "0.875rem", md: "1rem" } }}>Steps, HR, sleep auto.</Typography>
              </Box>

              {/* Row 3: Full width */}
              <Box
                className="bento-card bento-fullwidth"
                sx={{
                  gridColumn: { xs: "1", sm: "1 / -1", md: "1 / -1" },
                  p: { xs: 3, md: 4 },
                }}
              >
                <Box sx={{ display: "flex", alignItems: "flex-start", gap: { xs: 2, md: 3 }, flexDirection: { xs: "column", sm: "row" } }}>
                  <SmartToy sx={{ fontSize: { xs: 28, md: 36 }, color: "#a78bfa", flexShrink: 0 }} />
                  <Box sx={{ flex: 1, minWidth: 0, width: "100%" }}>
                    <Typography variant="subtitle1" sx={{ color: "white", fontWeight: 600, fontSize: { xs: "1rem", md: "1.15rem" } }}>Personalized Guidance</Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        color: "rgba(255,255,255,0.7)",
                        lineHeight: 1.6,
                        fontSize: { xs: "0.875rem", md: "1rem" },
                        textAlign: { xs: "justify", sm: "left" },
                        textJustify: "inter-word",
                        hyphens: "auto",
                      }}
                    >
                  Educational activity ideas based on your logged data—for wellness support only, not medical advice. Always consult your healthcare provider for treatment decisions.
                </Typography>
                  </Box>
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

      {/* Final CTA - Split Editorial Design */}
      <Box className="section-new cta-section section-cta-final" sx={{ minHeight: "100vh", position: "relative" }}>
        <Container maxWidth="lg" sx={{ px: { xs: 2, sm: 3, md: 4 }, height: "100%", minHeight: "100vh", display: "flex", alignItems: "center" }}>
          <Box
            className="section-content animate-on-scroll"
            sx={{
              width: "100%",
              display: "grid",
              gridTemplateColumns: { xs: "1fr", lg: "1fr 1fr" },
              gap: { xs: 4, lg: 8 },
              alignItems: "center",
            }}
          >
            {/* Left: Headline + subtext */}
            <Box>
              <Typography
                variant="h1"
                sx={{
                  fontSize: { xs: "2rem", sm: "2.5rem", md: "3rem", lg: "3.25rem" },
                  fontWeight: 800,
                  lineHeight: 1.15,
                  letterSpacing: "-0.02em",
                  color: "white",
                  mb: 2,
                }}
              >
                Ready to Take Control of Your Spine Health?
              </Typography>
              <Typography sx={{ color: "rgba(255,255,255,0.75)", fontSize: { xs: "1rem", md: "1.125rem" }, lineHeight: 1.75 }}>
                Start your journey. Understand your patterns, get AI-powered insights, and prevent flare-ups proactively.
              </Typography>
            </Box>

            {/* Right: Benefits + CTA */}
            <Box
              sx={{
                p: { xs: 3, md: 4 },
                borderRadius: "20px",
                border: "1px solid rgba(255,255,255,0.08)",
                background: "rgba(255,255,255,0.03)",
              }}
            >
              {["Track patterns", "AI insights", "Prevent flare-ups"].map((label, i) => (
                <Box
                  key={label}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 2,
                    py: 1.5,
                    borderBottom: i < 2 ? "1px solid rgba(255,255,255,0.06)" : "none",
                  }}
                >
                  <Box sx={{ width: 6, height: 6, borderRadius: "50%", background: "#4fc3f7", flexShrink: 0 }} />
                  <Typography sx={{ color: "rgba(255,255,255,0.95)", fontWeight: 500, fontSize: "1rem" }}>
                    {label}
                  </Typography>
                </Box>
              ))}
              <Button
                variant="contained"
                fullWidth
                onClick={handleGetStarted}
                endIcon={<ArrowForward />}
                className="cta-button-new"
                sx={{
                  mt: 3,
                  py: 1.75,
                  fontSize: "1.1rem",
                }}
              >
                Try for Free
              </Button>
            </Box>
          </Box>
        </Container>
      </Box>

      {/* Footer */}
      <Box className="footer-new">
        <Container maxWidth="lg" sx={{ px: { xs: 1, sm: 2, md: 4 } }}>
          <Box sx={{ py: { xs: 3, md: 4 }, textAlign: "center", px: { xs: 1, sm: 1, md: 0 } }}>
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
            <Box sx={{ 
              display: "flex", 
              flexWrap: "nowrap", 
              justifyContent: "center", 
              gap: { xs: 0.75, sm: 1.5, md: 2 }, 
              alignItems: "center",
              width: "100%",
              overflow: "visible",
              whiteSpace: "nowrap",
              flexShrink: 0
            }}>
              <Typography variant="body2" sx={{ 
                color: "rgba(255,255,255,0.5)", 
                fontSize: { xs: "0.65rem", sm: "0.75rem", md: "0.875rem" },
                whiteSpace: "nowrap",
                flexShrink: 0,
                overflow: "visible",
                textOverflow: "clip"
              }}>
                © 2026 Sphinic. All rights reserved.
              </Typography>
              <Link
                component={RouterLink}
                to="/privacy"
                sx={{
                  color: "rgba(255,255,255,0.7)",
                  textDecoration: "none",
                  fontSize: { xs: "0.65rem", sm: "0.75rem", md: "0.875rem" },
                  whiteSpace: "nowrap",
                  flexShrink: 0,
                  overflow: "visible",
                  "&:hover": {
                    color: "#4facfe",
                    textDecoration: "underline",
                  },
                }}
              >
                Privacy Policy
              </Link>
              <Typography variant="body2" sx={{ 
                color: "rgba(255,255,255,0.5)", 
                fontSize: { xs: "0.65rem", sm: "0.75rem", md: "0.875rem" },
                whiteSpace: "nowrap",
                flexShrink: 0
              }}>
                |
              </Typography>
              <Link
                component={RouterLink}
                to="/terms"
                sx={{
                  color: "rgba(255,255,255,0.7)",
                  textDecoration: "none",
                  fontSize: { xs: "0.65rem", sm: "0.75rem", md: "0.875rem" },
                  whiteSpace: "nowrap",
                  flexShrink: 0,
                  overflow: "visible",
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

