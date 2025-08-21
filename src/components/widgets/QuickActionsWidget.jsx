// src/components/widgets/QuickActionsWidget.jsx
import { Stack, Button } from '@mui/material';
import WidgetShell from './WidgetShell';

export default function QuickActionsWidget() {
  return (
    <WidgetShell title="Quick Actions">
      <Stack direction="row" spacing={1} flexWrap="wrap">
        <Button variant="contained">Log Pain</Button>
        <Button variant="outlined">Add Stretch</Button>
        <Button variant="outlined">Start Sitting Timer</Button>
      </Stack>
    </WidgetShell>
  );
}

