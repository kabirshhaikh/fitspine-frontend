import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
} from '@mui/material';
import {
  TrendingUp,
  FitnessCenter,
  Psychology,
  ArrowForward,
  CheckCircle,
  MonitorHeart,
  SmartToy,
  NotificationsActive,
} from '@mui/icons-material';

const Landing = () => {
  const navigate = useNavigate();
  const observerRef = useRef();

  useEffect(() => {
    // Intersection Observer for smooth animations
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
          }
        });
      },
      { threshold: 0.1 }
    );

    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    animatedElements.forEach((el) => observerRef.current.observe(el));

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  const handleGetStarted = () => {
    navigate('/login');
  };


  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: `
          radial-gradient(circle at 20% 50%, rgba(120, 119, 198, 0.3) 0%, transparent 50%),
          radial-gradient(circle at 80% 20%, rgba(255, 119, 198, 0.3) 0%, transparent 50%),
          radial-gradient(circle at 40% 80%, rgba(120, 219, 255, 0.3) 0%, transparent 50%),
          linear-gradient(135deg, #0f0f23 0%, #1a1a2e 25%, #16213e 50%, #0f3460 75%, #533483 100%)
        `,
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      {/* Animated Background Particles */}
      <Box
        sx={{
          position: 'absolute',
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
          backgroundRepeat: 'repeat',
          backgroundSize: '200px 200px',
          animation: 'sparkle 20s linear infinite',
          zIndex: 1,
        }}
      />
      
      {/* Floating Orbs */}
      <Box
        sx={{
          position: 'absolute',
          top: '10%',
          left: '10%',
          width: 300,
          height: 300,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(120, 119, 198, 0.1) 0%, transparent 70%)',
          animation: 'float 15s ease-in-out infinite',
          filter: 'blur(1px)',
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          bottom: '20%',
          right: '15%',
          width: 200,
          height: 200,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255, 119, 198, 0.1) 0%, transparent 70%)',
          animation: 'float 12s ease-in-out infinite reverse',
          filter: 'blur(1px)',
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          top: '60%',
          left: '70%',
          width: 150,
          height: 150,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(120, 219, 255, 0.1) 0%, transparent 70%)',
          animation: 'float 18s ease-in-out infinite',
          filter: 'blur(1px)',
        }}
      />
      {/* Hero Section */}
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          position: 'relative',
          overflow: 'hidden',
          zIndex: 2,
        }}
      >
        <Container maxWidth="lg">
          <Box
            className="animate-on-scroll"
            sx={{
              textAlign: 'center',
              color: 'white',
              opacity: 0,
              transform: 'translateY(50px)',
              transition: 'all 1.2s cubic-bezier(0.4, 0, 0.2, 1)',
            }}
          >
            {/* Glassmorphism Card */}
            <Box
              sx={{
                background: 'rgba(255, 255, 255, 0.05)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '24px',
                p: { xs: 4, md: 6 },
                mb: 4,
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
                position: 'relative',
                overflow: 'hidden',
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  height: '1px',
                  background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)',
                },
              }}
            >
              <Typography
                variant="h1"
                sx={{
                  fontSize: { xs: '2.5rem', md: '4.5rem', lg: '5rem' },
                  fontWeight: 900,
                  mb: 3,
                  background: 'linear-gradient(135deg, #ffffff 0%, #a8edea 50%, #fed6e3 100%)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  textShadow: '0 0 30px rgba(255,255,255,0.3)',
                  letterSpacing: '-0.02em',
                  lineHeight: 1.1,
                }}
              >
                Your Spine, Your Strength.
              </Typography>
              
              <Typography
                variant="h5"
                sx={{
                  fontSize: { xs: '1.1rem', md: '1.4rem' },
                  fontWeight: 300,
                  mb: 4,
                  maxWidth: 800,
                  mx: 'auto',
                  lineHeight: 1.6,
                  color: 'rgba(255, 255, 255, 0.8)',
                  textShadow: '0 2px 4px rgba(0,0,0,0.3)',
                }}
              >
                Track. Protect. Predict. Discover your personalized Disc Protection Score and take control of your back health.
              </Typography>

              <Button
                variant="contained"
                size="large"
                onClick={handleGetStarted}
                endIcon={<ArrowForward />}
                sx={{
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  borderRadius: '50px',
                  px: 6,
                  py: 2,
                  fontSize: '1.2rem',
                  fontWeight: 600,
                  textTransform: 'none',
                  boxShadow: '0 10px 40px rgba(102, 126, 234, 0.4)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  position: 'relative',
                  overflow: 'hidden',
                  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: '-100%',
                    width: '100%',
                    height: '100%',
                    background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
                    transition: 'left 0.5s',
                  },
                  '&:hover': {
                    transform: 'translateY(-3px) scale(1.02)',
                    boxShadow: '0 20px 60px rgba(102, 126, 234, 0.6)',
                    background: 'linear-gradient(135deg, #764ba2 0%, #667eea 100%)',
                    '&::before': {
                      left: '100%',
                    },
                  },
                }}
              >
                Get My Disc Score
              </Button>
            </Box>
          </Box>

          {/* Pro Tip Banner */}
          <Box
            sx={{
              mt: 4,
              p: 3,
              background: 'rgba(102, 126, 234, 0.1)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(102, 126, 234, 0.3)',
              borderRadius: '16px',
              display: 'flex',
              alignItems: 'center',
              gap: 2,
              boxShadow: '0 4px 20px rgba(102, 126, 234, 0.2)',
            }}
          >
            <Box
              sx={{
                width: 48,
                height: 48,
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                boxShadow: '0 4px 15px rgba(102, 126, 234, 0.4)',
              }}
            >
              <Typography sx={{ fontSize: 24 }}>💡</Typography>
            </Box>
            <Box>
              <Typography
                variant="body1"
                sx={{
                  color: 'white',
                  fontWeight: 600,
                  fontSize: '1.1rem',
                  mb: 0.5,
                }}
              >
                Pro Tip for Best Results
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  color: 'rgba(255, 255, 255, 0.8)',
                  fontSize: '0.95rem',
                  lineHeight: 1.5,
                }}
              >
                Connect a wearable device and log daily for the most accurate Disc Protection Score and personalized insights.
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
          position: 'relative',
        }}
      >
        <Container maxWidth="lg">
          <Box
            className="animate-on-scroll"
            sx={{
              textAlign: 'center',
              mb: 8,
              opacity: 0,
              transform: 'translateY(50px)',
              transition: 'all 1s cubic-bezier(0.4, 0, 0.2, 1)',
            }}
          >
            <Typography
              variant="h2"
              sx={{
                fontSize: { xs: '2.5rem', md: '4rem' },
                fontWeight: 900,
                mb: 4,
                background: 'linear-gradient(135deg, #ffffff 0%, #a8edea 50%, #fed6e3 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                textShadow: '0 0 30px rgba(255,255,255,0.3)',
                letterSpacing: '-0.02em',
              }}
            >
              Your Journey to Better Spine Health
            </Typography>
            <Typography
              variant="h6"
              sx={{
                color: 'rgba(255, 255, 255, 0.8)',
                maxWidth: 700,
                mx: 'auto',
                lineHeight: 1.6,
                fontSize: '1.2rem',
                fontWeight: 300,
              }}
            >
              From data collection to actionable insights - see how FitSpine transforms your daily habits into powerful health intelligence.
            </Typography>
          </Box>

          {/* Timeline Story */}
          <Box sx={{ position: 'relative', display: 'flex', justifyContent: 'center' }}>
            {/* Story Steps */}
            <Grid container spacing={4} sx={{ alignItems: 'center' }}>
              {/* Step 1: Current Integration */}
              <Grid item xs={12}>
                <Box
                  className="animate-on-scroll"
                  sx={{
                    opacity: 0,
                    transform: 'translateX(-50px)',
                    transition: 'all 0.8s ease-out',
                    '&.animate-in': {
                      opacity: 1,
                      transform: 'translateX(0)',
                    },
                  }}
                >
                  <Card
                    sx={{
                      p: 4,
                      borderRadius: '20px',
                      background: 'rgba(255, 255, 255, 0.05)',
                      backdropFilter: 'blur(20px)',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      position: 'relative',
                      overflow: 'hidden',
                      transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                      '&:hover': {
                        transform: 'translateY(-8px) scale(1.02)',
                        boxShadow: '0 20px 60px rgba(79, 195, 247, 0.4)',
                        border: '1px solid rgba(79, 195, 247, 0.3)',
                      },
                      '&::before': {
                        content: '""',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        height: '1px',
                        background: 'linear-gradient(90deg, transparent, rgba(79, 195, 247, 0.5), transparent)',
                      },
                    }}
                  >
                    
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                      <Box
                        sx={{
                          width: 60,
                          height: 60,
                          borderRadius: '50%',
                          background: 'linear-gradient(135deg, #4fc3f7, #29b6f6)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          mr: 3,
                          boxShadow: '0 4px 15px rgba(79, 195, 247, 0.3)',
                        }}
                      >
                        <FitnessCenter sx={{ color: 'white', fontSize: 30 }} />
                      </Box>
                      <Box>
                        <Typography variant="h6" sx={{ fontWeight: 700, color: '#4fc3f7', fontSize: '1.1rem' }}>
                          Now Available
                        </Typography>
                        <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '0.9rem' }}>
                          Fitbit Integration
                        </Typography>
                      </Box>
                    </Box>
                    
                    <Typography variant="body1" sx={{ color: 'rgba(255, 255, 255, 0.8)', lineHeight: 1.6, fontSize: '1rem' }}>
                      Seamlessly sync your daily activity, sleep patterns, and heart rate data from your Fitbit device. No manual entry required.
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
                    transform: 'translateX(50px)',
                    transition: 'all 0.8s ease-out',
                    '&.animate-in': {
                      opacity: 1,
                      transform: 'translateX(0)',
                    },
                  }}
                >
                  <Card
                    sx={{
                      p: 4,
                      borderRadius: '20px',
                      background: 'rgba(255, 255, 255, 0.05)',
                      backdropFilter: 'blur(20px)',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      position: 'relative',
                      overflow: 'hidden',
                      transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                      '&:hover': {
                        transform: 'translateY(-8px) scale(1.02)',
                        boxShadow: '0 20px 60px rgba(156, 39, 176, 0.4)',
                        border: '1px solid rgba(156, 39, 176, 0.3)',
                      },
                      '&::before': {
                        content: '""',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        height: '1px',
                        background: 'linear-gradient(90deg, transparent, rgba(156, 39, 176, 0.5), transparent)',
                      },
                    }}
                  >
                    
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                      <Box
                        sx={{
                          width: 60,
                          height: 60,
                          borderRadius: '50%',
                          background: 'linear-gradient(45deg, #9c27b0, #7b1fa2)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          mr: 3,
                          boxShadow: '0 4px 15px rgba(156, 39, 176, 0.3)',
                        }}
                      >
                        <SmartToy sx={{ color: 'white', fontSize: 30 }} />
                      </Box>
                      <Box>
                        <Typography variant="h6" sx={{ fontWeight: 700, color: '#9c27b0', fontSize: '1.1rem' }}>
                          Coming Soon
                        </Typography>
                        <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '0.9rem' }}>
                          Garmin, Apple Watch & Whoop
                        </Typography>
                      </Box>
                    </Box>
                    
                    <Typography variant="body1" sx={{ color: 'rgba(255, 255, 255, 0.8)', lineHeight: 1.6, fontSize: '1rem' }}>
                      Expanding our ecosystem to support Garmin, Apple Watch, and Whoop devices. More data sources mean better insights for your spine health.
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
                    transform: 'translateX(-50px)',
                    transition: 'all 0.8s ease-out',
                    '&.animate-in': {
                      opacity: 1,
                      transform: 'translateX(0)',
                    },
                  }}
                >
                  <Card
                    sx={{
                      p: 4,
                      borderRadius: '20px',
                      background: 'rgba(255, 255, 255, 0.05)',
                      backdropFilter: 'blur(20px)',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      position: 'relative',
                      overflow: 'hidden',
                      transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                      '&:hover': {
                        transform: 'translateY(-8px) scale(1.02)',
                        boxShadow: '0 20px 60px rgba(76, 175, 80, 0.4)',
                        border: '1px solid rgba(76, 175, 80, 0.3)',
                      },
                      '&::before': {
                        content: '""',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        height: '1px',
                        background: 'linear-gradient(90deg, transparent, rgba(76, 175, 80, 0.5), transparent)',
                      },
                    }}
                  >
                    
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                      <Box
                        sx={{
                          width: 60,
                          height: 60,
                          borderRadius: '50%',
                          background: 'linear-gradient(45deg, #4caf50, #388e3c)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          mr: 3,
                          boxShadow: '0 4px 15px rgba(76, 175, 80, 0.3)',
                        }}
                      >
                        <TrendingUp sx={{ color: 'white', fontSize: 30 }} />
                      </Box>
                      <Box>
                        <Typography variant="h6" sx={{ fontWeight: 700, color: '#4caf50', fontSize: '1.1rem' }}>
                          Daily Disc Score
                        </Typography>
                        <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '0.9rem' }}>
                          & Flare-up Insights
                        </Typography>
                      </Box>
                    </Box>
                    
                    <Typography variant="body1" sx={{ color: 'rgba(255, 255, 255, 0.8)', lineHeight: 1.6, fontSize: '1rem' }}>
                      Get your personalized Disc Protection Score every day and receive AI-powered predictions about potential flare-ups before they happen.
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
                    transform: 'translateX(50px)',
                    transition: 'all 0.8s ease-out',
                    '&.animate-in': {
                      opacity: 1,
                      transform: 'translateX(0)',
                    },
                  }}
                >
                  <Card
                    sx={{
                      p: 4,
                      borderRadius: '20px',
                      background: 'rgba(255, 255, 255, 0.05)',
                      backdropFilter: 'blur(20px)',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      position: 'relative',
                      overflow: 'hidden',
                      transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                      '&:hover': {
                        transform: 'translateY(-8px) scale(1.02)',
                        boxShadow: '0 20px 60px rgba(255, 152, 0, 0.4)',
                        border: '1px solid rgba(255, 152, 0, 0.3)',
                      },
                      '&::before': {
                        content: '""',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        height: '1px',
                        background: 'linear-gradient(90deg, transparent, rgba(255, 152, 0, 0.5), transparent)',
                      },
                    }}
                  >
                    
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                      <Box
                        sx={{
                          width: 60,
                          height: 60,
                          borderRadius: '50%',
                          background: 'linear-gradient(45deg, #ff9800, #f57c00)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          mr: 3,
                          boxShadow: '0 4px 15px rgba(255, 152, 0, 0.3)',
                        }}
                      >
                        <NotificationsActive sx={{ color: 'white', fontSize: 30 }} />
                      </Box>
                      <Box>
                        <Typography variant="h6" sx={{ fontWeight: 700, color: '#ff9800', fontSize: '1.1rem' }}>
                          Enhanced Insights
                        </Typography>
                        <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '0.9rem' }}>
                          Manual Logs Recommended
                        </Typography>
                      </Box>
                    </Box>
                    
                    <Typography variant="body1" sx={{ color: 'rgba(255, 255, 255, 0.8)', lineHeight: 1.6, fontSize: '1rem' }}>
                      For the most accurate predictions, we recommend adding manual logs about pain levels, posture, and activities. The more data, the better your insights.
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
          position: 'relative',
        }}
      >
        <Container maxWidth="lg">
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Grid container spacing={6}>
              {/* Section 1: Simple daily logs */}
              <Grid item xs={12}>
              <Card
                className="animate-on-scroll"
                sx={{
                  borderRadius: '20px',
                  background: 'rgba(255, 255, 255, 0.05)',
                  backdropFilter: 'blur(20px)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
                  opacity: 0,
                  transform: 'translateY(50px)',
                  transition: 'all 1s cubic-bezier(0.4, 0, 0.2, 1)',
                  position: 'relative',
                  overflow: 'hidden',
                  animation: 'morphing 12s ease-in-out infinite',
                  '&.animate-in': {
                    opacity: 1,
                    transform: 'translateY(0)',
                  },
                  '&:hover': {
                    transform: 'translateY(-8px) scale(1.01)',
                    boxShadow: '0 20px 60px rgba(79, 195, 247, 0.4)',
                    border: '1px solid rgba(79, 195, 247, 0.3)',
                    animation: 'none',
                  },
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: '1px',
                    background: 'linear-gradient(90deg, transparent, rgba(79, 195, 247, 0.5), transparent)',
                  },
                }}
              >
                <CardContent sx={{ p: 4 }}>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      mb: 3,
                      color: '#4fc3f7',
                    }}
                  >
                    <TrendingUp sx={{ fontSize: 40, mr: 2, filter: 'drop-shadow(0 0 8px rgba(79, 195, 247, 0.5))' }} />
                    <Typography 
                      variant="h4" 
                      sx={{ 
                        fontWeight: 700,
                        color: '#4fc3f7',
                        textShadow: '0 2px 4px rgba(0,0,0,0.3)',
                      }}
                    >
                      Simple daily logs, powerful insights
                    </Typography>
                  </Box>
                  
                  <Typography
                    variant="body1"
                    sx={{
                      fontSize: '1.1rem',
                      lineHeight: 1.7,
                      color: 'rgba(255, 255, 255, 0.8)',
                      mb: 3,
                      textShadow: '0 1px 2px rgba(0,0,0,0.3)',
                    }}
                  >
                    Like MyFitnessPal for your spine — a few quick daily notes about pain, posture, or activities build your Disc Protection Score.
                  </Typography>

                  {/* Animated form to dashboard transition */}
                  <Box
                    sx={{
                      height: 200,
                      background: 'linear-gradient(45deg, #e3f2fd, #bbdefb)',
                      borderRadius: 3,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      position: 'relative',
                      overflow: 'hidden',
                    }}
                  >
                    <Box
                      sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        animation: 'pulse 2s ease-in-out infinite',
                      }}
                    >
                      <Typography
                        variant="h3"
                        sx={{
                          fontWeight: 800,
                          color: '#1976d2',
                          textAlign: 'center',
                        }}
                      >
                        85
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          color: '#666',
                          textAlign: 'center',
                          fontWeight: 500,
                        }}
                      >
                        Disc Protection Score
                      </Typography>
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
                  borderRadius: '20px',
                  background: 'rgba(255, 255, 255, 0.05)',
                  backdropFilter: 'blur(20px)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
                  opacity: 0,
                  transform: 'translateY(50px)',
                  transition: 'all 1s cubic-bezier(0.4, 0, 0.2, 1)',
                  position: 'relative',
                  overflow: 'hidden',
                  animation: 'morphing 12s ease-in-out infinite',
                  '&.animate-in': {
                    opacity: 1,
                    transform: 'translateY(0)',
                  },
                  '&:hover': {
                    transform: 'translateY(-8px) scale(1.01)',
                    boxShadow: '0 20px 60px rgba(156, 39, 176, 0.4)',
                    border: '1px solid rgba(156, 39, 176, 0.3)',
                    animation: 'none',
                  },
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: '1px',
                    background: 'linear-gradient(90deg, transparent, rgba(156, 39, 176, 0.5), transparent)',
                  },
                }}
              >
                <CardContent sx={{ p: 4 }}>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      mb: 3,
                      color: '#9c27b0',
                    }}
                  >
                    <FitnessCenter sx={{ fontSize: 40, mr: 2, filter: 'drop-shadow(0 0 8px rgba(156, 39, 176, 0.5))' }} />
                    <Typography 
                      variant="h4" 
                      sx={{ 
                        fontWeight: 700,
                        color: '#9c27b0',
                        textShadow: '0 2px 4px rgba(0,0,0,0.3)',
                      }}
                    >
                      Connect your wearables
                    </Typography>
                  </Box>
                  
                  <Typography
                    variant="body1"
                    sx={{
                      fontSize: '1.1rem',
                      lineHeight: 1.7,
                      color: 'rgba(255, 255, 255, 0.8)',
                      mb: 3,
                      textShadow: '0 1px 2px rgba(0,0,0,0.3)',
                    }}
                  >
                    Your Fitbit, Garmin, or Apple Watch automatically adds movement and sleep data — no extra effort needed.
                  </Typography>

                  {/* Animated wearable icons */}
                  <Box
                    sx={{
                      height: 200,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      position: 'relative',
                    }}
                  >
                    {/* Central glowing circle */}
                    <Box
                      sx={{
                        width: 80,
                        height: 80,
                        borderRadius: '50%',
                        background: 'radial-gradient(circle, #4fc3f7, #29b6f6)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: '0 0 30px rgba(79, 195, 247, 0.5)',
                        animation: 'glow 2s ease-in-out infinite',
                      }}
                    >
                      <MonitorHeart sx={{ color: 'white', fontSize: 30 }} />
                    </Box>

                    {/* Floating wearable icons */}
                    {['Fitbit', 'Garmin', 'Apple Watch'].map((device, index) => (
                      <Box
                        key={device}
                        sx={{
                          position: 'absolute',
                          width: 60,
                          height: 60,
                          borderRadius: '50%',
                          background: 'white',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
                          animation: `floatToCenter 3s ease-in-out infinite`,
                          animationDelay: `${index * 0.5}s`,
                          top: `${20 + index * 30}%`,
                          left: `${20 + index * 20}%`,
                        }}
                      >
                        <Typography variant="caption" sx={{ fontWeight: 600 }}>
                          {device}
                        </Typography>
                      </Box>
                    ))}
                  </Box>
                </CardContent>
              </Card>
            </Grid>

              {/* Section 3: AI that understands your spine */}
              <Grid item xs={12}>
              <Card
                className="animate-on-scroll"
                sx={{
                  borderRadius: '20px',
                  background: 'rgba(255, 255, 255, 0.05)',
                  backdropFilter: 'blur(20px)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
                  opacity: 0,
                  transform: 'translateY(50px)',
                  transition: 'all 1s cubic-bezier(0.4, 0, 0.2, 1)',
                  position: 'relative',
                  overflow: 'hidden',
                  animation: 'morphing 12s ease-in-out infinite',
                  '&.animate-in': {
                    opacity: 1,
                    transform: 'translateY(0)',
                  },
                  '&:hover': {
                    transform: 'translateY(-8px) scale(1.01)',
                    boxShadow: '0 20px 60px rgba(76, 175, 80, 0.4)',
                    border: '1px solid rgba(76, 175, 80, 0.3)',
                    animation: 'none',
                  },
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: '1px',
                    background: 'linear-gradient(90deg, transparent, rgba(76, 175, 80, 0.5), transparent)',
                  },
                }}
              >
                <CardContent sx={{ p: 4 }}>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      mb: 3,
                      color: '#4caf50',
                    }}
                  >
                    <Psychology sx={{ fontSize: 40, mr: 2, filter: 'drop-shadow(0 0 8px rgba(76, 175, 80, 0.5))' }} />
                    <Typography 
                      variant="h4" 
                      sx={{ 
                        fontWeight: 700,
                        color: '#4caf50',
                        textShadow: '0 2px 4px rgba(0,0,0,0.3)',
                      }}
                    >
                      AI that understands your spine
                    </Typography>
                  </Box>
                  
                  <Typography
                    variant="body1"
                    sx={{
                      fontSize: '1.1rem',
                      lineHeight: 1.7,
                      color: 'rgba(255, 255, 255, 0.8)',
                      mb: 3,
                      textShadow: '0 1px 2px rgba(0,0,0,0.3)',
                    }}
                  >
                    Our AI learns from your data and predicts possible flare-ups before they happen. Gentle reminders help you avoid pain and build habits that protect your discs.
                  </Typography>

                  {/* Animated predictive curve */}
                  <Box
                    sx={{
                      height: 200,
                      background: 'linear-gradient(45deg, #e8f5e8, #c8e6c9)',
                      borderRadius: 3,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      position: 'relative',
                      overflow: 'hidden',
                    }}
                  >
                    <Box
                      sx={{
                        width: '100%',
                        height: '100%',
                        position: 'relative',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      {/* Predictive curve */}
                      <svg
                        width="300"
                        height="150"
                        viewBox="0 0 300 150"
                        style={{ position: 'absolute' }}
                      >
                        <path
                          d="M 0 100 Q 75 80 150 60 Q 225 40 300 20"
                          stroke="#4fc3f7"
                          strokeWidth="3"
                          fill="none"
                          strokeDasharray="5,5"
                          style={{
                            animation: 'drawLine 2s ease-in-out infinite',
                          }}
                        />
                        <circle
                          cx="150"
                          cy="60"
                          r="8"
                          fill="#4fc3f7"
                          style={{
                            animation: 'pulse 1.5s ease-in-out infinite',
                          }}
                        />
                      </svg>
                      
                      <Box
                        sx={{
                          position: 'absolute',
                          top: '20%',
                          right: '20%',
                          animation: 'fadeInOut 2s ease-in-out infinite',
                        }}
                      >
                        <NotificationsActive sx={{ color: '#4fc3f7', fontSize: 30 }} />
                      </Box>
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
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Floating Background Elements */}
        <Box
          sx={{
            position: 'absolute',
            top: '20%',
            right: '10%',
            width: 200,
            height: 200,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(255, 119, 198, 0.1) 0%, transparent 70%)',
            animation: 'float 15s ease-in-out infinite',
            filter: 'blur(2px)',
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            bottom: '30%',
            left: '15%',
            width: 150,
            height: 150,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(120, 219, 255, 0.1) 0%, transparent 70%)',
            animation: 'float 12s ease-in-out infinite reverse',
            filter: 'blur(2px)',
          }}
        />

        <Container maxWidth="lg">
          <Box
            className="animate-on-scroll"
            sx={{
              textAlign: 'center',
              color: 'white',
              opacity: 0,
              transform: 'translateY(50px)',
              transition: 'all 1.2s cubic-bezier(0.4, 0, 0.2, 1)',
            }}
          >
            {/* Glassmorphism CTA Card */}
            <Box
              sx={{
                background: 'rgba(255, 255, 255, 0.05)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '24px',
                p: { xs: 4, md: 6 },
                mb: 4,
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
                position: 'relative',
                overflow: 'visible',
                animation: 'morphing 15s ease-in-out infinite',
                zIndex: 5,
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  height: '1px',
                  background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)',
                  pointerEvents: 'none',
                },
              }}
            >
              <Typography
                variant="h2"
                sx={{
                  fontSize: { xs: '2.5rem', md: '4rem', lg: '4.5rem' },
                  fontWeight: 900,
                  mb: 4,
                  background: 'linear-gradient(135deg, #ffffff 0%, #a8edea 50%, #fed6e3 100%)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  textShadow: '0 0 30px rgba(255,255,255,0.3)',
                  letterSpacing: '-0.02em',
                  lineHeight: 1.1,
                }}
              >
                Your back pain doesn't define you.
              </Typography>
              
              <Typography
                variant="h6"
                sx={{
                  fontSize: { xs: '1.1rem', md: '1.4rem' },
                  fontWeight: 300,
                  mb: 6,
                  maxWidth: 800,
                  mx: 'auto',
                  lineHeight: 1.6,
                  color: 'rgba(255, 255, 255, 0.8)',
                  textShadow: '0 2px 4px rgba(0,0,0,0.3)',
                }}
              >
                We understand the frustration of chronic back pain. That's why we built FitSpine - to give you control over your spine health through data, insights, and personalized recommendations. Start with simple daily logs, connect your wearable device, and watch as your understanding of your body transforms into actionable insights.
              </Typography>
            </Box>
          </Box>
        </Container>
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
