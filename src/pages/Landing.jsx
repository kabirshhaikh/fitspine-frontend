import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
} from "@mui/material";
import {
  TrendingUp,
  FitnessCenter,
  Psychology,
  ArrowForward,
  CheckCircle,
  MonitorHeart,
  SmartToy,
  NotificationsActive,
} from "@mui/icons-material";

const Landing = () => {
  const navigate = useNavigate();
  const observerRef = useRef();

  useEffect(() => {
    // Intersection Observer for smooth animations
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
    <Box
      sx={{
        minHeight: "100vh",
        background: `
          radial-gradient(circle at 20% 50%, rgba(120, 119, 198, 0.3) 0%, transparent 50%),
          radial-gradient(circle at 80% 20%, rgba(255, 119, 198, 0.3) 0%, transparent 50%),
          radial-gradient(circle at 40% 80%, rgba(120, 219, 255, 0.3) 0%, transparent 50%),
          linear-gradient(135deg, #0f0f23 0%, #1a1a2e 25%, #16213e 50%, #0f3460 75%, #533483 100%)
        `,
        overflow: "hidden",
        position: "relative",
      }}
    >
      {/* Animated Background Particles */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `
            radial-gradient(2px 2px at 20px 30px, rgba(255,255,255,0.3), transparent),
            radial-gradient(2px 2px at 40px 70px, rgba(255,255,255,0.2), transparent),
            radial-gradient(1px 1px at 90px 40px, rgba(255,255,255,0.4), transparent),
            radial-gradient(1px 1px at 130px 80px, rgba(255,255,255,0.3), transparent),
            radial-gradient(2px 2px at 160px 30px, rgba(255,255,255,0.2), transparent)
          `,
          backgroundRepeat: "repeat",
          backgroundSize: "200px 200px",
          animation: "sparkle 20s linear infinite",
          zIndex: 1,
        }}
      />

      {/* Floating Orbs */}
      <Box
        sx={{
          position: "absolute",
          top: "10%",
          left: "10%",
          width: 300,
          height: 300,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(120, 119, 198, 0.1) 0%, transparent 70%)",
          animation: "float 15s ease-in-out infinite",
          filter: "blur(1px)",
        }}
      />
      <Box
        sx={{
          position: "absolute",
          bottom: "20%",
          right: "15%",
          width: 200,
          height: 200,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(255, 119, 198, 0.1) 0%, transparent 70%)",
          animation: "float 12s ease-in-out infinite reverse",
          filter: "blur(1px)",
        }}
      />
      <Box
        sx={{
          position: "absolute",
          top: "60%",
          left: "70%",
          width: 150,
          height: 150,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(120, 219, 255, 0.1) 0%, transparent 70%)",
          animation: "float 18s ease-in-out infinite",
          filter: "blur(1px)",
        }}
      />
      {/* Hero Section */}
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          position: "relative",
          overflow: "hidden",
          zIndex: 2,
        }}
      >
        <Container maxWidth="lg">
          <Box
            className="animate-on-scroll"
            sx={{
              textAlign: "center",
              color: "white",
              opacity: 0,
              transform: "translateY(50px)",
              transition: "all 1.2s cubic-bezier(0.4, 0, 0.2, 1)",
            }}
          >
            {/* Glassmorphism Card */}
            <Box
              sx={{
                background: "rgba(255, 255, 255, 0.05)",
                backdropFilter: "blur(20px)",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                borderRadius: "24px",
                p: { xs: 4, md: 6 },
                mb: 4,
                boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)",
                position: "relative",
                overflow: "hidden",
                "&::before": {
                  content: '""',
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  height: "1px",
                  background:
                    "linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)",
                },
              }}
            >
              <Typography
                variant="h1"
                sx={{
                  fontSize: { xs: "2.5rem", md: "4.5rem", lg: "5rem" },
                  fontWeight: 900,
                  mb: 3,
                  background:
                    "linear-gradient(135deg, #ffffff 0%, #a8edea 50%, #fed6e3 100%)",
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  textShadow: "0 0 30px rgba(255,255,255,0.3)",
                  letterSpacing: "-0.02em",
                  lineHeight: 1.1,
                }}
              >
                Your Spine, Your Strength.
              </Typography>

              <Typography
                variant="h5"
                sx={{
                  fontSize: { xs: "1.1rem", md: "1.4rem" },
                  fontWeight: 300,
                  mb: 4,
                  maxWidth: 800,
                  mx: "auto",
                  lineHeight: 1.6,
                  color: "rgba(255, 255, 255, 0.8)",
                  textShadow: "0 2px 4px rgba(0,0,0,0.3)",
                }}
              >
                Discover patterns, track progress, and gain daily insights that
                help you protect and strengthen your spine.
              </Typography>

              <Button
                variant="contained"
                size="large"
                onClick={handleGetStarted}
                endIcon={<ArrowForward />}
                sx={{
                  background:
                    "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                  borderRadius: "50px",
                  px: 6,
                  py: 2,
                  fontSize: "1.2rem",
                  fontWeight: 600,
                  textTransform: "none",
                  boxShadow: "0 10px 40px rgba(102, 126, 234, 0.4)",
                  border: "1px solid rgba(255, 255, 255, 0.2)",
                  position: "relative",
                  overflow: "hidden",
                  transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                  "&::before": {
                    content: '""',
                    position: "absolute",
                    top: 0,
                    left: "-100%",
                    width: "100%",
                    height: "100%",
                    background:
                      "linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)",
                    transition: "left 0.5s",
                  },
                  "&:hover": {
                    transform: "translateY(-3px) scale(1.02)",
                    boxShadow: "0 20px 60px rgba(102, 126, 234, 0.6)",
                    background:
                      "linear-gradient(135deg, #764ba2 0%, #667eea 100%)",
                    "&::before": {
                      left: "100%",
                    },
                  },
                }}
              >
                Get My Insights
              </Button>
            </Box>
          </Box>

          {/* Pro Tip Banner */}
          <Box
            sx={{
              mt: 4,
              p: 3,
              background: "rgba(102, 126, 234, 0.1)",
              backdropFilter: "blur(10px)",
              border: "1px solid rgba(102, 126, 234, 0.3)",
              borderRadius: "16px",
              display: "flex",
              alignItems: "center",
              gap: 2,
              boxShadow: "0 4px 20px rgba(102, 126, 234, 0.2)",
            }}
          >
            <Box
              sx={{
                width: 48,
                height: 48,
                borderRadius: "50%",
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
                boxShadow: "0 4px 15px rgba(102, 126, 234, 0.4)",
              }}
            >
              <Typography sx={{ fontSize: 24 }}>💡</Typography>
            </Box>
            <Box>
              <Typography
                variant="body1"
                sx={{
                  color: "white",
                  fontWeight: 600,
                  fontSize: "1.1rem",
                  mb: 0.5,
                }}
              >
                Pro Tip for Best Results
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  color: "rgba(255, 255, 255, 0.8)",
                  fontSize: "0.95rem",
                  lineHeight: 1.5,
                }}
              >
                Connect a wearable device and log daily for the most accurate
                Disc Protection Score and personalized insights.
              </Typography>
            </Box>
          </Box>
        </Container>
      </Box>

      {/* Story Section */}
      <Box
        sx={{
          py: 12,
          background: `
            radial-gradient(circle at 30% 20%, rgba(120, 119, 198, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 70% 80%, rgba(255, 119, 198, 0.1) 0%, transparent 50%),
            linear-gradient(135deg, #0f0f23 0%, #1a1a2e 25%, #16213e 50%, #0f3460 75%, #533483 100%)
          `,
          position: "relative",
        }}
      >
        <Container maxWidth="lg">
          <Box
            className="animate-on-scroll"
            sx={{
              textAlign: "center",
              mb: 8,
              opacity: 0,
              transform: "translateY(50px)",
              transition: "all 1s cubic-bezier(0.4, 0, 0.2, 1)",
            }}
          >
            <Typography
              variant="h2"
              sx={{
                fontSize: { xs: "2.5rem", md: "4rem" },
                fontWeight: 900,
                mb: 4,
                background:
                  "linear-gradient(135deg, #ffffff 0%, #a8edea 50%, #fed6e3 100%)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                textShadow: "0 0 30px rgba(255,255,255,0.3)",
                letterSpacing: "-0.02em",
              }}
            >
              Your Journey to Better Spine Health
            </Typography>
            <Typography
              variant="h6"
              sx={{
                color: "rgba(255, 255, 255, 0.8)",
                maxWidth: 700,
                mx: "auto",
                lineHeight: 1.6,
                fontSize: "1.2rem",
                fontWeight: 300,
              }}
            >
              From data collection to actionable insights - see how FitSpine
              transforms your daily habits into powerful health intelligence.
            </Typography>
          </Box>

          {/* Timeline Story */}
          <Box
            sx={{
              position: "relative",
              display: "flex",
              justifyContent: "center",
            }}
          >
            {/* Story Steps */}
            <Grid container spacing={4} sx={{ alignItems: "center" }}>
              {/* Step 1: Current Integration */}
              <Grid item xs={12}>
                <Box
                  className="animate-on-scroll"
                  sx={{
                    opacity: 0,
                    transform: "translateX(-50px)",
                    transition: "all 0.8s ease-out",
                    "&.animate-in": {
                      opacity: 1,
                      transform: "translateX(0)",
                    },
                  }}
                >
                  <Card
                    sx={{
                      p: 4,
                      borderRadius: "20px",
                      background: "rgba(255, 255, 255, 0.05)",
                      backdropFilter: "blur(20px)",
                      border: "1px solid rgba(255, 255, 255, 0.1)",
                      boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)",
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                      position: "relative",
                      overflow: "hidden",
                      transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                      "&:hover": {
                        transform: "translateY(-8px) scale(1.02)",
                        boxShadow: "0 20px 60px rgba(79, 195, 247, 0.4)",
                        border: "1px solid rgba(79, 195, 247, 0.3)",
                      },
                      "&::before": {
                        content: '""',
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        height: "1px",
                        background:
                          "linear-gradient(90deg, transparent, rgba(79, 195, 247, 0.5), transparent)",
                      },
                    }}
                  >
                    <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
                      <Box
                        sx={{
                          width: 60,
                          height: 60,
                          borderRadius: "50%",
                          background:
                            "linear-gradient(135deg, #4fc3f7, #29b6f6)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          mr: 3,
                          boxShadow: "0 4px 15px rgba(79, 195, 247, 0.3)",
                        }}
                      >
                        <FitnessCenter sx={{ color: "white", fontSize: 30 }} />
                      </Box>
                      <Box>
                        <Typography
                          variant="h6"
                          sx={{
                            fontWeight: 700,
                            color: "#4fc3f7",
                            fontSize: "1.1rem",
                          }}
                        >
                          Now Available
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{
                            color: "rgba(255, 255, 255, 0.7)",
                            fontSize: "0.9rem",
                          }}
                        >
                          Fitbit Integration
                        </Typography>
                      </Box>
                    </Box>

                    <Typography
                      variant="body1"
                      sx={{
                        color: "rgba(255, 255, 255, 0.8)",
                        lineHeight: 1.6,
                        fontSize: "1rem",
                      }}
                    >
                      Seamlessly sync your daily activity, sleep patterns, and
                      heart rate data from your Fitbit device. No manual entry
                      required.
                    </Typography>
                  </Card>
                </Box>
              </Grid>

              {/* Step 2: Coming Soon */}
              <Grid item xs={12}>
                <Box
                  className="animate-on-scroll"
                  sx={{
                    opacity: 0,
                    transform: "translateX(50px)",
                    transition: "all 0.8s ease-out",
                    "&.animate-in": {
                      opacity: 1,
                      transform: "translateX(0)",
                    },
                  }}
                >
                  <Card
                    sx={{
                      p: 4,
                      borderRadius: "20px",
                      background: "rgba(255, 255, 255, 0.05)",
                      backdropFilter: "blur(20px)",
                      border: "1px solid rgba(255, 255, 255, 0.1)",
                      boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)",
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                      position: "relative",
                      overflow: "hidden",
                      transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                      "&:hover": {
                        transform: "translateY(-8px) scale(1.02)",
                        boxShadow: "0 20px 60px rgba(156, 39, 176, 0.4)",
                        border: "1px solid rgba(156, 39, 176, 0.3)",
                      },
                      "&::before": {
                        content: '""',
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        height: "1px",
                        background:
                          "linear-gradient(90deg, transparent, rgba(156, 39, 176, 0.5), transparent)",
                      },
                    }}
                  >
                    <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
                      <Box
                        sx={{
                          width: 60,
                          height: 60,
                          borderRadius: "50%",
                          background:
                            "linear-gradient(45deg, #9c27b0, #7b1fa2)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          mr: 3,
                          boxShadow: "0 4px 15px rgba(156, 39, 176, 0.3)",
                        }}
                      >
                        <SmartToy sx={{ color: "white", fontSize: 30 }} />
                      </Box>
                      <Box>
                        <Typography
                          variant="h6"
                          sx={{
                            fontWeight: 700,
                            color: "#9c27b0",
                            fontSize: "1.1rem",
                          }}
                        >
                          Coming Soon
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{
                            color: "rgba(255, 255, 255, 0.7)",
                            fontSize: "0.9rem",
                          }}
                        >
                          Garmin, Apple Watch & Whoop
                        </Typography>
                      </Box>
                    </Box>

                    <Typography
                      variant="body1"
                      sx={{
                        color: "rgba(255, 255, 255, 0.8)",
                        lineHeight: 1.6,
                        fontSize: "1rem",
                      }}
                    >
                      Expanding our ecosystem to support Garmin, Apple Watch,
                      and Whoop devices. More data sources mean better insights
                      for your spine health.
                    </Typography>
                  </Card>
                </Box>
              </Grid>

              {/* Step 3: Daily Insights */}
              <Grid item xs={12}>
                <Box
                  className="animate-on-scroll"
                  sx={{
                    opacity: 0,
                    transform: "translateX(-50px)",
                    transition: "all 0.8s ease-out",
                    "&.animate-in": {
                      opacity: 1,
                      transform: "translateX(0)",
                    },
                  }}
                >
                  <Card
                    sx={{
                      p: 4,
                      borderRadius: "20px",
                      background: "rgba(255, 255, 255, 0.05)",
                      backdropFilter: "blur(20px)",
                      border: "1px solid rgba(255, 255, 255, 0.1)",
                      boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)",
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                      position: "relative",
                      overflow: "hidden",
                      transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                      "&:hover": {
                        transform: "translateY(-8px) scale(1.02)",
                        boxShadow: "0 20px 60px rgba(76, 175, 80, 0.4)",
                        border: "1px solid rgba(76, 175, 80, 0.3)",
                      },
                      "&::before": {
                        content: '""',
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        height: "1px",
                        background:
                          "linear-gradient(90deg, transparent, rgba(76, 175, 80, 0.5), transparent)",
                      },
                    }}
                  >
                    <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
                      <Box
                        sx={{
                          width: 60,
                          height: 60,
                          borderRadius: "50%",
                          background:
                            "linear-gradient(45deg, #4caf50, #388e3c)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          mr: 3,
                          boxShadow: "0 4px 15px rgba(76, 175, 80, 0.3)",
                        }}
                      >
                        <TrendingUp sx={{ color: "white", fontSize: 30 }} />
                      </Box>
                      <Box>
                        <Typography
                          variant="h6"
                          sx={{
                            fontWeight: 700,
                            color: "#4caf50",
                            fontSize: "1.1rem",
                          }}
                        >
                          Daily Disc Score
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{
                            color: "rgba(255, 255, 255, 0.7)",
                            fontSize: "0.9rem",
                          }}
                        >
                          & Flare-up Insights
                        </Typography>
                      </Box>
                    </Box>

                    <Typography
                      variant="body1"
                      sx={{
                        color: "rgba(255, 255, 255, 0.8)",
                        lineHeight: 1.6,
                        fontSize: "1rem",
                      }}
                    >
                      Your Disc Protection Score is a personalized wellness
                      indicator designed to help you understand trends in your
                      posture, stress, and recovery habits. It is not a medical
                      or diagnostic score.
                    </Typography>
                  </Card>
                </Box>
              </Grid>

              {/* Step 4: Manual Logs */}
              <Grid item xs={12}>
                <Box
                  className="animate-on-scroll"
                  sx={{
                    opacity: 0,
                    transform: "translateX(50px)",
                    transition: "all 0.8s ease-out",
                    "&.animate-in": {
                      opacity: 1,
                      transform: "translateX(0)",
                    },
                  }}
                >
                  <Card
                    sx={{
                      p: 4,
                      borderRadius: "20px",
                      background: "rgba(255, 255, 255, 0.05)",
                      backdropFilter: "blur(20px)",
                      border: "1px solid rgba(255, 255, 255, 0.1)",
                      boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)",
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                      position: "relative",
                      overflow: "hidden",
                      transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                      "&:hover": {
                        transform: "translateY(-8px) scale(1.02)",
                        boxShadow: "0 20px 60px rgba(255, 152, 0, 0.4)",
                        border: "1px solid rgba(255, 152, 0, 0.3)",
                      },
                      "&::before": {
                        content: '""',
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        height: "1px",
                        background:
                          "linear-gradient(90deg, transparent, rgba(255, 152, 0, 0.5), transparent)",
                      },
                    }}
                  >
                    <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
                      <Box
                        sx={{
                          width: 60,
                          height: 60,
                          borderRadius: "50%",
                          background:
                            "linear-gradient(45deg, #ff9800, #f57c00)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          mr: 3,
                          boxShadow: "0 4px 15px rgba(255, 152, 0, 0.3)",
                        }}
                      >
                        <NotificationsActive
                          sx={{ color: "white", fontSize: 30 }}
                        />
                      </Box>
                      <Box>
                        <Typography
                          variant="h6"
                          sx={{
                            fontWeight: 700,
                            color: "#ff9800",
                            fontSize: "1.1rem",
                          }}
                        >
                          Enhanced Insights
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{
                            color: "rgba(255, 255, 255, 0.7)",
                            fontSize: "0.9rem",
                          }}
                        >
                          Connect + Log for Best Results
                        </Typography>
                      </Box>
                    </Box>

                    <Typography
                      variant="body1"
                      sx={{
                        color: "rgba(255, 255, 255, 0.8)",
                        lineHeight: 1.6,
                        fontSize: "1rem",
                        mb: 2,
                      }}
                    >
                      FitSpine's AI combines your daily logs and wearable data
                      to create meaningful insights — tracking what's improving,
                      what's worsening, and what may be causing your flare-ups.
                      You'll receive personalized summaries each day, including
                      your Disc Protection Score, recovery insights, and simple,
                      data-backed advice to help you protect your spine.
                    </Typography>

                    <Typography
                      variant="body2"
                      sx={{
                        color: "rgba(255, 255, 255, 0.7)",
                        lineHeight: 1.5,
                        fontSize: "0.9rem",
                        fontStyle: "italic",
                      }}
                    >
                      For the most accurate results, we recommend connecting
                      your wearable device along with adding manual logs about
                      your pain levels, posture, and activities — the more
                      context you provide, the smarter your insights become.
                    </Typography>
                  </Card>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Container>
      </Box>

      {/* Features Section */}
      <Box
        sx={{
          py: 12,
          background: `
            radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(255, 119, 198, 0.1) 0%, transparent 50%),
            linear-gradient(135deg, #0f0f23 0%, #1a1a2e 25%, #16213e 50%, #0f3460 75%, #533483 100%)
          `,
          position: "relative",
        }}
      >
        <Container maxWidth="lg">
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Grid container spacing={6}>
              {/* Section 1: Simple daily logs */}
              <Grid item xs={12}>
                <Card
                  className="animate-on-scroll"
                  sx={{
                    borderRadius: "20px",
                    background: "rgba(255, 255, 255, 0.05)",
                    backdropFilter: "blur(20px)",
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                    boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)",
                    opacity: 0,
                    transform: "translateY(50px)",
                    transition: "all 1s cubic-bezier(0.4, 0, 0.2, 1)",
                    position: "relative",
                    overflow: "hidden",
                    animation: "morphing 12s ease-in-out infinite",
                    "&.animate-in": {
                      opacity: 1,
                      transform: "translateY(0)",
                    },
                    "&:hover": {
                      transform: "translateY(-8px) scale(1.01)",
                      boxShadow: "0 20px 60px rgba(79, 195, 247, 0.4)",
                      border: "1px solid rgba(79, 195, 247, 0.3)",
                      animation: "none",
                    },
                    "&::before": {
                      content: '""',
                      position: "absolute",
                      top: 0,
                      left: 0,
                      right: 0,
                      height: "1px",
                      background:
                        "linear-gradient(90deg, transparent, rgba(79, 195, 247, 0.5), transparent)",
                    },
                  }}
                >
                  <CardContent sx={{ p: 4 }}>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        mb: 3,
                        color: "#4fc3f7",
                      }}
                    >
                      <TrendingUp
                        sx={{
                          fontSize: 40,
                          mr: 2,
                          filter:
                            "drop-shadow(0 0 8px rgba(79, 195, 247, 0.5))",
                        }}
                      />
                      <Typography
                        variant="h4"
                        sx={{
                          fontWeight: 700,
                          color: "#4fc3f7",
                          textShadow: "0 2px 4px rgba(0,0,0,0.3)",
                        }}
                      >
                        Your habits tell the story
                      </Typography>
                    </Box>

                    <Typography
                      variant="body1"
                      sx={{
                        fontSize: "1.1rem",
                        lineHeight: 1.7,
                        color: "rgba(255, 255, 255, 0.8)",
                        mb: 3,
                        textShadow: "0 1px 2px rgba(0,0,0,0.3)",
                      }}
                    >
                      Every day, just log how your spine feels — pain level,
                      stiffness, sitting hours, or stress. FitSpine learns from
                      these entries and combines them with your wearable data to
                      generate your daily <strong>Disc Protection Score</strong>{" "}
                      and actionable insights. Small habits, big awareness.{" "}
                    </Typography>

                    {/* Animated form to dashboard transition */}
                    <Box
                      sx={{
                        height: 200,
                        background: "linear-gradient(45deg, #e3f2fd, #bbdefb)",
                        borderRadius: 3,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        position: "relative",
                        overflow: "hidden",
                      }}
                    >
                      {/* Animated Progress Ring */}
                      <Box
                        sx={{
                          position: "absolute",
                          top: "50%",
                          left: "50%",
                          transform: "translate(-50%, -50%)",
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                        }}
                      >
                        {/* Progress Ring */}
                        <Box
                          sx={{
                            position: "relative",
                            width: 120,
                            height: 120,
                            mb: 2,
                          }}
                        >
                          {/* Background Ring */}
                          <Box
                            sx={{
                              position: "absolute",
                              width: "100%",
                              height: "100%",
                              borderRadius: "50%",
                              border: "8px solid rgba(25, 118, 210, 0.2)",
                            }}
                          />
                          {/* Progress Ring */}
                          <Box
                            sx={{
                              position: "absolute",
                              width: "100%",
                              height: "100%",
                              borderRadius: "50%",
                              border: "8px solid transparent",
                              borderTop: "8px solid #4caf50",
                              borderRight: "8px solid #4caf50",
                              borderBottom: "8px solid #4caf50",
                              borderLeft: "8px solid #81c784",
                              transform: "rotate(-90deg)",
                              animation: "fillRing 3s ease-out forwards",
                            }}
                          />
                          {/* Score in Center */}
                          <Box
                            sx={{
                              position: "absolute",
                              top: "50%",
                              left: "50%",
                              transform: "translate(-50%, -50%)",
                              textAlign: "center",
                            }}
                          >
                            <Typography
                              variant="h3"
                              sx={{
                                fontWeight: 800,
                                color: "#4caf50",
                                animation: "countUp 3s ease-out forwards",
                              }}
                            >
                              85
                            </Typography>
                          </Box>
                        </Box>

                        {/* Score Breakdown */}
                        <Box sx={{ textAlign: "center", minWidth: 200 }}>
                          <Typography
                            variant="body2"
                            sx={{
                              color: "#666",
                              fontWeight: 500,
                              mb: 1,
                            }}
                          >
                            Disc Protection Score
                          </Typography>
                          <Box
                            sx={{
                              display: "flex",
                              justifyContent: "space-between",
                              fontSize: "0.75rem",
                              color: "#888",
                            }}
                          >
                            <span>Pain: 80%</span>
                            <span>Posture: 90%</span>
                            <span>Activity: 85%</span>
                          </Box>
                        </Box>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>

              {/* Section 2: Connect your wearables */}
              <Grid item xs={12}>
                <Card
                  className="animate-on-scroll"
                  sx={{
                    borderRadius: "20px",
                    background: "rgba(255, 255, 255, 0.05)",
                    backdropFilter: "blur(20px)",
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                    boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)",
                    opacity: 0,
                    transform: "translateY(50px)",
                    transition: "all 1s cubic-bezier(0.4, 0, 0.2, 1)",
                    position: "relative",
                    overflow: "hidden",
                    animation: "morphing 12s ease-in-out infinite",
                    "&.animate-in": {
                      opacity: 1,
                      transform: "translateY(0)",
                    },
                    "&:hover": {
                      transform: "translateY(-8px) scale(1.01)",
                      boxShadow: "0 20px 60px rgba(156, 39, 176, 0.4)",
                      border: "1px solid rgba(156, 39, 176, 0.3)",
                      animation: "none",
                    },
                    "&::before": {
                      content: '""',
                      position: "absolute",
                      top: 0,
                      left: 0,
                      right: 0,
                      height: "1px",
                      background:
                        "linear-gradient(90deg, transparent, rgba(156, 39, 176, 0.5), transparent)",
                    },
                  }}
                >
                  <CardContent sx={{ p: 4 }}>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        mb: 3,
                        color: "#9c27b0",
                      }}
                    >
                      <FitnessCenter
                        sx={{
                          fontSize: 40,
                          mr: 2,
                          filter:
                            "drop-shadow(0 0 8px rgba(156, 39, 176, 0.5))",
                        }}
                      />
                      <Typography
                        variant="h4"
                        sx={{
                          fontWeight: 700,
                          color: "#9c27b0",
                          textShadow: "0 2px 4px rgba(0,0,0,0.3)",
                        }}
                      >
                        Connect your wearables
                      </Typography>
                    </Box>

                    <Typography
                      variant="body1"
                      sx={{
                        fontSize: "1.1rem",
                        lineHeight: 1.7,
                        color: "rgba(255, 255, 255, 0.8)",
                        mb: 3,
                        textShadow: "0 1px 2px rgba(0,0,0,0.3)",
                      }}
                    >
                      Your Fitbit, Garmin, or Apple Watch automatically adds
                      movement and sleep data — no extra effort needed.
                    </Typography>

                    {/* Security & Privacy Message */}
                    <Box
                      sx={{
                        mt: 2,
                        mb: 3,
                        p: 2,
                        borderRadius: "12px",
                        background: "rgba(76, 175, 80, 0.1)",
                        border: "1px solid rgba(76, 175, 80, 0.2)",
                        display: "flex",
                        alignItems: "center",
                        gap: 2,
                      }}
                    >
                      <Box
                        sx={{
                          width: 40,
                          height: 40,
                          borderRadius: "50%",
                          background:
                            "linear-gradient(135deg, #4caf50, #66bb6a)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexShrink: 0,
                        }}
                      >
                        🔒
                      </Box>
                      <Typography
                        variant="body2"
                        sx={{
                          color: "rgba(255, 255, 255, 0.9)",
                          fontSize: "0.9rem",
                          lineHeight: 1.5,
                          fontWeight: 500,
                        }}
                      >
                        FitSpine connects securely using official APIs and never
                        stores your wearable credentials. Your health data
                        remains private and encrypted.
                      </Typography>
                    </Box>

                    {/* Spine Control Story Animation */}
                    <Box
                      sx={{
                        height: 200,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        position: "relative",
                        background: "linear-gradient(45deg, #f8f9fa, #e9ecef)",
                        borderRadius: 3,
                        overflow: "hidden",
                      }}
                    >
                      {/* Central Spine */}
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          zIndex: 3,
                        }}
                      >
                        {/* Cervical Spine (Neck) */}
                        <Box
                          sx={{
                            width: 18,
                            height: 35,
                            background:
                              "linear-gradient(180deg, #f44336, #ef5350)",
                            borderRadius: "8px 8px 4px 4px",
                            mb: 0.5,
                            animation: "spineStory 15s ease-in-out infinite",
                            animationDelay: "0s",
                            position: "relative",
                            "&::after": {
                              content: '""',
                              position: "absolute",
                              top: "50%",
                              left: "50%",
                              transform: "translate(-50%, -50%)",
                              width: "3px",
                              height: "25px",
                              background: "#fff",
                              borderRadius: "2px",
                            },
                          }}
                        />

                        {/* Thoracic Spine (Upper Back) */}
                        <Box
                          sx={{
                            width: 22,
                            height: 50,
                            background:
                              "linear-gradient(180deg, #f44336, #ef5350)",
                            borderRadius: "4px",
                            mb: 0.5,
                            animation: "spineStory 15s ease-in-out infinite",
                            animationDelay: "1s",
                            position: "relative",
                            "&::after": {
                              content: '""',
                              position: "absolute",
                              top: "50%",
                              left: "50%",
                              transform: "translate(-50%, -50%)",
                              width: "3px",
                              height: "40px",
                              background: "#fff",
                              borderRadius: "2px",
                            },
                          }}
                        />

                        {/* Lumbar Spine (Lower Back) */}
                        <Box
                          sx={{
                            width: 26,
                            height: 45,
                            background:
                              "linear-gradient(180deg, #f44336, #ef5350)",
                            borderRadius: "4px 4px 8px 8px",
                            animation: "spineStory 15s ease-in-out infinite",
                            animationDelay: "2s",
                            position: "relative",
                            "&::after": {
                              content: '""',
                              position: "absolute",
                              top: "50%",
                              left: "50%",
                              transform: "translate(-50%, -50%)",
                              width: "3px",
                              height: "35px",
                              background: "#fff",
                              borderRadius: "2px",
                            },
                          }}
                        />
                      </Box>

                      {/* Step 1: Wearables (Detection) */}
                      {[
                        { device: "😴", position: { top: "10%", left: "10%" } },
                        {
                          device: "🏃",
                          position: { top: "50%", right: "10%" },
                        },
                        {
                          device: "❤️",
                          position: { bottom: "10%", left: "15%" },
                        },
                      ].map((wearable, index) => (
                        <Box
                          key={`wearable-${index}`}
                          sx={{
                            position: "absolute",
                            ...wearable.position,
                            width: 40,
                            height: 40,
                            borderRadius: "50%",
                            background: "white",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            boxShadow: "0 4px 15px rgba(156, 39, 176, 0.3)",
                            border: "2px solid #9c27b0",
                            fontSize: "1.2rem",
                            animation:
                              "wearableDetect 15s ease-in-out infinite",
                            animationDelay: `${index * 0.5}s`,
                            zIndex: 2,
                          }}
                        >
                          {wearable.device}
                        </Box>
                      ))}

                      {/* Step 2: Data Flow (Scanning Beams) */}
                      {[0, 1, 2].map((beam) => (
                        <Box
                          key={`beam-${beam}`}
                          sx={{
                            position: "absolute",
                            top: "50%",
                            left: "50%",
                            width: "2px",
                            height: "80px",
                            background:
                              "linear-gradient(180deg, transparent, #2196f3, transparent)",
                            transform: `translate(-50%, -50%) rotate(${
                              beam * 120
                            }deg)`,
                            transformOrigin: "center",
                            animation: "dataFlow 15s ease-in-out infinite",
                            animationDelay: `${3 + beam * 0.3}s`,
                            zIndex: 1,
                          }}
                        />
                      ))}

                      {/* Step 3: AI Processing */}
                      <Box
                        sx={{
                          position: "absolute",
                          top: "5%",
                          left: "50%",
                          transform: "translateX(-50%)",
                          display: "flex",
                          alignItems: "center",
                          gap: 1,
                          background: "rgba(33, 150, 243, 0.9)",
                          color: "white",
                          px: 2,
                          py: 0.5,
                          borderRadius: "20px",
                          fontSize: "0.7rem",
                          fontWeight: 600,
                          animation: "aiProcessing 15s ease-in-out infinite",
                          animationDelay: "6s",
                          zIndex: 4,
                        }}
                      >
                        <Box
                          sx={{
                            width: 8,
                            height: 8,
                            borderRadius: "50%",
                            background: "white",
                            animation:
                              "processingPulse 1s ease-in-out infinite",
                          }}
                        />
                        AI Analyzing...
                      </Box>

                      {/* Step 4: Insights (Notification Bubbles) */}
                      {[
                        {
                          text: "Poor posture detected",
                          position: { top: "15%", right: "5%" },
                        },
                        {
                          text: "Sitting too long",
                          position: { top: "40%", left: "5%" },
                        },
                        {
                          text: "Take a break!",
                          position: { bottom: "20%", right: "8%" },
                        },
                      ].map((insight, index) => (
                        <Box
                          key={`insight-${index}`}
                          sx={{
                            position: "absolute",
                            ...insight.position,
                            background: "rgba(255, 193, 7, 0.9)",
                            color: "#333",
                            px: 1.5,
                            py: 0.5,
                            borderRadius: "12px",
                            fontSize: "0.6rem",
                            fontWeight: 600,
                            maxWidth: "80px",
                            textAlign: "center",
                            animation:
                              "insightsBubble 15s ease-in-out infinite",
                            animationDelay: `${9 + index * 0.5}s`,
                            zIndex: 4,
                            "&::after": {
                              content: '""',
                              position: "absolute",
                              bottom: "-5px",
                              left: "50%",
                              transform: "translateX(-50%)",
                              width: 0,
                              height: 0,
                              borderLeft: "5px solid transparent",
                              borderRight: "5px solid transparent",
                              borderTop: "5px solid rgba(255, 193, 7, 0.9)",
                            },
                          }}
                        >
                          {insight.text}
                        </Box>
                      ))}

                      {/* Step 5: Control Message */}
                      <Box
                        sx={{
                          position: "absolute",
                          bottom: "5%",
                          left: "50%",
                          transform: "translateX(-50%)",
                          background: "rgba(76, 175, 80, 0.9)",
                          color: "white",
                          px: 3,
                          py: 1,
                          borderRadius: "25px",
                          fontSize: "0.8rem",
                          fontWeight: 700,
                          animation: "controlMessage 15s ease-in-out infinite",
                          animationDelay: "12s",
                          zIndex: 4,
                        }}
                      >
                        You are in Control! 🎯
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>

              {/* Section 3: AI that understands your spine */}
              <Grid item xs={12}>
                <Card
                  className="animate-on-scroll"
                  sx={{
                    borderRadius: "20px",
                    background: "rgba(255, 255, 255, 0.05)",
                    backdropFilter: "blur(20px)",
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                    boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)",
                    opacity: 0,
                    transform: "translateY(50px)",
                    transition: "all 1s cubic-bezier(0.4, 0, 0.2, 1)",
                    position: "relative",
                    overflow: "hidden",
                    animation: "morphing 12s ease-in-out infinite",
                    "&.animate-in": {
                      opacity: 1,
                      transform: "translateY(0)",
                    },
                    "&:hover": {
                      transform: "translateY(-8px) scale(1.01)",
                      boxShadow: "0 20px 60px rgba(76, 175, 80, 0.4)",
                      border: "1px solid rgba(76, 175, 80, 0.3)",
                      animation: "none",
                    },
                    "&::before": {
                      content: '""',
                      position: "absolute",
                      top: 0,
                      left: 0,
                      right: 0,
                      height: "1px",
                      background:
                        "linear-gradient(90deg, transparent, rgba(76, 175, 80, 0.5), transparent)",
                    },
                  }}
                >
                  <CardContent sx={{ p: 4 }}>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        mb: 3,
                        color: "#4caf50",
                      }}
                    >
                      <Psychology
                        sx={{
                          fontSize: 40,
                          mr: 2,
                          filter: "drop-shadow(0 0 8px rgba(76, 175, 80, 0.5))",
                        }}
                      />
                      <Typography
                        variant="h4"
                        sx={{
                          fontWeight: 700,
                          color: "#4caf50",
                          textShadow: "0 2px 4px rgba(0,0,0,0.3)",
                        }}
                      >
                        AI that learns from your lifestyle
                      </Typography>
                    </Box>

                    <Typography
                      variant="body1"
                      sx={{
                        fontSize: "1.1rem",
                        lineHeight: 1.7,
                        color: "rgba(255, 255, 255, 0.8)",
                        mb: 3,
                        textShadow: "0 1px 2px rgba(0,0,0,0.3)",
                      }}
                    >
                      FitSpine’s AI studies patterns in your sleep, activity,
                      posture, and daily logs to uncover early signs of strain
                      and stress. It turns your data into daily
                      <strong> Disc Protection Insights</strong> — showing
                      what’s improving, what needs attention, and how your
                      habits shape your recovery journey. Gentle nudges help you
                      stay consistent and protect your spine over time.
                    </Typography>

                    {/* AI Brain Learning from Lifestyle */}
                    <Box
                      sx={{
                        height: 200,
                        background: "linear-gradient(45deg, #e8f5e8, #c8e6c9)",
                        borderRadius: 3,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        position: "relative",
                        overflow: "hidden",
                      }}
                    >
                      {/* Central AI Brain */}
                      <Box
                        sx={{
                          width: 70,
                          height: 70,
                          borderRadius: "50%",
                          background:
                            "linear-gradient(135deg, #4caf50, #66bb6a)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          boxShadow: "0 0 30px rgba(76, 175, 80, 0.5)",
                          animation: "brainPulse 2s ease-in-out infinite",
                          zIndex: 3,
                          position: "relative",
                        }}
                      >
                        <Psychology
                          sx={{
                            color: "white",
                            fontSize: 30,
                          }}
                        />
                      </Box>

                      {/* Lifestyle Data Nodes */}
                      {[
                        {
                          icon: "😴",
                          label: "Sleep",
                          position: {
                            top: "18%",
                            left: "3%",
                          },
                          color: "#673ab7",
                        },
                        {
                          icon: "😰",
                          label: "Stress",
                          position: {
                            bottom: "18%",
                            left: "3%",
                          },
                          color: "#f44336",
                        },
                        {
                          icon: "🏃",
                          label: "Activity",
                          position: {
                            top: "18%",
                            right: "3%",
                          },
                          color: "#ff9800",
                        },
                        {
                          icon: "❤️",
                          label: "Heart",
                          position: {
                            bottom: "18%",
                            right: "3%",
                          },
                          color: "#e91e63",
                        },
                      ].map((node, index) => (
                        <Box key={node.label}>
                          {/* Lifestyle Node */}
                          <Box
                            sx={{
                              position: "absolute",
                              ...node.position,
                              display: "flex",
                              flexDirection: "column",
                              alignItems: "center",
                              animation:
                                "lifestyleNode 3s ease-in-out infinite",
                              animationDelay: `${index * 0.5}s`,
                            }}
                          >
                            <Box
                              sx={{
                                width: 40,
                                height: 40,
                                borderRadius: "50%",
                                background: "white",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                boxShadow: `0 4px 15px ${node.color}40`,
                                border: `2px solid ${node.color}`,
                                fontSize: "1.1rem",
                                mb: 0.5,
                              }}
                            >
                              {node.icon}
                            </Box>
                            <Typography
                              variant="caption"
                              sx={{
                                fontWeight: 600,
                                color: node.color,
                                fontSize: "0.55rem",
                                textAlign: "center",
                                maxWidth: "50px",
                                lineHeight: 1.2,
                              }}
                            >
                              {node.label}
                            </Typography>
                          </Box>
                        </Box>
                      ))}

                      {/* Learning Indicator */}
                      <Box
                        sx={{
                          position: "absolute",
                          top: "4%",
                          left: "50%",
                          transform: "translateX(-50%)",
                          background: "rgba(76, 175, 80, 0.9)",
                          color: "white",
                          px: 2,
                          py: 0.4,
                          borderRadius: "15px",
                          fontSize: "0.65rem",
                          fontWeight: 600,
                          animation:
                            "learningIndicator 3s ease-in-out infinite",
                          zIndex: 4,
                          textAlign: "center",
                          maxWidth: "90%",
                        }}
                      >
                        🧠 Learning Your Patterns...
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Box>
        </Container>
      </Box>

      {/* Closing CTA Section */}
      <Box
        sx={{
          py: 12,
          background: `
            radial-gradient(circle at 50% 20%, rgba(120, 119, 198, 0.2) 0%, transparent 50%),
            radial-gradient(circle at 30% 80%, rgba(255, 119, 198, 0.2) 0%, transparent 50%),
            linear-gradient(135deg, #0f0f23 0%, #1a1a2e 25%, #16213e 50%, #0f3460 75%, #533483 100%)
          `,
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Floating Background Elements */}
        <Box
          sx={{
            position: "absolute",
            top: "20%",
            right: "10%",
            width: 200,
            height: 200,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(255, 119, 198, 0.1) 0%, transparent 70%)",
            animation: "float 15s ease-in-out infinite",
            filter: "blur(2px)",
          }}
        />
        <Box
          sx={{
            position: "absolute",
            bottom: "30%",
            left: "15%",
            width: 150,
            height: 150,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(120, 219, 255, 0.1) 0%, transparent 70%)",
            animation: "float 12s ease-in-out infinite reverse",
            filter: "blur(2px)",
          }}
        />

        <Container maxWidth="lg">
          <Box
            className="animate-on-scroll"
            sx={{
              textAlign: "center",
              color: "white",
              opacity: 0,
              transform: "translateY(50px)",
              transition: "all 1.2s cubic-bezier(0.4, 0, 0.2, 1)",
            }}
          >
            {/* Glassmorphism CTA Card */}
            <Box
              sx={{
                background: "rgba(255, 255, 255, 0.05)",
                backdropFilter: "blur(20px)",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                borderRadius: "24px",
                p: { xs: 4, md: 6 },
                mb: 4,
                boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)",
                position: "relative",
                overflow: "visible",
                animation: "morphing 15s ease-in-out infinite",
                zIndex: 5,
                "&::before": {
                  content: '""',
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  height: "1px",
                  background:
                    "linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)",
                  pointerEvents: "none",
                },
              }}
            >
              <Typography
                variant="h2"
                sx={{
                  fontSize: { xs: "2.5rem", md: "4rem", lg: "4.5rem" },
                  fontWeight: 900,
                  mb: 4,
                  background:
                    "linear-gradient(135deg, #ffffff 0%, #a8edea 50%, #fed6e3 100%)",
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  textShadow: "0 0 30px rgba(255,255,255,0.3)",
                  letterSpacing: "-0.02em",
                  lineHeight: 1.1,
                }}
              >
                Your back pain doesn't define you.
              </Typography>

              <Typography
                variant="h6"
                sx={{
                  fontSize: { xs: "1.1rem", md: "1.4rem" },
                  fontWeight: 300,
                  mb: 6,
                  maxWidth: 800,
                  mx: "auto",
                  lineHeight: 1.6,
                  color: "rgba(255, 255, 255, 0.8)",
                  textShadow: "0 2px 4px rgba(0,0,0,0.3)",
                }}
              >
                We understand the frustration of chronic back pain. That's why
                we built FitSpine - to give you control over your spine health
                through data, insights, and personalized recommendations. Start
                with simple daily logs, connect your wearable device, and watch
                as your understanding of your body transforms into actionable
                insights.
              </Typography>
            </Box>
          </Box>
        </Container>
      </Box>

      {/* Footer Disclaimer */}
      <Box
        sx={{
          py: 3,
          textAlign: "center",
          background: "rgba(255,255,255,0.03)",
          borderTop: "1px solid rgba(255,255,255,0.1)",
          color: "rgba(255,255,255,0.6)",
          fontSize: "0.8rem",
          lineHeight: 1.6,
          backdropFilter: "blur(10px)",
        }}
      >
        Disclaimer: FitSpine does not provide medical advice, diagnosis, or
        treatment. The insights and scores are for informational and educational
        purposes only. Always consult a qualified healthcare professional for
        medical concerns or before making changes to your health routine.
      </Box>

      {/* CSS Animations */}
      <style>
        {`
          @keyframes float {
            0%, 100% { transform: translateY(0px) rotate(0deg); }
            50% { transform: translateY(-30px) rotate(5deg); }
          }
          
          @keyframes sparkle {
            0% { transform: translateX(0) translateY(0); }
            25% { transform: translateX(100px) translateY(-50px); }
            50% { transform: translateX(-50px) translateY(100px); }
            75% { transform: translateX(50px) translateY(-25px); }
            100% { transform: translateX(0) translateY(0); }
          }
          
          @keyframes floatToCenter {
            0%, 100% { transform: translate(0, 0) scale(1); }
            50% { transform: translate(-15px, -15px) scale(1.05); }
          }
          
          @keyframes glow {
            0%, 100% { 
              box-shadow: 0 0 30px rgba(79, 195, 247, 0.5);
              filter: brightness(1);
            }
            50% { 
              box-shadow: 0 0 60px rgba(79, 195, 247, 0.8);
              filter: brightness(1.2);
            }
          }
          
          @keyframes pulse {
            0%, 100% { 
              transform: scale(1);
              filter: brightness(1);
            }
            50% { 
              transform: scale(1.15);
              filter: brightness(1.3);
            }
          }

          @keyframes fillRing {
            0% {
              transform: rotate(-90deg) scale(0);
              opacity: 0;
            }
            50% {
              opacity: 1;
            }
            100% {
              transform: rotate(216deg) scale(1);
              opacity: 1;
            }
          }

          @keyframes countUp {
            0% {
              transform: scale(0.8);
              opacity: 0;
            }
            100% {
              transform: scale(1);
              opacity: 1;
            }
          }

          @keyframes spineStory {
            0%, 20% {
              background: linear-gradient(180deg, #f44336, #ef5350);
              transform: scale(1);
            }
            80%, 100% {
              background: linear-gradient(180deg, #4caf50, #66bb6a);
              transform: scale(1.05);
            }
          }

          @keyframes wearableDetect {
            0%, 15% {
              opacity: 0.5;
              transform: scale(0.8);
            }
            20%, 25% {
              opacity: 1;
              transform: scale(1.1);
              box-shadow: 0 0 20px rgba(156, 39, 176, 0.6);
            }
            30%, 100% {
              opacity: 0.7;
              transform: scale(1);
            }
          }

          @keyframes dataFlow {
            0%, 20% {
              opacity: 0;
              transform: translate(-50%, -50%) rotate(var(--rotation)) scaleY(0);
            }
            25%, 40% {
              opacity: 0.8;
              transform: translate(-50%, -50%) rotate(var(--rotation)) scaleY(1);
            }
            45%, 100% {
              opacity: 0;
              transform: translate(-50%, -50%) rotate(var(--rotation)) scaleY(0);
            }
          }

          @keyframes aiProcessing {
            0%, 40% {
              opacity: 0;
              transform: translateX(-50%) translateY(-20px);
            }
            45%, 60% {
              opacity: 1;
              transform: translateX(-50%) translateY(0px);
            }
            65%, 100% {
              opacity: 0;
              transform: translateX(-50%) translateY(20px);
            }
          }

          @keyframes processingPulse {
            0%, 100% {
              transform: scale(1);
              opacity: 1;
            }
            50% {
              transform: scale(1.3);
              opacity: 0.7;
            }
          }

          @keyframes insightsBubble {
            0%, 60% {
              opacity: 0;
              transform: scale(0.8) translateY(10px);
            }
            65%, 80% {
              opacity: 1;
              transform: scale(1) translateY(0px);
            }
            85%, 100% {
              opacity: 0;
              transform: scale(0.8) translateY(-10px);
            }
          }

          @keyframes controlMessage {
            0%, 80% {
              opacity: 0;
              transform: translateX(-50%) translateY(20px) scale(0.8);
            }
            85%, 100% {
              opacity: 1;
              transform: translateX(-50%) translateY(0px) scale(1);
            }
          }

          @keyframes brainPulse {
            0%, 100% {
              transform: scale(1);
              box-shadow: 0 0 30px rgba(76, 175, 80, 0.5);
            }
            50% {
              transform: scale(1.05);
              box-shadow: 0 0 40px rgba(76, 175, 80, 0.8);
            }
          }

          @keyframes brainWaves {
            0%, 100% {
              transform: scale(1);
              opacity: 0.3;
            }
            50% {
              transform: scale(1.2);
              opacity: 0.1;
            }
          }

          @keyframes lifestyleNode {
            0%, 100% {
              transform: translateY(0px) scale(1);
              opacity: 0.8;
            }
            50% {
              transform: translateY(-5px) scale(1.05);
              opacity: 1;
            }
          }

          @keyframes dataConnection {
            0%, 100% {
              opacity: 0.4;
              transform: translate(-50%, -50%) rotate(var(--rotation)) scaleX(0.8);
            }
            50% {
              opacity: 0.8;
              transform: translate(-50%, -50%) rotate(var(--rotation)) scaleX(1.1);
            }
          }

          @keyframes learningIndicator {
            0%, 100% {
              opacity: 0.7;
              transform: translateX(-50%) scale(1);
            }
            50% {
              opacity: 1;
              transform: translateX(-50%) scale(1.05);
            }
          }
          
          @keyframes drawLine {
            0% { 
              stroke-dashoffset: 100;
              opacity: 0;
            }
            50% {
              opacity: 1;
            }
            100% { 
              stroke-dashoffset: 0;
              opacity: 1;
            }
          }
          
          @keyframes fadeInOut {
            0%, 100% { 
              opacity: 0.3;
              transform: scale(1);
            }
            50% { 
              opacity: 1;
              transform: scale(1.1);
            }
          }
          
          @keyframes shimmer {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(100%); }
          }
          
          @keyframes morphing {
            0%, 100% { 
              border-radius: 20px;
              transform: rotate(0deg);
            }
            25% { 
              border-radius: 30px;
              transform: rotate(1deg);
            }
            50% { 
              border-radius: 15px;
              transform: rotate(-1deg);
            }
            75% { 
              border-radius: 25px;
              transform: rotate(0.5deg);
            }
          }
          
          .animate-on-scroll.animate-in {
            opacity: 1 !important;
            transform: translate(0, 0) !important;
          }
          
          /* Glassmorphism hover effects */
          .glass-card:hover {
            backdrop-filter: blur(30px);
            background: rgba(255, 255, 255, 0.1);
          }
          
          /* Smooth scrolling */
          html {
            scroll-behavior: smooth;
          }
          
          /* Custom scrollbar */
          ::-webkit-scrollbar {
            width: 8px;
          }
          
          ::-webkit-scrollbar-track {
            background: rgba(255, 255, 255, 0.1);
          }
          
          ::-webkit-scrollbar-thumb {
            background: linear-gradient(135deg, #667eea, #764ba2);
            border-radius: 4px;
          }
          
          ::-webkit-scrollbar-thumb:hover {
            background: linear-gradient(135deg, #764ba2, #667eea);
          }
        `}
      </style>
    </Box>
  );
};

export default Landing;
