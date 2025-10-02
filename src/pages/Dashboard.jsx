// src/pages/Dashboard.jsx
import { 
  Box, 
  Typography, 
  Container, 
  Button, 
  Card, 
  CardContent, 
  alpha, 
  Alert,
  Grid
} from "@mui/material";
import { 
  FitnessCenter, 
  CheckCircle, 
  ArrowForward,
  Assessment,
  Psychology
} from "@mui/icons-material";
import DashboardLayout from "../layout/DashboardLayout";
import { useAuth } from "../context/AuthContext";
import fitbitService from "../services/fitbit.service";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import DailyLogModal from "../components/DailyLogModal";
import dailyLogService from "../services/dailyLog.service";

export default function Dashboard() {
  const { user } = useAuth();
  const [connecting, setConnecting] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [logModalOpen, setLogModalOpen] = useState(false);
  const [logMessage, setLogMessage] = useState({ show: false, type: '', text: '' });
  const location = useLocation();

  // Check for OAuth callback success
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    if (urlParams.get('fitbit') === 'connected') {
      setShowSuccessMessage(true);
      
      // Update user context to reflect Fitbit connection
      // Since backend has updated the user's wearable status,
      // we need to update the frontend context immediately
      const updatedUser = {
        ...user,
        isWearableConnected: true,
        wearableType: 'FITBIT'
      };
      
      // Update localStorage and context
      localStorage.setItem('user', JSON.stringify(updatedUser));
      window.dispatchEvent(new CustomEvent('userUpdated', { detail: updatedUser }));
      
      // Clear the URL parameter
      window.history.replaceState({}, document.title, '/dashboard');
      
      // Hide success message after 5 seconds
      setTimeout(() => {
        setShowSuccessMessage(false);
      }, 5000);
    }
  }, [location, user]);

  const handleConnectFitbit = async () => {
    try {
      setConnecting(true);
      await fitbitService.connect();
    } catch (error) {
      console.error('Failed to connect Fitbit:', error);
      setConnecting(false);
    }
  };

  const handleLogSave = async (logData) => {
    try {
      const result = await dailyLogService.createDailyLog(logData);
      console.log('Daily log saved:', result);
      
      // Show success message
      setLogMessage({
        show: true,
        type: 'success',
        text: 'Daily log saved successfully! 🎉'
      });
      
      // Hide message after 5 seconds
      setTimeout(() => {
        setLogMessage({ show: false, type: '', text: '' });
      }, 5000);
      
    } catch (error) {
      console.error('Failed to save log:', error);
      
      // Show error message
      setLogMessage({
        show: true,
        type: 'error',
        text: error.message || 'Failed to save daily log. Please try again.'
      });
      
      // Hide message after 7 seconds (longer for errors)
      setTimeout(() => {
        setLogMessage({ show: false, type: '', text: '' });
      }, 7000);
    }
  };

  const isFitbitConnected = fitbitService.isConnected(user);

  return (
    <DashboardLayout>
      <Container maxWidth="xl" sx={{ py: 3 }}>
        {/* Fitbit Success Message */}
        {showSuccessMessage && (
          <Alert 
            severity="success" 
            sx={{ 
              mb: 3,
              background: `linear-gradient(135deg, ${alpha('#4caf50', 0.1)}, ${alpha('#4caf50', 0.05)})`,
              backdropFilter: 'blur(20px)',
              border: `1px solid ${alpha('#4caf50', 0.3)}`,
              color: 'white',
              '& .MuiAlert-icon': {
                color: '#4caf50',
              },
              '& .MuiAlert-message': {
                color: 'white',
                fontWeight: 500,
              }
            }}
          >
            🎉 Fitbit connected successfully! Your data is now syncing with your spine health dashboard.
          </Alert>
        )}

        {/* Daily Log Success/Error Message */}
        {logMessage.show && (
          <Alert 
            severity={logMessage.type}
            sx={{ 
              mb: 3,
              background: logMessage.type === 'success' 
                ? `linear-gradient(135deg, ${alpha('#4caf50', 0.1)}, ${alpha('#4caf50', 0.05)})`
                : `linear-gradient(135deg, ${alpha('#f44336', 0.1)}, ${alpha('#f44336', 0.05)})`,
              backdropFilter: 'blur(20px)',
              border: logMessage.type === 'success' 
                ? `1px solid ${alpha('#4caf50', 0.3)}`
                : `1px solid ${alpha('#f44336', 0.3)}`,
              color: 'white',
              '& .MuiAlert-icon': {
                color: logMessage.type === 'success' ? '#4caf50' : '#f44336',
              },
              '& .MuiAlert-message': {
                color: 'white',
                fontWeight: 500,
              }
            }}
          >
            {logMessage.text}
          </Alert>
        )}

        {/* Hero Section */}
        <Box sx={{ mb: 4 }}>
          <Typography
            variant="h3"
            sx={{
              fontWeight: 900,
              mb: 2,
              background: 'linear-gradient(135deg, #ffffff 0%, #a8edea 50%, #fed6e3 100%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              textShadow: '0 0 30px rgba(255,255,255,0.3)',
              letterSpacing: '-0.02em',
            }}
          >
            Welcome back, {user?.fullName?.split(' ')[0] || 'User'}! 👋
          </Typography>
          <Typography variant="h6" sx={{ color: 'rgba(255, 255, 255, 0.8)', fontWeight: 300 }}>
            Track your spine health journey with personalized insights and data-driven recommendations.
          </Typography>
        </Box>

        {/* Stats Grid */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          {/* Disc Protection Score Card */}
          <Grid item xs={12} sm={6} md={4}>
            <Card
              sx={{
                borderRadius: 4,
                background: `linear-gradient(135deg, ${alpha('#ffffff', 0.1)}, ${alpha('#ffffff', 0.05)})`,
                backdropFilter: 'blur(20px)',
                border: `1px solid ${alpha('#ffffff', 0.2)}`,
                height: '100%',
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
              <CardContent sx={{ p: 4, textAlign: 'center', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <Box sx={{ mb: 3 }}>
                  <Psychology 
                    sx={{ 
                      fontSize: 48, 
                      color: '#4facfe',
                      filter: 'drop-shadow(0 0 8px rgba(79, 172, 254, 0.5))'
                    }} 
                  />
                </Box>
                <Typography variant="h6" sx={{ color: 'rgba(255, 255, 255, 0.9)', fontWeight: 500, mb: 2 }}>
                  Disc Protection Score
                </Typography>
                <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.6)', mb: 3 }}>
                  {isFitbitConnected ? 'Calculating from your activity data...' : 'Connect Fitbit to get your personalized score'}
                </Typography>
                {isFitbitConnected ? (
                  <Box sx={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    gap: 1,
                    color: '#4facfe'
                  }}>
                    <Box sx={{
                      width: 20,
                      height: 20,
                      borderRadius: '50%',
                      border: '2px solid #4facfe',
                      borderTop: '2px solid transparent',
                      animation: 'spin 1s linear infinite'
                    }} />
                    <Typography variant="caption">
                      Analyzing...
                    </Typography>
                  </Box>
                ) : (
                  <Button
                    variant="outlined"
                    size="small"
                    onClick={handleConnectFitbit}
                    disabled={connecting}
                    sx={{
                      border: `1px solid ${alpha('#4facfe', 0.3)}`,
                      color: '#4facfe',
                      borderRadius: '20px',
                      px: 2,
                      py: 0.5,
                      fontSize: '0.8rem',
                      '&:hover': {
                        border: `1px solid ${alpha('#4facfe', 0.5)}`,
                        background: alpha('#4facfe', 0.1),
                      },
                    }}
                  >
                    Connect to Calculate
                  </Button>
                )}
              </CardContent>
            </Card>
          </Grid>

          {/* Fitbit Connection Card */}
          <Grid item xs={12} sm={6} md={4}>
            <Card
              sx={{
                borderRadius: 4,
                background: `linear-gradient(135deg, ${alpha('#ffffff', 0.1)}, ${alpha('#ffffff', 0.05)})`,
                backdropFilter: 'blur(20px)',
                border: `1px solid ${alpha('#ffffff', 0.2)}`,
                height: '100%',
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
              <CardContent sx={{ p: 4, textAlign: 'center', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <Box sx={{ mb: 3 }}>
                  {isFitbitConnected ? (
                    <CheckCircle 
                      sx={{ 
                        fontSize: 48, 
                        color: '#4caf50',
                        filter: 'drop-shadow(0 0 8px rgba(76, 175, 80, 0.5))'
                      }} 
                    />
                  ) : (
                    <FitnessCenter 
                      sx={{ 
                        fontSize: 48, 
                        color: '#ff6b6b',
                        filter: 'drop-shadow(0 0 8px rgba(255, 107, 107, 0.5))'
                      }} 
                    />
                  )}
                </Box>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, color: isFitbitConnected ? '#4caf50' : '#ff6b6b' }}>
                  {isFitbitConnected ? 'Fitbit Connected' : 'Connect Fitbit'}
                </Typography>
                <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.8)', mb: 3 }}>
                  {isFitbitConnected ? 'Last synced: 5 minutes ago' : 'Sync your activity data'}
                </Typography>
                {!isFitbitConnected && (
                  <Button
                    variant="contained"
                    size="medium"
                    onClick={handleConnectFitbit}
                    disabled={connecting}
                    sx={{
                      background: 'linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%)',
                      borderRadius: '25px',
                      px: 3,
                      py: 1,
                      fontSize: '0.9rem',
                      fontWeight: 600,
                      textTransform: 'none',
                      '&:hover': {
                        background: 'linear-gradient(135deg, #ee5a24 0%, #ff6b6b 100%)',
                        transform: 'translateY(-1px)',
                      },
                    }}
                  >
                    {connecting ? 'Connecting...' : 'Connect'}
                  </Button>
                )}
              </CardContent>
            </Card>
          </Grid>

          {/* Daily Log Card */}
          <Grid item xs={12} sm={12} md={4}>
            <Card
              sx={{
                borderRadius: 4,
                background: `linear-gradient(135deg, ${alpha('#ffffff', 0.1)}, ${alpha('#ffffff', 0.05)})`,
                backdropFilter: 'blur(20px)',
                border: `1px solid ${alpha('#ffffff', 0.2)}`,
                height: '100%',
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
              <CardContent sx={{ p: 4, textAlign: 'center', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <Box sx={{ mb: 3 }}>
                  <Assessment 
                    sx={{ 
                      fontSize: 48, 
                      color: '#ff6b6b',
                      filter: 'drop-shadow(0 0 8px rgba(255, 107, 107, 0.5))'
                    }} 
                  />
                </Box>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, color: '#ff6b6b' }}>
                  Daily Log
                </Typography>
                <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.8)', mb: 3 }}>
                  Track your spine health today
                </Typography>
                <Button
                  variant="contained"
                  size="medium"
                  onClick={() => setLogModalOpen(true)}
                  sx={{
                    background: 'linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%)',
                    borderRadius: '25px',
                    px: 3,
                    py: 1,
                    fontSize: '0.9rem',
                    fontWeight: 600,
                    textTransform: 'none',
                    '&:hover': {
                      background: 'linear-gradient(135deg, #ee5a24 0%, #ff6b6b 100%)',
                      transform: 'translateY(-1px)',
                    },
                  }}
                >
                  Start Logging
                </Button>
              </CardContent>
            </Card>
          </Grid>
      </Grid>


        {/* Daily Log Modal */}
        <DailyLogModal
          open={logModalOpen}
          onClose={() => setLogModalOpen(false)}
          onSave={handleLogSave}
        />
      </Container>
    </DashboardLayout>
  );
}
