// src/components/widgets/ScoreWidget.jsx
import { Typography } from '@mui/material';
import WidgetShell from './WidgetShell';

export default function ScoreWidget() {
  return (
    <WidgetShell title="Disc Protection Score (placeholder)">
      <Typography variant="h3" fontWeight={800}>—</Typography>
      <Typography variant="body2" color="text.secondary">
        Coming soon: daily score based on logs & habits.
      </Typography>
    </WidgetShell>
  );
}
