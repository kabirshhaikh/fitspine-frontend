// src/components/widgets/WeeklyGraphWidget.jsx
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import {
  Box,
  Typography,
  CircularProgress,
  Alert,
  alpha,
  LinearProgress,
} from '@mui/material';
import { TrendingUp, TrendingDown, Remove, Assessment } from '@mui/icons-material';
import graphService from '../../services/graph.service';
import WidgetShell from './WidgetShell';

export default function WeeklyGraphWidget() {
  const location = useLocation();
  const [graphData, setGraphData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

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

  // Helper function to get readable label for pain level (matching backend enums)
  const getPainLabel = (value) => {
    if (value === null || value === -1) return 'No Data';
    const labels = ['None', 'Mild', 'Moderate', 'Severe'];
    return labels[value] || 'Unknown';
  };

  // Helper function to get readable label for time categories (matching backend enums)
  const getTimeLabel = (value) => {
    if (value === null || value === -1) return 'No Data';
    const labels = [
      'Less than 2h',      // 0
      '2-4 hours',        // 1
      '4-6 hours',        // 2
      '6-8 hours',        // 3
      'Greater than 8h'   // 4
    ];
    return labels[value] || 'Unknown';
  };

  // Helper function to get readable label for stress (matching backend enums)
  const getStressLabel = (value) => {
    if (value === null || value === -1) return 'No Data';
    const labels = ['Very Low', 'Low', 'Moderate', 'High', 'Very High'];
    return labels[value] || 'Unknown';
  };

  // Calculate average for a metric, filtering out null/-1 values
  const calculateAverage = (values) => {
    const validValues = values.filter(v => v !== null && v !== undefined && v !== -1);
    if (validValues.length === 0) return null;
    const sum = validValues.reduce((acc, val) => acc + val, 0);
    return sum / validValues.length;
  };

  // Calculate trend within the week (comparing first half vs second half)
  const calculateTrend = (values, metricName) => {
    const validValues = values.filter(v => v !== null && v !== undefined && v !== -1);
    if (validValues.length < 2) return null;
    
    const midPoint = Math.floor(validValues.length / 2);
    const firstHalf = validValues.slice(0, midPoint);
    const secondHalf = validValues.slice(midPoint);
    
    const firstAvg = firstHalf.reduce((a, b) => a + b, 0) / firstHalf.length;
    const secondAvg = secondHalf.reduce((a, b) => a + b, 0) / secondHalf.length;
    
    const diff = secondAvg - firstAvg;
    const percentChange = firstAvg !== 0 ? Math.abs((diff / firstAvg) * 100) : 0;
    
    if (percentChange < 5) return { direction: 'stable', change: 0 }; // Less than 5% change = stable
    
    // For metrics where lower is better (pain, stiffness, stress, sitting, sedentary)
    const lowerIsBetter = ['painLevel', 'morningStiffness', 'stressLevel', 'sittingTime', 'sedentaryHours', 'restingHeartRate'].includes(metricName);
    
    if (lowerIsBetter) {
      // If value decreased (second half < first half), that's better
      return { direction: diff < 0 ? 'better' : 'worse', change: percentChange };
    } else {
      // For metrics where higher is better (standing time), if value increased, that's better
      return { direction: diff > 0 ? 'better' : 'worse', change: percentChange };
    }
  };

  // Get color for a metric based on its value (green -> yellow -> red)
  const getMetricColor = (metricName, value, maxValue) => {
    if (value === null || value === -1 || maxValue === null) return alpha('#888888', 0.3);
    
    const percentage = maxValue > 0 ? value / maxValue : 0;
    
    // For metrics where lower is better (pain, stiffness, stress, sitting time, sedentary hours)
    if (['painLevel', 'morningStiffness', 'stressLevel', 'sittingTime', 'sedentaryHours'].includes(metricName)) {
      if (percentage <= 0.25) return '#4caf50'; // Green (good)
      if (percentage <= 0.5) return '#8bc34a'; // Light green
      if (percentage <= 0.75) return '#ff9800'; // Orange (moderate)
      return '#f44336'; // Red (bad)
    }
    
    // For metrics where higher is better (standing time)
    if (metricName === 'standingTime') {
      if (percentage >= 0.75) return '#4caf50'; // Green (good)
      if (percentage >= 0.5) return '#8bc34a'; // Light green
      if (percentage >= 0.25) return '#ff9800'; // Orange
      return '#f44336'; // Red (bad)
    }
    
    // For heart rate (normal range is ~60-100, lower is generally better for resting)
    if (metricName === 'restingHeartRate') {
      if (value <= 60) return '#4caf50'; // Green (excellent)
      if (value <= 70) return '#8bc34a'; // Light green (good)
      if (value <= 80) return '#ff9800'; // Orange (moderate)
      return '#f44336'; // Red (high)
    }
    
    return '#888888';
  };

  // Process weekly data and calculate metrics
  const processWeeklyData = () => {
    if (!graphData || !graphData.dailyData || !Array.isArray(graphData.dailyData)) {
      return null;
    }

    const metrics = {
      painLevel: graphData.dailyData.map(d => d.painLevel),
      morningStiffness: graphData.dailyData.map(d => d.morningStiffness),
      sittingTime: graphData.dailyData.map(d => d.sittingTime),
      standingTime: graphData.dailyData.map(d => d.standingTime),
      stressLevel: graphData.dailyData.map(d => d.stressLevel),
      restingHeartRate: graphData.dailyData.map(d => d.restingHeartRate),
      sedentaryHours: graphData.dailyData.map(d => d.sedentaryHours),
    };

    const results = {};
    
    Object.keys(metrics).forEach(key => {
      const values = metrics[key];
      const avg = calculateAverage(values);
      const trend = calculateTrend(values, key);
      const maxValue = key === 'restingHeartRate' ? 100 : (key === 'sedentaryHours' ? 16 : 4);
      
      // Get daily data for this metric
      const dailyData = graphData.dailyData.map((day, index) => ({
        date: day.date,
        value: values[index],
        dayName: new Date(day.date).toLocaleDateString('en-US', { weekday: 'short' }),
        dayNum: day.date.split('-')[2],
      }));
      
      results[key] = {
        average: avg,
        trend: trend,
        maxValue: maxValue,
        displayValue: avg !== null ? getMetricLabel(key, avg) : null,
        rawAverage: avg, // Keep raw average for percentage calculation
        dailyData: dailyData,
      };
    });

    return results;
  };

  // Get display label for a metric
  const getMetricLabel = (metricName, value) => {
    if (value === null || value === -1) return 'No Data';
    
    switch (metricName) {
      case 'painLevel':
        return getPainLabel(Math.round(value));
      case 'morningStiffness':
        return getPainLabel(Math.round(value));
      case 'stressLevel':
        return getStressLabel(Math.round(value));
      case 'sittingTime':
        return getTimeLabel(Math.round(value));
      case 'standingTime':
        return getTimeLabel(Math.round(value));
      case 'restingHeartRate':
        return `${Math.round(value)} bpm`;
      case 'sedentaryHours':
        return `${value.toFixed(1)} hrs`;
      default:
        return 'Unknown';
    }
  };

  // Get short display label for day boxes (abbreviated)
  const getShortMetricLabel = (metricName, value) => {
    if (value === null || value === -1) return '-';
    
    const roundedValue = Math.round(value);
    
    switch (metricName) {
      case 'painLevel':
      case 'morningStiffness': {
        const painLabels = ['None', 'Mild', 'Mod', 'Severe'];
        return painLabels[roundedValue] || '-';
      }
      case 'stressLevel': {
        const stressLabels = ['V Low', 'Low', 'Mod', 'High', 'V High'];
        return stressLabels[roundedValue] || '-';
      }
      case 'sittingTime':
      case 'standingTime': {
        const timeLabels = ['<2h', '2-4h', '4-6h', '6-8h', '>8h'];
        return timeLabels[roundedValue] || '-';
      }
      case 'restingHeartRate':
        return `${Math.round(value)}`;
      case 'sedentaryHours':
        return `${value.toFixed(1)}h`;
      default:
        return '-';
    }
  };

  // Get day color based on value for calendar heatmap (using solid colors to avoid glare)
  const getDayColor = (metricName, value, maxValue) => {
    if (value === null || value === -1 || maxValue === null) return '#555555';
    
    const percentage = maxValue > 0 ? value / maxValue : 0;
    
    // For metrics where lower is better - using solid colors
    if (['painLevel', 'morningStiffness', 'stressLevel', 'sittingTime', 'sedentaryHours'].includes(metricName)) {
      if (percentage <= 0.25) return '#4caf50'; // Green (good)
      if (percentage <= 0.5) return '#8bc34a'; // Light green
      if (percentage <= 0.75) return '#ff9800'; // Orange
      return '#f44336'; // Red (bad)
    }
    
    // For metrics where higher is better (standing time)
    if (metricName === 'standingTime') {
      if (percentage >= 0.75) return '#4caf50'; // Green (good)
      if (percentage >= 0.5) return '#8bc34a'; // Light green
      if (percentage >= 0.25) return '#ff9800'; // Orange
      return '#f44336'; // Red (bad)
    }
    
    // For heart rate
    if (metricName === 'restingHeartRate') {
      if (value <= 60) return '#4caf50'; // Green
      if (value <= 70) return '#8bc34a'; // Light green
      if (value <= 80) return '#ff9800'; // Orange
      return '#f44336'; // Red
    }
    
    return '#555555';
  };

  // Render a single metric bar
  const MetricBar = ({ label, value, average, trend, maxValue, color, dailyData, metricName }) => {
    if (value === null || value === -1 || average === null) {
      return (
        <Box sx={{ mb: 2.5 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
            <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.8)', fontWeight: 500 }}>
              {label}
            </Typography>
            <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.5)' }}>
              No Data
            </Typography>
          </Box>
          <LinearProgress 
            variant="determinate" 
            value={0} 
            sx={{ 
              height: 8, 
              borderRadius: 4,
              backgroundColor: alpha('#ffffff', 0.1),
              '& .MuiLinearProgress-bar': {
                backgroundColor: alpha('#888888', 0.3),
              }
            }} 
          />
        </Box>
      );
    }

    const percentage = maxValue > 0 ? (average / maxValue) * 100 : 0;
    const trendIcon = trend?.direction === 'better' ? <TrendingDown sx={{ fontSize: 18, color: '#4caf50' }} /> :
                     trend?.direction === 'worse' ? <TrendingUp sx={{ fontSize: 18, color: '#f44336' }} /> :
                     <Remove sx={{ fontSize: 18, color: '#888888' }} />;
    const trendText = trend?.direction === 'better' ? `↓ ${Math.round(trend.change)}%` :
                      trend?.direction === 'worse' ? `↑ ${Math.round(trend.change)}%` :
                      trend?.direction === 'stable' ? '→ 0%' : '';

    return (
      <Box sx={{ mb: 2.5 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
          <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.8)', fontWeight: 500 }}>
            {label}
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <Typography 
              variant="body2" 
              sx={{ 
                color: color, 
                fontWeight: 600,
                fontSize: '0.875rem'
              }}
            >
              {value}
            </Typography>
            {trend && trend.direction !== null && (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, ml: 1 }}>
                {trendIcon}
                <Typography 
                  variant="caption" 
                  sx={{ 
                    color: trend.direction === 'better' ? '#4caf50' : 
                           trend.direction === 'worse' ? '#f44336' : 
                           'rgba(255, 255, 255, 0.5)',
                    fontSize: '0.75rem'
                  }}
                >
                  {trendText}
                </Typography>
              </Box>
            )}
          </Box>
        </Box>
        <LinearProgress 
          variant="determinate" 
          value={Math.min(percentage, 100)} 
          sx={{ 
            height: 8, 
            borderRadius: 4,
            backgroundColor: alpha('#ffffff', 0.1),
            mb: 1.5,
            '& .MuiLinearProgress-bar': {
              backgroundColor: color,
              borderRadius: 4,
            }
          }} 
        />
        {/* 7-Day Calendar Heatmap */}
        {dailyData && dailyData.length > 0 && (
          <Box sx={{ display: 'flex', gap: 0.5, alignItems: 'center', mt: 1 }}>
            {dailyData.map((day, index) => {
              const dayValue = day.value;
              const dayColor = getDayColor(metricName, dayValue, maxValue);
              const displayValue = dayValue !== null && dayValue !== -1 ? getMetricLabel(metricName, dayValue) : 'No Data';
              
              return (
                <Box
                  key={index}
                  sx={{
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: 0.5,
                    position: 'relative',
                  }}
                  title={`${day.dayName} ${day.dayNum}: ${displayValue}`}
                >
                  <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.5)', fontSize: '0.65rem' }}>
                    {day.dayName}
                  </Typography>
                  <Box
                    sx={{
                      width: '100%',
                      height: 24,
                      borderRadius: 1,
                      backgroundColor: dayColor,
                      backgroundImage: 'none', // Remove any gradient overlays
                      border: `1px solid ${alpha('#ffffff', 0.1)}`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      boxShadow: 'none', // Remove any shadow that might cause glare
                      '&:hover': {
                        border: `1px solid ${alpha('#ffffff', 0.3)}`,
                        zIndex: 1,
                      }
                    }}
                  >
                    {dayValue !== null && dayValue !== -1 && (
                      <Typography 
                        variant="caption" 
                        sx={{ 
                          color: 'white', 
                          fontWeight: 600,
                          fontSize: '0.6rem',
                          textShadow: 'none',
                          textAlign: 'center',
                          lineHeight: 1,
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap',
                          width: '100%',
                          px: 0.5,
                        }}
                        title={getMetricLabel(metricName, dayValue)} // Full label on hover
                      >
                        {getShortMetricLabel(metricName, dayValue)}
                      </Typography>
                    )}
                  </Box>
                </Box>
              );
            })}
          </Box>
        )}
      </Box>
    );
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

  const weeklyMetrics = processWeeklyData();

  if (!weeklyMetrics) {
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
      <Box sx={{ p: 3 }}>
        <MetricBar
          label="Pain Level"
          value={weeklyMetrics.painLevel.displayValue}
          average={weeklyMetrics.painLevel.average}
          trend={weeklyMetrics.painLevel.trend}
          maxValue={weeklyMetrics.painLevel.maxValue}
          color={getMetricColor('painLevel', weeklyMetrics.painLevel.average, weeklyMetrics.painLevel.maxValue)}
          dailyData={weeklyMetrics.painLevel.dailyData}
          metricName="painLevel"
        />
        
        <MetricBar
          label="Morning Stiffness"
          value={weeklyMetrics.morningStiffness.displayValue}
          average={weeklyMetrics.morningStiffness.average}
          trend={weeklyMetrics.morningStiffness.trend}
          maxValue={weeklyMetrics.morningStiffness.maxValue}
          color={getMetricColor('morningStiffness', weeklyMetrics.morningStiffness.average, weeklyMetrics.morningStiffness.maxValue)}
          dailyData={weeklyMetrics.morningStiffness.dailyData}
          metricName="morningStiffness"
        />
        
        <MetricBar
          label="Stress Level"
          value={weeklyMetrics.stressLevel.displayValue}
          average={weeklyMetrics.stressLevel.average}
          trend={weeklyMetrics.stressLevel.trend}
          maxValue={weeklyMetrics.stressLevel.maxValue}
          color={getMetricColor('stressLevel', weeklyMetrics.stressLevel.average, weeklyMetrics.stressLevel.maxValue)}
          dailyData={weeklyMetrics.stressLevel.dailyData}
          metricName="stressLevel"
        />
        
        <MetricBar
          label="Resting Heart Rate"
          value={weeklyMetrics.restingHeartRate.displayValue}
          average={weeklyMetrics.restingHeartRate.average}
          trend={weeklyMetrics.restingHeartRate.trend}
          maxValue={weeklyMetrics.restingHeartRate.maxValue}
          color={getMetricColor('restingHeartRate', weeklyMetrics.restingHeartRate.average, weeklyMetrics.restingHeartRate.maxValue)}
          dailyData={weeklyMetrics.restingHeartRate.dailyData}
          metricName="restingHeartRate"
        />
        
        <MetricBar
          label="Standing Time"
          value={weeklyMetrics.standingTime.displayValue}
          average={weeklyMetrics.standingTime.average}
          trend={weeklyMetrics.standingTime.trend}
          maxValue={weeklyMetrics.standingTime.maxValue}
          color={getMetricColor('standingTime', weeklyMetrics.standingTime.average, weeklyMetrics.standingTime.maxValue)}
          dailyData={weeklyMetrics.standingTime.dailyData}
          metricName="standingTime"
        />
        
        <MetricBar
          label="Sitting Time"
          value={weeklyMetrics.sittingTime.displayValue}
          average={weeklyMetrics.sittingTime.average}
          trend={weeklyMetrics.sittingTime.trend}
          maxValue={weeklyMetrics.sittingTime.maxValue}
          color={getMetricColor('sittingTime', weeklyMetrics.sittingTime.average, weeklyMetrics.sittingTime.maxValue)}
          dailyData={weeklyMetrics.sittingTime.dailyData}
          metricName="sittingTime"
        />
        
        <MetricBar
          label="Sedentary Hours"
          value={weeklyMetrics.sedentaryHours.displayValue}
          average={weeklyMetrics.sedentaryHours.average}
          trend={weeklyMetrics.sedentaryHours.trend}
          maxValue={weeklyMetrics.sedentaryHours.maxValue}
          color={getMetricColor('sedentaryHours', weeklyMetrics.sedentaryHours.average, weeklyMetrics.sedentaryHours.maxValue)}
          dailyData={weeklyMetrics.sedentaryHours.dailyData}
          metricName="sedentaryHours"
        />
      </Box>
    </WidgetShell>
  );
}
