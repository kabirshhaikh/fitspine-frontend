// src/components/widgets/WeeklyGraphWidget.jsx
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import {
  Box,
  Typography,
  CircularProgress,
  Alert,
  Tabs,
  Tab,
  alpha,
} from '@mui/material';
import { Assessment, LocalHospital, FitnessCenter, Favorite, Psychology, Bedtime } from '@mui/icons-material';
import graphService from '../../services/graph.service';
import WidgetShell from './WidgetShell';
import PainStiffnessChart from './charts/PainStiffnessChart';
import ActivityChart from './charts/ActivityChart';
import HeartRateChart from './charts/HeartRateChart';
import SleepChart from './charts/SleepChart';
import WeeklyInsights from '../WeeklyInsights';

export default function WeeklyGraphWidget() {
  const location = useLocation();
  const [graphData, setGraphData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [tabValue, setTabValue] = useState(0);

  const loadGraphData = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await graphService.getTodaysWeeklyGraph();
      setGraphData(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadGraphData();
  }, [location.pathname]);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  if (loading) {
    return (
      <WidgetShell title="Weekly Health Overview" sx={{ minHeight: 200 }}>
        <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" py={4}>
          <CircularProgress size={40} sx={{ color: '#4facfe', mb: 2 }} />
          <Typography variant="body2" color="rgba(255, 255, 255, 0.7)">
            Loading weekly health data...
          </Typography>
        </Box>
      </WidgetShell>
    );
  }

  if (error) {
    return (
      <WidgetShell title="Weekly Health Overview">
        <Alert 
          severity="error" 
          sx={{ 
            background: `linear-gradient(135deg, ${alpha('#f44336', 0.1)}, ${alpha('#f44336', 0.05)})`,
            border: `1px solid ${alpha('#f44336', 0.3)}`,
            color: 'white',
            '& .MuiAlert-icon': { color: '#f44336' },
            '& .MuiAlert-message': { color: 'white' }
          }}
        >
          {error}
        </Alert>
      </WidgetShell>
    );
  }

  if (!graphData || !graphData.dailyData || !Array.isArray(graphData.dailyData)) {
    return (
      <WidgetShell title="Weekly Health Overview">
        <Box textAlign="center" py={4}>
          <Assessment sx={{ fontSize: 48, color: '#4facfe', mb: 2 }} />
          <Typography variant="h6" color="rgba(255, 255, 255, 0.8)" gutterBottom>
            No data available
          </Typography>
          <Typography variant="body2" color="rgba(255, 255, 255, 0.6)">
            Start logging your daily activities to see weekly health trends.
          </Typography>
        </Box>
      </WidgetShell>
    );
  }

  return (
    <WidgetShell 
      title="Weekly Health Overview"
      sx={{
        backdropFilter: 'none',
        boxShadow: 'none !important',
        '&:hover': {
          transform: 'none !important',
          boxShadow: 'none !important',
        },
        '&::before': {
          display: 'none',
        },
      }}
    >
      <Box>
        {/* Tabs */}
        <Box sx={{ borderBottom: 1, borderColor: 'divider', px: { xs: 1, sm: 2 }, overflowX: 'auto' }}>
          <Tabs
            value={tabValue}
            onChange={handleTabChange}
            variant="scrollable"
            scrollButtons="auto"
            sx={{
              '& .MuiTab-root': {
                color: 'rgba(255, 255, 255, 0.6)',
                textTransform: 'none',
                fontSize: { xs: '0.75rem', sm: '0.875rem' },
                minHeight: { xs: 40, sm: 48 },
                px: { xs: 1, sm: 2 },
                '&.Mui-selected': {
                  color: '#4facfe',
                },
              },
              '& .MuiTabs-indicator': {
                backgroundColor: '#4facfe',
              },
            }}
          >
            <Tab 
              icon={<Psychology sx={{ fontSize: { xs: 16, sm: 18 }, mb: 0.5 }} />} 
              iconPosition="start"
              label="Insights" 
            />
            <Tab 
              icon={<LocalHospital sx={{ fontSize: { xs: 16, sm: 18 }, mb: 0.5 }} />} 
              iconPosition="start"
              label="Pain & Stiffness" 
            />
            <Tab 
              icon={<FitnessCenter sx={{ fontSize: { xs: 16, sm: 18 }, mb: 0.5 }} />} 
              iconPosition="start"
              label="Activity" 
            />
            <Tab 
              icon={<Favorite sx={{ fontSize: { xs: 16, sm: 18 }, mb: 0.5 }} />} 
              iconPosition="start"
              label="Heart Rate" 
            />
            <Tab 
              icon={<Bedtime sx={{ fontSize: { xs: 16, sm: 18 }, mb: 0.5 }} />} 
              iconPosition="start"
              label="Sleep" 
            />
          </Tabs>
        </Box>

        {/* Tab Content */}
        <Box sx={{ 
          minHeight: { xs: 300, sm: 400 },
          width: '100%',
          overflow: 'auto'
        }}>
          {tabValue === 0 && (
            <Box sx={{ p: { xs: 2, sm: 3 }, width: '100%' }}>
              <WeeklyInsights weeklyGraphData={graphData} />
            </Box>
          )}
          {tabValue === 1 && (
            <PainStiffnessChart dailyData={graphData.dailyData} isFitbitConnected={graphData.isFitbitConnected === true} />
          )}
          {tabValue === 2 && (
            <ActivityChart dailyData={graphData.dailyData} isFitbitConnected={graphData.isFitbitConnected === true} />
          )}
          {tabValue === 3 && (
            <HeartRateChart dailyData={graphData.dailyData} isFitbitConnected={graphData.isFitbitConnected === true} />
          )}
          {tabValue === 4 && (
            <SleepChart dailyData={graphData.dailyData} isFitbitConnected={graphData.isFitbitConnected === true} />
          )}
        </Box>
      </Box>
    </WidgetShell>
  );
}
