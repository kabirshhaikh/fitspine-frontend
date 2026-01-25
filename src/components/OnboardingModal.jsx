import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  Stepper,
  Step,
  StepLabel,
  IconButton,
  alpha,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import {
  Close,
  WavingHand,
  Assessment,
  FitnessCenter,
  Psychology,
  ArrowForward,
  ArrowBack,
} from '@mui/icons-material';

const STEPS = [
  {
    label: 'Welcome',
    icon: WavingHand,
    title: "Welcome to Sphinic",
    body: "Track your spine health with personalized insights. We'll show you the basics in a few steps.",
  },
  {
    label: 'Daily Log',
    icon: Assessment,
    title: 'Start with Daily Log',
    body: "Log your pain, stiffness, and activity each day. This powers everything else—insights, trends, and recommendations.",
  },
  {
    label: 'Fitbit',
    icon: FitnessCenter,
    title: 'Connect Fitbit (optional)',
    body: 'Sync steps, sleep, and heart rate from your Fitbit for richer insights. You can skip this and log manually.',
  },
  {
    label: 'AI Insights',
    icon: Psychology,
    title: 'Get AI Insights',
    body: "After you've logged, use 'Generate Insights' to get personalized spine health analysis and recommendations.",
  },
];

export default function OnboardingModal({ open, onComplete, onSkip }) {
  const [activeStep, setActiveStep] = useState(0);
  const [completing, setCompleting] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const isLastStep = activeStep === STEPS.length - 1;
  const StepIcon = STEPS[activeStep]?.icon ?? WavingHand;

  const handleNext = () => {
    if (isLastStep) {
      handleComplete();
    } else {
      setActiveStep((s) => s + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((s) => Math.max(0, s - 1));
  };

  const handleComplete = async () => {
    if (completing) return;
    setCompleting(true);
    try {
      await onComplete();
    } finally {
      setCompleting(false);
    }
  };

  const handleSkip = async () => {
    if (completing) return;
    setCompleting(true);
    try {
      await onSkip();
    } finally {
      setCompleting(false);
    }
  };

  if (!open) return null;

  return (
    <Dialog
      open={open}
      onClose={handleSkip}
      fullScreen={isMobile}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          background: `
            radial-gradient(circle at 20% 50%, rgba(120, 119, 198, 0.3) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(255, 119, 198, 0.3) 0%, transparent 50%),
            radial-gradient(circle at 40% 80%, rgba(120, 219, 255, 0.3) 0%, transparent 50%),
            linear-gradient(135deg, #0f0f23 0%, #1a1a2e 25%, #16213e 50%, #0f3460 75%, #533483 100%)
          `,
          backdropFilter: 'blur(20px)',
          border: isMobile ? 'none' : `1px solid ${alpha('#ffffff', 0.2)}`,
          borderRadius: isMobile ? 0 : 4,
          margin: isMobile ? 0 : { xs: 2, sm: 3 },
          maxHeight: isMobile ? '100%' : 'calc(100% - 48px)',
        },
      }}
    >
      <DialogTitle
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          color: 'white',
          px: { xs: 2, sm: 3 },
          pt: { xs: 'max(16px, env(safe-area-inset-top, 0px))', sm: 2.5 },
          pb: 1,
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: 700, fontSize: { xs: '1rem', sm: '1.25rem' } }}>
          Get started
        </Typography>
        <IconButton
          onClick={handleSkip}
          sx={{
            color: 'rgba(255, 255, 255, 0.7)',
            minWidth: 44,
            minHeight: 44,
            '&:hover': { color: 'white', backgroundColor: 'rgba(255,255,255,0.08)' },
          }}
          disabled={completing}
          aria-label="Close"
        >
          <Close />
        </IconButton>
      </DialogTitle>

      <DialogContent
        sx={{
          px: { xs: 2, sm: 3 },
          py: { xs: 1.5, sm: 2 },
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          overflowY: 'auto',
        }}
      >
        <Stepper
          activeStep={activeStep}
          alternativeLabel
          sx={{
            mb: { xs: 2, sm: 3 },
            overflowX: 'auto',
            '& .MuiStepLabel-label': {
              color: 'rgba(255, 255, 255, 0.8)',
              fontSize: { xs: '0.7rem', sm: '0.875rem' },
              whiteSpace: 'normal',
              textAlign: 'center',
            },
            '& .MuiStepConnector-line': { borderColor: 'rgba(255,255,255,0.2)' },
          }}
        >
          {STEPS.map((s) => (
            <Step key={s.label}>
              <StepLabel>{s.label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        <Box
          sx={{
            textAlign: 'center',
            py: { xs: 1.5, sm: 2 },
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          {/* Icon on top of title */}
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: { xs: 1.5, sm: 2 } }}>
            <StepIcon
              sx={{
                fontSize: { xs: 44, sm: 56 },
                color: '#4facfe',
                mb: { xs: 1, sm: 1.5 },
                display: 'block',
              }}
            />
            <Typography
              variant="h5"
              sx={{
                color: 'white',
                fontWeight: 700,
                fontSize: { xs: '1.1rem', sm: '1.5rem' },
                lineHeight: 1.3,
              }}
            >
              {STEPS[activeStep]?.title}
            </Typography>
          </Box>
          <Typography
            variant="body1"
            sx={{
              color: 'rgba(255, 255, 255, 0.85)',
              lineHeight: 1.6,
              fontSize: { xs: '0.875rem', sm: '1rem' },
              px: { xs: 0.5, sm: 0 },
            }}
          >
            {STEPS[activeStep]?.body}
          </Typography>
        </Box>
      </DialogContent>

      <DialogActions
        sx={{
          px: { xs: 2, sm: 3 },
          py: { xs: 2, sm: 2.5 },
          pb: { xs: 'max(24px, env(safe-area-inset-bottom, 0px))', sm: 3 },
          gap: { xs: 1.5, sm: 1 },
          flexDirection: { xs: 'column', sm: 'row' },
          flexWrap: 'wrap',
        }}
      >
        <Button
          onClick={handleSkip}
          disabled={completing}
          fullWidth={isMobile}
          sx={{
            color: 'rgba(255, 255, 255, 0.7)',
            textTransform: 'none',
            minHeight: 44,
            order: { xs: 1, sm: 0 },
          }}
        >
          Skip
        </Button>
        <Box sx={{ flex: { xs: 'none', sm: 1 } }} />
        {activeStep > 0 && (
          <Button
            startIcon={<ArrowBack />}
            onClick={handleBack}
            disabled={completing}
            fullWidth={isMobile}
            sx={{
              color: 'white',
              textTransform: 'none',
              minHeight: 44,
              order: { xs: 2, sm: 0 },
            }}
          >
            Back
          </Button>
        )}
        <Button
          variant="contained"
          endIcon={isLastStep ? null : <ArrowForward />}
          onClick={handleNext}
          disabled={completing}
          fullWidth={isMobile}
          sx={{
            background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
            textTransform: 'none',
            fontWeight: 600,
            minHeight: 44,
            order: { xs: 3, sm: 0 },
            '&:hover': { background: 'linear-gradient(135deg, #00f2fe 0%, #4facfe 100%)' },
          }}
        >
          {completing ? '...' : isLastStep ? 'Get started' : 'Next'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
