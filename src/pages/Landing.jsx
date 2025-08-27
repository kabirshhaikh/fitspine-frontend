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
  useTheme,
  useMediaQuery,
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
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
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
    navigate('/register');
  };

  const handleStartFree = () => {
    navigate('/register');
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        overflow: 'hidden',
      }}
    >
      {/* Hero Section */}
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Animated background elements */}
        <Box
          sx={{
            position: 'absolute',
            top: '10%',
            left: '10%',
            width: 200,
            height: 200,
            borderRadius: '50%',
            background: 'rgba(255, 255, 255, 0.1)',
            animation: 'float 6s ease-in-out infinite',
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            bottom: '20%',
            right: '15%',
            width: 150,
            height: 150,
            borderRadius: '50%',
            background: 'rgba(255, 255, 255, 0.08)',
            animation: 'float 8s ease-in-out infinite reverse',
          }}
        />

        <Container maxWidth="lg">
          <Box
            className="animate-on-scroll"
            sx={{
              textAlign: 'center',
              color: 'white',
              opacity: 0,
              transform: 'translateY(30px)',
              transition: 'all 0.8s ease-out',
            }}
          >
            <Typography
              variant="h1"
              sx={{
                fontSize: { xs: '2.5rem', md: '4rem' },
                fontWeight: 800,
                mb: 3,
                background: 'linear-gradient(45deg, #ffffff, #e3f2fd)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                textShadow: '0 4px 8px rgba(0,0,0,0.1)',
              }}
            >
              Your Spine, Your Strength.
            </Typography>
            
            <Typography
              variant="h5"
              sx={{
                fontSize: { xs: '1.1rem', md: '1.3rem' },
                fontWeight: 400,
                mb: 4,
                maxWidth: 800,
                mx: 'auto',
                lineHeight: 1.6,
                opacity: 0.9,
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
                background: 'linear-gradient(45deg, #4fc3f7, #29b6f6)',
                borderRadius: '50px',
                px: 4,
                py: 1.5,
                fontSize: '1.1rem',
                fontWeight: 600,
                textTransform: 'none',
                boxShadow: '0 8px 25px rgba(79, 195, 247, 0.3)',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: '0 12px 35px rgba(79, 195, 247, 0.4)',
                  background: 'linear-gradient(45deg, #29b6f6, #0288d1)',
                },
              }}
            >
              Get My Disc Score →
            </Button>
          </Box>
        </Container>
      </Box>

      {/* Features Section */}
      <Box sx={{ py: 8, background: 'white' }}>
        <Container maxWidth="lg">
          <Grid container spacing={6}>
            {/* Section 1: Simple daily logs */}
            <Grid item xs={12} md={6}>
              <Card
                className="animate-on-scroll"
                sx={{
                  height: '100%',
                  borderRadius: 4,
                  background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)',
                  border: 'none',
                  boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
                  opacity: 0,
                  transform: 'translateX(-30px)',
                  transition: 'all 0.8s ease-out',
                  '&.animate-in': {
                    opacity: 1,
                    transform: 'translateX(0)',
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
                    <TrendingUp sx={{ fontSize: 40, mr: 2 }} />
                    <Typography variant="h4" sx={{ fontWeight: 700 }}>
                      Simple daily logs, powerful insights
                    </Typography>
                  </Box>
                  
                  <Typography
                    variant="body1"
                    sx={{
                      fontSize: '1.1rem',
                      lineHeight: 1.7,
                      color: '#666',
                      mb: 3,
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
            <Grid item xs={12} md={6}>
              <Card
                className="animate-on-scroll"
                sx={{
                  height: '100%',
                  borderRadius: 4,
                  background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)',
                  border: 'none',
                  boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
                  opacity: 0,
                  transform: 'translateX(30px)',
                  transition: 'all 0.8s ease-out',
                  '&.animate-in': {
                    opacity: 1,
                    transform: 'translateX(0)',
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
                    <FitnessCenter sx={{ fontSize: 40, mr: 2 }} />
                    <Typography variant="h4" sx={{ fontWeight: 700 }}>
                      Connect your wearables
                    </Typography>
                  </Box>
                  
                  <Typography
                    variant="body1"
                    sx={{
                      fontSize: '1.1rem',
                      lineHeight: 1.7,
                      color: '#666',
                      mb: 3,
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
                  borderRadius: 4,
                  background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)',
                  border: 'none',
                  boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
                  opacity: 0,
                  transform: 'translateY(30px)',
                  transition: 'all 0.8s ease-out',
                  '&.animate-in': {
                    opacity: 1,
                    transform: 'translateY(0)',
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
                    <Psychology sx={{ fontSize: 40, mr: 2 }} />
                    <Typography variant="h4" sx={{ fontWeight: 700 }}>
                      AI that understands your spine
                    </Typography>
                  </Box>
                  
                  <Typography
                    variant="body1"
                    sx={{
                      fontSize: '1.1rem',
                      lineHeight: 1.7,
                      color: '#666',
                      mb: 3,
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
        </Container>
      </Box>

      {/* Closing CTA Section */}
      <Box
        sx={{
          py: 8,
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Background elements */}
        <Box
          sx={{
            position: 'absolute',
            top: '20%',
            right: '10%',
            width: 100,
            height: 100,
            borderRadius: '50%',
            background: 'rgba(255, 255, 255, 0.1)',
            animation: 'float 7s ease-in-out infinite',
          }}
        />

        <Container maxWidth="lg">
          <Box
            className="animate-on-scroll"
            sx={{
              textAlign: 'center',
              color: 'white',
              opacity: 0,
              transform: 'translateY(30px)',
              transition: 'all 0.8s ease-out',
            }}
          >
            <Typography
              variant="h2"
              sx={{
                fontSize: { xs: '2rem', md: '3rem' },
                fontWeight: 800,
                mb: 3,
                background: 'linear-gradient(45deg, #ffffff, #e3f2fd)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              A stronger tomorrow starts with a few minutes today.
            </Typography>
            
            <Typography
              variant="h6"
              sx={{
                fontSize: { xs: '1rem', md: '1.2rem' },
                fontWeight: 400,
                mb: 4,
                maxWidth: 600,
                mx: 'auto',
                lineHeight: 1.6,
                opacity: 0.9,
              }}
            >
              Enter a quick log, connect your wearable, and let FitSpine guide you toward a healthier back.
            </Typography>

            <Button
              variant="contained"
              size="large"
              onClick={handleStartFree}
              endIcon={<CheckCircle />}
              sx={{
                background: 'linear-gradient(45deg, #4fc3f7, #29b6f6)',
                borderRadius: '50px',
                px: 4,
                py: 1.5,
                fontSize: '1.1rem',
                fontWeight: 600,
                textTransform: 'none',
                boxShadow: '0 8px 25px rgba(79, 195, 247, 0.3)',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: '0 12px 35px rgba(79, 195, 247, 0.4)',
                  background: 'linear-gradient(45deg, #29b6f6, #0288d1)',
                },
              }}
            >
              Start Free →
            </Button>
          </Box>
        </Container>
      </Box>

      {/* CSS Animations */}
      <style>
        {`
          @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-20px); }
          }
          
          @keyframes floatToCenter {
            0%, 100% { transform: translate(0, 0); }
            50% { transform: translate(-10px, -10px); }
          }
          
          @keyframes glow {
            0%, 100% { box-shadow: 0 0 30px rgba(79, 195, 247, 0.5); }
            50% { box-shadow: 0 0 50px rgba(79, 195, 247, 0.8); }
          }
          
          @keyframes pulse {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.1); }
          }
          
          @keyframes drawLine {
            0% { stroke-dashoffset: 100; }
            100% { stroke-dashoffset: 0; }
          }
          
          @keyframes fadeInOut {
            0%, 100% { opacity: 0.3; }
            50% { opacity: 1; }
          }
          
          .animate-on-scroll.animate-in {
            opacity: 1 !important;
            transform: translate(0, 0) !important;
          }
        `}
      </style>
    </Box>
  );
};

export default Landing;
