// src/components/WeeklyInsights.jsx
import React from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardHeader,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  alpha,
  Chip,
} from '@mui/material';
import {
  TrendingDown,
  Warning,
  Lightbulb,
  Psychology,
  Assessment,
  CheckCircle,
} from '@mui/icons-material';

export default function WeeklyInsights({ weeklySummaryResultDto }) {
  if (!weeklySummaryResultDto) {
    return (
      <Box sx={{ p: 3, textAlign: 'center' }}>
        <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.6)' }}>
          No weekly data available
        </Typography>
      </Box>
    );
  }

  const {
    overAllSpineLoad,
    loadCategory,
    painTrend,
    activityBalance,
    summaryText,
    improvements,
    needsAttention,
    detectedPatterns,
    nextWeekFocus,
  } = weeklySummaryResultDto;

  // Helper to get load category color
  const getLoadCategoryColor = (category) => {
    if (!category) return '#888888';
    const catLower = category.toLowerCase();
    if (catLower === 'low') return '#4caf50';
    if (catLower === 'moderate') return '#ff9800';
    if (catLower === 'high') return '#f44336';
    return '#888888';
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: { xs: 2, sm: 3 }, width: '100%' }}>
      {/* Overall Spine Load Card */}
      {(overAllSpineLoad !== null && overAllSpineLoad !== undefined) && (
        <Card sx={{ 
          background: `linear-gradient(135deg, ${alpha('#4facfe', 0.2)}, ${alpha('#4facfe', 0.1)})`,
          border: `2px solid ${alpha('#4facfe', 0.4)}`,
          width: '100%',
        }}>
          <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2, flexWrap: 'wrap' }}>
              <Assessment sx={{ color: '#4facfe', fontSize: { xs: 24, sm: 28 } }} />
              <Box sx={{ flex: 1, minWidth: 0 }}>
                <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.6)', fontSize: { xs: '0.7rem', sm: '0.75rem' } }}>
                  Overall Spine Load
                </Typography>
                <Typography variant="h3" sx={{ 
                  color: getLoadCategoryColor(loadCategory),
                  fontWeight: 700,
                  mb: 1,
                  fontSize: { xs: '1.75rem', sm: '2.5rem', md: '3rem' },
                  wordBreak: 'break-word'
                }}>
                  {overAllSpineLoad.toFixed(2)}
                </Typography>
                {loadCategory && (
                  <Chip 
                    label={loadCategory.charAt(0).toUpperCase() + loadCategory.slice(1)} 
                    sx={{ 
                      background: alpha(getLoadCategoryColor(loadCategory), 0.3), 
                      color: getLoadCategoryColor(loadCategory), 
                      fontWeight: 600,
                      fontSize: { xs: '0.7rem', sm: '0.75rem' }
                    }} 
                  />
                )}
                {painTrend && (
                  <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.7)', display: 'block', mt: 1, fontSize: { xs: '0.7rem', sm: '0.75rem' }, wordBreak: 'break-word' }}>
                    Pain trend: {painTrend.charAt(0).toUpperCase() + painTrend.slice(1)}
                  </Typography>
                )}
                {activityBalance && (
                  <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.7)', display: 'block', fontSize: { xs: '0.7rem', sm: '0.75rem' }, wordBreak: 'break-word' }}>
                    Activity: {activityBalance.charAt(0).toUpperCase() + activityBalance.slice(1)}
                  </Typography>
                )}
              </Box>
            </Box>
          </CardContent>
        </Card>
      )}

      {/* Weekly Summary */}
      {summaryText && (
        <Card sx={{ 
          background: `linear-gradient(135deg, ${alpha('#4facfe', 0.1)}, ${alpha('#4facfe', 0.05)})`,
          border: `1px solid ${alpha('#4facfe', 0.3)}`,
          width: '100%',
        }}>
          <CardHeader
            avatar={<Assessment sx={{ color: '#4facfe', fontSize: { xs: 20, sm: 24 } }} />}
            title="Weekly Summary"
            titleTypographyProps={{ color: 'white', fontWeight: 600, fontSize: { xs: '1rem', sm: '1.25rem' } }}
          />
          <CardContent sx={{ p: { xs: 2, sm: 3 }, pt: 0 }}>
            <Typography variant="body1" sx={{ color: 'white', lineHeight: 1.6, fontWeight: 400, fontSize: { xs: '0.875rem', sm: '1rem' }, wordBreak: 'break-word' }}>
              {summaryText}
            </Typography>
          </CardContent>
        </Card>
      )}

      {/* Improvements This Week */}
      {improvements && improvements.length > 0 && (
        <Card sx={{ 
          background: `linear-gradient(135deg, ${alpha('#4caf50', 0.1)}, ${alpha('#4caf50', 0.05)})`,
          border: `1px solid ${alpha('#4caf50', 0.3)}`,
          width: '100%',
        }}>
          <CardHeader
            avatar={<TrendingDown sx={{ color: '#4caf50', fontSize: { xs: 20, sm: 24 } }} />}
            title="Improvements This Week"
            titleTypographyProps={{ color: 'white', fontWeight: 600, fontSize: { xs: '1rem', sm: '1.25rem' } }}
          />
          <CardContent sx={{ p: { xs: 2, sm: 3 }, pt: 0 }}>
            <List dense sx={{ color: 'white' }}>
              {improvements.map((improvement, index) => (
                <ListItem key={index} sx={{ px: 0 }}>
                  <ListItemIcon>
                    <CheckCircle sx={{ color: '#4caf50', fontSize: { xs: 18, sm: 20 } }} />
                  </ListItemIcon>
                  <ListItemText 
                    primary={improvement}
                    primaryTypographyProps={{ 
                      color: 'white', 
                      fontSize: { xs: '0.875rem', sm: '0.9rem' },
                      lineHeight: 1.4,
                      fontWeight: 400,
                      wordBreak: 'break-word'
                    }}
                  />
                </ListItem>
              ))}
            </List>
          </CardContent>
        </Card>
      )}

      {/* Needs Attention */}
      {needsAttention && needsAttention.length > 0 && (
        <Card sx={{ 
          background: `linear-gradient(135deg, ${alpha('#ff9800', 0.1)}, ${alpha('#ff9800', 0.05)})`,
          border: `1px solid ${alpha('#ff9800', 0.3)}`,
          width: '100%',
        }}>
          <CardHeader
            avatar={<Warning sx={{ color: '#ff9800', fontSize: { xs: 20, sm: 24 } }} />}
            title="Needs Attention"
            titleTypographyProps={{ color: 'white', fontWeight: 600, fontSize: { xs: '1rem', sm: '1.25rem' } }}
          />
          <CardContent sx={{ p: { xs: 2, sm: 3 }, pt: 0 }}>
            <List dense sx={{ color: 'white' }}>
              {needsAttention.map((item, index) => (
                <ListItem key={index} sx={{ px: 0 }}>
                  <ListItemIcon>
                    <Warning sx={{ color: '#ff9800', fontSize: { xs: 18, sm: 20 } }} />
                  </ListItemIcon>
                  <ListItemText 
                    primary={item}
                    primaryTypographyProps={{ 
                      color: 'white', 
                      fontSize: { xs: '0.875rem', sm: '0.9rem' },
                      lineHeight: 1.4,
                      fontWeight: 400,
                      wordBreak: 'break-word'
                    }}
                  />
                </ListItem>
              ))}
            </List>
          </CardContent>
        </Card>
      )}

      {/* Pattern Detection */}
      {detectedPatterns && detectedPatterns.length > 0 && (
        <Card sx={{ 
          background: `linear-gradient(135deg, ${alpha('#9c27b0', 0.1)}, ${alpha('#9c27b0', 0.05)})`,
          border: `1px solid ${alpha('#9c27b0', 0.3)}`,
          width: '100%',
        }}>
          <CardHeader
            avatar={<Psychology sx={{ color: '#9c27b0', fontSize: { xs: 20, sm: 24 } }} />}
            title="Patterns Observed"
            titleTypographyProps={{ color: 'white', fontWeight: 600, fontSize: { xs: '1rem', sm: '1.25rem' } }}
          />
          <CardContent sx={{ p: { xs: 2, sm: 3 }, pt: 0 }}>
            <List dense sx={{ color: 'white' }}>
              {detectedPatterns.map((pattern, index) => (
                <ListItem key={index} sx={{ px: 0 }}>
                  <ListItemIcon>
                    <Psychology sx={{ color: '#9c27b0', fontSize: { xs: 18, sm: 20 } }} />
                  </ListItemIcon>
                  <ListItemText 
                    primary={pattern}
                    primaryTypographyProps={{ 
                      color: 'white', 
                      fontSize: { xs: '0.875rem', sm: '0.9rem' },
                      lineHeight: 1.4,
                      fontWeight: 400,
                      wordBreak: 'break-word'
                    }}
                  />
                </ListItem>
              ))}
            </List>
          </CardContent>
        </Card>
      )}

      {/* Next Week Focus */}
      {nextWeekFocus && (
        <Card sx={{ 
          background: `linear-gradient(135deg, ${alpha('#00f2fe', 0.1)}, ${alpha('#00f2fe', 0.05)})`,
          border: `1px solid ${alpha('#00f2fe', 0.3)}`,
          width: '100%',
        }}>
          <CardHeader
            avatar={<Lightbulb sx={{ color: '#00f2fe', fontSize: { xs: 20, sm: 24 } }} />}
            title="Next Week Focus"
            titleTypographyProps={{ color: 'white', fontWeight: 600, fontSize: { xs: '1rem', sm: '1.25rem' } }}
          />
          <CardContent sx={{ p: { xs: 2, sm: 3 }, pt: 0 }}>
            <Typography variant="body1" sx={{ color: 'white', lineHeight: 1.6, fontWeight: 400, fontSize: { xs: '0.875rem', sm: '1rem' }, wordBreak: 'break-word' }}>
              {nextWeekFocus}
            </Typography>
          </CardContent>
        </Card>
      )}
    </Box>
  );
}
