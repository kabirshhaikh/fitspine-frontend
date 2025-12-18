import React from 'react';
import { Box, Typography, Grid, Card, alpha, Paper } from '@mui/material';
import { LineChart, Line, XAxis, ResponsiveContainer, Tooltip } from 'recharts';
import { TrendingUp, TrendingDown, Remove, Info } from '@mui/icons-material';
import { getPainLabel, getTimeLabel, getStressLabel, calculateAverage, calculateTrend, formatDayLabel } from './chartUtils';

// Sparkline component for mini charts
const Sparkline = ({ data, color, height = 60 }) => {
  const chartData = data.map((value, index) => ({
    index,
    value: value !== null && value !== -1 ? value : null,
  }));

  return (
    <ResponsiveContainer width="100%" height={height}>
      <LineChart data={chartData}>
        <Line
          type="monotone"
          dataKey="value"
          stroke={color}
          strokeWidth={2}
          dot={false}
          connectNulls={false}
        />
        <XAxis dataKey="index" hide />
      </LineChart>
    </ResponsiveContainer>
  );
};

// Metric Card component
const MetricCard = ({ 
  title, 
  value, 
  displayValue, 
  trend, 
  sparklineData, 
  color, 
  maxValue,
  getLabel 
}) => {
  const trendIcon = trend?.direction === 'better' ? 
    <TrendingDown sx={{ fontSize: 16, color: '#4caf50' }} /> :
    trend?.direction === 'worse' ? 
    <TrendingUp sx={{ fontSize: 16, color: '#f44336' }} /> :
    <Remove sx={{ fontSize: 16, color: '#888888' }} />;

  return (
    <Card
      sx={{
        p: 2,
        background: alpha('#ffffff', 0.05),
        border: `1px solid ${alpha('#ffffff', 0.1)}`,
        borderRadius: 2,
        height: '100%',
      }}
    >
      <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.6)', mb: 1 }}>
        {title}
      </Typography>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
        <Typography variant="h6" sx={{ color: color, fontWeight: 600 }}>
          {displayValue || 'No Data'}
        </Typography>
        {trend && trend.direction && (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            {trendIcon}
            {trend.change > 0 && (
              <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.5)', fontSize: '0.7rem' }}>
                {Math.round(trend.change)}%
              </Typography>
            )}
          </Box>
        )}
      </Box>
      {sparklineData && sparklineData.some(v => v !== null && v !== -1) && (
        <Box sx={{ mt: 1 }}>
          <Sparkline data={sparklineData} color={color} />
        </Box>
      )}
    </Card>
  );
};

export default function OverviewChart({ dailyData }) {
  if (!dailyData || !dailyData.length) {
    return (
      <Box sx={{ p: 3, textAlign: 'center' }}>
        <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.5)' }}>
          No data available for this period
        </Typography>
      </Box>
    );
  }

  // Prepare data for metrics
  const painValues = dailyData.map(d => d.painLevel);
  const stiffnessValues = dailyData.map(d => d.morningStiffness);
  const stressValues = dailyData.map(d => d.stressLevel);
  const standingValues = dailyData.map(d => d.standingTime);
  const sittingValues = dailyData.map(d => d.sittingTime);
  const sedentaryValues = dailyData.map(d => d.fitbitSedentaryHours);
  const heartRateValues = dailyData.map(d => d.fitbitRestingHeartRate || d.manualRestingHeartRate);

  // Calculate averages and trends
  const painAvg = calculateAverage(painValues);
  const stiffnessAvg = calculateAverage(stiffnessValues);
  const stressAvg = calculateAverage(stressValues);
  const standingAvg = calculateAverage(standingValues);
  const sittingAvg = calculateAverage(sittingValues);
  const sedentaryAvg = calculateAverage(sedentaryValues);
  const heartRateAvg = calculateAverage(heartRateValues);

  const painTrend = calculateTrend(painValues, 'painLevel');
  const stiffnessTrend = calculateTrend(stiffnessValues, 'morningStiffness');
  const stressTrend = calculateTrend(stressValues, 'stressLevel');
  const standingTrend = calculateTrend(standingValues, 'standingTime');
  const sittingTrend = calculateTrend(sittingValues, 'sittingTime');
  const sedentaryTrend = calculateTrend(sedentaryValues, 'fitbitSedentaryHours');
  const heartRateTrend = calculateTrend(heartRateValues, 'restingHeartRate');

  const metrics = [
    {
      title: 'Pain Level',
      value: painAvg,
      displayValue: painAvg !== null ? getPainLabel(Math.round(painAvg)) : null,
      trend: painTrend,
      sparklineData: painValues,
      color: '#ff6b6b',
    },
    {
      title: 'Morning Stiffness',
      value: stiffnessAvg,
      displayValue: stiffnessAvg !== null ? getPainLabel(Math.round(stiffnessAvg)) : null,
      trend: stiffnessTrend,
      sparklineData: stiffnessValues,
      color: '#ff9800',
    },
    {
      title: 'Stress Level',
      value: stressAvg,
      displayValue: stressAvg !== null ? getStressLabel(Math.round(stressAvg)) : null,
      trend: stressTrend,
      sparklineData: stressValues,
      color: '#9c27b0',
    },
    {
      title: 'Standing Time',
      value: standingAvg,
      displayValue: standingAvg !== null ? getTimeLabel(Math.round(standingAvg)) : null,
      trend: standingTrend,
      sparklineData: standingValues,
      color: '#4caf50',
    },
    {
      title: 'Sitting Time',
      value: sittingAvg,
      displayValue: sittingAvg !== null ? getTimeLabel(Math.round(sittingAvg)) : null,
      trend: sittingTrend,
      sparklineData: sittingValues,
      color: '#ff9800',
    },
    {
      title: 'Sedentary Hours',
      value: sedentaryAvg,
      displayValue: sedentaryAvg !== null ? `${sedentaryAvg.toFixed(1)} hrs` : null,
      trend: sedentaryTrend,
      sparklineData: sedentaryValues,
      color: '#f44336',
    },
    {
      title: 'Resting Heart Rate',
      value: heartRateAvg,
      displayValue: heartRateAvg !== null ? `${Math.round(heartRateAvg)} bpm` : null,
      trend: heartRateTrend,
      sparklineData: heartRateValues,
      color: heartRateAvg !== null && heartRateAvg <= 60 ? '#4caf50' : 
             heartRateAvg !== null && heartRateAvg <= 70 ? '#8bc34a' : 
             heartRateAvg !== null && heartRateAvg <= 80 ? '#ff9800' : '#f44336',
    },
  ];

  return (
    <Box sx={{ p: 3 }}>
      {/* Explanation */}
      <Paper
        sx={{
          p: 2,
          mb: 3,
          background: alpha('#4facfe', 0.1),
          border: `1px solid ${alpha('#4facfe', 0.3)}`,
          borderRadius: 2,
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1 }}>
          <Info sx={{ fontSize: 20, color: '#4facfe', mt: 0.5 }} />
          <Box>
            <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.9)', fontWeight: 600, mb: 0.5 }}>
              Quick Overview
            </Typography>
            <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.7)', lineHeight: 1.6 }}>
              Get a quick snapshot of all your health metrics. Each card shows the weekly average, trend indicator, 
              and a mini sparkline chart showing the 7-day pattern. Click on individual tabs for detailed analysis.
            </Typography>
          </Box>
        </Box>
      </Paper>

      <Grid container spacing={2}>
        {metrics.map((metric, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <MetricCard {...metric} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

