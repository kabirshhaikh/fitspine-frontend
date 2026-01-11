import React from 'react';
import { Box, Typography, alpha, Card, CardContent, Chip, Grid, LinearProgress } from '@mui/material';
import { TrendingUp, TrendingDown, Remove, Info, Assessment, Lightbulb, CheckCircle, EmojiEvents, Warning } from '@mui/icons-material';
import { getTimeLabel, formatDayLabel, formatDate } from './chartUtils';

export default function ActivityChart({ activityResultDto, isFitbitConnected = false }) {
  if (!activityResultDto) {
    return (
      <Box sx={{ p: 3, textAlign: 'center' }}>
        <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.5)' }}>
          No data available for this period
        </Typography>
      </Box>
    );
  }

  const {
    activityBalancePercent,
    standingAvg,
    sittingAvg,
    sedentaryAvg,
    standingTrend,
    sittingTrend,
    sedentaryTrend,
    bestStandingDay,
    worstStandingDay,
    explanations,
    painCorrelations,
    dailyBreakDown,
    standingGoalMetPercent,
    sedentaryLimitMetPercent,
    balanceGoalMetPercent,
    flareUpDto,
  } = activityResultDto;

  // Helper to convert average enum value to label
  const getTimeLabelFromAvg = (avg) => {
    if (avg === null || avg === undefined) return null;
    return getTimeLabel(Math.round(avg));
  };

  // Convert percentages to days
  const standingGoalDays = standingGoalMetPercent !== null ? Math.round((standingGoalMetPercent / 100) * 7) : 0;
  const sedentaryLimitDays = sedentaryLimitMetPercent !== null ? Math.round((sedentaryLimitMetPercent / 100) * 7) : 0;
  const balanceOptimalDays = balanceGoalMetPercent !== null ? Math.round((balanceGoalMetPercent / 100) * 7) : 0;


  return (
    <Box sx={{ 
      p: { xs: 2, sm: 3 }, 
      display: 'flex', 
      flexDirection: 'column', 
      gap: { xs: 2, sm: 3 },
      maxWidth: '100%',
      overflow: 'hidden'
    }}>
      {/* Activity Balance Scorecard */}
      {activityBalancePercent !== null && (
        <Card sx={{ 
          background: `linear-gradient(135deg, ${alpha('#4facfe', 0.2)}, ${alpha('#4facfe', 0.1)})`,
          border: `2px solid ${alpha('#4facfe', 0.4)}`,
          width: '100%',
        }}>
          <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 1.5, sm: 2 }, mb: 2, flexWrap: 'wrap' }}>
              <Assessment sx={{ 
                fontSize: { xs: 36, sm: 48 }, 
                color: activityBalancePercent >= 60 ? '#4caf50' : activityBalancePercent >= 40 ? '#ff9800' : '#f44336',
                flexShrink: 0
              }} />
              <Box sx={{ flex: 1, minWidth: 0 }}>
                <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.6)', fontSize: { xs: '0.7rem', sm: '0.75rem' } }}>
                  Activity Balance Score
                </Typography>
                <Typography variant="h3" sx={{ 
                  color: activityBalancePercent >= 60 ? '#4caf50' : activityBalancePercent >= 40 ? '#ff9800' : '#f44336',
                  fontWeight: 700,
                  mb: 1,
                  fontSize: { xs: '1.75rem', sm: '2.5rem', md: '3rem' },
                  wordBreak: 'break-word'
                }}>
                  {Math.round(activityBalancePercent)}% Standing
                </Typography>
                <Typography variant="body1" sx={{ color: 'rgba(255, 255, 255, 0.7)', mb: 2, fontSize: { xs: '0.875rem', sm: '1rem' } }}>
                  {Math.round(100 - activityBalancePercent)}% Sitting
                </Typography>
                {activityBalancePercent >= 60 ? (
                  <Chip label="Optimal" sx={{ background: alpha('#4caf50', 0.3), color: '#4caf50', fontWeight: 600, fontSize: { xs: '0.7rem', sm: '0.75rem' } }} />
                ) : activityBalancePercent >= 40 ? (
                  <Chip label="Moderate" sx={{ background: alpha('#ff9800', 0.3), color: '#ff9800', fontWeight: 600, fontSize: { xs: '0.7rem', sm: '0.75rem' } }} />
                ) : (
                  <Chip label="Needs Improvement" sx={{ background: alpha('#f44336', 0.3), color: '#f44336', fontWeight: 600, fontSize: { xs: '0.7rem', sm: '0.75rem' } }} />
                )}
                <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.5)', mt: 2, display: 'block', fontSize: { xs: '0.7rem', sm: '0.75rem' }, wordBreak: 'break-word' }}>
                  Target: &gt;60% standing time for optimal spine health
                </Typography>
              </Box>
            </Box>
          </CardContent>
        </Card>
      )}

      {/* Goal Tracking Card */}
      <Card sx={{ 
        background: `linear-gradient(135deg, ${alpha('#ffffff', 0.1)}, ${alpha('#ffffff', 0.05)})`,
        border: `1px solid ${alpha('#ffffff', 0.2)}`,
        width: '100%',
      }}>
        <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2, flexWrap: 'wrap' }}>
            <CheckCircle sx={{ color: '#4caf50', fontSize: { xs: 20, sm: 24 } }} />
            <Typography variant="h6" sx={{ color: 'white', fontWeight: 600, fontSize: { xs: '1rem', sm: '1.25rem' } }}>
              Goal Tracking
            </Typography>
          </Box>
          
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1, flexWrap: 'wrap', gap: 0.5 }}>
                <Typography variant="body2" sx={{ color: 'white', fontSize: { xs: '0.875rem', sm: '1rem' }, wordBreak: 'break-word' }}>
                  Standing Goal (≥4hrs)
                </Typography>
                <Typography variant="body2" sx={{ color: 'white', fontWeight: 600, fontSize: { xs: '0.875rem', sm: '1rem' } }}>
                  {standingGoalDays}/7 days
                </Typography>
              </Box>
              <LinearProgress 
                variant="determinate" 
                value={(standingGoalDays / 7) * 100} 
                sx={{ 
                  height: 8, 
                  borderRadius: 4,
                  backgroundColor: alpha('#ffffff', 0.1),
                  '& .MuiLinearProgress-bar': {
                    backgroundColor: '#4caf50',
                    borderRadius: 4
                  }
                }} 
              />
            </Box>
            
            <Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1, flexWrap: 'wrap', gap: 0.5 }}>
                <Typography variant="body2" sx={{ color: 'white', fontSize: { xs: '0.875rem', sm: '1rem' }, wordBreak: 'break-word' }}>
                  Sedentary Limit (&lt;11hrs)
                </Typography>
                <Typography variant="body2" sx={{ color: 'white', fontWeight: 600, fontSize: { xs: '0.875rem', sm: '1rem' } }}>
                  {sedentaryLimitDays}/7 days
                </Typography>
              </Box>
              <LinearProgress 
                variant="determinate" 
                value={(sedentaryLimitDays / 7) * 100} 
                sx={{ 
                  height: 8, 
                  borderRadius: 4,
                  backgroundColor: alpha('#ffffff', 0.1),
                  '& .MuiLinearProgress-bar': {
                    backgroundColor: '#4caf50',
                    borderRadius: 4
                  }
                }} 
              />
            </Box>
            
            <Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1, flexWrap: 'wrap', gap: 0.5 }}>
                <Typography variant="body2" sx={{ color: 'white', fontSize: { xs: '0.875rem', sm: '1rem' }, wordBreak: 'break-word' }}>
                  Activity Balance (≥60% standing)
                </Typography>
                <Typography variant="body2" sx={{ color: 'white', fontWeight: 600, fontSize: { xs: '0.875rem', sm: '1rem' } }}>
                  {balanceOptimalDays}/7 days
                </Typography>
              </Box>
              <LinearProgress 
                variant="determinate" 
                value={(balanceOptimalDays / 7) * 100} 
                sx={{ 
                  height: 8, 
                  borderRadius: 4,
                  backgroundColor: alpha('#ffffff', 0.1),
                  '& .MuiLinearProgress-bar': {
                    backgroundColor: '#4caf50',
                    borderRadius: 4
                  }
                }} 
              />
            </Box>
          </Box>
        </CardContent>
      </Card>

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
            {standingAvg !== null && (
              <Box>
                <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.6)', fontSize: { xs: '0.75rem', sm: '0.875rem' } }}>
                  Average Standing Time
                </Typography>
                <Typography variant="h6" sx={{ color: '#4caf50', fontWeight: 600, fontSize: { xs: '1rem', sm: '1.25rem' }, wordBreak: 'break-word' }}>
                  {getTimeLabelFromAvg(standingAvg)}
                  {standingTrend && (
                    <>
                      {' '}
                      {standingTrend.direction === 'better' && <TrendingUp sx={{ fontSize: { xs: 16, sm: 18 }, color: '#4caf50', verticalAlign: 'middle' }} />}
                      {standingTrend.direction === 'worse' && <TrendingDown sx={{ fontSize: { xs: 16, sm: 18 }, color: '#f44336', verticalAlign: 'middle' }} />}
                    </>
                  )}
                </Typography>
              </Box>
            )}
            
            {sittingAvg !== null && (
              <Box>
                <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.6)', fontSize: { xs: '0.75rem', sm: '0.875rem' } }}>
                  Average Sitting Time
                </Typography>
                <Typography variant="h6" sx={{ color: '#ff9800', fontWeight: 600, fontSize: { xs: '1rem', sm: '1.25rem' }, wordBreak: 'break-word' }}>
                  {getTimeLabelFromAvg(sittingAvg)}
                  {sittingTrend && (
                    <>
                      {' '}
                      {sittingTrend.direction === 'better' && <TrendingDown sx={{ fontSize: { xs: 16, sm: 18 }, color: '#4caf50', verticalAlign: 'middle' }} />}
                      {sittingTrend.direction === 'worse' && <TrendingUp sx={{ fontSize: { xs: 16, sm: 18 }, color: '#f44336', verticalAlign: 'middle' }} />}
                    </>
                  )}
                </Typography>
              </Box>
            )}
            
            {sedentaryAvg !== null && (
              <Box>
                <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.6)', fontSize: { xs: '0.75rem', sm: '0.875rem' } }}>
                  Average Sedentary Hours
                </Typography>
                <Typography variant="h6" sx={{ color: '#f44336', fontWeight: 600, fontSize: { xs: '1rem', sm: '1.25rem' }, wordBreak: 'break-word' }}>
                  {sedentaryAvg.toFixed(1)} hrs
                  {sedentaryTrend && (
                    <>
                      {' '}
                      {sedentaryTrend.direction === 'better' && <TrendingDown sx={{ fontSize: { xs: 16, sm: 18 }, color: '#4caf50', verticalAlign: 'middle' }} />}
                      {sedentaryTrend.direction === 'worse' && <TrendingUp sx={{ fontSize: { xs: 16, sm: 18 }, color: '#f44336', verticalAlign: 'middle' }} />}
                    </>
                  )}
                </Typography>
              </Box>
            )}
          </Box>
        </CardContent>
      </Card>

      {/* Daily Activity Cards */}
      {dailyBreakDown && dailyBreakDown.length > 0 && (
        <Box sx={{ width: '100%' }}>
          <Typography variant="h6" sx={{ color: 'white', mb: 2, fontWeight: 600, fontSize: { xs: '1rem', sm: '1.25rem' } }}>
            Daily Activity
          </Typography>
          <Grid container spacing={{ xs: 1.5, sm: 2 }}>
            {dailyBreakDown.map((day, index) => {
              const hasData = day.standingTime !== null || day.sittingTime !== null || day.fitbitSedentaryHours !== null;
              const dayLabel = formatDayLabel(day.logDate);
              const fullDate = formatDate(day.logDate);

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
                          {day.standingTime !== null && (
                            <Box>
                              <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.6)', fontSize: { xs: '0.7rem', sm: '0.75rem' } }}>
                                Standing
                              </Typography>
                              <Typography variant="body2" sx={{ color: '#4caf50', fontWeight: 600, fontSize: { xs: '0.875rem', sm: '1rem' }, wordBreak: 'break-word' }}>
                                {day.standingTime}
                              </Typography>
                            </Box>
                          )}
                          {day.sittingTime !== null && (
                            <Box>
                              <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.6)', fontSize: { xs: '0.7rem', sm: '0.75rem' } }}>
                                Sitting
                              </Typography>
                              <Typography variant="body2" sx={{ color: '#ff9800', fontWeight: 600, fontSize: { xs: '0.875rem', sm: '1rem' }, wordBreak: 'break-word' }}>
                                {day.sittingTime}
                              </Typography>
                            </Box>
                          )}
                          {day.fitbitSedentaryHours !== null && (
                            <Box>
                              <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.6)', fontSize: { xs: '0.7rem', sm: '0.75rem' } }}>
                                Sedentary
                              </Typography>
                              <Typography variant="body2" sx={{ color: day.fitbitSedentaryHours < 11 ? '#4caf50' : '#f44336', fontWeight: 600, fontSize: { xs: '0.875rem', sm: '1rem' }, wordBreak: 'break-word' }}>
                                {day.fitbitSedentaryHours.toFixed(1)} hrs
                                {day.fitbitSedentaryHours < 11 && <CheckCircle sx={{ fontSize: { xs: 14, sm: 16 }, color: '#4caf50', ml: 0.5, verticalAlign: 'middle' }} />}
                              </Typography>
                            </Box>
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

      {/* Best/Worst Days Card */}
      {(bestStandingDay || worstStandingDay) && (
        <Card sx={{ 
          background: `linear-gradient(135deg, ${alpha('#ffffff', 0.1)}, ${alpha('#ffffff', 0.05)})`,
          border: `1px solid ${alpha('#ffffff', 0.2)}`,
          width: '100%',
        }}>
          <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {bestStandingDay && (
                <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: { xs: 1.5, sm: 2 }, flexWrap: 'wrap' }}>
                  <EmojiEvents sx={{ color: '#4caf50', fontSize: { xs: 24, sm: 28 }, flexShrink: 0 }} />
                  <Box sx={{ flex: 1, minWidth: 0 }}>
                    <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.6)', fontSize: { xs: '0.75rem', sm: '0.875rem' } }}>
                      Best Activity Day
                    </Typography>
                    <Typography variant="h6" sx={{ color: 'white', fontWeight: 600, fontSize: { xs: '1rem', sm: '1.25rem' }, wordBreak: 'break-word' }}>
                      {formatDate(bestStandingDay.date)} - {getTimeLabelFromAvg(bestStandingDay.value)} standing
                    </Typography>
                  </Box>
                </Box>
              )}
              {worstStandingDay && bestStandingDay && worstStandingDay.value < bestStandingDay.value && (
                <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: { xs: 1.5, sm: 2 }, flexWrap: 'wrap' }}>
                  <Warning sx={{ color: '#f44336', fontSize: { xs: 24, sm: 28 }, flexShrink: 0 }} />
                  <Box sx={{ flex: 1, minWidth: 0 }}>
                    <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.6)', fontSize: { xs: '0.75rem', sm: '0.875rem' } }}>
                      Lowest Activity Day
                    </Typography>
                    <Typography variant="h6" sx={{ color: 'white', fontWeight: 600, fontSize: { xs: '1rem', sm: '1.25rem' }, wordBreak: 'break-word' }}>
                      {formatDate(worstStandingDay.date)} - {getTimeLabelFromAvg(worstStandingDay.value)} standing
                    </Typography>
                  </Box>
                </Box>
              )}
            </Box>
          </CardContent>
        </Card>
      )}

      {/* Why Did Activity Decrease? Card */}
      {explanations && explanations.length > 0 && worstStandingDay && (
        <Card sx={{ 
          background: `linear-gradient(135deg, ${alpha('#f44336', 0.15)}, ${alpha('#f44336', 0.05)})`,
          border: `1px solid ${alpha('#f44336', 0.3)}`,
          width: '100%',
        }}>
          <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2, flexWrap: 'wrap' }}>
              <Warning sx={{ color: '#f44336', fontSize: { xs: 20, sm: 24 } }} />
              <Typography variant="h6" sx={{ color: 'white', fontWeight: 600, fontSize: { xs: '1rem', sm: '1.25rem' } }}>
                Why did activity decrease on {formatDate(worstStandingDay.date)}?
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

      {/* Flare-Up Analysis Card */}
      {flareUpDto && flareUpDto.summaryText && (
        <Card sx={{ 
          background: `linear-gradient(135deg, ${alpha('#ff5722', 0.15)}, ${alpha('#ff5722', 0.05)})`,
          border: `1px solid ${alpha('#ff5722', 0.3)}`,
          width: '100%',
        }}>
          <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2, flexWrap: 'wrap' }}>
              <Warning sx={{ color: '#ff5722', fontSize: { xs: 20, sm: 24 } }} />
              <Typography variant="h6" sx={{ color: 'white', fontWeight: 600, fontSize: { xs: '1rem', sm: '1.25rem' } }}>
                Flare-Up Impact Analysis
              </Typography>
            </Box>
            <Typography variant="body2" sx={{ color: 'white', lineHeight: 1.6, fontSize: { xs: '0.875rem', sm: '1rem' }, wordBreak: 'break-word', mb: 2 }}>
              {flareUpDto.summaryText}
            </Typography>
            
            {flareUpDto.flareUpDays !== null && flareUpDto.nonFlareUpDays !== null && (
              <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.9)', fontWeight: 600, mb: 2, fontSize: { xs: '0.875rem', sm: '1rem' }, wordBreak: 'break-word' }}>
                Flare-up days: {flareUpDto.flareUpDays} | Non-flare-up days: {flareUpDto.nonFlareUpDays}
              </Typography>
            )}

            {/* Comparison Table */}
            <Box sx={{ mt: 2, mb: 2 }}>
              <Typography variant="subtitle2" sx={{ color: 'rgba(255, 255, 255, 0.8)', fontWeight: 600, mb: 1.5, fontSize: { xs: '0.875rem', sm: '1rem' } }}>
                Activity Comparison
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                {/* Standing Time */}
                {(flareUpDto.flareAvgStanding !== null || flareUpDto.nonFlareAvgStanding !== null) && (
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 1, p: 1.5, background: alpha('#ffffff', 0.05), borderRadius: 1 }}>
                    <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.8)', fontSize: { xs: '0.875rem', sm: '1rem' } }}>
                      Standing Time
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                      {flareUpDto.flareAvgStanding !== null && (
                        <Box>
                          <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.6)', display: 'block', fontSize: { xs: '0.7rem', sm: '0.75rem' } }}>
                            Flare-up days
                          </Typography>
                          <Typography variant="body2" sx={{ color: '#ff5722', fontWeight: 600, fontSize: { xs: '0.875rem', sm: '1rem' } }}>
                            {getTimeLabelFromAvg(flareUpDto.flareAvgStanding)}
                          </Typography>
                        </Box>
                      )}
                      {flareUpDto.nonFlareAvgStanding !== null && (
                        <Box>
                          <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.6)', display: 'block', fontSize: { xs: '0.7rem', sm: '0.75rem' } }}>
                            Non-flare-up days
                          </Typography>
                          <Typography variant="body2" sx={{ color: '#4caf50', fontWeight: 600, fontSize: { xs: '0.875rem', sm: '1rem' } }}>
                            {getTimeLabelFromAvg(flareUpDto.nonFlareAvgStanding)}
                          </Typography>
                        </Box>
                      )}
                      {flareUpDto.standingDeltaPercent !== null && flareUpDto.standingDeltaPercent !== undefined && (
                        <Box>
                          <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.6)', display: 'block', fontSize: { xs: '0.7rem', sm: '0.75rem' } }}>
                            Change
                          </Typography>
                          <Typography variant="body2" sx={{ color: flareUpDto.standingDeltaPercent < 0 ? '#f44336' : '#4caf50', fontWeight: 600, fontSize: { xs: '0.875rem', sm: '1rem' } }}>
                            {flareUpDto.standingDeltaPercent > 0 ? '+' : ''}{flareUpDto.standingDeltaPercent.toFixed(1)}%
                          </Typography>
                        </Box>
                      )}
                    </Box>
                  </Box>
                )}

                {/* Sitting Time */}
                {(flareUpDto.flareAvgSitting !== null || flareUpDto.nonFlareAvgSitting !== null) && (
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 1, p: 1.5, background: alpha('#ffffff', 0.05), borderRadius: 1 }}>
                    <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.8)', fontSize: { xs: '0.875rem', sm: '1rem' } }}>
                      Sitting Time
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                      {flareUpDto.flareAvgSitting !== null && (
                        <Box>
                          <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.6)', display: 'block', fontSize: { xs: '0.7rem', sm: '0.75rem' } }}>
                            Flare-up days
                          </Typography>
                          <Typography variant="body2" sx={{ color: '#ff5722', fontWeight: 600, fontSize: { xs: '0.875rem', sm: '1rem' } }}>
                            {getTimeLabelFromAvg(flareUpDto.flareAvgSitting)}
                          </Typography>
                        </Box>
                      )}
                      {flareUpDto.nonFlareAvgSitting !== null && (
                        <Box>
                          <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.6)', display: 'block', fontSize: { xs: '0.7rem', sm: '0.75rem' } }}>
                            Non-flare-up days
                          </Typography>
                          <Typography variant="body2" sx={{ color: '#4caf50', fontWeight: 600, fontSize: { xs: '0.875rem', sm: '1rem' } }}>
                            {getTimeLabelFromAvg(flareUpDto.nonFlareAvgSitting)}
                          </Typography>
                        </Box>
                      )}
                    </Box>
                  </Box>
                )}

                {/* Sedentary Hours */}
                {(flareUpDto.flareAvgSedentaryHours !== null || flareUpDto.nonFlareAvgSedentaryHours !== null) && (
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 1, p: 1.5, background: alpha('#ffffff', 0.05), borderRadius: 1 }}>
                    <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.8)', fontSize: { xs: '0.875rem', sm: '1rem' } }}>
                      Sedentary Hours
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                      {flareUpDto.flareAvgSedentaryHours !== null && (
                        <Box>
                          <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.6)', display: 'block', fontSize: { xs: '0.7rem', sm: '0.75rem' } }}>
                            Flare-up days
                          </Typography>
                          <Typography variant="body2" sx={{ color: '#ff5722', fontWeight: 600, fontSize: { xs: '0.875rem', sm: '1rem' } }}>
                            {flareUpDto.flareAvgSedentaryHours.toFixed(1)} hrs
                          </Typography>
                        </Box>
                      )}
                      {flareUpDto.nonFlareAvgSedentaryHours !== null && (
                        <Box>
                          <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.6)', display: 'block', fontSize: { xs: '0.7rem', sm: '0.75rem' } }}>
                            Non-flare-up days
                          </Typography>
                          <Typography variant="body2" sx={{ color: '#4caf50', fontWeight: 600, fontSize: { xs: '0.875rem', sm: '1rem' } }}>
                            {flareUpDto.nonFlareAvgSedentaryHours.toFixed(1)} hrs
                          </Typography>
                        </Box>
                      )}
                      {flareUpDto.sedentaryDeltaPercent !== null && flareUpDto.sedentaryDeltaPercent !== undefined && (
                        <Box>
                          <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.6)', display: 'block', fontSize: { xs: '0.7rem', sm: '0.75rem' } }}>
                            Change
                          </Typography>
                          <Typography variant="body2" sx={{ color: flareUpDto.sedentaryDeltaPercent > 0 ? '#f44336' : '#4caf50', fontWeight: 600, fontSize: { xs: '0.875rem', sm: '1rem' } }}>
                            {flareUpDto.sedentaryDeltaPercent > 0 ? '+' : ''}{flareUpDto.sedentaryDeltaPercent.toFixed(1)}%
                          </Typography>
                        </Box>
                      )}
                    </Box>
                  </Box>
                )}
              </Box>
            </Box>
          </CardContent>
        </Card>
      )}

      {/* Pain Correlation Card */}
      {painCorrelations && painCorrelations.length > 0 && (
        <Card sx={{ 
          background: `linear-gradient(135deg, ${alpha('#9c27b0', 0.15)}, ${alpha('#9c27b0', 0.05)})`,
          border: `1px solid ${alpha('#9c27b0', 0.3)}`,
          width: '100%',
        }}>
          <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2, flexWrap: 'wrap' }}>
              <Lightbulb sx={{ color: '#9c27b0', fontSize: { xs: 20, sm: 24 } }} />
              <Typography variant="h6" sx={{ color: 'white', fontWeight: 600, fontSize: { xs: '1rem', sm: '1.25rem' } }}>
                Pain Correlation
              </Typography>
            </Box>
            {painCorrelations.map((insight, index) => (
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
    </Box>
  );
}
