import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Alert,
  CircularProgress,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormControlLabel,
  Checkbox,
  Rating,
  alpha,
} from '@mui/material';
import {
  Send,
  ArrowBack,
  Feedback as FeedbackIcon,
} from '@mui/icons-material';
import { useAuth } from '../context/AuthContext';
import feedbackService from '../services/feedback.service';
import '../styles/landing.css';

const FEEDBACK_TYPES = [
  { value: 'BUG_REPORT', label: 'Bug Report' },
  { value: 'FEATURE_REQUEST', label: 'Feature Request' },
  { value: 'GENERAL_FEEDBACK', label: 'General Feedback' },
  { value: 'OTHER', label: 'Other' },
];

const Feedback = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    feedbackType: 'GENERAL_FEEDBACK',
    subject: '',
    description: '',
    rating: null,
    contactRequested: false,
    email: '',
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');


  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));

    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: '',
      }));
    }

    if (submitError) {
      setSubmitError('');
    }
  };

  const handleRatingChange = (event, newValue) => {
    setFormData(prev => ({
      ...prev,
      rating: newValue,
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required';
    } else if (formData.subject.trim().length < 3) {
      newErrors.subject = 'Subject must be at least 3 characters';
    } else if (formData.subject.trim().length > 255) {
      newErrors.subject = 'Subject must be at most 255 characters';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    } else if (formData.description.trim().length < 10) {
      newErrors.description = 'Description must be at least 10 characters';
    } else if (formData.description.trim().length > 500) {
      newErrors.description = 'Description must be at most 500 characters';
    }

    // Email is required only if contactRequested is true
    if (formData.contactRequested && !formData.email.trim()) {
      newErrors.email = 'Email is required when contact is requested';
    } else if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);
    setSubmitError('');

    try {
      const feedbackPayload = {
        feedbackType: formData.feedbackType,
        subject: formData.subject.trim(),
        description: formData.description.trim(),
        rating: formData.rating || null,
        contactRequested: Boolean(formData.contactRequested),
        email: formData.email.trim() || null,
      };

      await feedbackService.submitFeedback(feedbackPayload);
      setSubmitSuccess(true);

      setTimeout(() => {
        setFormData({
          feedbackType: 'GENERAL_FEEDBACK',
          subject: '',
          description: '',
          rating: null,
          contactRequested: false,
          email: '',
        });
        setSubmitSuccess(false);
      }, 3000);

    } catch (error) {
      console.error('Failed to submit feedback:', error);
      setSubmitError(error.message || 'Failed to submit feedback. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Shared field styling
  const fieldStyle = {
    '& .MuiOutlinedInput-root': {
      color: 'white',
      backgroundColor: alpha('#ffffff', 0.05),
      borderRadius: 2,
      '& fieldset': {
        borderColor: 'rgba(255, 255, 255, 0.3)',
      },
      '&:hover fieldset': {
        borderColor: 'rgba(255, 255, 255, 0.5)',
      },
      '&.Mui-focused fieldset': {
        borderColor: '#4facfe',
      },
    },
    '& .MuiInputLabel-root': {
      color: 'rgba(255, 255, 255, 0.7)',
      '&.Mui-focused': {
        color: '#4facfe',
      },
    },
    '& .MuiFormHelperText-root': {
      color: 'rgba(255, 255, 255, 0.6)',
      fontSize: '0.75rem',
    },
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: `
          radial-gradient(circle at 20% 50%, rgba(120, 119, 198, 0.3) 0%, transparent 50%),
          radial-gradient(circle at 80% 20%, rgba(255, 119, 198, 0.3) 0%, transparent 50%),
          radial-gradient(circle at 40% 80%, rgba(120, 219, 255, 0.3) 0%, transparent 50%),
          linear-gradient(135deg, #0f0f23 0%, #1a1a2e 25%, #16213e 50%, #0f3460 75%, #533483 100%)
        `,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `
            radial-gradient(2px 2px at 20px 30px, rgba(255,255,255,0.3), transparent),
            radial-gradient(2px 2px at 40px 70px, rgba(255,255,255,0.2), transparent),
            radial-gradient(1px 1px at 90px 40px, rgba(255,255,255,0.4), transparent),
            radial-gradient(1px 1px at 130px 80px, rgba(255,255,255,0.3), transparent),
            radial-gradient(2px 2px at 160px 30px, rgba(255,255,255,0.2), transparent)
          `,
          backgroundRepeat: 'repeat',
          backgroundSize: '200px 200px',
          animation: 'sparkle 20s linear infinite',
          zIndex: 1,
        }}
      />

      <Container 
        maxWidth="sm" 
        sx={{ 
          py: { xs: 4, sm: 5 }, 
          px: { xs: 2, sm: 3 },
          position: 'relative', 
          zIndex: 2 
        }}
      >
        {/* Back Button */}
        <Box sx={{ mb: 3 }}>
          <Button
            variant="outlined"
            startIcon={<ArrowBack />}
            onClick={() => navigate(-1)}
            sx={{
              borderRadius: 2,
              borderColor: alpha('#ffffff', 0.3),
              color: 'white',
              textTransform: 'none',
              '&:hover': {
                borderColor: alpha('#ffffff', 0.5),
                backgroundColor: alpha('#ffffff', 0.1),
              },
            }}
          >
            Back
          </Button>
        </Box>

        {/* Header */}
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <FeedbackIcon
            sx={{
              fontSize: { xs: 48, sm: 56 },
              color: '#4facfe',
              mb: 2,
            }}
          />
          <Typography
            variant="h4"
            sx={{
              fontWeight: 700,
              mb: 1,
              fontSize: { xs: '1.75rem', sm: '2.25rem' },
              background: 'linear-gradient(135deg, #ffffff 0%, #a8edea 50%, #fed6e3 100%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Share Your Feedback
          </Typography>
          <Typography 
            variant="body1" 
            sx={{ 
              color: 'rgba(255, 255, 255, 0.8)',
              fontSize: { xs: '0.9rem', sm: '1rem' },
            }}
          >
            Help us improve Sphinic
          </Typography>
        </Box>

        {/* Alerts */}
        {submitSuccess && (
          <Alert
            severity="success"
            sx={{
              mb: 3,
              borderRadius: 2,
              backgroundColor: alpha('#4caf50', 0.15),
              border: `1px solid ${alpha('#4caf50', 0.3)}`,
              color: 'white',
            }}
          >
            Thank you for your feedback!
          </Alert>
        )}

        {submitError && (
          <Alert
            severity="error"
            sx={{
              mb: 3,
              borderRadius: 2,
              backgroundColor: alpha('#f44336', 0.15),
              border: `1px solid ${alpha('#f44336', 0.3)}`,
              color: 'white',
            }}
          >
            {submitError}
          </Alert>
        )}

        {/* Form Card */}
        <Paper
          elevation={0}
          sx={{
            p: { xs: 3, sm: 4 },
            borderRadius: 3,
            backgroundColor: alpha('#ffffff', 0.08),
            backdropFilter: 'blur(20px)',
            border: `1px solid ${alpha('#ffffff', 0.2)}`,
          }}
        >
          <form onSubmit={handleSubmit}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              
              {/* Feedback Type */}
              <FormControl fullWidth>
                <InputLabel sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                  Feedback Type
                </InputLabel>
                <Select
                  name="feedbackType"
                  value={formData.feedbackType}
                  onChange={handleChange}
                  label="Feedback Type"
                  sx={{
                    color: 'white',
                    ...fieldStyle['& .MuiOutlinedInput-root'],
                    '& .MuiSvgIcon-root': {
                      color: 'white',
                    },
                  }}
                >
                  {FEEDBACK_TYPES.map((type) => (
                    <MenuItem key={type.value} value={type.value}>
                      {type.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              {/* Subject */}
              <TextField
                fullWidth
                label="Subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                error={!!errors.subject}
                helperText={errors.subject}
                required
                sx={fieldStyle}
              />

              {/* Description */}
              <TextField
                fullWidth
                label="Description"
                name="description"
                multiline
                rows={5}
                value={formData.description}
                onChange={handleChange}
                error={!!errors.description}
                helperText={errors.description || `${formData.description.length}/500 characters`}
                required
                inputProps={{
                  maxLength: 500,
                }}
                sx={fieldStyle}
              />

              {/* Rating */}
              <Box>
                <Typography
                  variant="body2"
                  sx={{
                    color: 'rgba(255, 255, 255, 0.8)',
                    mb: 1.5,
                    fontWeight: 500,
                  }}
                >
                  Overall Satisfaction (Optional)
                </Typography>
                <Rating
                  name="rating"
                  value={formData.rating}
                  onChange={handleRatingChange}
                  size="large"
                  sx={{
                    '& .MuiRating-iconFilled': {
                      color: '#4facfe',
                    },
                    '& .MuiRating-iconEmpty': {
                      color: 'rgba(255, 255, 255, 0.3)',
                    },
                  }}
                />
              </Box>

              {/* Contact Preference */}
              <Box
                sx={{
                  p: 2,
                  borderRadius: 2,
                  backgroundColor: alpha('#ffffff', 0.05),
                  border: `1px solid ${alpha('#ffffff', 0.1)}`,
                }}
              >
                <FormControlLabel
                  control={
                    <Checkbox
                      name="contactRequested"
                      checked={formData.contactRequested}
                      onChange={handleChange}
                      sx={{
                        color: 'rgba(255, 255, 255, 0.7)',
                        '&.Mui-checked': {
                          color: '#4facfe',
                        },
                      }}
                    />
                  }
                  label="I'd like to be contacted about this feedback"
                  sx={{
                    color: 'rgba(255, 255, 255, 0.9)',
                    m: 0,
                  }}
                />
              </Box>
              
              {/* Email - show below checkbox when checked */}
              {formData.contactRequested && (
                <TextField
                  fullWidth
                  label="Email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  error={!!errors.email}
                  helperText={errors.email}
                  required
                  sx={fieldStyle}
                />
              )}

              {/* Submit Buttons */}
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: { xs: 'column', sm: 'row' },
                  gap: 2,
                  pt: 1,
                }}
              >
                <Button
                  variant="outlined"
                  onClick={() => navigate(-1)}
                  disabled={loading}
                  fullWidth
                  sx={{
                    borderRadius: 2,
                    borderColor: alpha('#ffffff', 0.3),
                    color: 'white',
                    textTransform: 'none',
                    py: 1.25,
                    '&:hover': {
                      borderColor: alpha('#ffffff', 0.5),
                      backgroundColor: alpha('#ffffff', 0.1),
                    },
                  }}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  disabled={loading}
                  fullWidth
                  startIcon={loading ? <CircularProgress size={20} sx={{ color: 'white' }} /> : <Send />}
                  sx={{
                    borderRadius: 2,
                    background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
                    textTransform: 'none',
                    py: 1.25,
                    fontWeight: 600,
                    boxShadow: '0 4px 15px rgba(79, 172, 254, 0.3)',
                    '&:hover': {
                      background: 'linear-gradient(135deg, #00f2fe 0%, #4facfe 100%)',
                      boxShadow: '0 6px 20px rgba(79, 172, 254, 0.4)',
                    },
                    '&:disabled': {
                      background: alpha('#ffffff', 0.1),
                      color: alpha('#ffffff', 0.5),
                    },
                  }}
                >
                  {loading ? 'Submitting...' : 'Submit Feedback'}
                </Button>
              </Box>
            </Box>
          </form>
        </Paper>
      </Container>
    </Box>
  );
};

export default Feedback;
