// src/components/widgets/WeeklyGraphWidget.jsx
import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardHeader,
  CircularProgress,
  Alert,
  alpha,
  Grid,
} from '@mui/material';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { TrendingUp, TrendingDown, Assessment } from '@mui/icons-material';
import graphService from '../../services/graph.service';
import WidgetShell from './WidgetShell';

export default function WeeklyGraphWidget() {
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
  }, []);

  // Transform data for charts
  const getChartData = () => {
    if (!graphData || !graphData.dates) return [];

    return graphData.dates.map((date, index) => {
      const dateObj = new Date(date);
      const dayName = dateObj.toLocaleDateString('en-US', { weekday: 'short' });
      const dayNum = date.split('-')[2];
      
      return {
        date: `${dayName} ${dayNum}`,
        fullDate: date,
        painLevel: graphData.painLevel?.[index] ?? null,
        sittingTime: graphData.sittingTime?.[index] ?? null,
        standingTime: graphData.standingTime?.[index] ?? null,
        morningStiffness: graphData.morningStiffness?.[index] ?? null,
        stressLevel: graphData.stressLevel?.[index] ?? null,
        restingHeartRate: graphData.restingHeartRate?.[index] ?? null,
        sedentaryHours: graphData.sedentaryHours?.[index] ?? null,
      };
    });
  };

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

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <Box
          sx={{
            background: alpha('#000000', 0.9),
            borderRadius: 2,
            p: 2,
            border: `1px solid ${alpha('#ffffff', 0.3)}`,
            boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
          }}
        >
          <Typography variant="body2" sx={{ color: 'white', fontWeight: 700, mb: 1.5, fontSize: '0.95rem' }}>
            {label}
          </Typography>
          {payload.map((entry, index) => {
            // Skip if value is null or -1 (no data)
            if (entry.value === null || entry.value === -1) {
              return (
                <Box key={index} sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                  <Box sx={{ width: 12, height: 12, borderRadius: '50%', backgroundColor: entry.color }} />
                  <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.85rem' }}>
                    <strong>{entry.name}:</strong> No Data
                  </Typography>
                </Box>
              );
            }
            
            let displayValue = entry.value;
            
            // Format values based on the metric type
            if (entry.dataKey === 'painLevel' || entry.dataKey === 'morningStiffness') {
              displayValue = `${entry.value} (${getPainLabel(entry.value)})`;
            } else if (entry.dataKey === 'sittingTime' || entry.dataKey === 'standingTime') {
              displayValue = `${entry.value} (${getTimeLabel(entry.value)})`;
            } else if (entry.dataKey === 'stressLevel') {
              displayValue = `${entry.value} (${getStressLabel(entry.value)})`;
            } else if (entry.dataKey === 'restingHeartRate') {
              displayValue = `${entry.value} bpm`;
            } else if (entry.dataKey === 'sedentaryHours') {
              displayValue = `${entry.value.toFixed(1)} hrs`;
            }
            
            return (
              <Box key={index} sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                <Box sx={{ width: 12, height: 12, borderRadius: '50%', backgroundColor: entry.color }} />
                <Typography variant="caption" sx={{ color: 'white', fontSize: '0.85rem' }}>
                  <strong>{entry.name}:</strong> {displayValue}
                </Typography>
              </Box>
            );
          })}
        </Box>
      );
    }
    return null;
  };

  if (loading) {
    return (
      <WidgetShell title="Weekly Trends" sx={{ minHeight: 400 }}>
        <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" py={4}>
          <CircularProgress size={40} sx={{ color: '#4facfe', mb: 2 }} />
          <Typography variant="body2" color="rgba(255, 255, 255, 0.7)">
            Loading weekly trends...
          </Typography>
        </Box>
      </WidgetShell>
    );
  }

  if (error) {
    return (
      <WidgetShell title="Weekly Trends">
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

  if (!graphData || !graphData.dates || graphData.dates.length === 0) {
    return (
      <WidgetShell title="Weekly Trends">
        <Box textAlign="center" py={4}>
          <Assessment sx={{ fontSize: 48, color: '#4facfe', mb: 2 }} />
          <Typography variant="h6" color="rgba(255, 255, 255, 0.8)" gutterBottom>
            No data available
          </Typography>
          <Typography variant="body2" color="rgba(255, 255, 255, 0.6)">
            Start logging your daily activities to see trends.
          </Typography>
        </Box>
      </WidgetShell>
    );
  }

  const chartData = getChartData();

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4, width: '100%' }}>
        
        {/* Pain & Stiffness Chart */}
        <Card sx={{ 
          background: `linear-gradient(135deg, ${alpha('#f44336', 0.1)}, ${alpha('#f44336', 0.05)})`,
          border: `1px solid ${alpha('#f44336', 0.3)}`,
          width: '100%',
          minHeight: '500px',
        }}>
          <CardHeader
            avatar={<TrendingDown sx={{ color: '#f44336' }} />}
            title="Pain & Stiffness"
            titleTypographyProps={{ color: 'white', fontWeight: 600 }}
          />
          <CardContent sx={{ p: 3 }}>
            <ResponsiveContainer width="100%" height={450}>
              <LineChart data={chartData} margin={{ top: 10, right: 20, left: 10, bottom: 40 }}>
                <CartesianGrid strokeDasharray="3 3" stroke={alpha('#ffffff', 0.1)} />
                <XAxis 
                  dataKey="date" 
                  stroke="#ffffff" 
                  tick={{ fill: '#ffffff', fontSize: 12 }}
                  label={{ value: 'Day', position: 'insideBottom', offset: -5, fill: '#ffffff', fontSize: 12 }}
                />
                <YAxis 
                  stroke="#ffffff" 
                  domain={[0, 3]} 
                  tick={{ fill: '#ffffff', fontSize: 12 }}
                  tickFormatter={(value) => {
                    const labels = ['None', 'Mild', 'Moderate', 'Severe'];
                    return labels[value] || value;
                  }}
                  label={{ value: 'Level', angle: -90, position: 'insideLeft', fill: '#ffffff', fontSize: 12, offset: 15 }}
                  width={70}
                />
                <Tooltip content={<CustomTooltip />} />
                <Legend 
                  wrapperStyle={{ color: '#ffffff', paddingTop: '20px' }}
                  iconType="line"
                  verticalAlign="bottom"
                  height={40}
                />
                <Line 
                  type="monotone" 
                  dataKey="painLevel" 
                  stroke="#f44336" 
                  strokeWidth={3}
                  name="Pain Level"
                  dot={{ fill: '#f44336', r: 5 }}
                  activeDot={{ r: 7 }}
                />
                <Line 
                  type="monotone" 
                  dataKey="morningStiffness" 
                  stroke="#ff9800" 
                  strokeWidth={3}
                  name="Morning Stiffness"
                  dot={{ fill: '#ff9800', r: 5 }}
                  activeDot={{ r: 7 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Activity Chart */}
        <Card sx={{ 
          background: `linear-gradient(135deg, ${alpha('#4caf50', 0.1)}, ${alpha('#4caf50', 0.05)})`,
          border: `1px solid ${alpha('#4caf50', 0.3)}`,
          width: '100%',
          minHeight: '500px',
        }}>
          <CardHeader
            avatar={<TrendingUp sx={{ color: '#4caf50' }} />}
            title="Activity Levels"
            titleTypographyProps={{ color: 'white', fontWeight: 600 }}
          />
          <CardContent sx={{ p: 3 }}>
            <ResponsiveContainer width="100%" height={450}>
              <LineChart data={chartData} margin={{ top: 10, right: 20, left: 10, bottom: 40 }}>
                <CartesianGrid strokeDasharray="3 3" stroke={alpha('#ffffff', 0.1)} />
                <XAxis 
                  dataKey="date" 
                  stroke="#ffffff" 
                  tick={{ fill: '#ffffff', fontSize: 12 }}
                  label={{ value: 'Day', position: 'insideBottom', offset: -5, fill: '#ffffff', fontSize: 12 }}
                />
                <YAxis 
                  stroke="#ffffff" 
                  domain={[0, 4]} 
                  tick={{ fill: '#ffffff', fontSize: 12 }}
                  tickFormatter={(value) => {
                    const labels = ['<2h', '2-4h', '4-6h', '6-8h', '>8h'];
                    return labels[value] || value;
                  }}
                  label={{ value: 'Time Category', angle: -90, position: 'insideLeft', fill: '#ffffff', fontSize: 12, offset: 15 }}
                  width={70}
                />
                <YAxis 
                  stroke="#ffffff" 
                  yAxisId="right" 
                  orientation="right"
                  tick={{ fill: '#ffffff', fontSize: 12 }}
                  label={{ value: 'Hours', angle: 90, position: 'insideRight', fill: '#ffffff', fontSize: 12, offset: 15 }}
                  width={60}
                />
                <Tooltip content={<CustomTooltip />} />
                <Legend 
                  wrapperStyle={{ color: '#ffffff', paddingTop: '20px' }}
                  iconType="line"
                  verticalAlign="bottom"
                  height={40}
                />
                <Line 
                  type="monotone" 
                  dataKey="sittingTime" 
                  stroke="#4caf50" 
                  strokeWidth={3}
                  name="Sitting Time"
                  dot={{ fill: '#4caf50', r: 5 }}
                  activeDot={{ r: 7 }}
                />
                <Line 
                  type="monotone" 
                  dataKey="standingTime" 
                  stroke="#2196f3" 
                  strokeWidth={3}
                  name="Standing Time"
                  dot={{ fill: '#2196f3', r: 5 }}
                  activeDot={{ r: 7 }}
                />
                <Line 
                  type="monotone" 
                  dataKey="sedentaryHours" 
                  stroke="#9c27b0" 
                  strokeWidth={3}
                  name="Sedentary Hours"
                  yAxisId="right"
                  dot={{ fill: '#9c27b0', r: 5 }}
                  activeDot={{ r: 7 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Stress & Heart Rate Chart */}
        <Card sx={{ 
          background: `linear-gradient(135deg, ${alpha('#ff9800', 0.1)}, ${alpha('#ff9800', 0.05)})`,
          border: `1px solid ${alpha('#ff9800', 0.3)}`,
          width: '100%',
          minHeight: '500px',
        }}>
          <CardHeader
            avatar={<TrendingUp sx={{ color: '#ff9800' }} />}
            title="Stress & Heart Rate"
            titleTypographyProps={{ color: 'white', fontWeight: 600 }}
          />
          <CardContent sx={{ p: 3 }}>
            <ResponsiveContainer width="100%" height={450}>
              <LineChart data={chartData} margin={{ top: 10, right: 20, left: 10, bottom: 40 }}>
                <CartesianGrid strokeDasharray="3 3" stroke={alpha('#ffffff', 0.1)} />
                <XAxis 
                  dataKey="date" 
                  stroke="#ffffff" 
                  tick={{ fill: '#ffffff', fontSize: 12 }}
                  label={{ value: 'Day', position: 'insideBottom', offset: -5, fill: '#ffffff', fontSize: 12 }}
                />
                <YAxis 
                  stroke="#ffffff" 
                  yAxisId="left" 
                  domain={[0, 4]} 
                  tick={{ fill: '#ffffff', fontSize: 12 }}
                  tickFormatter={(value) => {
                    const labels = ['Very Low', 'Low', 'Moderate', 'High', 'Very High'];
                    return labels[value] || value;
                  }}
                  label={{ value: 'Stress Level', angle: -90, position: 'insideLeft', fill: '#ffffff', fontSize: 12, offset: 15 }}
                  width={80}
                />
                <YAxis 
                  stroke="#ffffff" 
                  yAxisId="right" 
                  orientation="right" 
                  tick={{ fill: '#ffffff', fontSize: 12 }}
                  label={{ value: 'Heart Rate (bpm)', angle: 90, position: 'insideRight', fill: '#ffffff', fontSize: 12, offset: 15 }}
                  width={80}
                />
                <Tooltip content={<CustomTooltip />} />
                <Legend 
                  wrapperStyle={{ color: '#ffffff', paddingTop: '20px' }}
                  iconType="line"
                  verticalAlign="bottom"
                  height={40}
                />
                <Line 
                  type="monotone" 
                  dataKey="stressLevel" 
                  stroke="#ff9800" 
                  strokeWidth={3}
                  name="Stress Level"
                  yAxisId="left"
                  dot={{ fill: '#ff9800', r: 5 }}
                  activeDot={{ r: 7 }}
                />
                <Line 
                  type="monotone" 
                  dataKey="restingHeartRate" 
                  stroke="#e91e63" 
                  strokeWidth={3}
                  name="Resting Heart Rate"
                  yAxisId="right"
                  dot={{ fill: '#e91e63', r: 5 }}
                  activeDot={{ r: 7 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

      </Box>
  );
}
