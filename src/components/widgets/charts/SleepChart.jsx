import React from 'react';
import { Box, Typography, alpha, Paper, Card, CardContent, Chip, Grid } from '@mui/material';
import { TrendingUp, TrendingDown, Remove, Info, Lightbulb, Bedtime, EmojiEvents, Warning } from '@mui/icons-material';
import { calculateAverage, calculateTrend, formatDayLabel, formatDate } from './chartUtils';
import { getFirstAndLastLoggedDays, findBestWorstDays } from '../../../utils/chartInsights';

// Helper to convert sleep duration score to hours (for manual data)
const getSleepHoursFromScore = (score) => {
  if (score === null || score === -1) return null;
  const hoursMap = {
    0: '<5h',
    1: '5-6h',
    2: '6-7h',
    3: '7-8h',
    4: '>8h'
  };
  return hoursMap[score] || null;
};

// Helper to convert minutes to hours string
const formatSleepHours = (minutes) => {
  if (minutes === null || minutes === undefined) return null;
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  if (mins === 0) return `${hours}h`;
  return `${hours}h ${mins}m`;
};

// Helper to get sleep quality label
const getSleepQualityLabel = (hours) => {
  if (hours === null) return null;
  if (hours >= 7 && hours <= 9) return { label: 'Optimal', color: '#4caf50' };
  if (hours >= 6 && hours < 7) return { label: 'Good', color: '#8bc34a' };
  if (hours >= 5 && hours < 6) return { label: 'Fair', color: '#ff9800' };
  if (hours < 5) return { label: 'Insufficient', color: '#f44336' };
  return { label: 'Excessive', color: '#ff9800' };
};

export default function SleepChart({ dailyData, isFitbitConnected }) {
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

  // Get sleep data based on Fitbit connection
  const getSleepValue = (day) => {
    if (!day) return null;
    // Check if Fitbit is connected (handle undefined/null)
    if (isFitbit) {
      // Use Fitbit data (minutes) if available, otherwise fall back to manual
      if (day.fitbitTotalMinutesAsleep !== null && day.fitbitTotalMinutesAsleep !== undefined) {
        return day.fitbitTotalMinutesAsleep;
      }
      // Fall back to manual if Fitbit data not available
      if (day.sleepDuration !== null && day.sleepDuration !== -1) {
        return day.sleepDuration;
      }
      return null;
    } else {
      // Use manual data (score 0-4)
      return day.sleepDuration !== null && day.sleepDuration !== -1
        ? day.sleepDuration
        : null;
    }
  };

  // Convert to hours for display and calculations
  const getSleepHours = (day) => {
    const value = getSleepValue(day);
    if (value === null) return null;
    
    if (isFitbit) {
      // Fitbit: value is in minutes, convert to hours
      return value / 60;
    } else {
      // Manual: value is a score, convert to approximate hours
      const hoursMap = {
        0: 4.5, // <5h -> average 4.5h
        1: 5.5, // 5-6h -> average 5.5h
        2: 6.5, // 6-7h -> average 6.5h
        3: 7.5, // 7-8h -> average 7.5h
        4: 8.5  // >8h -> average 8.5h
      };
      return hoursMap[value] || null;
    }
  };

  // Get sleep values for calculations
  const sleepHoursValues = dailyData.map(day => getSleepHours(day));
  const sleepAvg = calculateAverage(sleepHoursValues);
  const sleepTrend = calculateTrend(sleepHoursValues, 'sleepDuration');

  // Get insights
  const { first, last } = getFirstAndLastLoggedDays(dailyData);
  const sleepBestWorst = findBestWorstDays(
    dailyData.map(day => ({ ...day, sleepHours: getSleepHours(day) })),
    'sleepHours',
    true // higher is better for sleep
  );

  // Calculate consistency
  const validSleepDays = dailyData.filter(day => getSleepValue(day) !== null);
  const sleepValues = validSleepDays.map(day => getSleepHours(day));
  let consistency = null;
  if (sleepAvg !== null && sleepValues.length > 1) {
    const variance = sleepValues.reduce((sum, hours) => sum + Math.pow(hours - sleepAvg, 2), 0) / sleepValues.length;
    const stdDev = Math.sqrt(variance);
    consistency = ((1 - (stdDev / sleepAvg)) * 100);
  }

  const sleepQuality = getSleepQualityLabel(sleepAvg);

  // Get night wake ups data
  const nightWakeUpsValues = dailyData.map(d => d.nightWakeUps);
  const avgWakeUps = calculateAverage(nightWakeUpsValues);

  // Find best sleep day
  const bestSleepDay = validSleepDays.length > 0 
    ? validSleepDays.reduce((best, day) => {
        const bestHours = getSleepHours(best);
        const dayHours = getSleepHours(day);
        if (!best || (dayHours !== null && bestHours !== null && dayHours > bestHours)) return day;
        return best;
      }, null)
    : null;

  // Determine color based on value
  const getSleepColor = (hours) => {
    if (hours === null) return '#888888';
    if (hours >= 7 && hours <= 9) return '#4caf50';
    if (hours >= 6 && hours < 7) return '#8bc34a';
    if (hours >= 5 && hours < 6) return '#ff9800';
    if (hours < 5) return '#f44336';
    return '#ff9800'; // excessive
  };

  const loggedDays = validSleepDays.length;

  return (
    <Box sx={{ 
      p: { xs: 2, sm: 3 }, 
      display: 'flex', 
      flexDirection: 'column', 
      gap: { xs: 2, sm: 3 },
      maxWidth: '100%',
      overflow: 'hidden'
    }}>
      {/* Sleep Summary Card - Large */}
      <Card sx={{ 
        background: `linear-gradient(135deg, ${alpha('#4facfe', 0.2)}, ${alpha('#4facfe', 0.1)})`,
        border: `2px solid ${alpha('#4facfe', 0.4)}`,
        width: '100%',
      }}>
        <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 1.5, sm: 2 }, mb: 2, flexWrap: 'wrap' }}>
            <Bedtime sx={{ fontSize: { xs: 36, sm: 48 }, color: getSleepColor(sleepAvg), flexShrink: 0 }} />
            <Box sx={{ flex: 1, minWidth: 0 }}>
              <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.6)', fontSize: { xs: '0.7rem', sm: '0.75rem' } }}>
                Average Sleep Duration
                {isFitbit && <Chip label="Fitbit" size="small" sx={{ ml: 1, background: alpha('#4facfe', 0.3), color: '#4facfe', fontSize: '0.65rem', height: 20 }} />}
                {!isFitbit && <Chip label="Manual" size="small" sx={{ ml: 1, background: alpha('#888888', 0.3), color: '#888888', fontSize: '0.65rem', height: 20 }} />}
              </Typography>
              <Typography variant="h3" sx={{ 
                color: getSleepColor(sleepAvg),
                fontWeight: 700,
                mb: 1,
                fontSize: { xs: '1.75rem', sm: '2.5rem', md: '3rem' },
                wordBreak: 'break-word'
              }}>
                {sleepAvg !== null ? `${sleepAvg.toFixed(1)}h` : '--'}
              </Typography>
              {sleepQuality && (
                <Chip 
                  label={sleepQuality.label} 
                  sx={{ 
                    background: alpha(sleepQuality.color, 0.3), 
                    color: sleepQuality.color, 
                    fontWeight: 600,
                    mb: 2,
                    fontSize: { xs: '0.7rem', sm: '0.75rem' }
                  }} 
                />
              )}
              {sleepTrend && (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1, flexWrap: 'wrap' }}>
                  {sleepTrend.direction === 'better' && <TrendingUp sx={{ fontSize: { xs: 18, sm: 20 }, color: '#4caf50' }} />}
                  {sleepTrend.direction === 'worse' && <TrendingDown sx={{ fontSize: { xs: 18, sm: 20 }, color: '#f44336' }} />}
                  {sleepTrend.direction === 'stable' && <Remove sx={{ fontSize: { xs: 18, sm: 20 }, color: '#888888' }} />}
                  <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: { xs: '0.875rem', sm: '1rem' } }}>
                    {sleepTrend.direction === 'better' && 'Improving'}
                    {sleepTrend.direction === 'worse' && 'Decreasing'}
                    {sleepTrend.direction === 'stable' && 'Stable'}
                  </Typography>
                </Box>
              )}
              {consistency !== null && (
                <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.5)', mt: 1, display: 'block', fontSize: { xs: '0.7rem', sm: '0.75rem' }, wordBreak: 'break-word' }}>
                  Sleep consistency: {consistency.toFixed(0)}% {consistency > 95 ? '(excellent)' : consistency > 90 ? '(good)' : ''}
                </Typography>
              )}
              {avgWakeUps !== null && (
                <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)', mt: 1, fontSize: { xs: '0.875rem', sm: '1rem' }, wordBreak: 'break-word' }}>
                  Avg. night wake-ups: {avgWakeUps.toFixed(1)}
                </Typography>
              )}
            </Box>
          </Box>
        </CardContent>
      </Card>

      {/* Best/Worst Days Card */}
      {(sleepBestWorst.best || sleepBestWorst.worst) && (
        <Card sx={{ 
          background: `linear-gradient(135deg, ${alpha('#ffffff', 0.1)}, ${alpha('#ffffff', 0.05)})`,
          border: `1px solid ${alpha('#ffffff', 0.2)}`,
          width: '100%',
        }}>
          <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {sleepBestWorst.best && (
                <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: { xs: 1.5, sm: 2 }, flexWrap: 'wrap' }}>
                  <EmojiEvents sx={{ color: '#4caf50', fontSize: { xs: 24, sm: 28 }, flexShrink: 0 }} />
                  <Box sx={{ flex: 1, minWidth: 0 }}>
                    <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.6)', fontSize: { xs: '0.75rem', sm: '0.875rem' } }}>
                      Best Sleep Day
                    </Typography>
                    <Typography variant="h6" sx={{ color: 'white', fontWeight: 600, fontSize: { xs: '1rem', sm: '1.25rem' }, wordBreak: 'break-word' }}>
                      {formatDate(sleepBestWorst.best.date)} - {getSleepHours(sleepBestWorst.best) !== null ? getSleepHours(sleepBestWorst.best).toFixed(1) : '--'}h
                    </Typography>
                    <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.5)', fontSize: { xs: '0.7rem', sm: '0.75rem' } }}>
                      What helped you sleep better?
                    </Typography>
                  </Box>
                </Box>
              )}
              {sleepBestWorst.worst && getSleepHours(sleepBestWorst.worst) !== null && getSleepHours(sleepBestWorst.best) !== null && getSleepHours(sleepBestWorst.worst) < getSleepHours(sleepBestWorst.best) && (
                <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: { xs: 1.5, sm: 2 }, flexWrap: 'wrap' }}>
                  <Warning sx={{ color: '#f44336', fontSize: { xs: 24, sm: 28 }, flexShrink: 0 }} />
                  <Box sx={{ flex: 1, minWidth: 0 }}>
                    <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.6)', fontSize: { xs: '0.75rem', sm: '0.875rem' } }}>
                      Shortest Sleep Day
                    </Typography>
                    <Typography variant="h6" sx={{ color: 'white', fontWeight: 600, fontSize: { xs: '1rem', sm: '1.25rem' }, wordBreak: 'break-word' }}>
                      {formatDate(sleepBestWorst.worst.date)} - {getSleepHours(sleepBestWorst.worst) !== null ? getSleepHours(sleepBestWorst.worst).toFixed(1) : '--'}h
                    </Typography>
                  </Box>
                </Box>
              )}
            </Box>
          </CardContent>
        </Card>
      )}

      {/* Daily Sleep Cards */}
      <Box sx={{ width: '100%' }}>
        <Typography variant="h6" sx={{ color: 'white', mb: 2, fontWeight: 600, fontSize: { xs: '1rem', sm: '1.25rem' } }}>
          Daily Sleep
        </Typography>
        <Grid container spacing={{ xs: 1.5, sm: 2 }}>
          {dailyData.map((day, index) => {
            const sleepValue = getSleepValue(day);
            const sleepHours = getSleepHours(day);
            const hasData = sleepValue !== null;
            const dayLabel = formatDayLabel(day.date);
            const fullDate = formatDate(day.date);
            const sleepColor = getSleepColor(sleepHours);
            
            // Get sleep status
            let sleepStatus = 'No data';
            let statusColor = '#888888';
            if (hasData && sleepHours !== null) {
              if (sleepHours >= 7 && sleepHours <= 9) {
                sleepStatus = 'Optimal sleep';
                statusColor = '#4caf50';
              } else if (sleepHours >= 6 && sleepHours < 7) {
                sleepStatus = 'Good sleep';
                statusColor = '#8bc34a';
              } else if (sleepHours >= 5 && sleepHours < 6) {
                sleepStatus = 'Fair sleep';
                statusColor = '#ff9800';
              } else if (sleepHours < 5) {
                sleepStatus = 'Insufficient sleep';
                statusColor = '#f44336';
              } else {
                sleepStatus = 'Excessive sleep';
                statusColor = '#ff9800';
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
                            Sleep Duration
                          </Typography>
                          <Typography variant="h5" sx={{ 
                            color: sleepColor, 
                            fontWeight: 700,
                            fontFamily: 'monospace',
                            fontSize: { xs: '1.5rem', sm: '1.75rem', md: '2rem' }
                          }}>
                            {isFitbit 
                              ? formatSleepHours(sleepValue)
                              : getSleepHoursFromScore(sleepValue) || '--'}
                          </Typography>
                        </Box>
                        {day.nightWakeUps !== null && day.nightWakeUps !== -1 && (
                          <Box>
                            <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.6)', fontSize: { xs: '0.7rem', sm: '0.75rem' } }}>
                              Night Wake-ups
                            </Typography>
                            <Chip 
                              label={day.nightWakeUps === 0 ? 'None' : day.nightWakeUps === 1 ? '1 time' : `${day.nightWakeUps} times`}
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
                            {sleepStatus}
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
      {bestSleepDay && (
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
                <strong>Best sleep day:</strong> {formatDate(bestSleepDay.date)} with {getSleepHours(bestSleepDay) !== null ? getSleepHours(bestSleepDay).toFixed(1) : '--'}h
              </Typography>
              {consistency !== null && consistency > 90 && (
                <Typography variant="body2" sx={{ color: 'white', lineHeight: 1.6, fontSize: { xs: '0.875rem', sm: '1rem' }, wordBreak: 'break-word' }}>
                  <strong>Consistency:</strong> {consistency.toFixed(0)}% - Your sleep schedule shows excellent stability
                </Typography>
              )}
              {sleepTrend && sleepTrend.direction === 'better' && (
                <Typography variant="body2" sx={{ color: 'white', lineHeight: 1.6, fontSize: { xs: '0.875rem', sm: '1rem' }, wordBreak: 'break-word' }}>
                  <strong>Trend:</strong> Sleep duration improved this week - great progress!
                </Typography>
              )}
            </Box>
          </CardContent>
        </Card>
      )}

      {/* Sleep Insights Card */}
      {sleepQuality && (
        <Card sx={{ 
          background: `linear-gradient(135deg, ${alpha('#ffffff', 0.1)}, ${alpha('#ffffff', 0.05)})`,
          border: `1px solid ${alpha('#ffffff', 0.2)}`,
          width: '100%',
        }}>
          <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2, flexWrap: 'wrap' }}>
              <Info sx={{ color: '#4facfe', fontSize: { xs: 20, sm: 24 } }} />
              <Typography variant="h6" sx={{ color: 'white', fontWeight: 600, fontSize: { xs: '1rem', sm: '1.25rem' } }}>
                Sleep Insights
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
              <Typography variant="body2" sx={{ color: 'white', lineHeight: 1.6, fontSize: { xs: '0.875rem', sm: '1rem' }, wordBreak: 'break-word' }}>
                Your average sleep of {sleepAvg.toFixed(1)}h suggests <strong>{sleepQuality.label.toLowerCase()}</strong> sleep quality.
              </Typography>
              <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)', lineHeight: 1.6, fontSize: { xs: '0.875rem', sm: '1rem' }, wordBreak: 'break-word' }}>
                Recommended: 7-9 hours for adults. Consistent sleep patterns support better spine health and recovery.
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

