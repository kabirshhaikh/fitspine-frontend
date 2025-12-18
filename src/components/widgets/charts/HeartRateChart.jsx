import React from 'react';
import { Box, Typography, alpha, Paper, Card, CardContent, Chip, Grid } from '@mui/material';
import { TrendingUp, TrendingDown, Remove, Info, Lightbulb, Favorite, EmojiEvents } from '@mui/icons-material';
import { calculateAverage, calculateTrend, formatDayLabel, formatDate } from './chartUtils';
import { detectHRStressCorrelation, getFirstAndLastLoggedDays } from '../../../utils/chartInsights';
import { getStressLabel } from './chartUtils';

export default function HeartRateChart({ dailyData, isFitbitConnected }) {
  // Handle missing or invalid data
  if (!dailyData || !Array.isArray(dailyData) || dailyData.length === 0) {
    return (
      <Box sx={{ p: 3, textAlign: 'center' }}>
        <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.5)' }}>
          No data available for this period
        </Typography>
      </Box>
    );
  }

  // Ensure isFitbitConnected is a boolean
  const isFitbit = isFitbitConnected === true;

  // Get heart rate data based on Fitbit connection
  const getHeartRateValue = (day) => {
    if (!day) return null;
    // Check if Fitbit is connected (handle undefined/null)
    if (isFitbit) {
      // Use Fitbit data if available, otherwise fall back to manual
      if (day.fitbitRestingHeartRate !== null && day.fitbitRestingHeartRate !== undefined) {
        return day.fitbitRestingHeartRate;
      }
      // Fall back to manual if Fitbit data not available
      if (day.manualRestingHeartRate !== null && day.manualRestingHeartRate !== undefined) {
        return day.manualRestingHeartRate;
      }
      return null;
    } else {
      // Use manual data
      return day.manualRestingHeartRate !== null && day.manualRestingHeartRate !== undefined
        ? day.manualRestingHeartRate
        : null;
    }
  };

  // Calculate average and trend
  const heartRateValues = dailyData.map(d => getHeartRateValue(d));
  const heartRateAvg = calculateAverage(heartRateValues);
  const heartRateTrend = calculateTrend(heartRateValues, 'restingHeartRate');

  // Get insights
  const stressCorrelations = detectHRStressCorrelation(dailyData, isFitbit);
  const { first, last } = getFirstAndLastLoggedDays(dailyData);

  // Calculate recovery insights
  const validHRDays = dailyData.filter(day => getHeartRateValue(day) !== null);
  const firstHRDay = validHRDays[0];
  const lastHRDay = validHRDays[validHRDays.length - 1];
  
  let recoveryChange = null;
  if (firstHRDay && lastHRDay) {
    const firstHR = getHeartRateValue(firstHRDay);
    const lastHR = getHeartRateValue(lastHRDay);
    if (firstHR !== null && lastHR !== null) {
      recoveryChange = firstHR - lastHR;
    }
  }

  // Calculate consistency
  const hrValues = validHRDays.map(d => getHeartRateValue(d));
  let consistency = null;
  if (heartRateAvg !== null && hrValues.length > 1) {
    const variance = hrValues.reduce((sum, hr) => sum + Math.pow(hr - heartRateAvg, 2), 0) / hrValues.length;
    const stdDev = Math.sqrt(variance);
    consistency = ((1 - (stdDev / heartRateAvg)) * 100);
  }

  // Get fitness level
  const getFitnessLevel = (hr) => {
    if (hr === null) return null;
    if (hr <= 60) return { label: 'Excellent', color: '#4caf50' };
    if (hr <= 70) return { label: 'Good', color: '#8bc34a' };
    if (hr <= 80) return { label: 'Moderate', color: '#ff9800' };
    return { label: 'Needs Improvement', color: '#f44336' };
  };

  const fitnessLevel = getFitnessLevel(heartRateAvg);

  // Find best recovery day
  const bestRecoveryDay = validHRDays.length > 0 
    ? validHRDays.reduce((best, day) => {
        const bestHR = getHeartRateValue(best);
        const dayHR = getHeartRateValue(day);
        if (!best || (dayHR !== null && bestHR !== null && dayHR < bestHR)) return day;
        return best;
      }, null)
    : null;

  // Determine color based on value
  const getHeartRateColor = (value) => {
    if (value === null) return '#888888';
    if (value <= 60) return '#4caf50';
    if (value <= 70) return '#8bc34a';
    if (value <= 80) return '#ff9800';
    return '#f44336';
  };

  const loggedDays = validHRDays.length;

  return (
    <Box sx={{ 
      p: { xs: 2, sm: 3 }, 
      display: 'flex', 
      flexDirection: 'column', 
      gap: { xs: 2, sm: 3 },
      maxWidth: '100%',
      overflow: 'hidden'
    }}>
      {/* Recovery Summary Card - Large */}
      <Card sx={{ 
        background: `linear-gradient(135deg, ${alpha('#4facfe', 0.2)}, ${alpha('#4facfe', 0.1)})`,
        border: `2px solid ${alpha('#4facfe', 0.4)}`,
        width: '100%',
      }}>
        <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 1.5, sm: 2 }, mb: 2, flexWrap: 'wrap' }}>
            <Favorite sx={{ fontSize: { xs: 36, sm: 48 }, color: getHeartRateColor(heartRateAvg), flexShrink: 0 }} />
            <Box sx={{ flex: 1, minWidth: 0 }}>
              <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.6)', fontSize: { xs: '0.7rem', sm: '0.75rem' } }}>
            Average Resting Heart Rate
                {isFitbit && <Chip label="Fitbit" size="small" sx={{ ml: 1, background: alpha('#4facfe', 0.3), color: '#4facfe', fontSize: '0.65rem', height: 20 }} />}
                {!isFitbit && <Chip label="Manual" size="small" sx={{ ml: 1, background: alpha('#888888', 0.3), color: '#888888', fontSize: '0.65rem', height: 20 }} />}
          </Typography>
              <Typography variant="h3" sx={{ 
                color: getHeartRateColor(heartRateAvg), 
                fontWeight: 700,
                mb: 1,
                fontSize: { xs: '1.75rem', sm: '2.5rem', md: '3rem' },
                wordBreak: 'break-word'
              }}>
                {heartRateAvg !== null ? `${Math.round(heartRateAvg)}` : '--'} bpm
              </Typography>
              {fitnessLevel && (
                <Chip 
                  label={fitnessLevel.label} 
                  sx={{ 
                    background: alpha(fitnessLevel.color, 0.3), 
                    color: fitnessLevel.color, 
                    fontWeight: 600,
                    mb: 2,
                    fontSize: { xs: '0.7rem', sm: '0.75rem' }
                  }} 
                />
              )}
            {heartRateTrend && (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1, flexWrap: 'wrap' }}>
                  {heartRateTrend.direction === 'better' && <TrendingDown sx={{ fontSize: { xs: 18, sm: 20 }, color: '#4caf50' }} />}
                  {heartRateTrend.direction === 'worse' && <TrendingUp sx={{ fontSize: { xs: 18, sm: 20 }, color: '#f44336' }} />}
                  {heartRateTrend.direction === 'stable' && <Remove sx={{ fontSize: { xs: 18, sm: 20 }, color: '#888888' }} />}
                  <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: { xs: '0.875rem', sm: '1rem' } }}>
                    {heartRateTrend.direction === 'better' && 'Improving'}
                    {heartRateTrend.direction === 'worse' && 'Increasing'}
                    {heartRateTrend.direction === 'stable' && 'Stable'}
                  </Typography>
                </Box>
              )}
              {recoveryChange !== null && recoveryChange > 2 && (
                <Typography variant="body2" sx={{ color: '#4caf50', fontWeight: 600, fontSize: { xs: '0.875rem', sm: '1rem' }, wordBreak: 'break-word' }}>
                  Decreased by {Math.round(recoveryChange)} bpm this week - improved recovery
                </Typography>
              )}
              {consistency !== null && (
                <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.5)', mt: 1, display: 'block', fontSize: { xs: '0.7rem', sm: '0.75rem' }, wordBreak: 'break-word' }}>
                  HR consistency: {consistency.toFixed(0)}% {consistency > 95 ? '(excellent)' : consistency > 90 ? '(good)' : ''}
                  </Typography>
                )}
              </Box>
          </Box>
        </CardContent>
      </Card>

      {/* Stress Correlation Card */}
      {stressCorrelations.length > 0 && (
        <Card sx={{ 
          background: `linear-gradient(135deg, ${alpha('#9c27b0', 0.15)}, ${alpha('#9c27b0', 0.05)})`,
          border: `1px solid ${alpha('#9c27b0', 0.3)}`,
          width: '100%',
        }}>
          <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2, flexWrap: 'wrap' }}>
              <Lightbulb sx={{ color: '#9c27b0', fontSize: { xs: 20, sm: 24 } }} />
              <Typography variant="h6" sx={{ color: 'white', fontWeight: 600, fontSize: { xs: '1rem', sm: '1.25rem' } }}>
                Stress Correlation
          </Typography>
        </Box>
            {stressCorrelations.map((insight, index) => (
              <Box key={index} sx={{ display: 'flex', alignItems: 'flex-start', gap: 1, mb: 1.5 }}>
                <Info sx={{ color: '#9c27b0', fontSize: { xs: 16, sm: 18 }, mt: 0.5, flexShrink: 0 }} />
                <Typography variant="body2" sx={{ color: 'white', lineHeight: 1.6, fontSize: { xs: '0.875rem', sm: '1rem' }, wordBreak: 'break-word' }}>
                  {insight}
                </Typography>
      </Box>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Daily Recovery Cards */}
      <Box sx={{ width: '100%' }}>
        <Typography variant="h6" sx={{ color: 'white', mb: 2, fontWeight: 600, fontSize: { xs: '1rem', sm: '1.25rem' } }}>
          Daily Recovery
        </Typography>
        <Grid container spacing={{ xs: 1.5, sm: 2 }}>
          {dailyData.map((day, index) => {
            const hrValue = getHeartRateValue(day);
            const hasData = hrValue !== null;
            const dayLabel = formatDayLabel(day.date);
            const fullDate = formatDate(day.date);
            const hrColor = getHeartRateColor(hrValue);
            
            // Get recovery status
            let recoveryStatus = 'No data';
            let statusColor = '#888888';
            if (hasData) {
              if (hrValue <= 60) {
                recoveryStatus = 'Optimal recovery';
                statusColor = '#4caf50';
              } else if (hrValue <= 70) {
                recoveryStatus = 'Good recovery';
                statusColor = '#8bc34a';
              } else if (hrValue <= 80) {
                recoveryStatus = 'Moderate recovery';
                statusColor = '#ff9800';
              } else {
                recoveryStatus = 'Elevated';
                statusColor = '#f44336';
              }
            }

            return (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card sx={{ 
                  background: hasData 
                    ? `linear-gradient(135deg, ${alpha('#ffffff', 0.1)}, ${alpha('#ffffff', 0.05)})`
                    : alpha('#888888', 0.1),
                  border: `1px solid ${hasData ? alpha('#ffffff', 0.2) : alpha('#888888', 0.2)}`,
                  height: '100%',
                  width: '100%',
                }}>
                  <CardContent sx={{ p: { xs: 1.5, sm: 2 } }}>
                    <Typography variant="subtitle2" sx={{ color: 'rgba(255, 255, 255, 0.8)', mb: 1, fontWeight: 600, fontSize: { xs: '0.875rem', sm: '1rem' } }}>
                      {dayLabel}
                    </Typography>
                    <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.5)', display: 'block', mb: 2, fontSize: { xs: '0.7rem', sm: '0.75rem' } }}>
                      {fullDate}
                    </Typography>
                    
                    {hasData ? (
                      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                        <Box>
                          <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.6)', fontSize: { xs: '0.7rem', sm: '0.75rem' } }}>
                            Resting Heart Rate
                          </Typography>
                          <Typography variant="h5" sx={{ 
                            color: hrColor, 
                            fontWeight: 700,
                            fontFamily: 'monospace',
                            fontSize: { xs: '1.5rem', sm: '1.75rem', md: '2rem' }
                          }}>
                            {hrValue} bpm
                          </Typography>
                        </Box>
                        {day.stressLevel !== null && (
                          <Box>
                            <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.6)', fontSize: { xs: '0.7rem', sm: '0.75rem' } }}>
                              Stress Level
                            </Typography>
                            <Chip 
                              label={getStressLabel(day.stressLevel)}
                              size="small"
              sx={{
                                background: alpha('#9c27b0', 0.2),
                                color: '#9c27b0',
                                border: `1px solid ${alpha('#9c27b0', 0.5)}`,
                                fontWeight: 600,
                                mt: 0.5,
                                fontSize: { xs: '0.7rem', sm: '0.75rem' },
                                height: { xs: 24, sm: 28 },
                              }}
                            />
                          </Box>
                        )}
                        <Box sx={{ mt: 1, pt: 1, borderTop: `1px solid ${alpha('#ffffff', 0.1)}` }}>
                          <Typography variant="caption" sx={{ color: statusColor, fontWeight: 600, fontSize: { xs: '0.7rem', sm: '0.75rem' }, wordBreak: 'break-word' }}>
                            {recoveryStatus}
            </Typography>
          </Box>
                      </Box>
                    ) : (
                      <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.4)', fontSize: { xs: '0.7rem', sm: '0.75rem' } }}>
                        No data logged
                      </Typography>
                    )}
                  </CardContent>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      </Box>

      {/* Weekly Patterns Card */}
      {bestRecoveryDay && (
        <Card sx={{ 
          background: `linear-gradient(135deg, ${alpha('#4caf50', 0.15)}, ${alpha('#4caf50', 0.05)})`,
          border: `1px solid ${alpha('#4caf50', 0.3)}`,
          width: '100%',
        }}>
          <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2, flexWrap: 'wrap' }}>
              <EmojiEvents sx={{ color: '#4caf50', fontSize: { xs: 20, sm: 24 } }} />
              <Typography variant="h6" sx={{ color: 'white', fontWeight: 600, fontSize: { xs: '1rem', sm: '1.25rem' } }}>
                Weekly Patterns
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
              <Typography variant="body2" sx={{ color: 'white', lineHeight: 1.6, fontSize: { xs: '0.875rem', sm: '1rem' }, wordBreak: 'break-word' }}>
                <strong>Best recovery day:</strong> {formatDate(bestRecoveryDay.date)} with {getHeartRateValue(bestRecoveryDay)} bpm
              </Typography>
              {consistency !== null && consistency > 90 && (
                <Typography variant="body2" sx={{ color: 'white', lineHeight: 1.6, fontSize: { xs: '0.875rem', sm: '1rem' }, wordBreak: 'break-word' }}>
                  <strong>Consistency:</strong> {consistency.toFixed(0)}% - Your HR shows excellent stability
                </Typography>
              )}
              {recoveryChange !== null && recoveryChange > 0 && (
                <Typography variant="body2" sx={{ color: 'white', lineHeight: 1.6, fontSize: { xs: '0.875rem', sm: '1rem' }, wordBreak: 'break-word' }}>
                  <strong>Trend:</strong> HR decreased by {Math.round(recoveryChange)} bpm - indicates improved recovery
                </Typography>
              )}
            </Box>
          </CardContent>
        </Card>
      )}

      {/* Fitness Insights Card */}
      {fitnessLevel && (
        <Card sx={{ 
          background: `linear-gradient(135deg, ${alpha('#ffffff', 0.1)}, ${alpha('#ffffff', 0.05)})`,
          border: `1px solid ${alpha('#ffffff', 0.2)}`,
          width: '100%',
        }}>
          <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2, flexWrap: 'wrap' }}>
              <Info sx={{ color: '#4facfe', fontSize: { xs: 20, sm: 24 } }} />
              <Typography variant="h6" sx={{ color: 'white', fontWeight: 600, fontSize: { xs: '1rem', sm: '1.25rem' } }}>
                Fitness Insights
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
              <Typography variant="body2" sx={{ color: 'white', lineHeight: 1.6, fontSize: { xs: '0.875rem', sm: '1rem' }, wordBreak: 'break-word' }}>
                Your average HR of {Math.round(heartRateAvg)} bpm suggests <strong>{fitnessLevel.label.toLowerCase()}</strong> cardiovascular fitness.
              </Typography>
              <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)', lineHeight: 1.6, fontSize: { xs: '0.875rem', sm: '1rem' }, wordBreak: 'break-word' }}>
                Normal range: 60-100 bpm for adults. Lower values typically indicate better cardiovascular fitness.
              </Typography>
              {loggedDays > 0 && (
                <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.5)', fontSize: { xs: '0.7rem', sm: '0.75rem' } }}>
                  {loggedDays} out of 7 days logged
                </Typography>
              )}
            </Box>
          </CardContent>
        </Card>
      )}
    </Box>
  );
}
