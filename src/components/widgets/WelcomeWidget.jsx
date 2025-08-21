// src/components/widgets/WelcomeWidget.jsx
import { Typography } from '@mui/material';
import WidgetShell from './WidgetShell';

export default function WelcomeWidget() {
  return (
    <WidgetShell title="Welcome">
      <Typography variant="body1">
        This is your FitSpine dashboard. We’ll surface your spine routine, logs, and insights here.
      </Typography>
    </WidgetShell>
  );
}
