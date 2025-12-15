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
} from '@mui/material';
import {
  TrendingDown,
  Warning,
  Lightbulb,
  Psychology,
  Assessment,
  CheckCircle,
} from '@mui/icons-material';
import { computeWeeklyInsights } from '../utils/weeklyInsights';

export default function WeeklyInsights({ weeklyGraphData }) {
  if (!weeklyGraphData || !weeklyGraphData.dailyData) {
    return (
      <Box sx={{ p: 3, textAlign: 'center' }}>
        <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.6)' }}>
          No weekly data available
        </Typography>
      </Box>
    );
  }

  const insights = computeWeeklyInsights(weeklyGraphData);

  if (!insights) {
    return null;
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      {/* Weekly Summary */}
      <Card sx={{ 
        background: `linear-gradient(135deg, ${alpha('#4facfe', 0.1)}, ${alpha('#4facfe', 0.05)})`,
        border: `1px solid ${alpha('#4facfe', 0.3)}`,
      }}>
        <CardHeader
          avatar={<Assessment sx={{ color: '#4facfe' }} />}
          title="Weekly Summary"
          titleTypographyProps={{ color: 'white', fontWeight: 600 }}
        />
        <CardContent>
          <Typography variant="body1" sx={{ color: 'white', lineHeight: 1.6, fontWeight: 400 }}>
            {insights.summary}
          </Typography>
        </CardContent>
      </Card>

      {/* Improvements This Week */}
      {insights.improvements && insights.improvements.length > 0 && (
        <Card sx={{ 
          background: `linear-gradient(135deg, ${alpha('#4caf50', 0.1)}, ${alpha('#4caf50', 0.05)})`,
          border: `1px solid ${alpha('#4caf50', 0.3)}`,
        }}>
          <CardHeader
            avatar={<TrendingDown sx={{ color: '#4caf50' }} />}
            title="Improvements This Week"
            titleTypographyProps={{ color: 'white', fontWeight: 600 }}
          />
          <CardContent>
            <List dense sx={{ color: 'white' }}>
              {insights.improvements.map((improvement, index) => (
                <ListItem key={index} sx={{ px: 0 }}>
                  <ListItemIcon>
                    <CheckCircle sx={{ color: '#4caf50', fontSize: 20 }} />
                  </ListItemIcon>
                  <ListItemText 
                    primary={improvement}
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

      {/* Needs Attention */}
      {insights.needsAttention && insights.needsAttention.length > 0 && (
        <Card sx={{ 
          background: `linear-gradient(135deg, ${alpha('#ff9800', 0.1)}, ${alpha('#ff9800', 0.05)})`,
          border: `1px solid ${alpha('#ff9800', 0.3)}`,
        }}>
          <CardHeader
            avatar={<Warning sx={{ color: '#ff9800' }} />}
            title="Needs Attention"
            titleTypographyProps={{ color: 'white', fontWeight: 600 }}
          />
          <CardContent>
            <List dense sx={{ color: 'white' }}>
              {insights.needsAttention.map((item, index) => (
                <ListItem key={index} sx={{ px: 0 }}>
                  <ListItemIcon>
                    <Warning sx={{ color: '#ff9800', fontSize: 20 }} />
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

      {/* Pattern Detection */}
      {insights.patterns && insights.patterns.length > 0 && (
        <Card sx={{ 
          background: `linear-gradient(135deg, ${alpha('#9c27b0', 0.1)}, ${alpha('#9c27b0', 0.05)})`,
          border: `1px solid ${alpha('#9c27b0', 0.3)}`,
        }}>
          <CardHeader
            avatar={<Psychology sx={{ color: '#9c27b0' }} />}
            title="Patterns Observed"
            titleTypographyProps={{ color: 'white', fontWeight: 600 }}
          />
          <CardContent>
            <List dense sx={{ color: 'white' }}>
              {insights.patterns.map((pattern, index) => (
                <ListItem key={index} sx={{ px: 0 }}>
                  <ListItemIcon>
                    <Psychology sx={{ color: '#9c27b0', fontSize: 20 }} />
                  </ListItemIcon>
                  <ListItemText 
                    primary={pattern}
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

      {/* Next Week Focus */}
      {insights.nextWeekFocus && (
        <Card sx={{ 
          background: `linear-gradient(135deg, ${alpha('#00f2fe', 0.1)}, ${alpha('#00f2fe', 0.05)})`,
          border: `1px solid ${alpha('#00f2fe', 0.3)}`,
        }}>
          <CardHeader
            avatar={<Lightbulb sx={{ color: '#00f2fe' }} />}
            title="Next Week Focus"
            titleTypographyProps={{ color: 'white', fontWeight: 600 }}
          />
          <CardContent>
            <Typography variant="body1" sx={{ color: 'white', lineHeight: 1.6, fontWeight: 400 }}>
              {insights.nextWeekFocus}
            </Typography>
          </CardContent>
        </Card>
      )}
    </Box>
  );
}

