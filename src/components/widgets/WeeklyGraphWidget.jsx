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

    return graphData.dates.map((date, index) => ({
      date: date.split('-')[2], // Just the day number
      painLevel: graphData.painLevel?.[index] ?? null,
      sittingTime: graphData.sittingTime?.[index] ?? null,
      standingTime: graphData.standingTime?.[index] ?? null,
      morningStiffness: graphData.morningStiffness?.[index] ?? null,
      stressLevel: graphData.stressLevel?.[index] ?? null,
      restingHeartRate: graphData.restingHeartRate?.[index] ?? null,
      sedentaryHours: graphData.sedentaryHours?.[index] ?? null,
    }));
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <Box
          sx={{
            background: alpha('#000000', 0.8),
            borderRadius: 2,
            p: 1.5,
            border: `1px solid ${alpha('#ffffff', 0.2)}`,
          }}
        >
          <Typography variant="body2" sx={{ color: 'white', fontWeight: 600, mb: 1 }}>
            Day {label}
          </Typography>
          {payload.map((entry, index) => (
            <Typography key={index} variant="caption" sx={{ color: entry.color, display: 'block' }}>
              {entry.name}: {entry.value !== null ? entry.value : 'N/A'}
            </Typography>
          ))}
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
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke={alpha('#ffffff', 0.1)} />
                <XAxis dataKey="date" stroke="#ffffff" />
                <YAxis stroke="#ffffff" domain={[0, 3]} />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="painLevel" 
                  stroke="#f44336" 
                  strokeWidth={2}
                  name="Pain Level"
                  dot={{ fill: '#f44336', r: 4 }}
                />
                <Line 
                  type="monotone" 
                  dataKey="morningStiffness" 
                  stroke="#ff9800" 
                  strokeWidth={2}
                  name="Stiffness"
                  dot={{ fill: '#ff9800', r: 4 }}
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
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke={alpha('#ffffff', 0.1)} />
                <XAxis dataKey="date" stroke="#ffffff" />
                <YAxis stroke="#ffffff" domain={[0, 4]} />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="sittingTime" 
                  stroke="#4caf50" 
                  strokeWidth={2}
                  name="Sitting Time"
                  dot={{ fill: '#4caf50', r: 4 }}
                />
                <Line 
                  type="monotone" 
                  dataKey="standingTime" 
                  stroke="#2196f3" 
                  strokeWidth={2}
                  name="Standing Time"
                  dot={{ fill: '#2196f3', r: 4 }}
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
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke={alpha('#ffffff', 0.1)} />
                <XAxis dataKey="date" stroke="#ffffff" />
                <YAxis stroke="#ffffff" yAxisId="left" domain={[0, 4]} />
                <YAxis stroke="#ffffff" yAxisId="right" orientation="right" />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="stressLevel" 
                  stroke="#ff9800" 
                  strokeWidth={2}
                  name="Stress Level"
                  yAxisId="left"
                  dot={{ fill: '#ff9800', r: 4 }}
                />
                <Line 
                  type="monotone" 
                  dataKey="restingHeartRate" 
                  stroke="#e91e63" 
                  strokeWidth={2}
                  name="Heart Rate (bpm)"
                  yAxisId="right"
                  dot={{ fill: '#e91e63', r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

      </Box>
  );
}
