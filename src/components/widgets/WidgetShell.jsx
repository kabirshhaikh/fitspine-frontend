// src/components/widgets/WidgetShell.jsx
import { Card, CardContent, CardHeader, alpha } from '@mui/material';
import { keyframes } from '@mui/system';

const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const shimmer = keyframes`
  0% {
    background-position: -200px 0;
  }
  100% {
    background-position: calc(200px + 100%) 0;
  }
`;

export default function WidgetShell({ title, action, children, sx = {} }) {
  return (
    <Card 
      elevation={0}
      sx={{
        borderRadius: 4,
        background: `linear-gradient(135deg, ${alpha('#ffffff', 0.1)}, ${alpha('#ffffff', 0.05)})`,
        backdropFilter: 'blur(20px)',
        border: `1px solid ${alpha('#ffffff', 0.2)}`,
        position: 'relative',
        overflow: 'hidden',
        animation: `${fadeInUp} 0.6s ease-out`,
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: `0 20px 40px ${alpha('#000000', 0.1)}`,
          border: `1px solid ${alpha('#ffffff', 0.3)}`,
        },
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: -100,
          width: '100%',
          height: '100%',
          background: `linear-gradient(90deg, transparent, ${alpha('#ffffff', 0.1)}, transparent)`,
          animation: `${shimmer} 3s infinite`,
        },
        ...sx
      }}
    >
      {title && (
        <CardHeader 
          title={title} 
          action={action}
          sx={{
            '& .MuiCardHeader-title': {
              fontWeight: 600,
              fontSize: '1.1rem',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }
          }}
        />
      )}
      <CardContent sx={{ position: 'relative', zIndex: 1 }}>
        {children}
      </CardContent>
    </Card>
  );
}
