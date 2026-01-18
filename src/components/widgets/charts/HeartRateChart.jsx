import React from 'react';
import { Box, Typography, alpha, Card, CardContent, Chip, Grid } from '@mui/material';
import { TrendingUp, TrendingDown, Remove, Favorite, EmojiEvents, Warning, Lightbulb, Info } from '@mui/icons-material';
import { formatDayLabel, formatDate } from './chartUtils';

export default function HeartRateChart({ heartResultDto, isFitbitConnected = false }) {
  if (!heartResultDto) {
    return (
      <Box sx={{ p: 3, textAlign: 'center' }}>
        <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.5)' }}>
          No data available for this period
        </Typography>
      </Box>
    );
  }

  try {
    const {
      averageRestingHeartRate: heartRateAverage,
      restingHeartRateTrend: heartRateTrend,
      bestHeartRateDay,
      worstHeartRateDay,
      explanations,
      stressCorrelationInsights: stressCorrelations,
      dailyBreakDown,
      recoveryChange,
      recoveryConsistencyPercent: consistency,
    } = heartResultDto || {};

    const getHeartRateColor = (hr) => {
      if (hr === null || hr === undefined) return '#888888';
      if (hr <= 60) return '#4caf50';
      if (hr <= 70) return '#8bc34a';
      if (hr <= 80) return '#ff9800';
      return '#f44336';
    };

    return (
    <Box sx={{ 
      p: { xs: 2, sm: 3 }, 
      display: 'flex', 
      flexDirection: 'column', 
      gap: { xs: 2, sm: 3 },
      maxWidth: '100%',
      overflow: 'hidden'
    }}>
      {/* Recovery Summary Card */}
      <Card sx={{ 
        background: `linear-gradient(135deg, ${alpha('#4facfe', 0.2)}, ${alpha('#4facfe', 0.1)})`,
        border: `2px solid ${alpha('#4facfe', 0.4)}`,
        width: '100%',
      }}>
        <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 1.5, sm: 2 }, mb: 2, flexWrap: 'wrap' }}>
            <Favorite sx={{ fontSize: { xs: 36, sm: 48 }, color: getHeartRateColor(heartRateAverage), flexShrink: 0 }} />
            <Box sx={{ flex: 1, minWidth: 0 }}>
              <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.6)', fontSize: { xs: '0.7rem', sm: '0.75rem' } }}>
                Average Resting Heart Rate
                {isFitbitConnected && <Chip label="Fitbit" size="small" sx={{ ml: 1, background: alpha('#4facfe', 0.3), color: '#4facfe', fontSize: '0.65rem', height: 20 }} />}
              </Typography>
              <Typography variant="h3" sx={{ 
                color: getHeartRateColor(heartRateAverage), 
                fontWeight: 700,
                mb: 1,
                fontSize: { xs: '1.75rem', sm: '2.5rem', md: '3rem' },
                wordBreak: 'break-word'
              }}>
                {heartRateAverage !== null && heartRateAverage !== undefined && typeof heartRateAverage === 'number' ? `${Math.round(heartRateAverage)}` : '--'} bpm
              </Typography>
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
              {recoveryChange !== null && recoveryChange !== undefined && typeof recoveryChange === 'number' && recoveryChange > 2 && (
                <Typography variant="body2" sx={{ color: '#4caf50', fontWeight: 600, fontSize: { xs: '0.875rem', sm: '1rem' }, wordBreak: 'break-word' }}>
                  Decreased by {Math.round(recoveryChange)} bpm this week - improved recovery
                </Typography>
              )}
              {consistency !== null && consistency !== undefined && (
                <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.5)', mt: 1, display: 'block', fontSize: { xs: '0.7rem', sm: '0.75rem' }, wordBreak: 'break-word' }}>
                  HR consistency: {typeof consistency === 'number' ? consistency.toFixed(0) : consistency}% {typeof consistency === 'number' && consistency > 95 ? '(excellent)' : typeof consistency === 'number' && consistency > 90 ? '(good)' : ''}
                </Typography>
              )}
            </Box>
          </Box>
        </CardContent>
      </Card>

      {/* Best/Worst Days Card */}
      {(bestHeartRateDay || worstHeartRateDay) && (
        <Card sx={{ 
          background: `linear-gradient(135deg, ${alpha('#ffffff', 0.1)}, ${alpha('#ffffff', 0.05)})`,
          border: `1px solid ${alpha('#ffffff', 0.2)}`,
          width: '100%',
        }}>
          <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {bestHeartRateDay && (
                <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: { xs: 1.5, sm: 2 }, flexWrap: 'wrap' }}>
                  <EmojiEvents sx={{ color: '#4caf50', fontSize: { xs: 24, sm: 28 }, flexShrink: 0 }} />
                  <Box sx={{ flex: 1, minWidth: 0 }}>
                    <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.6)', fontSize: { xs: '0.75rem', sm: '0.875rem' } }}>
                      Best Recovery Day
                    </Typography>
                    <Typography variant="h6" sx={{ color: 'white', fontWeight: 600, fontSize: { xs: '1rem', sm: '1.25rem' }, wordBreak: 'break-word' }}>
                      {formatDate(bestHeartRateDay.date)} - {bestHeartRateDay.value !== null && bestHeartRateDay.value !== undefined ? `${Math.round(bestHeartRateDay.value)}` : '--'} bpm
                    </Typography>
                    <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.5)', fontSize: { xs: '0.7rem', sm: '0.75rem' } }}>
                      What helped your recovery?
                    </Typography>
                  </Box>
                </Box>
              )}
              {worstHeartRateDay && bestHeartRateDay && worstHeartRateDay.value > bestHeartRateDay.value && (
                <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: { xs: 1.5, sm: 2 }, flexWrap: 'wrap' }}>
                  <Warning sx={{ color: '#f44336', fontSize: { xs: 24, sm: 28 }, flexShrink: 0 }} />
                  <Box sx={{ flex: 1, minWidth: 0 }}>
                    <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.6)', fontSize: { xs: '0.75rem', sm: '0.875rem' } }}>
                      Highest Heart Rate Day
                    </Typography>
                    <Typography variant="h6" sx={{ color: 'white', fontWeight: 600, fontSize: { xs: '1rem', sm: '1.25rem' }, wordBreak: 'break-word' }}>
                      {formatDate(worstHeartRateDay.date)} - {worstHeartRateDay.value !== null && worstHeartRateDay.value !== undefined ? `${Math.round(worstHeartRateDay.value)}` : '--'} bpm
                    </Typography>
                  </Box>
                </Box>
              )}
            </Box>
          </CardContent>
        </Card>
      )}

      {/* Why Did Heart Rate Increase? Card */}
      {explanations && explanations.length > 0 && worstHeartRateDay && (
        <Card sx={{ 
          background: `linear-gradient(135deg, ${alpha('#f44336', 0.15)}, ${alpha('#f44336', 0.05)})`,
          border: `1px solid ${alpha('#f44336', 0.3)}`,
          width: '100%',
        }}>
          <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2, flexWrap: 'wrap' }}>
              <Warning sx={{ color: '#f44336', fontSize: { xs: 20, sm: 24 } }} />
              <Typography variant="h6" sx={{ color: 'white', fontWeight: 600, fontSize: { xs: '1rem', sm: '1.25rem' } }}>
                Why did heart rate increase on {worstHeartRateDay.date ? formatDate(worstHeartRateDay.date) : 'the worst day'}?
              </Typography>
            </Box>
            {explanations.map((explanation, index) => (
              <Box key={index} sx={{ mb: 2, pb: index < explanations.length - 1 ? 2 : 0, borderBottom: index < explanations.length - 1 ? `1px solid ${alpha('#ffffff', 0.1)}` : 'none' }}>
                <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.9)', fontWeight: 600, mb: 0.5, fontSize: { xs: '0.875rem', sm: '1rem' }, wordBreak: 'break-word' }}>
                  • Because {explanation.cause}
                </Typography>
                <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)', ml: 2, fontSize: { xs: '0.875rem', sm: '1rem' }, wordBreak: 'break-word' }}>
                  {explanation.explanation}
                </Typography>
              </Box>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Stress Correlation Card */}
      {stressCorrelations && stressCorrelations.length > 0 && (
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

      {/* Daily Breakdown */}
      {dailyBreakDown && Array.isArray(dailyBreakDown) && dailyBreakDown.length > 0 && (
        <Box sx={{ width: '100%' }}>
          <Typography variant="h6" sx={{ color: 'white', mb: 2, fontWeight: 600, fontSize: { xs: '1rem', sm: '1.25rem' } }}>
            Daily Heart Rate
          </Typography>
          <Grid container spacing={{ xs: 1.5, sm: 2 }}>
            {dailyBreakDown.map((day, index) => {
              if (!day) return null;
              const hasData = day.restingHeartRate !== null && day.restingHeartRate !== undefined;
              const dayLabel = day.logDate ? formatDayLabel(day.logDate) : '';
              const fullDate = day.logDate ? formatDate(day.logDate) : '';

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
                        <Box>
                          <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.6)', fontSize: { xs: '0.7rem', sm: '0.75rem' } }}>
                            Heart Rate
                          </Typography>
                          <Typography variant="body2" sx={{ color: getHeartRateColor(day.restingHeartRate), fontWeight: 600, fontSize: { xs: '0.875rem', sm: '1rem' }, wordBreak: 'break-word' }}>
                            {day.restingHeartRate} bpm
                          </Typography>
                          {day.stressLevel && (
                            <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.6)', mt: 1, display: 'block', fontSize: { xs: '0.7rem', sm: '0.75rem' } }}>
                              Stress: {day.stressLevel}
                            </Typography>
                          )}
                        </Box>
                      ) : (
                        <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.4)' }}>
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
      )}
    </Box>
    );
  } catch (error) {
    return (
      <Box sx={{ p: 3, textAlign: 'center' }}>
        <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.5)' }}>
          Error loading heart rate data
        </Typography>
      </Box>
    );
  }
}
