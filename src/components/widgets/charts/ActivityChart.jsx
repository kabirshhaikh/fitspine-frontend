import React from 'react';
import { Box, Typography, alpha, Paper } from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, Cell } from 'recharts';
import { TrendingUp, TrendingDown, Remove, Info } from '@mui/icons-material';
import { getTimeLabel, calculateAverage, calculateTrend, formatDayLabel, formatDate } from './chartUtils';

export default function ActivityChart({ dailyData }) {
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
    const standingValue = day.standingTime !== null && day.standingTime !== -1 ? day.standingTime : null;
    const sittingValue = day.sittingTime !== null && day.sittingTime !== -1 ? day.sittingTime : null;
    const sedentaryValue = day.sedentaryHours !== null && day.sedentaryHours !== -1 ? day.sedentaryHours : null;
    
    return {
      date: day.date,
      dayLabel: formatDayLabel(day.date),
      fullDate: formatDate(day.date),
      standingTime: standingValue,
      standingLabel: standingValue !== null ? getTimeLabel(standingValue) : 'No Data',
      sittingTime: sittingValue,
      sittingLabel: sittingValue !== null ? getTimeLabel(sittingValue) : 'No Data',
      sedentaryHours: sedentaryValue,
      sedentaryLabel: sedentaryValue !== null ? `${sedentaryValue.toFixed(1)} hrs` : 'No Data',
    };
  });

  // Calculate averages and trends
  const standingValues = dailyData.map(d => d.standingTime);
  const sittingValues = dailyData.map(d => d.sittingTime);
  const sedentaryValues = dailyData.map(d => d.sedentaryHours);
  
  const standingAvg = calculateAverage(standingValues);
  const sittingAvg = calculateAverage(sittingValues);
  const sedentaryAvg = calculateAverage(sedentaryValues);
  
  const standingTrend = calculateTrend(standingValues, 'standingTime');
  const sittingTrend = calculateTrend(sittingValues, 'sittingTime');
  const sedentaryTrend = calculateTrend(sedentaryValues, 'sedentaryHours');

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
            let label = entry.name;
            let value = entry.value;
            if (entry.dataKey === 'standingTime') {
              value = data.standingLabel;
            } else if (entry.dataKey === 'sittingTime') {
              value = data.sittingLabel;
            } else if (entry.dataKey === 'sedentaryHours') {
              value = data.sedentaryLabel;
            }
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
                  {label}: {value}
                </Typography>
              </Box>
            );
          })}
        </Box>
      );
    }
    return null;
  };

  // Custom Y-axis tick formatter for time categories
  const formatTimeCategoryTick = (value) => {
    const labels = ['<2h', '2-4h', '4-6h', '6-8h', '>8h'];
    return labels[value] || '';
  };

  // Custom Y-axis tick formatter for hours
  const formatHoursTick = (value) => {
    return `${value}h`;
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
              Activity Tracking
            </Typography>
            <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.7)', lineHeight: 1.6 }}>
              Track your daily activity patterns. Standing time (green) is beneficial for spine health, 
              while excessive sitting (orange) and sedentary hours (red) can contribute to back pain. 
              Aim for more standing and less sedentary time.
            </Typography>
          </Box>
        </Box>
      </Paper>

      {/* Summary Stats */}
      <Box sx={{ display: 'flex', gap: 3, mb: 3, flexWrap: 'wrap' }}>
        <Box sx={{ flex: 1, minWidth: 150 }}>
          <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.6)' }}>
            Standing Time (Weekly Avg)
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 0.5 }}>
            <Typography variant="h6" sx={{ color: '#4caf50', fontWeight: 600 }}>
              {standingAvg !== null ? getTimeLabel(Math.round(standingAvg)) : 'No Data'}
            </Typography>
            {standingTrend && (
              <>
                {standingTrend.direction === 'better' && <TrendingUp sx={{ fontSize: 18, color: '#4caf50' }} />}
                {standingTrend.direction === 'worse' && <TrendingDown sx={{ fontSize: 18, color: '#f44336' }} />}
                {standingTrend.direction === 'stable' && <Remove sx={{ fontSize: 18, color: '#888888' }} />}
                {standingTrend.change > 0 && (
                  <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.5)' }}>
                    {Math.round(standingTrend.change)}%
                  </Typography>
                )}
              </>
            )}
          </Box>
        </Box>
        <Box sx={{ flex: 1, minWidth: 150 }}>
          <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.6)' }}>
            Sitting Time (Weekly Avg)
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 0.5 }}>
            <Typography variant="h6" sx={{ color: '#ff9800', fontWeight: 600 }}>
              {sittingAvg !== null ? getTimeLabel(Math.round(sittingAvg)) : 'No Data'}
            </Typography>
            {sittingTrend && (
              <>
                {sittingTrend.direction === 'better' && <TrendingDown sx={{ fontSize: 18, color: '#4caf50' }} />}
                {sittingTrend.direction === 'worse' && <TrendingUp sx={{ fontSize: 18, color: '#f44336' }} />}
                {sittingTrend.direction === 'stable' && <Remove sx={{ fontSize: 18, color: '#888888' }} />}
                {sittingTrend.change > 0 && (
                  <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.5)' }}>
                    {Math.round(sittingTrend.change)}%
                  </Typography>
                )}
              </>
            )}
          </Box>
        </Box>
        <Box sx={{ flex: 1, minWidth: 150 }}>
          <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.6)' }}>
            Sedentary Hours (Weekly Avg)
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 0.5 }}>
            <Typography variant="h6" sx={{ color: '#f44336', fontWeight: 600 }}>
              {sedentaryAvg !== null ? `${sedentaryAvg.toFixed(1)} hrs` : 'No Data'}
            </Typography>
            {sedentaryTrend && (
              <>
                {sedentaryTrend.direction === 'better' && <TrendingDown sx={{ fontSize: 18, color: '#4caf50' }} />}
                {sedentaryTrend.direction === 'worse' && <TrendingUp sx={{ fontSize: 18, color: '#f44336' }} />}
                {sedentaryTrend.direction === 'stable' && <Remove sx={{ fontSize: 18, color: '#888888' }} />}
                {sedentaryTrend.change > 0 && (
                  <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.5)' }}>
                    {Math.round(sedentaryTrend.change)}%
                  </Typography>
                )}
              </>
            )}
          </Box>
        </Box>
      </Box>

      {/* Standing & Sitting Time Chart */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="subtitle2" sx={{ color: 'rgba(255, 255, 255, 0.8)', mb: 2, fontWeight: 600 }}>
          Standing & Sitting Time (Daily)
        </Typography>
        <ResponsiveContainer width="100%" height={300}>
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
              domain={[0, 4]}
              stroke="rgba(255, 255, 255, 0.6)"
              tick={{ fill: 'rgba(255, 255, 255, 0.7)', fontSize: 12 }}
              tickFormatter={formatTimeCategoryTick}
              label={{ 
                value: 'Time Category', 
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
              dataKey="standingTime" 
              name="Standing Time"
              radius={[4, 4, 0, 0]}
            >
              {chartData.map((entry, index) => (
                <Cell 
                  key={`standing-${index}`} 
                  fill={entry.standingTime !== null ? '#4caf50' : alpha('#888888', 0.3)} 
                />
              ))}
            </Bar>
            <Bar 
              dataKey="sittingTime" 
              name="Sitting Time"
              radius={[4, 4, 0, 0]}
            >
              {chartData.map((entry, index) => (
                <Cell 
                  key={`sitting-${index}`} 
                  fill={entry.sittingTime !== null ? '#ff9800' : alpha('#888888', 0.3)} 
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </Box>

      {/* Sedentary Hours Chart */}
      <Box>
        <Typography variant="subtitle2" sx={{ color: 'rgba(255, 255, 255, 0.8)', mb: 2, fontWeight: 600 }}>
          Sedentary Hours (Daily)
        </Typography>
        <ResponsiveContainer width="100%" height={300}>
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
              domain={[0, 'dataMax + 2']}
              stroke="rgba(255, 255, 255, 0.6)"
              tick={{ fill: 'rgba(255, 255, 255, 0.7)', fontSize: 12 }}
              tickFormatter={formatHoursTick}
              label={{ 
                value: 'Hours', 
                angle: -90, 
                position: 'insideLeft', 
                fill: 'rgba(255, 255, 255, 0.7)',
                style: { fontSize: 12 }
              }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar 
              dataKey="sedentaryHours" 
              name="Sedentary Hours"
              radius={[4, 4, 0, 0]}
            >
              {chartData.map((entry, index) => {
                const value = entry.sedentaryHours;
                let color = '#f44336'; // Red (bad)
                if (value !== null) {
                  if (value <= 4) color = '#4caf50'; // Green (good)
                  else if (value <= 8) color = '#ff9800'; // Orange (moderate)
                } else {
                  color = alpha('#888888', 0.3);
                }
                return <Cell key={`sedentary-${index}`} fill={color} />;
              })}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </Box>
    </Box>
  );
}
