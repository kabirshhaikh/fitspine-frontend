import React from 'react';
import { Box, Typography, alpha, Paper, Card, CardContent, Chip, Grid } from '@mui/material';
import { TrendingUp, TrendingDown, Remove, Info, Lightbulb, EmojiEvents, Warning, CheckCircle } from '@mui/icons-material';
import { getPainLabel, getTimeLabel, calculateAverage, calculateTrend, formatDayLabel, formatDate } from './chartUtils';
import { detectPainActivityCorrelation, findBestWorstDays, getFirstAndLastLoggedDays } from '../../../utils/chartInsights';

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

  // Calculate averages and trends
  const painValues = dailyData.map(d => d.painLevel);
  const stiffnessValues = dailyData.map(d => d.morningStiffness);
  
  const painAvg = calculateAverage(painValues);
  const stiffnessAvg = calculateAverage(stiffnessValues);
  const painTrend = calculateTrend(painValues, 'painLevel');
  const stiffnessTrend = calculateTrend(stiffnessValues, 'morningStiffness');
  
  // Get insights
  const activityCorrelations = detectPainActivityCorrelation(dailyData);
  const painBestWorst = findBestWorstDays(dailyData, 'painLevel');
  const stiffnessBestWorst = findBestWorstDays(dailyData, 'morningStiffness');
  const { first, last } = getFirstAndLastLoggedDays(dailyData);
  
  // Count logged days
  const loggedDays = dailyData.filter(day => 
    day.painLevel !== null || day.morningStiffness !== null
  );

  // Get color for pain/stiffness level
  const getColorForValue = (value) => {
    if (value === null || value === -1) return '#888888';
    if (value === 0) return '#4caf50';
    if (value === 1) return '#8bc34a';
    if (value === 2) return '#ff9800';
    return '#f44336';
  };

  // Generate trend text
  const getTrendText = (trend, avg, label) => {
    if (!trend || avg === null) return null;
    if (trend.direction === 'better') {
      return `${label} improved this week`;
    } else if (trend.direction === 'worse') {
      return `${label} increased this week`;
    }
    return `${label} remained stable`;
  };

  // Generate recommendations
  const getRecommendations = () => {
    const recs = [];
    if (painBestWorst.best && painBestWorst.best.standingTime !== null) {
      recs.push(`Your best day had ${getTimeLabel(painBestWorst.best.standingTime)} standing - aim for this daily`);
    }
    if (activityCorrelations.length > 0) {
      activityCorrelations.forEach(insight => {
        if (insight.includes('sedentary')) {
          recs.push('Try to keep sedentary time below 10hrs to maintain lower pain levels');
        }
      });
    }
    if (painTrend && painTrend.direction === 'worsening') {
      recs.push('Consider increasing standing time and reducing sedentary hours');
    }
    return recs.length > 0 ? recs : ['Continue tracking to identify patterns'];
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
      {/* Weekly Summary Card */}
      <Card sx={{ 
        background: `linear-gradient(135deg, ${alpha('#4facfe', 0.15)}, ${alpha('#4facfe', 0.05)})`,
        border: `1px solid ${alpha('#4facfe', 0.3)}`,
        width: '100%',
      }}>
        <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2, flexWrap: 'wrap' }}>
            <Info sx={{ color: '#4facfe', fontSize: { xs: 20, sm: 24 } }} />
            <Typography variant="h6" sx={{ color: 'white', fontWeight: 600, fontSize: { xs: '1rem', sm: '1.25rem' } }}>
              Weekly Summary
            </Typography>
          </Box>
          
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {first && last && (
              <Box>
                {painAvg !== null && (
                  <Typography variant="body1" sx={{ color: 'white', mb: 1, fontSize: { xs: '0.875rem', sm: '1rem' }, wordBreak: 'break-word' }}>
                    <strong>Pain:</strong> {getPainLabel(Math.round(painAvg))} average
                    {painTrend && (
                      <>
                        {' '}
                        {painTrend.direction === 'better' && <TrendingDown sx={{ fontSize: { xs: 16, sm: 18 }, color: '#4caf50', verticalAlign: 'middle' }} />}
                        {painTrend.direction === 'worse' && <TrendingUp sx={{ fontSize: { xs: 16, sm: 18 }, color: '#f44336', verticalAlign: 'middle' }} />}
                        {painTrend.direction === 'stable' && <Remove sx={{ fontSize: { xs: 16, sm: 18 }, color: '#888888', verticalAlign: 'middle' }} />}
                      </>
                    )}
                  </Typography>
                )}
                {stiffnessAvg !== null && (
                  <Typography variant="body1" sx={{ color: 'white', fontSize: { xs: '0.875rem', sm: '1rem' }, wordBreak: 'break-word' }}>
                    <strong>Stiffness:</strong> {getPainLabel(Math.round(stiffnessAvg))} average
                    {stiffnessTrend && (
                      <>
                        {' '}
                        {stiffnessTrend.direction === 'better' && <TrendingDown sx={{ fontSize: { xs: 16, sm: 18 }, color: '#4caf50', verticalAlign: 'middle' }} />}
                        {stiffnessTrend.direction === 'worse' && <TrendingUp sx={{ fontSize: { xs: 16, sm: 18 }, color: '#f44336', verticalAlign: 'middle' }} />}
                        {stiffnessTrend.direction === 'stable' && <Remove sx={{ fontSize: { xs: 16, sm: 18 }, color: '#888888', verticalAlign: 'middle' }} />}
                      </>
                    )}
                  </Typography>
                )}
              </Box>
            )}
            
            <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: { xs: '0.75rem', sm: '0.875rem' } }}>
              {loggedDays.length} out of 7 days logged
            </Typography>
          </Box>
        </CardContent>
      </Card>

      {/* Best/Worst Days Card */}
      {(painBestWorst.best || painBestWorst.worst) && (
        <Card sx={{ 
          background: `linear-gradient(135deg, ${alpha('#ffffff', 0.1)}, ${alpha('#ffffff', 0.05)})`,
          border: `1px solid ${alpha('#ffffff', 0.2)}`,
          width: '100%',
        }}>
          <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {painBestWorst.best && (
                <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: { xs: 1.5, sm: 2 }, flexWrap: 'wrap' }}>
                  <EmojiEvents sx={{ color: '#4caf50', fontSize: { xs: 24, sm: 28 }, flexShrink: 0 }} />
                  <Box sx={{ flex: 1, minWidth: 0 }}>
                    <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.6)', fontSize: { xs: '0.75rem', sm: '0.875rem' } }}>
                      Best Day
                    </Typography>
                    <Typography variant="h6" sx={{ color: 'white', fontWeight: 600, fontSize: { xs: '1rem', sm: '1.25rem' }, wordBreak: 'break-word' }}>
                      {formatDate(painBestWorst.best.date)} - {getPainLabel(painBestWorst.best.painLevel)} pain
                    </Typography>
                    <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.5)', fontSize: { xs: '0.7rem', sm: '0.75rem' } }}>
                      What did you do differently?
                    </Typography>
                  </Box>
                </Box>
              )}
              {painBestWorst.worst && painBestWorst.worst.painLevel > (painBestWorst.best?.painLevel || 0) && (
                <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: { xs: 1.5, sm: 2 }, flexWrap: 'wrap' }}>
                  <Warning sx={{ color: '#f44336', fontSize: { xs: 24, sm: 28 }, flexShrink: 0 }} />
                  <Box sx={{ flex: 1, minWidth: 0 }}>
                    <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.6)', fontSize: { xs: '0.75rem', sm: '0.875rem' } }}>
                      Highest Pain Day
                    </Typography>
                    <Typography variant="h6" sx={{ color: 'white', fontWeight: 600, fontSize: { xs: '1rem', sm: '1.25rem' }, wordBreak: 'break-word' }}>
                      {formatDate(painBestWorst.worst.date)} - {getPainLabel(painBestWorst.worst.painLevel)} pain
                    </Typography>
                  </Box>
                </Box>
              )}
            </Box>
          </CardContent>
        </Card>
      )}

      {/* Pattern Insights Card */}
      {activityCorrelations.length > 0 && (
        <Card sx={{ 
          background: `linear-gradient(135deg, ${alpha('#9c27b0', 0.15)}, ${alpha('#9c27b0', 0.05)})`,
          border: `1px solid ${alpha('#9c27b0', 0.3)}`,
          width: '100%',
        }}>
          <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2, flexWrap: 'wrap' }}>
              <Lightbulb sx={{ color: '#9c27b0', fontSize: { xs: 20, sm: 24 } }} />
              <Typography variant="h6" sx={{ color: 'white', fontWeight: 600, fontSize: { xs: '1rem', sm: '1.25rem' } }}>
                Pattern Insights
              </Typography>
            </Box>
            {activityCorrelations.map((insight, index) => (
              <Box key={index} sx={{ display: 'flex', alignItems: 'flex-start', gap: 1, mb: 1.5 }}>
                <CheckCircle sx={{ color: '#9c27b0', fontSize: { xs: 16, sm: 18 }, mt: 0.5, flexShrink: 0 }} />
                <Typography variant="body2" sx={{ color: 'white', lineHeight: 1.6, fontSize: { xs: '0.875rem', sm: '1rem' }, wordBreak: 'break-word' }}>
                  {insight}
                </Typography>
              </Box>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Daily Breakdown */}
      <Box sx={{ width: '100%' }}>
        <Typography variant="h6" sx={{ color: 'white', mb: 2, fontWeight: 600, fontSize: { xs: '1rem', sm: '1.25rem' } }}>
          Daily Breakdown
        </Typography>
        <Grid container spacing={{ xs: 1.5, sm: 2 }}>
          {dailyData.map((day, index) => {
            const hasData = day.painLevel !== null || day.morningStiffness !== null;
            const dayLabel = formatDayLabel(day.date);
            const fullDate = formatDate(day.date);
            
            // Get key insight for the day
            let dayInsight = null;
            if (day.fitbitSedentaryHours !== null && day.fitbitSedentaryHours > 11) {
              dayInsight = `High sedentary (${day.fitbitSedentaryHours.toFixed(1)}hrs)`;
            } else if (day.standingTime !== null && day.standingTime >= 3) {
              dayInsight = `Good standing time`;
            } else if (day.stressLevel !== null && day.stressLevel >= 3) {
              dayInsight = `High stress day`;
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
                    <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.5)', display: 'block', mb: 1.5, fontSize: { xs: '0.7rem', sm: '0.75rem' } }}>
                      {fullDate}
                    </Typography>
                    
                    {hasData ? (
                      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                        {day.painLevel !== null && (
                          <Box>
                            <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.6)', fontSize: { xs: '0.7rem', sm: '0.75rem' } }}>
                              Pain Level
                            </Typography>
                            <Chip 
                              label={getPainLabel(day.painLevel)}
                              size="small"
                              sx={{
                                background: alpha(getColorForValue(day.painLevel), 0.2),
                                color: getColorForValue(day.painLevel),
                                border: `1px solid ${alpha(getColorForValue(day.painLevel), 0.5)}`,
                                fontWeight: 600,
                                mt: 0.5,
                                fontSize: { xs: '0.7rem', sm: '0.75rem' },
                                height: { xs: 24, sm: 28 },
                              }}
                            />
                          </Box>
                        )}
                        {day.morningStiffness !== null && (
                          <Box>
                            <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.6)', fontSize: { xs: '0.7rem', sm: '0.75rem' } }}>
                              Stiffness
                            </Typography>
                            <Chip 
                              label={getPainLabel(day.morningStiffness)}
                              size="small"
                              sx={{
                                background: alpha(getColorForValue(day.morningStiffness), 0.2),
                                color: getColorForValue(day.morningStiffness),
                                border: `1px solid ${alpha(getColorForValue(day.morningStiffness), 0.5)}`,
                                fontWeight: 600,
                                mt: 0.5,
                                fontSize: { xs: '0.7rem', sm: '0.75rem' },
                                height: { xs: 24, sm: 28 },
                              }}
                            />
                          </Box>
                        )}
                        {dayInsight && (
                          <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.7)', mt: 1, fontStyle: 'italic', fontSize: { xs: '0.7rem', sm: '0.75rem' }, wordBreak: 'break-word' }}>
                            {dayInsight}
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

      {/* Recommendations Card */}
      <Card sx={{ 
        background: `linear-gradient(135deg, ${alpha('#ff9800', 0.15)}, ${alpha('#ff9800', 0.05)})`,
        border: `1px solid ${alpha('#ff9800', 0.3)}`,
        width: '100%',
      }}>
        <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2, flexWrap: 'wrap' }}>
            <Lightbulb sx={{ color: '#ff9800', fontSize: { xs: 20, sm: 24 } }} />
            <Typography variant="h6" sx={{ color: 'white', fontWeight: 600, fontSize: { xs: '1rem', sm: '1.25rem' } }}>
              Recommendations
            </Typography>
          </Box>
          {getRecommendations().map((rec, index) => (
            <Box key={index} sx={{ display: 'flex', alignItems: 'flex-start', gap: 1, mb: 1.5 }}>
              <CheckCircle sx={{ color: '#ff9800', fontSize: { xs: 16, sm: 18 }, mt: 0.5, flexShrink: 0 }} />
              <Typography variant="body2" sx={{ color: 'white', lineHeight: 1.6, fontSize: { xs: '0.875rem', sm: '1rem' }, wordBreak: 'break-word' }}>
                {rec}
              </Typography>
            </Box>
          ))}
        </CardContent>
      </Card>
    </Box>
  );
}
