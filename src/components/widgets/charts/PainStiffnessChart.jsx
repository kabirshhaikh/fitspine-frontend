import React from 'react';
import { Box, Typography, alpha, Card, CardContent, Chip, Grid } from '@mui/material';
import { TrendingUp, TrendingDown, Remove, Info, Lightbulb, EmojiEvents, Warning, CheckCircle } from '@mui/icons-material';
import { formatDayLabel, formatDate } from './chartUtils';

// Helper to get color from label
const getColorForLabel = (label) => {
  if (!label) return '#888888';
  const labelLower = label.toLowerCase();
  if (labelLower === 'none') return '#4caf50';
  if (labelLower === 'mild') return '#8bc34a';
  if (labelLower === 'moderate') return '#ff9800';
  if (labelLower === 'severe') return '#f44336';
  return '#888888';
};

export default function PainStiffnessChart({ painStiffnessResultDto, isFitbitConnected = false }) {
  if (!painStiffnessResultDto) {
    return (
      <Box sx={{ p: 3, textAlign: 'center' }}>
        <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.5)' }}>
          No data available for this period
        </Typography>
      </Box>
    );
  }

  const {
    painAverage,
    stiffnessAverage,
    painTrend,
    stiffnessTrend,
    bestPainDay,
    worstPainDay,
    bestStiffnessDay,
    worstStiffnessDay,
    bestPainFlareUpDay,
    worstPainFlareUpDay,
    bestStiffnessFlareUpDay,
    worstStiffnessFlareUpDay,
    correlations,
    painExplanations,
    stiffnessExplanation,
    dailyBreakDown,
  } = painStiffnessResultDto;


  // Helper to convert average to label (since backend provides averages as numbers)
  const getPainLabelFromAvg = (avg) => {
    if (avg === null || avg === undefined) return null;
    const rounded = Math.round(avg);
    const labels = ['None', 'Mild', 'Moderate', 'Severe'];
    return labels[rounded] || 'Unknown';
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
            {(bestPainDay || bestStiffnessDay) && (
              <Box>
                {painAverage !== null && (
                  <Typography variant="body1" sx={{ color: 'white', mb: 1, fontSize: { xs: '0.875rem', sm: '1rem' }, wordBreak: 'break-word' }}>
                    <strong>Pain:</strong> {getPainLabelFromAvg(painAverage)} average
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
                {stiffnessAverage !== null && (
                  <Typography variant="body1" sx={{ color: 'white', fontSize: { xs: '0.875rem', sm: '1rem' }, wordBreak: 'break-word' }}>
                    <strong>Stiffness:</strong> {getPainLabelFromAvg(stiffnessAverage)} average
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
          </Box>
        </CardContent>
      </Card>

      {/* Flare-Up Days Card */}
      {(bestPainFlareUpDay || worstPainFlareUpDay || bestStiffnessFlareUpDay || worstStiffnessFlareUpDay) && (
        <Card sx={{ 
          background: `linear-gradient(135deg, ${alpha('#ff5722', 0.15)}, ${alpha('#ff5722', 0.05)})`,
          border: `1px solid ${alpha('#ff5722', 0.3)}`,
          width: '100%',
        }}>
          <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2, flexWrap: 'wrap' }}>
              <Warning sx={{ color: '#ff5722', fontSize: { xs: 20, sm: 24 } }} />
              <Typography variant="h6" sx={{ color: 'white', fontWeight: 600, fontSize: { xs: '1rem', sm: '1.25rem' } }}>
                Flare-Up Day Analysis
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {bestPainFlareUpDay && (
                <Box>
                  <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.6)', fontSize: { xs: '0.75rem', sm: '0.875rem' } }}>
                    Best Pain Day (with flare-up)
                  </Typography>
                  <Typography variant="body1" sx={{ color: 'white', fontWeight: 600, fontSize: { xs: '0.875rem', sm: '1rem' }, wordBreak: 'break-word' }}>
                    {formatDate(bestPainFlareUpDay.date)} - {getPainLabelFromAvg(bestPainFlareUpDay.value)} pain
                  </Typography>
                </Box>
              )}
              {worstPainFlareUpDay && (
                <Box>
                  <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.6)', fontSize: { xs: '0.75rem', sm: '0.875rem' } }}>
                    Worst Pain Day (with flare-up)
                  </Typography>
                  <Typography variant="body1" sx={{ color: 'white', fontWeight: 600, fontSize: { xs: '0.875rem', sm: '1rem' }, wordBreak: 'break-word' }}>
                    {formatDate(worstPainFlareUpDay.date)} - {getPainLabelFromAvg(worstPainFlareUpDay.value)} pain
                  </Typography>
                </Box>
              )}
              {bestStiffnessFlareUpDay && (
                <Box>
                  <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.6)', fontSize: { xs: '0.75rem', sm: '0.875rem' } }}>
                    Best Stiffness Day (with flare-up)
                  </Typography>
                  <Typography variant="body1" sx={{ color: 'white', fontWeight: 600, fontSize: { xs: '0.875rem', sm: '1rem' }, wordBreak: 'break-word' }}>
                    {formatDate(bestStiffnessFlareUpDay.date)} - {getPainLabelFromAvg(bestStiffnessFlareUpDay.value)} stiffness
                  </Typography>
                </Box>
              )}
              {worstStiffnessFlareUpDay && (
                <Box>
                  <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.6)', fontSize: { xs: '0.75rem', sm: '0.875rem' } }}>
                    Worst Stiffness Day (with flare-up)
                  </Typography>
                  <Typography variant="body1" sx={{ color: 'white', fontWeight: 600, fontSize: { xs: '0.875rem', sm: '1rem' }, wordBreak: 'break-word' }}>
                    {formatDate(worstStiffnessFlareUpDay.date)} - {getPainLabelFromAvg(worstStiffnessFlareUpDay.value)} stiffness
                  </Typography>
                </Box>
              )}
            </Box>
          </CardContent>
        </Card>
      )}

      {/* Best/Worst Days Card */}
      {(bestPainDay || worstPainDay) && (
        <Card sx={{ 
          background: `linear-gradient(135deg, ${alpha('#ffffff', 0.1)}, ${alpha('#ffffff', 0.05)})`,
          border: `1px solid ${alpha('#ffffff', 0.2)}`,
          width: '100%',
        }}>
          <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {bestPainDay && (
                <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: { xs: 1.5, sm: 2 }, flexWrap: 'wrap' }}>
                  <EmojiEvents sx={{ color: '#4caf50', fontSize: { xs: 24, sm: 28 }, flexShrink: 0 }} />
                  <Box sx={{ flex: 1, minWidth: 0 }}>
                    <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.6)', fontSize: { xs: '0.75rem', sm: '0.875rem' } }}>
                      Best Day
                    </Typography>
                    <Typography variant="h6" sx={{ color: 'white', fontWeight: 600, fontSize: { xs: '1rem', sm: '1.25rem' }, wordBreak: 'break-word' }}>
                      {formatDate(bestPainDay.date)} - {getPainLabelFromAvg(bestPainDay.value)} pain
                    </Typography>
                    <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.5)', fontSize: { xs: '0.7rem', sm: '0.75rem' } }}>
                      What did you do differently?
                    </Typography>
                  </Box>
                </Box>
              )}
              {worstPainDay && bestPainDay && worstPainDay.value > bestPainDay.value && (
                <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: { xs: 1.5, sm: 2 }, flexWrap: 'wrap' }}>
                  <Warning sx={{ color: '#f44336', fontSize: { xs: 24, sm: 28 }, flexShrink: 0 }} />
                  <Box sx={{ flex: 1, minWidth: 0 }}>
                    <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.6)', fontSize: { xs: '0.75rem', sm: '0.875rem' } }}>
                      Highest Pain Day
                    </Typography>
                    <Typography variant="h6" sx={{ color: 'white', fontWeight: 600, fontSize: { xs: '1rem', sm: '1.25rem' }, wordBreak: 'break-word' }}>
                      {formatDate(worstPainDay.date)} - {getPainLabelFromAvg(worstPainDay.value)} pain
                    </Typography>
                  </Box>
                </Box>
              )}
            </Box>
          </CardContent>
        </Card>
      )}

      {/* Why Did Pain Increase? Card */}
      {painExplanations && painExplanations.length > 0 && worstPainDay && (
        <Card sx={{ 
          background: `linear-gradient(135deg, ${alpha('#f44336', 0.15)}, ${alpha('#f44336', 0.05)})`,
          border: `1px solid ${alpha('#f44336', 0.3)}`,
          width: '100%',
        }}>
          <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2, flexWrap: 'wrap' }}>
              <Warning sx={{ color: '#f44336', fontSize: { xs: 20, sm: 24 } }} />
              <Typography variant="h6" sx={{ color: 'white', fontWeight: 600, fontSize: { xs: '1rem', sm: '1.25rem' } }}>
                Why did pain increase on {formatDate(worstPainDay.date)}?
              </Typography>
            </Box>
            {painExplanations.map((explanation, index) => (
              <Box key={index} sx={{ mb: 2, pb: index < painExplanations.length - 1 ? 2 : 0, borderBottom: index < painExplanations.length - 1 ? `1px solid ${alpha('#ffffff', 0.1)}` : 'none' }}>
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

      {/* Why Did Stiffness Increase? Card */}
      {stiffnessExplanation && stiffnessExplanation.length > 0 && worstStiffnessDay && (
        <Card sx={{ 
          background: `linear-gradient(135deg, ${alpha('#ff9800', 0.15)}, ${alpha('#ff9800', 0.05)})`,
          border: `1px solid ${alpha('#ff9800', 0.3)}`,
          width: '100%',
        }}>
          <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2, flexWrap: 'wrap' }}>
              <Warning sx={{ color: '#ff9800', fontSize: { xs: 20, sm: 24 } }} />
              <Typography variant="h6" sx={{ color: 'white', fontWeight: 600, fontSize: { xs: '1rem', sm: '1.25rem' } }}>
                Why did stiffness increase on {formatDate(worstStiffnessDay.date)}?
              </Typography>
            </Box>
            {stiffnessExplanation.map((explanation, index) => (
              <Box key={index} sx={{ mb: 2, pb: index < stiffnessExplanation.length - 1 ? 2 : 0, borderBottom: index < stiffnessExplanation.length - 1 ? `1px solid ${alpha('#ffffff', 0.1)}` : 'none' }}>
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

      {/* Pattern Insights Card */}
      {correlations && correlations.length > 0 && (
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
            {correlations.map((insight, index) => (
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
      {dailyBreakDown && dailyBreakDown.length > 0 && (
        <Box sx={{ width: '100%' }}>
          <Typography variant="h6" sx={{ color: 'white', mb: 2, fontWeight: 600, fontSize: { xs: '1rem', sm: '1.25rem' } }}>
            Daily Breakdown
          </Typography>
          <Grid container spacing={{ xs: 1.5, sm: 2 }}>
            {dailyBreakDown.map((day, index) => {
              const hasData = day.painLevel !== null || day.stiffnessLevel !== null;
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
                                label={day.painLevel}
                                size="small"
                                sx={{
                                  background: alpha(getColorForLabel(day.painLevel), 0.2),
                                  color: getColorForLabel(day.painLevel),
                                  border: `1px solid ${alpha(getColorForLabel(day.painLevel), 0.5)}`,
                                  fontWeight: 600,
                                  mt: 0.5,
                                  fontSize: { xs: '0.7rem', sm: '0.75rem' },
                                  height: { xs: 24, sm: 28 },
                                }}
                              />
                            </Box>
                          )}
                          {day.stiffnessLevel !== null && (
                            <Box>
                              <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.6)', fontSize: { xs: '0.7rem', sm: '0.75rem' } }}>
                                Stiffness
                              </Typography>
                              <Chip 
                                label={day.stiffnessLevel}
                                size="small"
                                sx={{
                                  background: alpha(getColorForLabel(day.stiffnessLevel), 0.2),
                                  color: getColorForLabel(day.stiffnessLevel),
                                  border: `1px solid ${alpha(getColorForLabel(day.stiffnessLevel), 0.5)}`,
                                  fontWeight: 600,
                                  mt: 0.5,
                                  fontSize: { xs: '0.7rem', sm: '0.75rem' },
                                  height: { xs: 24, sm: 28 },
                                }}
                              />
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
          <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1, mb: 1.5 }}>
            <CheckCircle sx={{ color: '#ff9800', fontSize: { xs: 16, sm: 18 }, mt: 0.5, flexShrink: 0 }} />
            <Typography variant="body2" sx={{ color: 'white', lineHeight: 1.6, fontSize: { xs: '0.875rem', sm: '1rem' }, wordBreak: 'break-word' }}>
              Continue tracking to identify patterns
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}
