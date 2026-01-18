import React, { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
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
} from '@mui/material';
import { HealthAndSafety, Email as EmailIcon } from '@mui/icons-material';
import authService from '../../services/auth.service';
import '../auth/Auth.css';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setEmail(e.target.value);
    // Clear errors when user starts typing
    if (error) {
      setError('');
    }
  };

  const validateEmail = (email) => {
    const emailRegex = /\S+@\S+\.\S+/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Reset states
    setError('');
    setSuccess(false);

    // Validate email
    if (!email.trim()) {
      setError('Email is required');
      return;
    }

    if (!validateEmail(email)) {
      setError('Please enter a valid email address');
      return;
    }

    try {
      setLoading(true);
      await authService.forgotPassword(email.trim().toLowerCase());
      setSuccess(true);
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message || 'Failed to send reset email. Please try again.';
      setError(errorMessage);
    } finally {
      setLoading(false);
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
      
      <Container maxWidth="sm" sx={{ position: 'relative', zIndex: 2 }}>
        {/* Back to Login Link */}
        <Link
          component={RouterLink}
          to="/login"
          sx={{
            display: 'inline-flex',
            alignItems: 'center',
            color: 'rgba(255, 255, 255, 0.8)',
            textDecoration: 'none',
            fontSize: '0.95rem',
            mb: 3,
            transition: 'all 0.3s ease',
            '&:hover': {
              color: 'white',
              transform: 'translateX(-4px)',
            },
          }}
        >
          ← Back to Login
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
            <EmailIcon
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
              Forgot Password?
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
              Enter your email to receive a password reset link
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
            <Alert 
              severity="error" 
              sx={{ 
                mb: 3,
                background: 'rgba(211, 47, 47, 0.1)',
                border: '1px solid rgba(211, 47, 47, 0.3)',
                color: '#ffcdd2',
                '& .MuiAlert-icon': {
                  color: '#ffcdd2',
                },
              }}
            >
              {error}
            </Alert>
          )}

          {success && (
            <Alert 
              severity="success" 
              sx={{ 
                mb: 3,
                background: 'rgba(76, 175, 80, 0.1)',
                border: '1px solid rgba(76, 175, 80, 0.3)',
                color: '#c8e6c9',
                '& .MuiAlert-icon': {
                  color: '#c8e6c9',
                },
              }}
            >
              Password reset link and security code sent to your email. Please check your inbox and follow the instructions.
            </Alert>
          )}

          {!success ? (
            <form onSubmit={handleSubmit}>
              <TextField
                fullWidth
                label="Email Address"
                name="email"
                type="email"
                value={email}
                onChange={handleChange}
                error={!!error && !success}
                helperText={error && !success ? error : ''}
                margin="normal"
                required
                autoComplete="email"
                autoFocus
                disabled={loading}
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
                  "& .MuiFormHelperText-root": {
                    color: "rgba(255, 255, 255, 0.6)",
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
                  '&:disabled': {
                    background: 'rgba(255, 255, 255, 0.1)',
                    color: 'rgba(255, 255, 255, 0.5)',
                  },
                }}
              >
                {loading ? (
                  <CircularProgress size={24} color="inherit" />
                ) : (
                  'Send Reset Link'
                )}
              </Button>
            </form>
          ) : (
            <Box sx={{ textAlign: 'center' }}>
              <Typography
                variant="body1"
                sx={{
                  color: 'rgba(255, 255, 255, 0.9)',
                  mb: 4,
                  lineHeight: 1.8,
                }}
              >
                We've sent password reset instructions to your email address. 
                Please check your inbox and follow the link to reset your password.
              </Typography>
              <Button
                component={RouterLink}
                to="/login"
                variant="contained"
                size="large"
                sx={{
                  py: 2,
                  px: 4,
                  fontSize: '1.1rem',
                  textTransform: 'none',
                  fontWeight: 600,
                  borderRadius: '50px',
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  boxShadow: '0 10px 40px rgba(102, 126, 234, 0.4)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  '&:hover': {
                    transform: 'translateY(-3px) scale(1.02)',
                    boxShadow: '0 20px 60px rgba(102, 126, 234, 0.6)',
                    background: 'linear-gradient(135deg, #764ba2 0%, #667eea 100%)',
                  },
                }}
              >
                Back to Login
              </Button>
            </Box>
          )}

          <Box sx={{ textAlign: 'center', mt: 3 }}>
            <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)', mb: 2 }}>
              Remember your password?{' '}
              <Link
                component={RouterLink}
                to="/login"
                sx={{
                  color: '#4fc3f7',
                  textDecoration: 'none',
                  fontWeight: 500,
                  '&:hover': {
                    textDecoration: 'underline',
                  },
                }}
              >
                Sign in
              </Link>
            </Typography>
          </Box>
        </Paper>
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
        `}
      </style>
    </Box>
  );
};

export default ForgotPassword;

