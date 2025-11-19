import React from 'react';
import { Box, Typography, alpha, Paper } from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine, Cell } from 'recharts';
import { TrendingUp, TrendingDown, Remove, Info } from '@mui/icons-material';
import { calculateAverage, calculateTrend, formatDayLabel, formatDate } from './chartUtils';

export default function HeartRateChart({ dailyData }) {
  if (!dailyData || !dailyData.length) {
    return (
      <Box sx={{ p: 3, textAlign: 'center' }}>
        <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.5)' }}>
          No data available for this period
        </Typography>
      </Box>
    );
  }

  // Prepare chart data
  const chartData = dailyData.map((day) => ({
    date: day.date,
    dayLabel: formatDayLabel(day.date),
    fullDate: formatDate(day.date),
    restingHeartRate: day.restingHeartRate !== null ? day.restingHeartRate : null,
  }));

  // Calculate average and trend
  const heartRateAvg = calculateAverage(dailyData.map(d => d.restingHeartRate));
  const heartRateTrend = calculateTrend(dailyData.map(d => d.restingHeartRate), 'restingHeartRate');

  // Determine color based on value
  const getHeartRateColor = (value) => {
    if (value === null) return alpha('#888888', 0.3);
    if (value <= 60) return '#4caf50'; // Excellent
    if (value <= 70) return '#8bc34a'; // Good
    if (value <= 80) return '#ff9800'; // Moderate
    return '#f44336'; // High
  };

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length && payload[0].value !== null) {
      const data = payload[0].payload;
      return (
        <Box
          sx={{
            background: alpha('#000', 0.9),
            backdropFilter: 'blur(10px)',
            border: `1px solid ${alpha('#fff', 0.2)}`,
            borderRadius: 2,
            p: 2,
            minWidth: 200,
          }}
        >
          <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.8)', mb: 1, fontWeight: 600 }}>
            {data.fullDate}
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Box
              sx={{
                width: 12,
                height: 12,
                borderRadius: '50%',
                backgroundColor: payload[0].color,
              }}
            />
            <Typography variant="body2" sx={{ color: payload[0].color, fontWeight: 500 }}>
              Resting Heart Rate: {payload[0].value} bpm
            </Typography>
          </Box>
        </Box>
      );
    }
    return null;
  };

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
              Resting Heart Rate
            </Typography>
            <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.7)', lineHeight: 1.6 }}>
              Your resting heart rate is a key indicator of cardiovascular health and fitness level. 
              Lower values (green) typically indicate better cardiovascular fitness. 
              Normal range is 60-100 bpm for adults.
            </Typography>
          </Box>
        </Box>
      </Paper>

      {/* Summary Stats */}
      <Box sx={{ display: 'flex', gap: 3, mb: 3, alignItems: 'center' }}>
        <Box sx={{ flex: 1 }}>
          <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.6)' }}>
            Average Resting Heart Rate
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 0.5 }}>
            <Typography 
              variant="h4" 
              sx={{ 
                color: getHeartRateColor(heartRateAvg), 
                fontWeight: 700,
                fontFamily: 'monospace'
              }}
            >
              {heartRateAvg !== null ? `${Math.round(heartRateAvg)}` : '--'}
            </Typography>
            <Typography variant="h6" sx={{ color: 'rgba(255, 255, 255, 0.6)', fontWeight: 400 }}>
              bpm
            </Typography>
            {heartRateTrend && (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, ml: 2 }}>
                {heartRateTrend.direction === 'better' && <TrendingDown sx={{ fontSize: 20, color: '#4caf50' }} />}
                {heartRateTrend.direction === 'worse' && <TrendingUp sx={{ fontSize: 20, color: '#f44336' }} />}
                {heartRateTrend.direction === 'stable' && <Remove sx={{ fontSize: 20, color: '#888888' }} />}
                {heartRateTrend.change > 0 && (
                  <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.5)' }}>
                    {Math.round(heartRateTrend.change)}%
                  </Typography>
                )}
              </Box>
            )}
          </Box>
          <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.5)', mt: 1, display: 'block' }}>
            Normal range: 60-100 bpm
          </Typography>
        </Box>
      </Box>

      {/* Chart */}
      <ResponsiveContainer width="100%" height={350}>
        <BarChart 
          data={chartData} 
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke={alpha('#fff', 0.1)} />
          <XAxis 
            dataKey="dayLabel" 
            stroke="rgba(255, 255, 255, 0.6)"
            tick={{ fill: 'rgba(255, 255, 255, 0.7)', fontSize: 13, fontWeight: 500 }}
          />
          <YAxis 
            domain={['dataMin - 5', 'dataMax + 5']}
            stroke="rgba(255, 255, 255, 0.6)"
            tick={{ fill: 'rgba(255, 255, 255, 0.7)', fontSize: 12 }}
            label={{ 
              value: 'Heart Rate (bpm)', 
              angle: -90, 
              position: 'insideLeft', 
              fill: 'rgba(255, 255, 255, 0.7)',
              style: { fontSize: 12 }
            }}
          />
          <Tooltip content={<CustomTooltip />} />
          <ReferenceLine 
            y={60} 
            stroke="#4caf50" 
            strokeDasharray="3 3" 
            strokeOpacity={0.6}
            label={{ value: 'Optimal (≤60)', position: 'right', fill: '#4caf50', fontSize: 11 }}
          />
          <ReferenceLine 
            y={80} 
            stroke="#ff9800" 
            strokeDasharray="3 3" 
            strokeOpacity={0.6}
            label={{ value: 'Moderate (≤80)', position: 'right', fill: '#ff9800', fontSize: 11 }}
          />
          <Bar 
            dataKey="restingHeartRate" 
            name="Resting Heart Rate"
            radius={[4, 4, 0, 0]}
          >
            {chartData.map((entry, index) => (
              <Cell key={`hr-${index}`} fill={getHeartRateColor(entry.restingHeartRate)} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>

      {/* Legend */}
      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 3, mt: 2, flexWrap: 'wrap' }}>
        {[
          { label: 'Excellent (≤60)', color: '#4caf50' },
          { label: 'Good (61-70)', color: '#8bc34a' },
          { label: 'Moderate (71-80)', color: '#ff9800' },
          { label: 'High (>80)', color: '#f44336' },
        ].map((item) => (
          <Box key={item.label} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Box
              sx={{
                width: 16,
                height: 16,
                borderRadius: 1,
                backgroundColor: item.color,
              }}
            />
            <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
              {item.label}
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
}
