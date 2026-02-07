import React, { useState, useEffect } from 'react';
import { Link as RouterLink, useNavigate, useSearchParams } from 'react-router-dom';
import {
  Box,
  Container,
  Paper,
  Button,
  Typography,
  Link,
  Alert,
  CircularProgress,
} from '@mui/material';
import { HealthAndSafety, Home } from '@mui/icons-material';
import authService from '../services/auth.service';
import './auth/Auth.css';

const Unsubscribe = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    document.title = 'Unsubscribe from Emails - Sphinic';
  }, []);

  useEffect(() => {
    if (success) {
      const t = setTimeout(() => navigate('/', { replace: true }), 2000);
      return () => clearTimeout(t);
    }
  }, [success, navigate]);

  const handleConfirm = async () => {
    if (!token) {
      setError('Invalid or expired link. Please use the link from your reminder email.');
      return;
    }

    setError('');
    try {
      setLoading(true);
      await authService.unsubscribeFromEmails(token);
      setSuccess(true);
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || err.message || 'Failed to unsubscribe. The link may have expired.';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    navigate('/login', { replace: true });
  };

  if (!token) {
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
        <Container maxWidth="sm" sx={{ position: 'relative', zIndex: 2 }}>
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
              '&:hover': { color: 'white' },
            }}
          >
            <Home /> Home
          </Link>
          <Paper
            elevation={0}
            sx={{
              p: 4,
              borderRadius: '24px',
              background: 'rgba(255, 255, 255, 0.05)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
            }}
          >
            <Alert severity="error" sx={{ mb: 2 }}>
              Invalid or expired link. Please use the unsubscribe link from your reminder email.
            </Alert>
            <Button component={RouterLink} to="/login" variant="contained" fullWidth>
              Go to Login
            </Button>
          </Paper>
        </Container>
      </Box>
    );
  }

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
      <Container maxWidth="sm" sx={{ position: 'relative', zIndex: 2 }}>
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
            '&:hover': { color: 'white' },
          }}
        >
          <Home /> Home
        </Link>

        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Box
            sx={{
              background: 'rgba(255, 255, 255, 0.05)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '24px',
              p: 4,
              mb: 4,
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
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
              variant="h5"
              sx={{
                fontWeight: 700,
                mb: 2,
                color: 'rgba(255, 255, 255, 0.95)',
                letterSpacing: '-0.02em',
              }}
            >
              Unsubscribe from reminder emails?
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: 'rgba(255, 255, 255, 0.8)',
                lineHeight: 1.7,
              }}
            >
              Are you sure you want to unsubscribe from getting daily reminder emails?
              If you do so, you will not receive any reminder emails.
            </Typography>
          </Box>
        </Box>

        <Paper
          elevation={0}
          sx={{
            p: 4,
            borderRadius: '24px',
            background: 'rgba(255, 255, 255, 0.05)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
          }}
        >
          {error && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {error}
            </Alert>
          )}

          {success ? (
            <>
              <Alert severity="success" sx={{ mb: 3 }}>
                Sorry to see you go.
              </Alert>
            </>
          ) : (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Button
                variant="contained"
                color="error"
                size="large"
                fullWidth
                disabled={loading}
                onClick={handleConfirm}
                sx={{ py: 2, borderRadius: '12px', textTransform: 'none', fontWeight: 600 }}
              >
                {loading ? <CircularProgress size={24} color="inherit" /> : 'Yes, unsubscribe'}
              </Button>
              <Button
                variant="outlined"
                size="large"
                fullWidth
                disabled={loading}
                onClick={handleCancel}
                sx={{
                  py: 2,
                  borderRadius: '12px',
                  textTransform: 'none',
                  fontWeight: 600,
                  borderColor: 'rgba(255, 255, 255, 0.3)',
                  color: 'rgba(255, 255, 255, 0.95)',
                  '&:hover': {
                    borderColor: 'rgba(255, 255, 255, 0.5)',
                    backgroundColor: 'rgba(255, 255, 255, 0.08)',
                  },
                }}
              >
                No, keep reminders
              </Button>
            </Box>
          )}
        </Paper>
      </Container>
    </Box>
  );
};

export default Unsubscribe;
