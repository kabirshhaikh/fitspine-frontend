// src/components/widgets/QuickActionsWidget.jsx
import { Stack, Button, alpha, Box } from '@mui/material';
import { Add, Timer, FitnessCenter, Assessment } from '@mui/icons-material';
import WidgetShell from './WidgetShell';

const actions = [
  {
    label: 'Log Pain',
    icon: <Assessment />,
    gradient: 'linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%)',
    bgColor: alpha('#ff6b6b', 0.1),
    borderColor: alpha('#ff6b6b', 0.3),
  },
  {
    label: 'Add Stretch',
    icon: <FitnessCenter />,
    gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    bgColor: alpha('#4facfe', 0.1),
    borderColor: alpha('#4facfe', 0.3),
  },
  {
    label: 'Sitting Timer',
    icon: <Timer />,
    gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    bgColor: alpha('#667eea', 0.1),
    borderColor: alpha('#667eea', 0.3),
  },
  {
    label: 'Quick Log',
    icon: <Add />,
    gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    bgColor: alpha('#f093fb', 0.1),
    borderColor: alpha('#f093fb', 0.3),
  },
];

export default function QuickActionsWidget() {
  return (
    <WidgetShell title="Quick Actions">
      <Stack spacing={2}>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5 }}>
          {actions.map((action, index) => (
            <Button
              key={action.label}
              variant="outlined"
              startIcon={action.icon}
              sx={{
                flex: '1 1 auto',
                minWidth: '120px',
                py: 1.5,
                px: 2,
                borderRadius: 3,
                background: action.bgColor,
                border: `1px solid ${action.borderColor}`,
                color: action.gradient.split(' ')[1],
                fontWeight: 500,
                textTransform: 'none',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: `0 8px 25px ${alpha(action.gradient.split(' ')[1], 0.3)}`,
                  background: action.gradient,
                  color: 'white',
                  border: 'none',
                  '& .MuiSvgIcon-root': {
                    color: 'white',
                  }
                },
                '& .MuiSvgIcon-root': {
                  color: action.gradient.split(' ')[1],
                  transition: 'color 0.3s ease',
                }
              }}
            >
              {action.label}
            </Button>
          ))}
        </Box>
        
        <Box sx={{ 
          mt: 2, 
          p: 2, 
          borderRadius: 2, 
          background: `linear-gradient(135deg, ${alpha('#ffffff', 0.05)}, ${alpha('#ffffff', 0.02)})`,
          border: `1px solid ${alpha('#ffffff', 0.1)}`,
        }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Box sx={{ 
              width: 8, 
              height: 8, 
              borderRadius: '50%', 
              background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
              animation: 'pulse 2s infinite',
            }} />
            <Box sx={{ fontSize: '0.875rem', color: 'text.secondary' }}>
              Pro tip: Log your activities regularly for better insights
            </Box>
          </Box>
        </Box>
      </Stack>
    </WidgetShell>
  );
}

