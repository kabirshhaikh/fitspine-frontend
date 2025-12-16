import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box,
  Typography,
  IconButton,
  FormControl,
  FormControlLabel,
  FormGroup,
  Checkbox,
  RadioGroup,
  Radio,
  FormLabel,
  Chip,
  Stepper,
  Step,
  StepLabel,
  Paper,
  CircularProgress
} from '@mui/material';
import { 
  Close, 
  Mood, 
  FitnessCenter, 
  AccessTime, 
  Psychology,
  CheckCircle,
  ArrowForward,
  ArrowBack
} from '@mui/icons-material';
import dailyLogService from '../services/dailyLog.service';

const DailyLogModal = ({ open, onClose, onSave }) => {
  const [activeStep, setActiveStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [hasExistingLog, setHasExistingLog] = useState(false);
  const [formData, setFormData] = useState({
    notes: '',
    painLevel: '',
    flareUpToday: false,
    numbnessTingling: false,
    sittingTime: '',
    standingTime: '',
    stretchingDone: false,
    morningStiffness: '',
    stressLevel: '',
    liftingOrStrain: false,
    painLocations: [],
    sleepDuration: '',
    nightWakeUps: '',
    restingHeartRate: ''
  });

  // Helper function to get today's date in YYYY-MM-DD format
  const getTodayDate = () => {
    const today = new Date();
    return today.getFullYear() + '-' + 
      String(today.getMonth() + 1).padStart(2, '0') + '-' + 
      String(today.getDate()).padStart(2, '0');
  };

  // Fetch existing log when modal opens
  useEffect(() => {
    if (open) {
      // Reset to first step when modal opens
      setActiveStep(0);
      setHasExistingLog(false);
      
      const fetchExistingLog = async () => {
        setLoading(true);
        try {
          const todayDate = getTodayDate();
          const existingLog = await dailyLogService.getLogForDate(todayDate);
          
          // Mark that we have existing log
          setHasExistingLog(true);
          
          // Populate form with existing data
          setFormData({
            notes: existingLog.notes || '',
            painLevel: existingLog.painLevel || '',
            flareUpToday: existingLog.flareUpToday || false,
            numbnessTingling: existingLog.numbnessTingling || false,
            sittingTime: existingLog.sittingTime || '',
            standingTime: existingLog.standingTime || '',
            stretchingDone: existingLog.stretchingDone || false,
            morningStiffness: existingLog.morningStiffness || '',
            stressLevel: existingLog.stressLevel || '',
            liftingOrStrain: existingLog.liftingOrStrain || false,
            painLocations: existingLog.painLocations || [],
            sleepDuration: existingLog.sleepDuration || '',
            nightWakeUps: existingLog.nightWakeUps || '',
            restingHeartRate: existingLog.restingHeartRate || ''
          });
        } catch (error) {
          // 404 is expected when no log exists - show empty form
          if (error.response?.status !== 404) {
            console.error('Error fetching daily log:', error);
          }
          // Mark that we don't have existing log
          setHasExistingLog(false);
          // Reset to empty form if no log exists
          setFormData({
            notes: '',
            painLevel: '',
            flareUpToday: false,
            numbnessTingling: false,
            sittingTime: '',
            standingTime: '',
            stretchingDone: false,
            morningStiffness: '',
            stressLevel: '',
            liftingOrStrain: false,
            painLocations: [],
            sleepDuration: '',
            nightWakeUps: '',
            restingHeartRate: ''
          });
        } finally {
          setLoading(false);
        }
      };

      fetchExistingLog();
    }
  }, [open]);

  const steps = [
    { label: 'How do you feel?', icon: <Mood />, color: '#ff6b6b' },
    { label: 'Activity & Symptoms', icon: <FitnessCenter />, color: '#4facfe' },
    { label: 'Time & Notes', icon: <AccessTime />, color: '#667eea' }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };


  const handleSave = () => {
    // Get today's date in user's local timezone (YYYY-MM-DD format for LocalDate)
    const localDate = getTodayDate();
    
    // Validate and parse resting heart rate (must be between 30-120)
    let restingHeartRate = null;
    if (formData.restingHeartRate) {
      const parsed = parseInt(formData.restingHeartRate);
      if (!isNaN(parsed) && parsed >= 30 && parsed <= 120) {
        restingHeartRate = parsed;
      }
    }
    
    // Create log data matching your backend DTO
    const logData = {
      logDate: localDate, // User's local date
      notes: formData.notes,
      painLevel: formData.painLevel || null,
      flareUpToday: formData.flareUpToday,
      numbnessTingling: formData.numbnessTingling,
      sittingTime: formData.sittingTime || null,
      standingTime: formData.standingTime || null,
      stretchingDone: formData.stretchingDone,
      morningStiffness: formData.morningStiffness || null,
      stressLevel: formData.stressLevel || null,
      liftingOrStrain: formData.liftingOrStrain,
      painLocations: formData.painLocations,
      sleepDuration: formData.sleepDuration || null,
      nightWakeUps: formData.nightWakeUps || null,
      restingHeartRate: restingHeartRate,
      _isUpdate: hasExistingLog // Internal flag to indicate if this is an update
    };

    onSave(logData, hasExistingLog);
    // Don't reset form here - let useEffect handle it when modal reopens
    onClose();
  };

  const handleClose = () => {
    // Reset form
    setFormData({
      notes: '',
      painLevel: '',
      flareUpToday: false,
      numbnessTingling: false,
      sittingTime: '',
      standingTime: '',
      stretchingDone: false,
      morningStiffness: '',
      stressLevel: '',
      liftingOrStrain: false,
      painLocations: [],
      sleepDuration: '',
      nightWakeUps: '',
      restingHeartRate: ''
    });
    setActiveStep(0);
    onClose();
  };

  const handleNext = () => {
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const handleQuickSelect = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    // Auto-advance to next step for quick selection
    setTimeout(() => {
      if (activeStep < steps.length - 1) {
        handleNext();
      }
    }, 300);
  };

  const handlePainLocationToggle = (location) => {
    setFormData(prev => ({
      ...prev,
      painLocations: prev.painLocations.includes(location)
        ? prev.painLocations.filter(loc => loc !== location)
        : [...prev.painLocations, location]
    }));
  };


  const renderStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <Box sx={{ textAlign: 'center', py: 2 }}>
            <Typography variant="h5" sx={{ mb: 4, fontWeight: 600, color: '#ff6b6b' }}>
              How's your pain level today? 😊
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, flexWrap: 'wrap' }}>
              {[
                { value: 'NONE', label: '😌 None', color: '#4caf50' },
                { value: 'MILD', label: '😐 Mild', color: '#ff9800' },
                { value: 'MODERATE', label: '😟 Moderate', color: '#ff5722' },
                { value: 'SEVERE', label: '😰 Severe', color: '#f44336' }
              ].map((option) => (
                <Chip
                  key={option.value}
                  label={option.label}
                  onClick={() => handleQuickSelect('painLevel', option.value)}
                  variant={formData.painLevel === option.value ? 'filled' : 'outlined'}
                  sx={{
                    height: 60,
                    fontSize: '1.1rem',
                    fontWeight: 600,
                    background: formData.painLevel === option.value ? option.color : 'transparent',
                    border: `2px solid ${option.color}`,
                    color: formData.painLevel === option.value ? 'white' : option.color,
                    '&:hover': {
                      background: option.color,
                      color: 'white',
                      transform: 'scale(1.05)',
                    },
                    transition: 'all 0.2s ease',
                  }}
                />
              ))}
            </Box>
          </Box>
        );

      case 1:
        return (
          <Box sx={{ textAlign: 'center', py: 2 }}>
            <Typography variant="h5" sx={{ mb: 4, fontWeight: 600, color: '#4facfe' }}>
              Quick health check! 🏃‍♂️
            </Typography>
            
            <Box sx={{ mb: 4 }}>
              <Typography variant="h6" sx={{ mb: 2, color: '#ff6b6b' }}>Health check today</Typography>
              <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1, flexWrap: 'wrap' }}>
                {[
                  { field: 'flareUpToday', label: '🔥 Flare-up today?' },
                  { field: 'numbnessTingling', label: '⚡ Numbness/tingling?' }
                ].map((symptom) => (
                  <Chip
                    key={symptom.field}
                    label={symptom.label}
                    onClick={() => handleInputChange(symptom.field, !formData[symptom.field])}
                    variant={formData[symptom.field] ? 'filled' : 'outlined'}
                    sx={{
                      background: formData[symptom.field] ? '#ff6b6b' : 'transparent',
                      border: '2px solid #ff6b6b',
                      color: formData[symptom.field] ? 'white' : '#ff6b6b',
                      '&:hover': {
                        background: formData[symptom.field] ? '#ff5252' : '#ff6b6b',
                        color: 'white',
                        transform: 'scale(1.05)'
                      }
                    }}
                  />
                ))}
              </Box>
            </Box>

            <Box sx={{ mb: 4 }}>
              <Typography variant="h6" sx={{ mb: 2, color: '#4caf50' }}>Activities today</Typography>
              <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1, flexWrap: 'wrap' }}>
                {[
                  { field: 'stretchingDone', label: '🧘 Did you stretch?' },
                  { field: 'liftingOrStrain', label: '💪 Heavy lifting?' }
                ].map((activity) => (
                  <Chip
                    key={activity.field}
                    label={activity.label}
                    onClick={() => handleInputChange(activity.field, !formData[activity.field])}
                    variant={formData[activity.field] ? 'filled' : 'outlined'}
                    sx={{
                      background: formData[activity.field] ? '#4caf50' : 'transparent',
                      border: '2px solid #4caf50',
                      color: formData[activity.field] ? 'white' : '#4caf50',
                      '&:hover': {
                        background: formData[activity.field] ? '#45a049' : '#4caf50',
                        color: 'white',
                        transform: 'scale(1.05)'
                      }
                    }}
                  />
                ))}
              </Box>
            </Box>

            <Box sx={{ mb: 4 }}>
              <Typography variant="h6" sx={{ mb: 2, color: '#667eea' }}>Stress level?</Typography>
              <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1, flexWrap: 'wrap' }}>
                {[
                  { value: 'VERY_LOW', label: '😌 Very Low', color: '#4caf50' },
                  { value: 'LOW', label: '🙂 Low', color: '#8bc34a' },
                  { value: 'MODERATE', label: '😐 Moderate', color: '#ff9800' },
                  { value: 'HIGH', label: '😟 High', color: '#ff5722' },
                  { value: 'VERY_HIGH', label: '😰 Very High', color: '#f44336' }
                ].map((option) => (
                  <Chip
                    key={option.value}
                    label={option.label}
                    onClick={() => handleQuickSelect('stressLevel', option.value)}
                    variant={formData.stressLevel === option.value ? 'filled' : 'outlined'}
                    sx={{
                      background: formData.stressLevel === option.value ? option.color : 'transparent',
                      border: `2px solid ${option.color}`,
                      color: formData.stressLevel === option.value ? 'white' : option.color,
                      '&:hover': { background: option.color, color: 'white', transform: 'scale(1.05)' }
                    }}
                  />
                ))}
              </Box>
            </Box>

            <Box sx={{ mb: 4 }}>
              <Typography variant="h6" sx={{ mb: 2, color: '#9c27b0' }}>How much did you sleep? 😴</Typography>
              <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1, flexWrap: 'wrap' }}>
                {[
                  { value: 'LESS_THAN_5H', label: '😴 < 5h', color: '#f44336' },
                  { value: 'H5_TO_6', label: '😴 5-6h', color: '#ff9800' },
                  { value: 'H6_TO_7', label: '😴 6-7h', color: '#ffc107' },
                  { value: 'H7_TO_8', label: '😴 7-8h', color: '#4caf50' },
                  { value: 'MORE_THAN_8H', label: '😴 8h+', color: '#2196f3' }
                ].map((option) => (
                  <Chip
                    key={option.value}
                    label={option.label}
                    onClick={() => handleQuickSelect('sleepDuration', option.value)}
                    variant={formData.sleepDuration === option.value ? 'filled' : 'outlined'}
                    sx={{
                      background: formData.sleepDuration === option.value ? option.color : 'transparent',
                      border: `2px solid ${option.color}`,
                      color: formData.sleepDuration === option.value ? 'white' : option.color,
                      '&:hover': { background: option.color, color: 'white', transform: 'scale(1.05)' }
                    }}
                  />
                ))}
              </Box>
            </Box>

            <Box sx={{ mb: 4 }}>
              <Typography variant="h6" sx={{ mb: 2, color: '#9c27b0' }}>Night wake ups? 🌙</Typography>
              <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1, flexWrap: 'wrap' }}>
                {[
                  { value: 'NONE', label: '😴 None', color: '#4caf50' },
                  { value: 'ONE', label: '🌙 One', color: '#8bc34a' },
                  { value: 'TWO', label: '🌙 Two', color: '#ff9800' },
                  { value: 'THREE_OR_MORE', label: '🌙 3+', color: '#f44336' }
                ].map((option) => (
                  <Chip
                    key={option.value}
                    label={option.label}
                    onClick={() => handleQuickSelect('nightWakeUps', option.value)}
                    variant={formData.nightWakeUps === option.value ? 'filled' : 'outlined'}
                    sx={{
                      background: formData.nightWakeUps === option.value ? option.color : 'transparent',
                      border: `2px solid ${option.color}`,
                      color: formData.nightWakeUps === option.value ? 'white' : option.color,
                      '&:hover': { background: option.color, color: 'white', transform: 'scale(1.05)' }
                    }}
                  />
                ))}
              </Box>
            </Box>

            <Box sx={{ mb: 2 }}>
              <Typography variant="h6" sx={{ mb: 1, color: '#e91e63' }}>Resting heart rate 💓</Typography>
              <Typography variant="body2" sx={{ mb: 2, color: 'rgba(0, 0, 0, 0.6)', fontSize: '0.85rem' }}>
                If you know it through your phone or other app, enter it here (optional)
              </Typography>
              <TextField
                type="number"
                value={formData.restingHeartRate}
                onChange={(e) => {
                  const value = e.target.value;
                  // Allow empty string or any numeric input
                  if (value === '' || (!isNaN(value) && value >= 0 && value <= 999)) {
                    handleInputChange('restingHeartRate', value);
                  }
                }}
                error={
                  formData.restingHeartRate !== '' &&
                  formData.restingHeartRate !== null &&
                  formData.restingHeartRate !== undefined &&
                  (isNaN(parseInt(formData.restingHeartRate)) ||
                    parseInt(formData.restingHeartRate) < 30 ||
                    parseInt(formData.restingHeartRate) > 120)
                }
                helperText={
                  formData.restingHeartRate !== '' &&
                  formData.restingHeartRate !== null &&
                  formData.restingHeartRate !== undefined &&
                  (isNaN(parseInt(formData.restingHeartRate)) ||
                    parseInt(formData.restingHeartRate) < 30 ||
                    parseInt(formData.restingHeartRate) > 120)
                    ? 'Heart rate must be between 30 and 120 bpm'
                    : ''
                }
                placeholder="e.g., 65"
                inputProps={{ min: 30, max: 120 }}
                fullWidth
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 3,
                  }
                }}
              />
            </Box>
          </Box>
        );

      case 2:
        return (
          <Box sx={{ textAlign: 'center', py: 2 }}>
            <Typography variant="h5" sx={{ mb: 4, fontWeight: 600, color: '#667eea' }}>
              Almost done! ⏰
            </Typography>
            
            <Box sx={{ mb: 4 }}>
              <Typography variant="h6" sx={{ mb: 2, color: '#4facfe' }}>How much did you sit today?</Typography>
              <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1, flexWrap: 'wrap' }}>
                {[
                  { value: 'LESS_THAN_TWO_HOURS', label: '🚶‍♂️ < 2h' },
                  { value: 'TWO_TO_FOUR_HOURS', label: '🪑 2-4h' },
                  { value: 'FOUR_TO_SIX_HOURS', label: '💺 4-6h' },
                  { value: 'SIX_TO_EIGHT_HOURS', label: '🪑 6-8h' },
                  { value: 'GREATER_THAN_EIGHT_HOURS', label: '🪑 8h+' }
                ].map((option) => (
                  <Chip
                    key={option.value}
                    label={option.label}
                    onClick={() => handleQuickSelect('sittingTime', option.value)}
                    variant={formData.sittingTime === option.value ? 'filled' : 'outlined'}
                    sx={{
                      background: formData.sittingTime === option.value ? '#4facfe' : 'transparent',
                      border: '2px solid #4facfe',
                      color: formData.sittingTime === option.value ? 'white' : '#4facfe',
                      '&:hover': { background: '#4facfe', color: 'white' }
                    }}
                  />
                ))}
              </Box>
            </Box>

            <Box sx={{ mb: 4 }}>
              <Typography variant="h6" sx={{ mb: 2, color: '#667eea' }}>How much did you stand today?</Typography>
              <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1, flexWrap: 'wrap' }}>
                {[
                  { value: 'LESS_THAN_TWO_HOURS', label: '🪑 < 2h' },
                  { value: 'TWO_TO_FOUR_HOURS', label: '🚶‍♂️ 2-4h' },
                  { value: 'FOUR_TO_SIX_HOURS', label: '🏃‍♂️ 4-6h' },
                  { value: 'SIX_TO_EIGHT_HOURS', label: '🏃‍♂️ 6-8h' },
                  { value: 'GREATER_THAN_EIGHT_HOURS', label: '🏃‍♂️ 8h+' }
                ].map((option) => (
                  <Chip
                    key={option.value}
                    label={option.label}
                    onClick={() => handleQuickSelect('standingTime', option.value)}
                    variant={formData.standingTime === option.value ? 'filled' : 'outlined'}
                    sx={{
                      background: formData.standingTime === option.value ? '#667eea' : 'transparent',
                      border: '2px solid #667eea',
                      color: formData.standingTime === option.value ? 'white' : '#667eea',
                      '&:hover': { background: '#667eea', color: 'white' }
                    }}
                  />
                ))}
              </Box>
            </Box>

            <Box sx={{ mb: 4 }}>
              <Typography variant="h6" sx={{ mb: 2, color: '#ff9800' }}>Morning stiffness level?</Typography>
              <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1, flexWrap: 'wrap' }}>
                {[
                  { value: 'NONE', label: '😌 None', color: '#4caf50' },
                  { value: 'MILD', label: '😐 Mild', color: '#ff9800' },
                  { value: 'MODERATE', label: '😟 Moderate', color: '#ff5722' },
                  { value: 'SEVERE', label: '😰 Severe', color: '#f44336' }
                ].map((option) => (
                  <Chip
                    key={option.value}
                    label={option.label}
                    onClick={() => handleQuickSelect('morningStiffness', option.value)}
                    variant={formData.morningStiffness === option.value ? 'filled' : 'outlined'}
                    sx={{
                      background: formData.morningStiffness === option.value ? option.color : 'transparent',
                      border: `2px solid ${option.color}`,
                      color: formData.morningStiffness === option.value ? 'white' : option.color,
                      '&:hover': { 
                        background: option.color, 
                        color: 'white',
                        transform: 'scale(1.05)'
                      }
                    }}
                  />
                ))}
              </Box>
            </Box>

            <Box sx={{ mb: 4 }}>
              <Typography variant="h6" sx={{ mb: 2, color: '#ff9800' }}>Where did you feel pain?</Typography>
              <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1, flexWrap: 'wrap' }}>
                {[
                  { value: 'LOW_BACK', label: '🫥 Low Back', color: '#ff5722' },
                  { value: 'MID_BACK', label: '🫥 Mid Back', color: '#ff9800' },
                  { value: 'NECK', label: '🫥 Neck', color: '#ff5722' },
                  { value: 'LEG', label: '🦵 Leg', color: '#ff9800' },
                  { value: 'ARM', label: '💪 Arm', color: '#ff5722' },
                  { value: 'BUTTOCK', label: '🍑 Buttock', color: '#ff9800' },
                  { value: 'SHOULDER', label: '🤷‍♂️ Shoulder', color: '#ff5722' },
                  { value: 'OTHER', label: '❓ Other', color: '#9e9e9e' }
                ].map((location) => (
                  <Chip
                    key={location.value}
                    label={location.label}
                    onClick={() => handlePainLocationToggle(location.value)}
                    variant={formData.painLocations.includes(location.value) ? 'filled' : 'outlined'}
                    sx={{
                      background: formData.painLocations.includes(location.value) ? location.color : 'transparent',
                      border: `2px solid ${location.color}`,
                      color: formData.painLocations.includes(location.value) ? 'white' : location.color,
                      '&:hover': { 
                        background: location.color, 
                        color: 'white',
                        transform: 'scale(1.05)'
                      }
                    }}
                  />
                ))}
              </Box>
            </Box>

            <Box sx={{ mb: 4 }}>
              <Typography variant="h6" sx={{ mb: 2, color: '#667eea' }}>Quick note (optional)</Typography>
              <TextField
                multiline
                rows={2}
                value={formData.notes}
                onChange={(e) => handleInputChange('notes', e.target.value)}
                placeholder="How are you feeling? Any observations..."
                fullWidth
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 3,
                  }
                }}
              />
            </Box>
          </Box>
        );

      default:
        return null;
    }
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 4,
          background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)',
          boxShadow: '0 20px 60px rgba(0,0,0,0.1)',
        }
      }}
    >
      <DialogTitle>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              {steps[activeStep].icon}
              <Typography variant="h6" sx={{ fontWeight: 600, color: steps[activeStep].color }}>
                {steps[activeStep].label}
              </Typography>
            </Box>
            <Typography variant="body2" sx={{ color: 'rgba(0, 0, 0, 0.6)', ml: 5, fontSize: '0.85rem', fontWeight: 400 }}>
              {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
            </Typography>
          </Box>
          <IconButton onClick={handleClose} size="small">
            <Close />
          </IconButton>
        </Box>
        
        {/* Progress Stepper */}
        <Stepper activeStep={activeStep} sx={{ mt: 2 }}>
          {steps.map((step, index) => (
            <Step key={step.label}>
              <StepLabel 
                sx={{ 
                  '& .MuiStepLabel-label': { 
                    fontSize: '0.8rem',
                    color: index <= activeStep ? step.color : 'grey.400'
                  }
                }}
              >
                {step.label}
              </StepLabel>
            </Step>
          ))}
        </Stepper>
      </DialogTitle>

      <DialogContent sx={{ minHeight: 300, py: 3 }}>
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 200 }}>
            <CircularProgress sx={{ color: '#4facfe' }} />
          </Box>
        ) : (
          renderStepContent(activeStep)
        )}
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
          <Button
            onClick={handleBack}
            disabled={activeStep === 0 || loading}
            startIcon={<ArrowBack />}
            sx={{ color: 'grey.600' }}
          >
            Back
          </Button>
          
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button onClick={handleClose} disabled={loading} sx={{ color: 'grey.600' }}>
              Cancel
            </Button>
            {activeStep === steps.length - 1 ? (
              <Button
                onClick={handleSave}
                disabled={loading}
                variant="contained"
                endIcon={<CheckCircle />}
                sx={{
                  background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
                  borderRadius: 3,
                  px: 4,
                  fontWeight: 600,
                  '&:hover': {
                    background: 'linear-gradient(135deg, #00f2fe 0%, #4facfe 100%)',
                    transform: 'translateY(-1px)',
                  }
                }}
              >
                Save Log
              </Button>
            ) : (
              <Button
                onClick={handleNext}
                disabled={loading}
                variant="contained"
                endIcon={<ArrowForward />}
                sx={{
                  background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
                  borderRadius: 3,
                  px: 4,
                  fontWeight: 600,
                  '&:hover': {
                    background: 'linear-gradient(135deg, #00f2fe 0%, #4facfe 100%)',
                    transform: 'translateY(-1px)',
                  }
                }}
              >
                Next
              </Button>
            )}
          </Box>
        </Box>
      </DialogActions>
    </Dialog>
  );
};

export default DailyLogModal;
