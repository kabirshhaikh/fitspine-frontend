import React from 'react';
import { Box, Typography, alpha, Paper } from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, Cell } from 'recharts';
import { TrendingUp, TrendingDown, Remove, Info } from '@mui/icons-material';
import { getPainLabel, calculateAverage, calculateTrend, formatDayLabel, formatDate } from './chartUtils';

export default function PainStiffnessChart({ dailyData }) {
  if (!dailyData || !dailyData.length) {
    return (
      <Box sx={{ p: 3, textAlign: 'center' }}>
        <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.5)' }}>
          No data available for this period
        </Typography>
      </Box>
    );
  }

  // Prepare chart data with readable labels
  const chartData = dailyData.map((day) => {
    const painValue = day.painLevel !== null && day.painLevel !== -1 ? day.painLevel : null;
    const stiffnessValue = day.morningStiffness !== null && day.morningStiffness !== -1 ? day.morningStiffness : null;
    
    return {
      date: day.date,
      dayLabel: formatDayLabel(day.date),
      fullDate: formatDate(day.date),
      painLevel: painValue,
      painLabel: painValue !== null ? getPainLabel(painValue) : 'No Data',
      morningStiffness: stiffnessValue,
      stiffnessLabel: stiffnessValue !== null ? getPainLabel(stiffnessValue) : 'No Data',
    };
  });

  // Calculate averages and trends
  const painValues = dailyData.map(d => d.painLevel);
  const stiffnessValues = dailyData.map(d => d.morningStiffness);
  
  const painAvg = calculateAverage(painValues);
  const stiffnessAvg = calculateAverage(stiffnessValues);
  const painTrend = calculateTrend(painValues, 'painLevel');
  const stiffnessTrend = calculateTrend(stiffnessValues, 'morningStiffness');

  // Color mapping for pain/stiffness levels
  const getColorForValue = (value) => {
    if (value === null || value === -1) return alpha('#888888', 0.3);
    if (value === 0) return '#4caf50'; // None - Green
    if (value === 1) return '#8bc34a'; // Mild - Light Green
    if (value === 2) return '#ff9800'; // Moderate - Orange
    return '#f44336'; // Severe - Red
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
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
          {payload.map((entry, index) => {
            if (entry.value === null) {
              return (
                <Typography key={index} variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.5)', mt: 0.5 }}>
                  {entry.name}: No Data
                </Typography>
              );
            }
            const label = entry.dataKey === 'painLevel' ? data.painLabel : data.stiffnessLabel;
            return (
              <Box key={index} sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 0.5 }}>
                <Box
                  sx={{
                    width: 12,
                    height: 12,
                    borderRadius: '50%',
                    backgroundColor: entry.color,
                  }}
                />
                <Typography variant="body2" sx={{ color: entry.color, fontWeight: 500 }}>
                  {entry.name}: {label}
                </Typography>
              </Box>
            );
          })}
        </Box>
      );
    }
    return null;
  };

  // Custom Y-axis tick formatter
  const formatYAxisTick = (value) => {
    const labels = ['None', 'Mild', 'Moderate', 'Severe'];
    return labels[value] || '';
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
              Pain & Stiffness Tracking
            </Typography>
            <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.7)', lineHeight: 1.6 }}>
              This chart shows your daily pain level and morning stiffness over the past 7 days. 
              Lower values (green) indicate better health. Track patterns to identify triggers and improvements.
            </Typography>
          </Box>
        </Box>
      </Paper>

      {/* Summary Stats */}
      <Box sx={{ display: 'flex', gap: 3, mb: 3, flexWrap: 'wrap' }}>
        <Box sx={{ flex: 1, minWidth: 150 }}>
          <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.6)' }}>
            Pain Level (Weekly Avg)
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 0.5 }}>
            <Typography variant="h6" sx={{ color: '#ff6b6b', fontWeight: 600 }}>
              {painAvg !== null ? getPainLabel(Math.round(painAvg)) : 'No Data'}
            </Typography>
            {painTrend && (
              <>
                {painTrend.direction === 'better' && <TrendingDown sx={{ fontSize: 18, color: '#4caf50' }} />}
                {painTrend.direction === 'worse' && <TrendingUp sx={{ fontSize: 18, color: '#f44336' }} />}
                {painTrend.direction === 'stable' && <Remove sx={{ fontSize: 18, color: '#888888' }} />}
                {painTrend.change > 0 && (
                  <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.5)' }}>
                    {Math.round(painTrend.change)}%
                  </Typography>
                )}
              </>
            )}
          </Box>
        </Box>
        <Box sx={{ flex: 1, minWidth: 150 }}>
          <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.6)' }}>
            Morning Stiffness (Weekly Avg)
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 0.5 }}>
            <Typography variant="h6" sx={{ color: '#ff9800', fontWeight: 600 }}>
              {stiffnessAvg !== null ? getPainLabel(Math.round(stiffnessAvg)) : 'No Data'}
            </Typography>
            {stiffnessTrend && (
              <>
                {stiffnessTrend.direction === 'better' && <TrendingDown sx={{ fontSize: 18, color: '#4caf50' }} />}
                {stiffnessTrend.direction === 'worse' && <TrendingUp sx={{ fontSize: 18, color: '#f44336' }} />}
                {stiffnessTrend.direction === 'stable' && <Remove sx={{ fontSize: 18, color: '#888888' }} />}
                {stiffnessTrend.change > 0 && (
                  <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.5)' }}>
                    {Math.round(stiffnessTrend.change)}%
                  </Typography>
                )}
              </>
            )}
          </Box>
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
            domain={[0, 3]}
            stroke="rgba(255, 255, 255, 0.6)"
            tick={{ fill: 'rgba(255, 255, 255, 0.7)', fontSize: 12 }}
            tickFormatter={formatYAxisTick}
            label={{ 
              value: 'Severity Level', 
              angle: -90, 
              position: 'insideLeft', 
              fill: 'rgba(255, 255, 255, 0.7)',
              style: { fontSize: 12 }
            }}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend 
            wrapperStyle={{ color: 'rgba(255, 255, 255, 0.9)', fontSize: 13 }}
            iconType="square"
          />
          <Bar 
            dataKey="painLevel" 
            name="Pain Level"
            radius={[4, 4, 0, 0]}
          >
            {chartData.map((entry, index) => (
              <Cell key={`pain-${index}`} fill={getColorForValue(entry.painLevel)} />
            ))}
          </Bar>
          <Bar 
            dataKey="morningStiffness" 
            name="Morning Stiffness"
            radius={[4, 4, 0, 0]}
          >
            {chartData.map((entry, index) => (
              <Cell key={`stiffness-${index}`} fill={getColorForValue(entry.morningStiffness)} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>

      {/* Legend */}
      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 3, mt: 2, flexWrap: 'wrap' }}>
        {[
          { label: 'None', color: '#4caf50' },
          { label: 'Mild', color: '#8bc34a' },
          { label: 'Moderate', color: '#ff9800' },
          { label: 'Severe', color: '#f44336' },
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
