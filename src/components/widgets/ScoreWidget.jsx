// src/components/widgets/ScoreWidget.jsx
import { Typography, Box, LinearProgress, alpha } from '@mui/material';
import { TrendingUp, Circle } from '@mui/icons-material';
import WidgetShell from './WidgetShell';

export default function ScoreWidget() {
  const score = 85; // Placeholder score
  const maxScore = 100;
  
  return (
    <WidgetShell title="Disc Protection Score">
      <Box sx={{ textAlign: 'center', py: 2 }}>
        {/* Circular Progress Ring */}
        <Box sx={{ position: 'relative', display: 'inline-flex', mb: 3 }}>
          <Box
            sx={{
              position: 'relative',
              width: 120,
              height: 120,
              borderRadius: '50%',
              background: `conic-gradient(from 0deg, #4facfe 0%, #00f2fe ${score}%, ${alpha('#ffffff', 0.2)} ${score}%, ${alpha('#ffffff', 0.2)} 100%)`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              '&::before': {
                content: '""',
                position: 'absolute',
                width: 80,
                height: 80,
                borderRadius: '50%',
                background: `linear-gradient(135deg, ${alpha('#ffffff', 0.1)}, ${alpha('#ffffff', 0.05)})`,
                backdropFilter: 'blur(10px)',
              }
            }}
          >
            <Typography 
              variant="h3" 
              fontWeight={800}
              sx={{
                background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                zIndex: 1,
              }}
            >
              {score}
            </Typography>
          </Box>
        </Box>
        
        {/* Score Details */}
        <Box sx={{ mb: 2 }}>
          <Typography variant="h6" sx={{ mb: 1, fontWeight: 600 }}>
            Excellent Progress! 🎉
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Your spine health is on track. Keep up the great work!
          </Typography>
          
          {/* Mini Progress Bar */}
          <Box sx={{ mb: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
              <Typography variant="caption" color="text.secondary">
                Daily Goal
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {score}/{maxScore}
              </Typography>
            </Box>
            <LinearProgress
              variant="determinate"
              value={(score / maxScore) * 100}
              sx={{
                height: 8,
                borderRadius: 4,
                background: alpha('#ffffff', 0.2),
                '& .MuiLinearProgress-bar': {
                  background: 'linear-gradient(90deg, #4facfe 0%, #00f2fe 100%)',
                  borderRadius: 4,
                }
              }}
            />
          </Box>
        </Box>
        
        <Typography variant="caption" color="text.secondary" sx={{ fontStyle: 'italic' }}>
          Based on your daily habits and routine logs
        </Typography>
      </Box>
    </WidgetShell>
  );
}
