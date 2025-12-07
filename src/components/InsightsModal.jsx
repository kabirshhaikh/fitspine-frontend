// src/components/InsightsModal.jsx
import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  Card,
  CardContent,
  CardHeader,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Chip,
  Divider,
  alpha,
  LinearProgress,
  IconButton
} from '@mui/material';
import {
  Close,
  TrendingDown,
  Warning,
  Lightbulb,
  MedicalServices,
  Psychology,
  Error,
  Info,
  Assessment
} from '@mui/icons-material';

export default function InsightsModal({ open, onClose, insights }) {
  if (!insights) return null;

  const getScoreColor = (score) => {
    if (score >= 80) return '#4caf50';
    if (score >= 60) return '#ff9800';
    return '#f44336';
  };

  // eslint-disable-next-line no-unused-vars
  const getScoreLabel = (score) => {
    return null; // No labels shown
  };

  const getRiskColor = (bucket) => {
    switch (bucket?.toUpperCase()) {
      case 'SAFE': return '#4caf50';
      case 'CAUTION': return '#ff9800';
      case 'ELEVATED': return '#ff6b00';
      case 'HIGH_RISK': return '#f44336';
      default: return '#9e9e9e';
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          background: `
            radial-gradient(circle at 20% 50%, rgba(120, 119, 198, 0.3) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(255, 119, 198, 0.3) 0%, transparent 50%),
            radial-gradient(circle at 40% 80%, rgba(120, 219, 255, 0.3) 0%, transparent 50%),
            linear-gradient(135deg, #0f0f23 0%, #1a1a2e 25%, #16213e 50%, #0f3460 75%, #533483 100%)
          `,
          backdropFilter: 'blur(20px)',
          border: `1px solid ${alpha('#ffffff', 0.2)}`,
          borderRadius: 4,
        }
      }}
    >
      <DialogTitle sx={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'space-between',
        color: 'white',
        pb: 1
      }}>
        <Box display="flex" alignItems="center" gap={2}>
          <Psychology sx={{ color: '#4facfe', fontSize: 28 }} />
          <Typography variant="h5" sx={{ fontWeight: 700 }}>
            AI Spine Insights
          </Typography>
        </Box>
        <IconButton onClick={onClose} sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
          <Close />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ px: 3, py: 2 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          
          {/* Disc Protection Score */}
          <Card sx={{ 
            background: `linear-gradient(135deg, ${alpha(getScoreColor(insights.discProtectionScore), 0.1)}, ${alpha(getScoreColor(insights.discProtectionScore), 0.05)})`,
            border: `1px solid ${alpha(getScoreColor(insights.discProtectionScore), 0.3)}`,
          }}>
            <CardHeader
              avatar={<Assessment sx={{ color: getScoreColor(insights.discProtectionScore) }} />}
              title="Disc Protection Score"
              titleTypographyProps={{ color: 'white', fontWeight: 600 }}
              action={
                getScoreLabel(insights.discProtectionScore) && (
                  <Chip 
                    label={getScoreLabel(insights.discProtectionScore)}
                    sx={{ 
                      background: getScoreColor(insights.discProtectionScore),
                      color: 'white',
                      fontWeight: 600
                    }}
                  />
                )
              }
            />
            <CardContent>
              <Box display="flex" alignItems="center" gap={2} mb={2}>
                <Typography variant="h3" sx={{ color: getScoreColor(insights.discProtectionScore), fontWeight: 700 }}>
                  {insights.discProtectionScore}
                </Typography>
                <Box flex={1}>
                  <LinearProgress 
                    variant="determinate" 
                    value={insights.discProtectionScore} 
                    sx={{ 
                      height: 8, 
                      borderRadius: 4,
                      backgroundColor: alpha('#ffffff', 0.1),
                      '& .MuiLinearProgress-bar': {
                        backgroundColor: getScoreColor(insights.discProtectionScore),
                        borderRadius: 4
                      }
                    }} 
                  />
                </Box>
              </Box>
              {insights.discScoreExplanation && (
                <Typography variant="body2" sx={{ color: 'white', lineHeight: 1.5, fontWeight: 400 }}>
                  {insights.discScoreExplanation}
                </Typography>
              )}
            </CardContent>
          </Card>

          {/* Today's Insight */}
          {insights.todaysInsight && (
            <Card sx={{ background: `linear-gradient(135deg, ${alpha('#4facfe', 0.1)}, ${alpha('#4facfe', 0.05)})` }}>
              <CardHeader
                avatar={<Info sx={{ color: '#4facfe' }} />}
                title="Today's Summary"
                titleTypographyProps={{ color: 'white', fontWeight: 600 }}
              />
              <CardContent sx={{ color: 'white' }}>
                <Typography variant="body1" sx={{ color: 'white', lineHeight: 1.6, fontWeight: 400 }}>
                  {insights.todaysInsight}
                </Typography>
              </CardContent>
            </Card>
          )}

          {/* Recovery Insights */}
          {insights.recoveryInsights && (
            <Card sx={{ background: `linear-gradient(135deg, ${alpha('#4caf50', 0.1)}, ${alpha('#4caf50', 0.05)})` }}>
              <CardHeader
                avatar={<Psychology sx={{ color: '#4caf50' }} />}
                title="Recovery Analysis"
                titleTypographyProps={{ color: 'white', fontWeight: 600 }}
              />
              <CardContent sx={{ color: 'white' }}>
                <Typography variant="body1" sx={{ color: 'white', lineHeight: 1.6, fontWeight: 400 }}>
                  {insights.recoveryInsights}
                </Typography>
              </CardContent>
            </Card>
          )}

          {/* Worsened Metrics */}
          {insights.worsened && insights.worsened.length > 0 && (
            <Card sx={{ 
              background: `linear-gradient(135deg, ${alpha('#ffffff', 0.1)}, ${alpha('#ffffff', 0.05)})`,
              border: `1px solid ${alpha('#ffffff', 0.2)}`,
            }}>
              <CardHeader
                avatar={<TrendingDown sx={{ color: '#f44336' }} />}
                title="Areas of Concern"
                titleTypographyProps={{ color: 'white', fontWeight: 600 }}
              />
              <CardContent sx={{ color: 'white' }}>
                <List dense sx={{ color: 'white' }}>
                  {insights.worsened.map((item, index) => (
                    <ListItem key={index} sx={{ px: 0 }}>
                      <ListItemIcon>
                        <Warning sx={{ color: '#f44336', fontSize: 20 }} />
                      </ListItemIcon>
                      <ListItemText 
                        primary={item}
                        primaryTypographyProps={{ 
                          color: 'white', 
                          fontSize: '0.9rem',
                          lineHeight: 1.4,
                          fontWeight: 400
                        }}
                      />
                    </ListItem>
                  ))}
                </List>
              </CardContent>
            </Card>
          )}

          {/* Possible Causes */}
          {insights.possibleCauses && insights.possibleCauses.length > 0 && (
            <Card sx={{ 
              background: `linear-gradient(135deg, ${alpha('#ffffff', 0.1)}, ${alpha('#ffffff', 0.05)})`,
              border: `1px solid ${alpha('#ffffff', 0.2)}`,
            }}>
              <CardHeader
                avatar={<Error sx={{ color: '#ff9800' }} />}
                title="Possible Causes"
                titleTypographyProps={{ color: 'white', fontWeight: 600 }}
              />
              <CardContent sx={{ color: 'white' }}>
                <List dense sx={{ color: 'white' }}>
                  {insights.possibleCauses.map((item, index) => (
                    <ListItem key={index} sx={{ px: 0 }}>
                      <ListItemIcon>
                        <Error sx={{ color: '#ff9800', fontSize: 20 }} />
                      </ListItemIcon>
                      <ListItemText 
                        primary={item}
                        primaryTypographyProps={{ 
                          color: 'white', 
                          fontSize: '0.9rem',
                          lineHeight: 1.4,
                          fontWeight: 400
                        }}
                      />
                    </ListItem>
                  ))}
                </List>
              </CardContent>
            </Card>
          )}

          {/* Actionable Advice */}
          {insights.actionableAdvice && insights.actionableAdvice.length > 0 && (
            <Card sx={{ 
              background: `linear-gradient(135deg, ${alpha('#ffffff', 0.1)}, ${alpha('#ffffff', 0.05)})`,
              border: `1px solid ${alpha('#ffffff', 0.2)}`,
            }}>
              <CardHeader
                avatar={<Lightbulb sx={{ color: '#ff9800' }} />}
                title="Recommended Actions"
                titleTypographyProps={{ color: 'white', fontWeight: 600 }}
              />
              <CardContent sx={{ color: 'white' }}>
                <List dense sx={{ color: 'white' }}>
                  {insights.actionableAdvice.map((item, index) => (
                    <ListItem key={index} sx={{ px: 0 }}>
                      <ListItemIcon>
                        <Lightbulb sx={{ color: '#ff9800', fontSize: 20 }} />
                      </ListItemIcon>
                      <ListItemText 
                        primary={item}
                        primaryTypographyProps={{ 
                          color: 'white', 
                          fontSize: '0.9rem',
                          lineHeight: 1.4,
                          fontWeight: 400
                        }}
                      />
                    </ListItem>
                  ))}
                </List>
              </CardContent>
            </Card>
          )}

          {/* Today's Interventions */}
          {insights.interventionsToday && insights.interventionsToday.length > 0 && (
            <Card sx={{ 
              background: `linear-gradient(135deg, ${alpha('#ffffff', 0.1)}, ${alpha('#ffffff', 0.05)})`,
              border: `1px solid ${alpha('#ffffff', 0.2)}`,
            }}>
              <CardHeader
                avatar={<MedicalServices sx={{ color: '#2196f3' }} />}
                title="Today's Focus"
                titleTypographyProps={{ color: 'white', fontWeight: 600 }}
              />
              <CardContent sx={{ color: 'white' }}>
                <List dense sx={{ color: 'white' }}>
                  {insights.interventionsToday.map((item, index) => (
                    <ListItem key={index} sx={{ px: 0 }}>
                      <ListItemIcon>
                        <MedicalServices sx={{ color: '#2196f3', fontSize: 20 }} />
                      </ListItemIcon>
                      <ListItemText 
                        primary={item}
                        primaryTypographyProps={{ 
                          color: 'white', 
                          fontSize: '0.9rem',
                          lineHeight: 1.4,
                          fontWeight: 400
                        }}
                      />
                    </ListItem>
                  ))}
                </List>
              </CardContent>
            </Card>
          )}

          {/* Flare Up Triggers */}
          {insights.flareUpTriggers && insights.flareUpTriggers.length > 0 && (
            <Card sx={{ 
              background: `linear-gradient(135deg, ${alpha('#ffffff', 0.1)}, ${alpha('#ffffff', 0.05)})`,
              border: `1px solid ${alpha('#ffffff', 0.2)}`,
            }}>
              <CardHeader
                avatar={<Warning sx={{ color: '#f44336' }} />}
                title="Flare-Up Triggers"
                titleTypographyProps={{ color: 'white', fontWeight: 600 }}
              />
              <CardContent sx={{ color: 'white' }}>
                {insights.flareUpTriggers.map((trigger, index) => (
                  <Box key={index} sx={{ mb: 2, p: 2, background: alpha('#f44336', 0.1), borderRadius: 2 }}>
                    <Typography variant="subtitle2" sx={{ color: '#f44336', fontWeight: 600, mb: 1 }}>
                      {trigger.metric}
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'white', mb: 1, fontWeight: 400 }}>
                      {trigger.value}
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'white', lineHeight: 1.4, fontWeight: 400 }}>
                      {trigger.impact}
                    </Typography>
                  </Box>
                ))}
              </CardContent>
            </Card>
          )}

          {/* Risk Forecast */}
          {insights.riskForecast && (
            <Card sx={{ 
              background: `linear-gradient(135deg, ${alpha(getRiskColor(insights.riskForecast.riskBucket), 0.1)}, ${alpha(getRiskColor(insights.riskForecast.riskBucket), 0.05)})`,
              border: `1px solid ${alpha(getRiskColor(insights.riskForecast.riskBucket), 0.3)}`,
            }}>
              <CardHeader
                avatar={<Warning sx={{ color: getRiskColor(insights.riskForecast.riskBucket) }} />}
                title="Risk Assessment"
                titleTypographyProps={{ color: 'white', fontWeight: 600 }}
              />
              <CardContent sx={{ color: 'white' }}>
                <Box display="flex" alignItems="center" gap={2} mb={2}>
                  <Chip 
                    label={insights.riskForecast.riskBucket || 'UNKNOWN'}
                    sx={{ 
                      background: getRiskColor(insights.riskForecast.riskBucket),
                      color: 'white',
                      fontWeight: 600
                    }}
                  />
                </Box>
                <Box display="flex" flexDirection="column" gap={2}>
                  {insights.riskForecast.flareUpRiskScore !== null && insights.riskForecast.flareUpRiskScore !== undefined && (
                    <Box>
                      <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                        <Typography variant="body2" sx={{ color: 'white', fontWeight: 500 }}>
                          Flare-Up Risk
                        </Typography>
                        <Typography variant="body2" sx={{ color: 'white', fontWeight: 600 }}>
                          {insights.riskForecast.flareUpRiskScore}/10
                        </Typography>
                      </Box>
                      <LinearProgress 
                        variant="determinate" 
                        value={(insights.riskForecast.flareUpRiskScore / 10) * 100} 
                        sx={{ 
                          height: 8, 
                          borderRadius: 4,
                          backgroundColor: alpha('#ffffff', 0.1),
                          '& .MuiLinearProgress-bar': {
                            backgroundColor: getRiskColor(insights.riskForecast.riskBucket),
                            borderRadius: 4
                          }
                        }} 
                      />
                    </Box>
                  )}
                  {insights.riskForecast.painRiskScore !== null && insights.riskForecast.painRiskScore !== undefined && (
                    <Box>
                      <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                        <Typography variant="body2" sx={{ color: 'white', fontWeight: 500 }}>
                          Pain Risk
                        </Typography>
                        <Typography variant="body2" sx={{ color: 'white', fontWeight: 600 }}>
                          {insights.riskForecast.painRiskScore}/10
                        </Typography>
                      </Box>
                      <LinearProgress 
                        variant="determinate" 
                        value={(insights.riskForecast.painRiskScore / 10) * 100} 
                        sx={{ 
                          height: 8, 
                          borderRadius: 4,
                          backgroundColor: alpha('#ffffff', 0.1),
                          '& .MuiLinearProgress-bar': {
                            backgroundColor: getRiskColor(insights.riskForecast.riskBucket),
                            borderRadius: 4
                          }
                        }} 
                      />
                    </Box>
                  )}
                </Box>
              </CardContent>
            </Card>
          )}
        </Box>
      </DialogContent>

      <DialogActions sx={{ px: 3, py: 2 }}>
        <Button
          onClick={onClose}
          variant="contained"
          sx={{
            background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
            borderRadius: '25px',
            px: 3,
            py: 1,
            fontWeight: 600,
            textTransform: 'none',
            '&:hover': {
              background: 'linear-gradient(135deg, #00f2fe 0%, #4facfe 100%)',
            }
          }}
        >
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}
