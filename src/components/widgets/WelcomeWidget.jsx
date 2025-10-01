// src/components/widgets/WelcomeWidget.jsx
import { Typography, Box, Chip, alpha } from '@mui/material';
import { TrendingUp, Favorite, Schedule } from '@mui/icons-material';
import WidgetShell from './WidgetShell';

export default function WelcomeWidget() {
  return (
    <WidgetShell title="Welcome to Your Spine Health Hub">
      <Box sx={{ mb: 3 }}>
        <Typography variant="h6" sx={{ mb: 2, fontWeight: 500, color: 'text.primary' }}>
          This is your FitSpine dashboard. We'll surface your spine routine, logs, and insights here.
        </Typography>
        
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
          <Chip
            icon={<TrendingUp />}
            label="Track Progress"
            variant="outlined"
            sx={{
              background: `linear-gradient(135deg, ${alpha('#4facfe', 0.1)}, ${alpha('#00f2fe', 0.1)})`,
              border: `1px solid ${alpha('#4facfe', 0.3)}`,
              color: '#4facfe',
              '& .MuiChip-icon': { color: '#4facfe' }
            }}
          />
          <Chip
            icon={<Favorite />}
            label="Health Insights"
            variant="outlined"
            sx={{
              background: `linear-gradient(135deg, ${alpha('#f093fb', 0.1)}, ${alpha('#f5576c', 0.1)})`,
              border: `1px solid ${alpha('#f093fb', 0.3)}`,
              color: '#f093fb',
              '& .MuiChip-icon': { color: '#f093fb' }
            }}
          />
          <Chip
            icon={<Schedule />}
            label="Daily Routine"
            variant="outlined"
            sx={{
              background: `linear-gradient(135deg, ${alpha('#667eea', 0.1)}, ${alpha('#764ba2', 0.1)})`,
              border: `1px solid ${alpha('#667eea', 0.3)}`,
              color: '#667eea',
              '& .MuiChip-icon': { color: '#667eea' }
            }}
          />
        </Box>
        
        <Typography variant="body2" color="text.secondary" sx={{ fontStyle: 'italic' }}>
          Your journey to better spine health starts here. Let's make every day count! ✨
        </Typography>
      </Box>
    </WidgetShell>
  );
}
