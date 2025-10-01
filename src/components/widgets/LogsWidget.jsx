// src/components/widgets/LogsWidget.jsx
import { Typography, Box, Chip, List, ListItem, ListItemIcon, ListItemText, alpha, Divider } from '@mui/material';
import { AccessTime, FitnessCenter, Assessment, Timer } from '@mui/icons-material';
import WidgetShell from './WidgetShell';

const mockLogs = [
  {
    id: 1,
    type: 'stretch',
    activity: 'Morning Spine Stretch',
    time: '9:30 AM',
    duration: '15 min',
    icon: <FitnessCenter />,
    color: '#4facfe',
  },
  {
    id: 2,
    type: 'timer',
    activity: 'Sitting Break Timer',
    time: '11:15 AM',
    duration: '5 min',
    icon: <Timer />,
    color: '#667eea',
  },
  {
    id: 3,
    type: 'pain',
    activity: 'Lower Back Pain Log',
    time: '2:45 PM',
    duration: 'Level 3',
    icon: <Assessment />,
    color: '#ff6b6b',
  },
];

export default function LogsWidget() {
  return (
    <WidgetShell title="Recent Activity Logs">
      <Box>
        {mockLogs.length > 0 ? (
          <>
            <List sx={{ p: 0 }}>
              {mockLogs.map((log, index) => (
                <Box key={log.id}>
                  <ListItem 
                    sx={{ 
                      px: 0, 
                      py: 1.5,
                      borderRadius: 2,
                      transition: 'all 0.2s ease',
                      '&:hover': {
                        background: alpha('#ffffff', 0.05),
                        transform: 'translateX(4px)',
                      }
                    }}
                  >
                    <ListItemIcon sx={{ minWidth: 40 }}>
                      <Box
                        sx={{
                          width: 32,
                          height: 32,
                          borderRadius: '50%',
                          background: `linear-gradient(135deg, ${log.color}, ${alpha(log.color, 0.7)})`,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: 'white',
                        }}
                      >
                        {log.icon}
                      </Box>
                    </ListItemIcon>
                    <ListItemText
                      primary={
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                          <Typography variant="body2" fontWeight={500}>
                            {log.activity}
                          </Typography>
                          <Chip
                            label={log.duration}
                            size="small"
                            sx={{
                              height: 20,
                              fontSize: '0.75rem',
                              background: alpha(log.color, 0.1),
                              color: log.color,
                              border: `1px solid ${alpha(log.color, 0.3)}`,
                            }}
                          />
                        </Box>
                      }
                      secondary={
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                          <AccessTime sx={{ fontSize: 14, color: 'text.secondary' }} />
                          <Typography variant="caption" color="text.secondary">
                            {log.time}
                          </Typography>
                        </Box>
                      }
                    />
                  </ListItem>
                  {index < mockLogs.length - 1 && (
                    <Divider sx={{ opacity: 0.3, my: 0.5 }} />
                  )}
                </Box>
              ))}
            </List>
            
            <Box sx={{ 
              mt: 2, 
              p: 2, 
              borderRadius: 2, 
              background: `linear-gradient(135deg, ${alpha('#4facfe', 0.1)}, ${alpha('#00f2fe', 0.05)})`,
              border: `1px solid ${alpha('#4facfe', 0.2)}`,
            }}>
              <Typography variant="body2" sx={{ textAlign: 'center', color: 'text.secondary' }}>
                Keep logging your activities to build healthy habits! 💪
              </Typography>
            </Box>
          </>
        ) : (
          <Box sx={{ textAlign: 'center', py: 4 }}>
            <Box sx={{ 
              width: 64, 
              height: 64, 
              borderRadius: '50%', 
              background: `linear-gradient(135deg, ${alpha('#4facfe', 0.1)}, ${alpha('#00f2fe', 0.1)})`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 16px',
              border: `2px solid ${alpha('#4facfe', 0.3)}`,
            }}>
              <Assessment sx={{ fontSize: 32, color: '#4facfe' }} />
            </Box>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              No logs yet. Start tracking your spine health activities!
            </Typography>
            <Typography variant="caption" color="text.secondary" sx={{ fontStyle: 'italic' }}>
              Your first log will appear here
            </Typography>
          </Box>
        )}
      </Box>
    </WidgetShell>
  );
}