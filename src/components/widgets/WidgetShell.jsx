// src/components/widgets/WidgetShell.jsx
import { Card, CardContent, CardHeader } from '@mui/material';

export default function WidgetShell({ title, action, children }) {
  return (
    <Card elevation={0} variant="outlined" sx={{ borderRadius: 3 }}>
      {title && <CardHeader title={title} action={action} />}
      <CardContent>{children}</CardContent>
    </Card>
  );
}
