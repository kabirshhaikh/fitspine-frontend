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
  Grid,
  CircularProgress,
  TextField,
  Backdrop
} from "@mui/material";
import { 
  FitnessCenter, 
  CheckCircle, 
  ArrowForward,
  Assessment,
  Psychology,
  Visibility,
  History,
  LinkOff
} from "@mui/icons-material";
import DashboardLayout from "../layout/DashboardLayout";
import { useAuth } from "../context/AuthContext";
import fitbitService from "../services/fitbit.service";
import { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import DailyLogModal from "../components/DailyLogModal";
import dailyLogService from "../services/dailyLog.service";
import insightsService from "../services/insights.service";
import InsightsModal from "../components/InsightsModal";
import WeeklyGraphWidget from "../components/widgets/WeeklyGraphWidget";
import api from "../services/api";

export default function Dashboard() {
  useEffect(() => {
    document.title = 'Dashboard - Sphinic';
  }, []);

  const { user, isAuthenticated, loading, updateUserFromResponse } = useAuth();
  const navigate = useNavigate();
  const [connecting, setConnecting] = useState(false);
  const [revoking, setRevoking] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [logModalOpen, setLogModalOpen] = useState(false);
  const [logMessage, setLogMessage] = useState({ show: false, type: '', text: '' });
  const [insights, setInsights] = useState(null);
  const [loadingInsights, setLoadingInsights] = useState(false);
  const [insightsError, setInsightsError] = useState(null);
  const [insightsModalOpen, setInsightsModalOpen] = useState(false);
  // Separate state for viewing insights
  const [viewDate, setViewDate] = useState(() => {
    // Default to today's date in YYYY-MM-DD format
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  });
  const [loadingViewInsights, setLoadingViewInsights] = useState(false);
  const [viewInsightsError, setViewInsightsError] = useState(null);
  // State for viewing past logs
  const [viewLogDate, setViewLogDate] = useState(() => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  });
  const [loadingViewLog, setLoadingViewLog] = useState(false);
  const [viewLogError, setViewLogError] = useState(null);
  const [logModalDate, setLogModalDate] = useState(null); // Date to pass to modal
  const location = useLocation();
  const hasProcessedFitbitConnection = useRef(false);

  // Route guard - redirect unauthenticated users (only when not loading)
  useEffect(() => {
    if (!loading && !isAuthenticated) {
      navigate('/login', { replace: true });
    }
  }, [isAuthenticated, loading, navigate]);

  // Check for OAuth callback success
  useEffect(() => {
    const handleFitbitCallback = async () => {
      const urlParams = new URLSearchParams(location.search);
      if (urlParams.get('fitbit') === 'connected' && !hasProcessedFitbitConnection.current) {
        hasProcessedFitbitConnection.current = true;
        setShowSuccessMessage(true);
        
        // Fetch fresh user data from backend after Fitbit connection
        // The backend has updated the user's wearable status, so we need to get the complete user data
        try {
          const response = await api.get('/api/user/me');
          const updatedUserData = response.data;
          
          // Use AuthContext method to properly update user state
          updateUserFromResponse(updatedUserData);
        } catch (error) {
          // Fallback: still show success message even if refresh fails
          // The user can manually refresh the page if needed
        }
        
        // Clear the URL parameter
        window.history.replaceState({}, document.title, '/dashboard');
        
        // Hide success message after 5 seconds
        setTimeout(() => {
          setShowSuccessMessage(false);
        }, 5000);
      }
    };

    handleFitbitCallback();
  }, [location]); // Removed 'user' from dependency array to prevent infinite loop

  const handleConnectFitbit = async () => {
    try {
      setConnecting(true);
      await fitbitService.connect();
    } catch (error) {
      setConnecting(false);
    }
  };

  const handleRevokeFitbit = async () => {
    try {
      setRevoking(true);
      await fitbitService.revoke();
      
      // Update user context to reflect Fitbit disconnection
      const updatedUser = {
        ...user,
        isWearableConnected: false,
        wearableType: null
      };
      
      // Update localStorage and context
      localStorage.setItem('user', JSON.stringify(updatedUser));
      window.dispatchEvent(new CustomEvent('userUpdated', { detail: updatedUser }));
      
      // Show success message
      setLogMessage({
        show: true,
        type: 'success',
        text: 'Fitbit disconnected successfully!'
      });
      
      // Hide message after 5 seconds
      setTimeout(() => {
        setLogMessage({ show: false, type: '', text: '' });
      }, 5000);
    } catch (error) {
      setLogMessage({
        show: true,
        type: 'error',
        text: error.message || 'Failed to disconnect Fitbit. Please try again.'
      });
      
      // Hide message after 7 seconds
      setTimeout(() => {
        setLogMessage({ show: false, type: '', text: '' });
      }, 7000);
    } finally {
      setRevoking(false);
    }
  };

  const handleGenerateInsights = async () => {
    try {
      // Reset any previous errors and start loading
      setInsightsError(null);
      setLoadingInsights(true);
      
      // Wait for insights
      const data = await insightsService.getTodaysInsights();
      
      // Set insights and open modal
      setInsights(data);
      setInsightsModalOpen(true);
      
      // Clear loading state
      setLoadingInsights(false);
    } catch (error) {
      // More detailed error message for user
      let errorMessage = 'Failed to generate insights. ';
      
      if (error.response?.status === 404) {
        errorMessage += 'No data available for today. Please log your daily activities first.';
      } else if (error.response?.status === 500) {
        errorMessage += 'Server error. Please try again in a moment.';
      } else if (error.response?.data?.message) {
        errorMessage += error.response.data.message;
      } else if (error.message) {
        errorMessage += error.message;
      } else {
        errorMessage += 'Please try again.';
      }
      
      setInsightsError(errorMessage);
      setLoadingInsights(false);
    }
  };

  const handleViewInsights = async () => {
    try {
      // Reset any previous errors and start loading
      setViewInsightsError(null);
      setLoadingViewInsights(true);
      
      // Try to get existing insight for the selected date
      const data = await insightsService.getAiInsightForDay(viewDate);
      
      // If we have data, open modal
      if (data) {
        setInsights(data);
        setInsightsModalOpen(true);
        setViewInsightsError(null);
      } else {
        setViewInsightsError('No insights data received from server.');
      }
      
      // Clear loading state
      setLoadingViewInsights(false);
    } catch (error) {
      // More detailed error message for user
      let errorMessage = 'Failed to fetch insights. ';
      
      if (error.response?.status === 404) {
        errorMessage = `No insights available for ${viewDate}. Please generate insights first or log your daily activities.`;
      } else if (error.response?.status === 500) {
        errorMessage += 'Server error. Please try again in a moment.';
      } else if (error.response?.data?.message) {
        errorMessage += error.response.data.message;
      } else if (error.message) {
        errorMessage += error.message;
      } else {
        errorMessage += 'Please try again.';
      }
      
      setViewInsightsError(errorMessage);
      setLoadingViewInsights(false);
    }
  };

  const handleViewLog = async () => {
    try {
      // Reset any previous errors and start loading
      setViewLogError(null);
      setLoadingViewLog(true);
      
      // Try to get existing log for the selected date
      const logData = await dailyLogService.getLogForDate(viewLogDate);
      
      // If we have data, open modal with pre-filled data
      if (logData) {
        setLogModalDate(viewLogDate);
        setLogModalOpen(true);
        setViewLogError(null);
      } else {
        setViewLogError('No log data received from server.');
      }
      
      // Clear loading state
      setLoadingViewLog(false);
    } catch (error) {
      // More detailed error message for user
      let errorMessage = 'Failed to fetch log. ';
      
      if (error.response?.status === 404) {
        errorMessage = `No log found for ${viewLogDate}. Please create a log for this date first.`;
      } else if (error.response?.status === 500) {
        errorMessage += 'Server error. Please try again in a moment.';
      } else if (error.response?.data?.message) {
        errorMessage += error.response.data.message;
      } else if (error.message) {
        errorMessage += error.message;
      } else {
        errorMessage += 'Please try again.';
      }
      
      setViewLogError(errorMessage);
      setLoadingViewLog(false);
    }
  };

  const handleLogSave = async (logData, isUpdate = false) => {
    try {
      // Remove internal flag before sending to API
      const { _isUpdate, ...cleanLogData } = logData;
      
      await dailyLogService.createDailyLog(cleanLogData);
      
      // Show appropriate success message based on create/update
      setLogMessage({
        show: true,
        type: 'success',
        text: isUpdate 
          ? 'Daily log updated successfully! ✏️' 
          : 'Daily log created successfully! 🎉'
      });
      
      // Hide message after 5 seconds
      setTimeout(() => {
        setLogMessage({ show: false, type: '', text: '' });
      }, 5000);
      
    } catch (error) {
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

  // Show loading while auth is being checked
  if (loading) {
    return (
      <DashboardLayout>
        <Container maxWidth="lg" sx={{ py: 3, display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh' }}>
          <Box display="flex" flexDirection="column" alignItems="center" gap={2}>
            <CircularProgress size={40} sx={{ color: '#4facfe' }} />
            <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
              Loading...
            </Typography>
          </Box>
        </Container>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <Container maxWidth="lg" sx={{ py: 3, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
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
        <Box sx={{ mb: 4, textAlign: 'center' }}>
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
        <Grid container spacing={3} sx={{ mb: 4, justifyContent: 'center' }}>
          {/* AI Insights Card */}
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
                  AI Spine Insights
                </Typography>
                
                {insightsError ? (
                  <Box sx={{ mb: 3, p: 2, background: alpha('#f44336', 0.1), borderRadius: 2, border: `1px solid ${alpha('#f44336', 0.3)}` }}>
                    <Typography variant="body2" sx={{ color: '#f44336', mb: 0.5, fontWeight: 600 }}>
                      Error
                    </Typography>
                    <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.7)', display: 'block', lineHeight: 1.4 }}>
                      {insightsError}
                    </Typography>
                  </Box>
                ) : (
                  <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.6)', mb: 3 }}>
                    Generate personalized spine health insights
                  </Typography>
                )}

                <Button
                  variant="contained"
                  size="medium"
                  onClick={handleGenerateInsights}
                  disabled={loadingInsights}
                  startIcon={loadingInsights ? <CircularProgress size={16} sx={{ color: 'white' }} /> : null}
                  sx={{
                    background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
                    borderRadius: '25px',
                    px: 3,
                    py: 1,
                    fontSize: '0.9rem',
                    fontWeight: 600,
                    textTransform: 'none',
                    position: 'relative',
                    '&:hover': {
                      background: 'linear-gradient(135deg, #00f2fe 0%, #4facfe 100%)',
                      transform: 'translateY(-1px)',
                    },
                    '&:disabled': {
                      background: 'rgba(255, 255, 255, 0.1)',
                      color: 'rgba(255, 255, 255, 0.5)',
                    }
                  }}
                >
                  {loadingInsights ? 'Generating Insights...' : 'Generate Insights'}
                </Button>
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
                  Track your daily activity
                </Typography>
                {!isFitbitConnected ? (
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
                ) : (
                  <Button
                    variant="contained"
                    size="medium"
                    onClick={handleRevokeFitbit}
                    disabled={revoking}
                    startIcon={revoking ? <CircularProgress size={16} sx={{ color: 'white' }} /> : <LinkOff />}
                    sx={{
                      background: 'linear-gradient(135deg, #f44336 0%, #d32f2f 100%)',
                      borderRadius: '25px',
                      px: 3,
                      py: 1,
                      fontSize: '0.9rem',
                      fontWeight: 600,
                      textTransform: 'none',
                      '&:hover': {
                        background: 'linear-gradient(135deg, #d32f2f 0%, #f44336 100%)',
                        transform: 'translateY(-1px)',
                      },
                      '&:disabled': {
                        background: 'rgba(255, 255, 255, 0.1)',
                        color: 'rgba(255, 255, 255, 0.5)',
                      }
                    }}
                  >
                    {revoking ? 'Disconnecting...' : 'Disconnect'}
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

        {/* View Insights Section */}
        <Box sx={{ mb: 4, width: '100%' }}>
          <Card
            sx={{
              borderRadius: 4,
              background: `linear-gradient(135deg, ${alpha('#ffffff', 0.1)}, ${alpha('#ffffff', 0.05)})`,
              backdropFilter: 'blur(20px)',
              border: `1px solid ${alpha('#ffffff', 0.2)}`,
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
            <CardContent sx={{ p: 4 }}>
              <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, alignItems: { xs: 'stretch', md: 'center' }, gap: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flex: { xs: 'none', md: '0 0 auto' } }}>
                  <Visibility 
                    sx={{ 
                      fontSize: 40, 
                      color: '#9c27b0',
                      filter: 'drop-shadow(0 0 8px rgba(156, 39, 176, 0.5))'
                    }} 
                  />
                  <Box>
                    <Typography variant="h6" sx={{ color: 'rgba(255, 255, 255, 0.9)', fontWeight: 600, mb: 0.5 }}>
                      View Past AI Insights
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.6)', fontSize: '0.85rem' }}>
                      Select a date to view previously generated insights
                    </Typography>
                  </Box>
                </Box>
                
                <Box sx={{ flex: { xs: 'none', md: '1 1 auto' }, display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 2, alignItems: { xs: 'stretch', sm: 'center' } }}>
                  <TextField
                    type="date"
                    label="Select Date"
                    value={viewDate}
                    onChange={(e) => setViewDate(e.target.value)}
                    disabled={loadingViewInsights}
                    InputLabelProps={{
                      shrink: true,
                      sx: { color: 'rgba(255, 255, 255, 0.7)' }
                    }}
                    inputProps={{
                      max: new Date().toISOString().split('T')[0], // Prevent future dates
                    }}
                    sx={{
                      flex: { xs: 'none', sm: '1 1 auto' },
                      minWidth: { xs: '100%', sm: '200px' },
                      '& .MuiOutlinedInput-root': {
                        color: 'white',
                        '& fieldset': {
                          borderColor: 'rgba(255, 255, 255, 0.3)',
                        },
                        '&:hover fieldset': {
                          borderColor: 'rgba(255, 255, 255, 0.5)',
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: '#9c27b0',
                        },
                      },
                      '& .MuiInputLabel-root': {
                        color: 'rgba(255, 255, 255, 0.7)',
                      },
                      '& .MuiInputBase-input': {
                        color: 'white',
                      },
                    }}
                  />
                  
                  <Button
                    variant="contained"
                    size="medium"
                    onClick={handleViewInsights}
                    disabled={loadingViewInsights}
                    startIcon={loadingViewInsights ? <CircularProgress size={16} sx={{ color: 'white' }} /> : <Visibility />}
                    sx={{
                      background: 'linear-gradient(135deg, #9c27b0 0%, #7b1fa2 100%)',
                      borderRadius: '25px',
                      px: 3,
                      py: 1.5,
                      fontSize: '0.9rem',
                      fontWeight: 600,
                      textTransform: 'none',
                      whiteSpace: 'nowrap',
                      '&:hover': {
                        background: 'linear-gradient(135deg, #7b1fa2 0%, #9c27b0 100%)',
                        transform: 'translateY(-1px)',
                      },
                      '&:disabled': {
                        background: 'rgba(255, 255, 255, 0.1)',
                        color: 'rgba(255, 255, 255, 0.5)',
                      }
                    }}
                  >
                    {loadingViewInsights ? 'Loading...' : 'View Insights'}
                  </Button>
                </Box>
              </Box>
              
              {viewInsightsError && (
                <Box sx={{ mt: 2, p: 2, background: alpha('#f44336', 0.1), borderRadius: 2, border: `1px solid ${alpha('#f44336', 0.3)}` }}>
                  <Typography variant="body2" sx={{ color: '#f44336', fontWeight: 600, mb: 0.5 }}>
                    Error
                  </Typography>
                  <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.7)', display: 'block', lineHeight: 1.4 }}>
                    {viewInsightsError}
                  </Typography>
                </Box>
              )}
            </CardContent>
          </Card>
        </Box>

        {/* View Past Logs Section */}
        <Box sx={{ mb: 4, width: '100%' }}>
          <Card
            sx={{
              borderRadius: 4,
              background: `linear-gradient(135deg, ${alpha('#ffffff', 0.1)}, ${alpha('#ffffff', 0.05)})`,
              backdropFilter: 'blur(20px)',
              border: `1px solid ${alpha('#ffffff', 0.2)}`,
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
            <CardContent sx={{ p: 4 }}>
              <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, alignItems: { xs: 'stretch', md: 'center' }, gap: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flex: { xs: 'none', md: '0 0 auto' } }}>
                  <History 
                    sx={{ 
                      fontSize: 40, 
                      color: '#ff6b6b',
                      filter: 'drop-shadow(0 0 8px rgba(255, 107, 107, 0.5))'
                    }} 
                  />
                  <Box>
                    <Typography variant="h6" sx={{ color: 'rgba(255, 255, 255, 0.9)', fontWeight: 600, mb: 0.5 }}>
                      View Past Manual Logs
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.6)', fontSize: '0.85rem' }}>
                      Select a date to view or edit previously logged data
                    </Typography>
                  </Box>
                </Box>
                
                <Box sx={{ flex: { xs: 'none', md: '1 1 auto' }, display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 2, alignItems: { xs: 'stretch', sm: 'center' } }}>
                  <TextField
                    type="date"
                    label="Select Date"
                    value={viewLogDate}
                    onChange={(e) => setViewLogDate(e.target.value)}
                    disabled={loadingViewLog}
                    InputLabelProps={{
                      shrink: true,
                      sx: { color: 'rgba(255, 255, 255, 0.7)' }
                    }}
                    inputProps={{
                      max: new Date().toISOString().split('T')[0], // Prevent future dates
                    }}
                    sx={{
                      flex: { xs: 'none', sm: '1 1 auto' },
                      minWidth: { xs: '100%', sm: '200px' },
                      '& .MuiOutlinedInput-root': {
                        color: 'white',
                        '& fieldset': {
                          borderColor: 'rgba(255, 255, 255, 0.3)',
                        },
                        '&:hover fieldset': {
                          borderColor: 'rgba(255, 255, 255, 0.5)',
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: '#ff6b6b',
                        },
                      },
                      '& .MuiInputLabel-root': {
                        color: 'rgba(255, 255, 255, 0.7)',
                      },
                      '& .MuiInputBase-input': {
                        color: 'white',
                      },
                    }}
                  />
                  
                  <Button
                    variant="contained"
                    size="medium"
                    onClick={handleViewLog}
                    disabled={loadingViewLog}
                    startIcon={loadingViewLog ? <CircularProgress size={16} sx={{ color: 'white' }} /> : <History />}
                    sx={{
                      background: 'linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%)',
                      borderRadius: '25px',
                      px: 3,
                      py: 1.5,
                      fontSize: '0.9rem',
                      fontWeight: 600,
                      textTransform: 'none',
                      whiteSpace: 'nowrap',
                      '&:hover': {
                        background: 'linear-gradient(135deg, #ee5a24 0%, #ff6b6b 100%)',
                        transform: 'translateY(-1px)',
                      },
                      '&:disabled': {
                        background: 'rgba(255, 255, 255, 0.1)',
                        color: 'rgba(255, 255, 255, 0.5)',
                      }
                    }}
                  >
                    {loadingViewLog ? 'Loading...' : 'View Log'}
                  </Button>
                </Box>
              </Box>
              
              {viewLogError && (
                <Box sx={{ mt: 2, p: 2, background: alpha('#f44336', 0.1), borderRadius: 2, border: `1px solid ${alpha('#f44336', 0.3)}` }}>
                  <Typography variant="body2" sx={{ color: '#f44336', fontWeight: 600, mb: 0.5 }}>
                    Error
                  </Typography>
                  <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.7)', display: 'block', lineHeight: 1.4 }}>
                    {viewLogError}
                  </Typography>
                </Box>
              )}
            </CardContent>
          </Card>
        </Box>

        {/* Weekly Graph Widget */}
        <Box sx={{ mb: 4, width: '100%' }}>
          <Box sx={{ textAlign: 'center', mb: 2 }}>
            <Typography
              variant="h4"
              sx={{
                fontWeight: 700,
                mb: 1,
                color: 'white',
                textAlign: 'center',
              }}
            >
              7-Day Health Trends
            </Typography>
            <Typography
              variant="caption"
              sx={{
                color: 'rgba(255, 255, 255, 0.5)',
                fontStyle: 'italic',
                display: 'block',
                fontSize: { xs: '0.7rem', sm: '0.75rem' },
                maxWidth: '800px',
                mx: 'auto',
                px: 2,
              }}
            >
              ⚠️ Disclaimer: Sphinic is an informational wellness and data-analysis platform. The content, insights, and outputs provided by Sphinic are for general informational purposes only and are not intended to diagnose, treat, cure, prevent, or manage any disease or medical condition. Sphinic is not a medical device and does not provide medical or clinical advice. Users should not rely on Sphinic for medical decisions and should always consult a qualified healthcare professional for medical concerns.
            </Typography>
          </Box>
          <WeeklyGraphWidget />
        </Box>

        {/* Daily Log Modal */}
        <DailyLogModal
          open={logModalOpen}
          onClose={() => {
            setLogModalOpen(false);
            setLogModalDate(null); // Reset date when closing
          }}
          onSave={handleLogSave}
          selectedDate={logModalDate}
        />

        {/* Insights Modal */}
        <InsightsModal
          open={insightsModalOpen}
          onClose={() => setInsightsModalOpen(false)}
          insights={insights}
        />

        {/* Full Dashboard Loading Overlay */}
        <Backdrop
          open={loadingInsights}
          sx={{
            zIndex: (theme) => theme.zIndex.modal + 1,
            background: 'rgba(15, 15, 35, 0.85)',
            backdropFilter: 'blur(8px)',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 3,
            }}
          >
            <Psychology
              sx={{
                fontSize: 64,
                color: '#4facfe',
                animation: 'pulse 2s ease-in-out infinite',
                '@keyframes pulse': {
                  '0%, 100%': {
                    opacity: 1,
                    transform: 'scale(1)',
                  },
                  '50%': {
                    opacity: 0.7,
                    transform: 'scale(1.1)',
                  },
                },
              }}
            />
            <Typography
              variant="h5"
              sx={{
                color: 'white',
                fontWeight: 600,
                background: 'linear-gradient(135deg, #ffffff 0%, #4facfe 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Generating Insights...
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: 'rgba(255, 255, 255, 0.7)',
                fontWeight: 400,
                mt: -1,
              }}
            >
              This might take a couple of seconds
            </Typography>
            <CircularProgress
              size={48}
              sx={{
                color: '#4facfe',
              }}
            />
          </Box>
        </Backdrop>
      </Container>
    </DashboardLayout>
  );
}
