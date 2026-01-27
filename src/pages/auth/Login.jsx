import React, { useState, useEffect, useRef } from 'react';
import { Link as RouterLink, useNavigate, useLocation } from 'react-router-dom';
import {
  Box,
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Link,
  Alert,
  CircularProgress,
  useTheme,
  Divider,
} from '@mui/material';
import { HealthAndSafety, Visibility, VisibilityOff, Home } from '@mui/icons-material';
import { useAuth } from '../../context/AuthContext';
import '../auth/Auth.css'; // Import Auth-specific CSS

const Login = () => {
  const googleBtnRef = useRef(null);

  useEffect(() => {
    document.title = 'Login - Sphinic';
  }, []);

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const { login, registerWithGoogle, loading, error, clearError } = useAuth();

  const from = location.state?.from?.pathname || '/dashboard';

  // Initialize Google Sign-In button when script and client id are ready
  useEffect(() => {
    const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
    if (!clientId || !googleBtnRef.current) return;

    const initAndRender = () => {
      if (!window.google?.accounts?.id || !googleBtnRef.current) return false;
      try {
        window.google.accounts.id.initialize({
          client_id: clientId,
          callback: async (res) => {
            try {
              const result = await registerWithGoogle(res.credential);
              if (result?.needsProfileCompletion) {
                navigate('/complete-google-signup', { replace: true, state: { fromGoogleRegister: true } });
              } else {
                navigate(from, { replace: true });
              }
            } catch (_) {
              // error shown via AuthContext
            }
          },
        });
        window.google.accounts.id.renderButton(googleBtnRef.current, {
          type: 'standard',
          theme: 'filled_black',
          size: 'large',
          text: 'signup_with',
          width: 300,
        });
        return true;
      } catch (e) {
        console.warn('Google Sign-In init failed', e);
        return false;
      }
    };

    if (initAndRender()) return;
    const id = setInterval(() => { if (initAndRender()) clearInterval(id); }, 100);
    return () => clearInterval(id);
  }, [registerWithGoogle, navigate, from]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
    
    // Clear auth error when user interacts with form
    if (error) {
      clearError();
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    try {
      await login(formData.email, formData.password);
      navigate(from, { replace: true });
    } catch (err) {
      // Error is handled by the auth context
    }
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
        display: 'flex',
        alignItems: 'center',
        py: 4,
        position: 'relative',
        overflow: 'hidden',
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
      <Container maxWidth="sm" className="auth-slide-from-top" sx={{ position: 'relative', zIndex: 2 }}>
        {/* Back to Home Link */}
        <Link
          component={RouterLink}
          to="/"
          sx={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 1,
            color: 'rgba(255, 255, 255, 0.85)',
            textDecoration: 'none',
            fontSize: '0.95rem',
            mb: 3,
            padding: '8px 16px',
            borderRadius: '12px',
            background: 'rgba(255, 255, 255, 0.05)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            transition: 'all 0.3s ease',
            '&:hover': {
              color: 'white',
              background: 'rgba(255, 255, 255, 0.1)',
              borderColor: 'rgba(255, 255, 255, 0.2)',
              transform: 'translateX(-4px)',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
            },
          }}
        >
          <Home sx={{ fontSize: '1.1rem' }} />
          Home
        </Link>

        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Box
            sx={{
              background: 'rgba(255, 255, 255, 0.05)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '24px',
              p: 4,
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
            <HealthAndSafety
              sx={{
                fontSize: 80,
                color: '#4fc3f7',
                mb: 3,
                filter: 'drop-shadow(0 0 20px rgba(79, 195, 247, 0.5))',
              }}
            />
            <Typography
              variant="h2"
              sx={{
                fontWeight: 900,
                mb: 2,
                background: 'linear-gradient(135deg, #ffffff 0%, #a8edea 50%, #fed6e3 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                textShadow: '0 0 30px rgba(255,255,255,0.3)',
                letterSpacing: '-0.02em',
                fontSize: { xs: '2.5rem', md: '3.5rem' },
              }}
            >
              Welcome Back
            </Typography>
            <Typography
              variant="h6"
              sx={{
                color: 'rgba(255, 255, 255, 0.8)',
                fontWeight: 300,
                fontSize: '1.2rem',
                textShadow: '0 2px 4px rgba(0,0,0,0.3)',
              }}
            >
              Sign in to continue protecting your spine
            </Typography>
          </Box>
        </Box>

        <Paper
          elevation={0}
          sx={{
            p: { xs: 4, md: 6 },
            borderRadius: '24px',
            background: 'rgba(255, 255, 255, 0.05)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
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
          {error && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {error}
            </Alert>
          )}

          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Email Address"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              error={!!errors.email}
              helperText={errors.email}
              margin="normal"
              required
              autoComplete="email"
              autoFocus
              sx={{ 
                mb: 2,
                "& .MuiOutlinedInput-root": {
                  borderRadius: "12px",
                  background: "rgba(255, 255, 255, 0.05)",
                  backdropFilter: "blur(10px)",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                  "& fieldset": {
                    border: "none",
                  },
                  "&:hover fieldset": {
                    border: "1px solid rgba(79, 195, 247, 0.3)",
                  },
                  "&.Mui-focused fieldset": {
                    border: "1px solid rgba(79, 195, 247, 0.5)",
                  },
                },
                "& .MuiInputLabel-root": {
                  color: "rgba(255, 255, 255, 0.7)",
                },
                "& .MuiInputBase-input": {
                  color: "white",
                },
              }}
            />

            <TextField
              fullWidth
              label="Password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              value={formData.password}
              onChange={handleChange}
              error={!!errors.password}
              helperText={errors.password}
              margin="normal"
              required
              autoComplete="current-password"
              InputProps={{
                endAdornment: (
                  <Button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    sx={{
                      minWidth: 'auto',
                      p: 1,
                      color: 'rgba(255, 255, 255, 0.7)',
                      '&:hover': {
                        backgroundColor: 'transparent',
                      },
                    }}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </Button>
                ),
              }}
              sx={{ 
                mb: 3,
                "& .MuiOutlinedInput-root": {
                  borderRadius: "12px",
                  background: "rgba(255, 255, 255, 0.05)",
                  backdropFilter: "blur(10px)",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                  "& fieldset": {
                    border: "none",
                  },
                  "&:hover fieldset": {
                    border: "1px solid rgba(79, 195, 247, 0.3)",
                  },
                  "&.Mui-focused fieldset": {
                    border: "1px solid rgba(79, 195, 247, 0.5)",
                  },
                },
                "& .MuiInputLabel-root": {
                  color: "rgba(255, 255, 255, 0.7)",
                },
                "& .MuiInputBase-input": {
                  color: "white",
                },
              }}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              size="large"
              disabled={loading}
              sx={{
                py: 2,
                fontSize: '1.2rem',
                textTransform: 'none',
                fontWeight: 600,
                mb: 3,
                borderRadius: '50px',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                boxShadow: '0 10px 40px rgba(102, 126, 234, 0.4)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                position: 'relative',
                overflow: 'hidden',
                transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                zIndex: 1,
                cursor: 'pointer',
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  left: '-100%',
                  width: '100%',
                  height: '100%',
                  background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
                  transition: 'left 0.5s',
                  zIndex: -1,
                  pointerEvents: 'none',
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
              {loading ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                'Sign In'
              )}
            </Button>

            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.8)', mb: 2 }}>
                Don't have an account?{' '}
                <Link
                  component={RouterLink}
                  to="/register"
                  sx={{
                    color: '#4facfe',
                    textDecoration: 'none',
                    fontWeight: 500,
                    '&:hover': {
                      color: '#00f2fe',
                      textDecoration: 'underline',
                    },
                  }}
                >
                  Sign up for free
                </Link>
              </Typography>

              {import.meta.env.VITE_GOOGLE_CLIENT_ID && (
                <>
                  <Divider sx={{ my: 2, '&::before, &::after': { borderColor: 'rgba(255,255,255,0.2)' } }}>
                    <Typography component="span" variant="body2" sx={{ color: 'rgba(255,255,255,0.6)', px: 1 }}>or</Typography>
                  </Divider>

                  <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.8)', mb: 1.5 }}>
                    Sign up using Google
                  </Typography>
                  <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
                    <div ref={googleBtnRef} />
                  </Box>
                </>
              )}
              
              <Link
                component={RouterLink}
                to="/forgot-password"
                sx={{
                  color: 'rgba(255, 255, 255, 0.8)',
                  textDecoration: 'none',
                  fontSize: '0.875rem',
                  display: 'block',
                  mb: 1,
                  '&:hover': {
                    color: '#4facfe',
                    textDecoration: 'underline',
                  },
                }}
              >
                Forgot your password?
              </Link>
            </Box>
          </form>
        </Paper>

        <Box sx={{ textAlign: 'center', mt: 4 }}>
          <Typography 
            variant="body2" 
            sx={{ 
              color: 'rgba(255, 255, 255, 0.7)',
              fontSize: '0.875rem',
              lineHeight: 1.6,
            }}
          >
            By signing in, you agree to our{' '}
            <Link
              component={RouterLink}
              to="/terms"
              sx={{
                color: '#4fc3f7',
                textDecoration: 'none',
                fontWeight: 600,
                transition: 'all 0.2s ease',
                '&:hover': {
                  color: '#00f2fe',
                  textDecoration: 'underline',
                  textShadow: '0 0 8px rgba(79, 195, 247, 0.5)',
                },
              }}
            >
              Terms of Service
            </Link>{' '}
            and{' '}
            <Link
              component={RouterLink}
              to="/privacy"
              sx={{
                color: '#4fc3f7',
                textDecoration: 'none',
                fontWeight: 600,
                transition: 'all 0.2s ease',
                '&:hover': {
                  color: '#00f2fe',
                  textDecoration: 'underline',
                  textShadow: '0 0 8px rgba(79, 195, 247, 0.5)',
                },
              }}
            >
              Privacy Policy
            </Link>
          </Typography>
        </Box>
      </Container>

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
          
          @keyframes morphing {
            0%, 100% { 
              border-radius: 24px;
              transform: rotate(0deg);
            }
            25% { 
              border-radius: 30px;
              transform: rotate(1deg);
            }
            50% { 
              border-radius: 18px;
              transform: rotate(-1deg);
            }
            75% { 
              border-radius: 28px;
              transform: rotate(0.5deg);
            }
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

export default Login;
