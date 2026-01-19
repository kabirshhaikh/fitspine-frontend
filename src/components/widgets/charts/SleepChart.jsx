import React from 'react';
import { Box, Typography, alpha, Card, CardContent, Chip } from '@mui/material';
import { TrendingUp, TrendingDown, Remove, Bedtime, EmojiEvents, Warning } from '@mui/icons-material';
import { formatDayLabel, formatDate } from './chartUtils';

export default function SleepChart({ sleepResultDto, isFitbitConnected = false }) {
  if (!sleepResultDto) {
    return (
      <Box sx={{ p: 3, textAlign: 'center' }}>
        <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.5)' }}>
          No data available for this period
        </Typography>
      </Box>
    );
  }

  const {
    averageSleepHours: sleepDurationAverage,
    sleepTrend,
    bestSleepDay,
    worstSleepDay,
    explanations,
    dailyBreakDowns,
    averageNightWakeUps,
    sleepQuality,
    sleepConsistencyPercent: consistency,
  } = sleepResultDto;

  const getSleepColor = (hours) => {
    if (hours === null) return '#888888';
    if (hours >= 7 && hours <= 9) return '#4caf50';
    if (hours >= 6 && hours < 7) return '#8bc34a';
    if (hours >= 5 && hours < 6) return '#ff9800';
    if (hours < 5) return '#f44336';
    return '#ff9800';
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
      {/* Sleep Summary Card */}
      <Card sx={{ 
        background: `linear-gradient(135deg, ${alpha('#4facfe', 0.2)}, ${alpha('#4facfe', 0.1)})`,
        border: `2px solid ${alpha('#4facfe', 0.4)}`,
        width: '100%',
      }}>
        <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 1.5, sm: 2 }, mb: 2, flexWrap: 'wrap' }}>
            <Bedtime sx={{ fontSize: { xs: 36, sm: 48 }, color: getSleepColor(sleepDurationAverage), flexShrink: 0 }} />
            <Box sx={{ flex: 1, minWidth: 0 }}>
              <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.6)', fontSize: { xs: '0.7rem', sm: '0.75rem' } }}>
                Average Sleep Duration
                {isFitbitConnected && <Chip label="Fitbit" size="small" sx={{ ml: 1, background: alpha('#4facfe', 0.3), color: '#4facfe', fontSize: '0.65rem', height: 20 }} />}
              </Typography>
              <Typography variant="h3" sx={{ 
                color: getSleepColor(sleepDurationAverage),
                fontWeight: 700,
                mb: 1,
                fontSize: { xs: '1.75rem', sm: '2.5rem', md: '3rem' },
                wordBreak: 'break-word'
              }}>
                {sleepDurationAverage !== null ? `${sleepDurationAverage.toFixed(1)}h` : '--'}
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
              {consistency !== null && consistency !== undefined && (
                <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.5)', mt: 1, display: 'block', fontSize: { xs: '0.7rem', sm: '0.75rem' }, wordBreak: 'break-word' }}>
                  Sleep consistency: {typeof consistency === 'number' ? consistency.toFixed(0) : consistency}% {typeof consistency === 'number' && consistency > 95 ? '(excellent)' : typeof consistency === 'number' && consistency > 90 ? '(good)' : ''}
                </Typography>
              )}
              {averageNightWakeUps !== null && averageNightWakeUps !== undefined && (
                <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)', mt: 1, fontSize: { xs: '0.875rem', sm: '1rem' }, wordBreak: 'break-word' }}>
                  Avg. night wake-ups: {typeof averageNightWakeUps === 'number' ? averageNightWakeUps.toFixed(1) : averageNightWakeUps}
                </Typography>
              )}
            </Box>
          </Box>
        </CardContent>
      </Card>

      {/* Best/Worst Days Card */}
      {(bestSleepDay || worstSleepDay) && (
        <Card sx={{ 
          background: `linear-gradient(135deg, ${alpha('#ffffff', 0.1)}, ${alpha('#ffffff', 0.05)})`,
          border: `1px solid ${alpha('#ffffff', 0.2)}`,
          width: '100%',
        }}>
          <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {bestSleepDay && (
                <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: { xs: 1.5, sm: 2 }, flexWrap: 'wrap' }}>
                  <EmojiEvents sx={{ color: '#4caf50', fontSize: { xs: 24, sm: 28 }, flexShrink: 0 }} />
                  <Box sx={{ flex: 1, minWidth: 0 }}>
                    <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.6)', fontSize: { xs: '0.75rem', sm: '0.875rem' } }}>
                      Best Sleep Day
                    </Typography>
                    <Typography variant="h6" sx={{ color: 'white', fontWeight: 600, fontSize: { xs: '1rem', sm: '1.25rem' }, wordBreak: 'break-word' }}>
                      {formatDate(bestSleepDay.date)} - {bestSleepDay.value !== null && bestSleepDay.value !== undefined && typeof bestSleepDay.value === 'number' ? `${bestSleepDay.value.toFixed(1)}h` : '--'}
                    </Typography>
                    <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.5)', fontSize: { xs: '0.7rem', sm: '0.75rem' } }}>
                      What helped you sleep better?
                    </Typography>
                  </Box>
                </Box>
              )}
              {worstSleepDay && bestSleepDay && worstSleepDay.value !== null && bestSleepDay.value !== null && worstSleepDay.value < bestSleepDay.value && (
                <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: { xs: 1.5, sm: 2 }, flexWrap: 'wrap' }}>
                  <Warning sx={{ color: '#f44336', fontSize: { xs: 24, sm: 28 }, flexShrink: 0 }} />
                  <Box sx={{ flex: 1, minWidth: 0 }}>
                    <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.6)', fontSize: { xs: '0.75rem', sm: '0.875rem' } }}>
                      Shortest Sleep Day
                    </Typography>
                    <Typography variant="h6" sx={{ color: 'white', fontWeight: 600, fontSize: { xs: '1rem', sm: '1.25rem' }, wordBreak: 'break-word' }}>
                      {formatDate(worstSleepDay.date)} - {worstSleepDay.value !== null && worstSleepDay.value !== undefined && typeof worstSleepDay.value === 'number' ? `${worstSleepDay.value.toFixed(1)}h` : '--'}
                    </Typography>
                  </Box>
                </Box>
              )}
            </Box>
          </CardContent>
        </Card>
      )}

      {/* Why Did Sleep Quality Decrease? Card */}
      {explanations && explanations.length > 0 && worstSleepDay && (
        <Card sx={{ 
          background: `linear-gradient(135deg, ${alpha('#f44336', 0.15)}, ${alpha('#f44336', 0.05)})`,
          border: `1px solid ${alpha('#f44336', 0.3)}`,
          width: '100%',
        }}>
          <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2, flexWrap: 'wrap' }}>
              <Warning sx={{ color: '#f44336', fontSize: { xs: 20, sm: 24 } }} />
              <Typography variant="h6" sx={{ color: 'white', fontWeight: 600, fontSize: { xs: '1rem', sm: '1.25rem' } }}>
                Why did sleep quality decrease on {worstSleepDay.date ? formatDate(worstSleepDay.date) : 'the worst day'}?
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

      {/* Daily Breakdown */}
      {dailyBreakDowns && Array.isArray(dailyBreakDowns) && dailyBreakDowns.length > 0 && (
        <Box sx={{ width: '100%' }}>
          <Typography variant="h6" sx={{ color: 'white', mb: 2, fontWeight: 600, fontSize: { xs: '1rem', sm: '1.25rem' } }}>
            Daily Sleep
          </Typography>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: {
                xs: 'repeat(2, 1fr)',
                sm: 'repeat(3, 1fr)',
                md: 'repeat(4, 1fr)',
                lg: 'repeat(7, 1fr)',
              },
              gap: { xs: 1.5, sm: 2, md: 2.5 },
              width: '100%',
            }}
          >
            {dailyBreakDowns.map((day, index) => {
              const hasData = day.timeAsleep !== null;
              const dayLabel = formatDayLabel(day.logDate);
              const fullDate = formatDate(day.logDate);

              return (
                <Box
                  key={index}
                  sx={{
                    display: 'flex',
                    minHeight: { xs: 'auto', sm: '140px' },
                  }}
                >
                  <Card sx={{ 
                    background: hasData 
                      ? `linear-gradient(135deg, ${alpha('#ffffff', 0.1)}, ${alpha('#ffffff', 0.05)})`
                      : alpha('#888888', 0.1),
                    border: `1px solid ${hasData ? alpha('#ffffff', 0.2) : alpha('#888888', 0.2)}`,
                    height: '100%',
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    transition: 'all 0.2s ease',
                    '&:hover': {
                      transform: 'translateY(-2px)',
                      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
                    },
                  }}>
                    <CardContent sx={{ 
                      p: { xs: 1.5, sm: 2 },
                      display: 'flex',
                      flexDirection: 'column',
                      flex: 1,
                      height: '100%',
                    }}>
                      <Box sx={{ mb: 1.5, flexShrink: 0 }}>
                        <Typography 
                          variant="subtitle2" 
                          sx={{ 
                            color: 'rgba(255, 255, 255, 0.8)', 
                            mb: 0.5, 
                            fontWeight: 600, 
                            fontSize: { xs: '0.875rem', sm: '0.9375rem', md: '1rem' },
                            lineHeight: 1.2,
                            wordBreak: 'break-word',
                          }}
                        >
                          {dayLabel}
                        </Typography>
                        <Typography 
                          variant="caption" 
                          sx={{ 
                            color: 'rgba(255, 255, 255, 0.5)', 
                            display: 'block', 
                            fontSize: { xs: '0.6875rem', sm: '0.75rem' },
                            lineHeight: 1.2,
                            wordBreak: 'break-word',
                          }}
                        >
                          {fullDate}
                        </Typography>
                      </Box>
                      
                      <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'flex-start' }}>
                        {hasData ? (
                          <Box>
                            <Typography 
                              variant="caption" 
                              sx={{ 
                                color: 'rgba(255, 255, 255, 0.6)', 
                                fontSize: { xs: '0.6875rem', sm: '0.75rem' },
                                display: 'block',
                                mb: 0.5,
                              }}
                            >
                              Sleep Duration
                            </Typography>
                            <Typography 
                              variant="body2" 
                              sx={{ 
                                color: '#4facfe', 
                                fontWeight: 600, 
                                fontSize: { xs: '0.8125rem', sm: '0.875rem', md: '0.9375rem' }, 
                                wordBreak: 'break-word',
                                lineHeight: 1.2,
                                mb: day.nightWakeUps !== null ? 1 : 0,
                              }}
                            >
                              {day.timeAsleep}
                            </Typography>
                            {day.nightWakeUps !== null && (
                              <Typography 
                                variant="caption" 
                                sx={{ 
                                  color: 'rgba(255, 255, 255, 0.6)', 
                                  fontSize: { xs: '0.6875rem', sm: '0.75rem' },
                                  display: 'block',
                                }}
                              >
                                Wake-ups: {day.nightWakeUps}
                              </Typography>
                            )}
                          </Box>
                        ) : (
                          <Typography 
                            variant="caption" 
                            sx={{ 
                              color: 'rgba(255, 255, 255, 0.4)',
                              fontSize: { xs: '0.6875rem', sm: '0.75rem' },
                            }}
                          >
                            No data logged
                          </Typography>
                        )}
                      </Box>
                    </CardContent>
                  </Card>
                </Box>
              );
            })}
          </Box>
        </Box>
      )}
    </Box>
  );
}
