// src/pages/Dashboard.jsx
import { Grid } from "@mui/material";
import DashboardLayout from "../layout/DashboardLayout";
import WelcomeWidget from "../components/widgets/WelcomeWidget";
import QuickActionsWidget from "../components/widgets/QuickActionsWidget";
import ScoreWidget from "../components/widgets/ScoreWidget";
import LogsWidget from "../components/widgets/LogsWidget";

const widgets = [
  { id: "welcome", el: <WelcomeWidget />, size: { xs: 12, md: 8 } },
  { id: "score", el: <ScoreWidget />, size: { xs: 12, md: 4 } },
  { id: "actions", el: <QuickActionsWidget />, size: { xs: 12, md: 6 } },
  { id: "logs", el: <LogsWidget />, size: { xs: 12, md: 6 } },
  // ✨ In a few days: add more like { id: 'insights', el: <InsightsWidget/>, size: { xs:12, md:6 } }
];

export default function Dashboard() {
  return (
    <DashboardLayout>
      <Grid container spacing={2}>
        {widgets.map((w) => (
          <Grid key={w.id} item {...w.size}>
            {w.el}
          </Grid>
        ))}
      </Grid>
    </DashboardLayout>
  );
}
