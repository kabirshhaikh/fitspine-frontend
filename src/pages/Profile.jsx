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
  FormControlLabel,
  Checkbox,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  Avatar,
  Divider,
  Snackbar,
} from '@mui/material';
import {
  Save,
  Cancel,
  PhotoCamera,
  Visibility,
  VisibilityOff,
} from '@mui/icons-material';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';
import ProfileLayout from '../layout/ProfileLayout';

// Enums matching your backend
const WEARABLE_TYPES = ['FITBIT'];

const GENDERS = ["MALE", "FEMALE", "OTHER"];
  const DISC_LEVEL = [
    "C1_C2",
    "C2_C3",
    "C3_C4",
    "C4_C5",
    "C5_C6",
    "C6_C7",
    "C7_T1",
    "T1_T2",
    "T2_T3",
    "T3_T4",
    "T4_T5",
    "T5_T6",
    "T6_T7",
    "T7_T8",
    "T8_T9",
    "T9_T10",
    "T10_T11",
    "T11_T12",
    "T12_L1",
    "L1_L2",
    "L2_L3",
    "L3_L4",
    "L4_L5",
    "L5_S1",
    "OTHER",
  ];
  const INJURY_TYPE = [
    "HERNIATED_DISC",
    "BULGING_DISC",
    "SCIATICA",
    "SPINAL_STENOSIS",
    "DEGENERATIVE_DISC_DISEASE",
    "ANNULAR_TEAR",
    "FACET_JOINT_SYNDROME",
    "SPONDYLOLISTHESIS",
    "CERVICAL_RADICULOPATHY",
    "THORACIC_DISC_HERNIATION",
    "LUMBAR_RADICULOPATHY",
    "DISC_EXTRUSION",
    "DISC_SEQUESTRATION",
    "SPINAL_FRACTURE",
    "SPINAL_TUMOR",
    "SPINAL_INFECTION",
    "POST_SURGICAL_PAIN",
    "NON_SPECIFIC_LOWER_BACK_PAIN",
    "NON_SPECIFIC_NECK_PAIN",
    "OTHER",
  ];
  const SURGERY_TYPE = [
    "MICRODISCECTOMY",
    "LAMINECTOMY",
    "SPINAL_FUSION",
    "ARTIFICIAL_DISC_REPLACEMENT",
    "FORAMINOTOMY",
    "FACET_JOINT_FUSION",
    "VERTEBROPLASTY",
    "KYPHOPLASTY",
    "DISC_NUCLEOPLASTY",
    "DECOMPRESSION_SURGERY",
    "POSTERIOR_CERVICAL_FUSION",
    "ANTERIOR_CERVICAL_DISCECTOMY_FUSION",
    "ANTERIOR_LUMBAR_INTERBODY_FUSION",
    "LATERAL_LUMBAR_INTERBODY_FUSION",
    "POSTERIOR_LUMBAR_INTERBODY_FUSION",
    "TRANSFORAMINAL_LUMBAR_INTERBODY_FUSION",
    "SPINAL_TUMOR_REMOVAL",
    "SPINAL_DEFORMITY_CORRECTION",
    "SPINAL_REVISION_SURGERY",
    "OTHER",
  ];

const Profile = () => {
  const navigate = useNavigate();
  const { user, updateUserFromResponse } = useAuth();

  // Form state
  const [formData, setFormData] = useState({
    age: '',
    gender: '',
    profilePicture: null,
    surgeryHistory: false,
    isResearchOpt: false,
    isWearableConnected: false,
    wearableType: '',
    userInjuries: [],
    userSurgeries: [],
    userDiscIssues: [],
  });

  // UI state
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success',
  });
  const [userProfile, setUserProfile] = useState(null);

  // Load user data on component mount
  useEffect(() => {
    const loadUserProfile = async () => {
      if (user?.id) {
        setLoading(true);
        try {
          const response = await api.get('/api/user/me');
          const profileData = response.data;
          console.log(profileData);
          
          setUserProfile(profileData);
          setFormData({
            age: profileData.age || '',
            gender: profileData.gender || '',
            profilePicture: null,
            surgeryHistory: profileData.surgeryHistory || false,
            isResearchOpt: profileData.isResearchOpt || false,
            isWearableConnected: profileData.isWearableConnected || false,
            wearableType: profileData.wearableType || '',
            userInjuries: profileData.userInjuries?.map(injury => injury.injuryType) || [],
            userSurgeries: profileData.userSurgeries?.map(surgery => surgery.surgeryType) || [],
            userDiscIssues: profileData.userDiscIssues?.map(issue => issue.discLevel) || [],
          });
        } catch (error) {
          console.error('Failed to load user profile:', error);
          setSnackbar({
            open: true,
            message: 'Failed to load profile data. Please try again.',
            severity: 'error',
          });
        } finally {
          setLoading(false);
        }
      }
    };

    loadUserProfile();
  }, [user?.id]);

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));

    // Clear field-specific error
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  // Handle file upload
  const handleFileChange = (e) => {
    const file = e.target.files?.[0] || null;
    setFormData(prev => ({
      ...prev,
      profilePicture: file,
    }));
  };

  // Form validation
  const validateForm = () => {
    const newErrors = {};

    if (formData.age && (isNaN(formData.age) || parseInt(formData.age) < 0)) {
      newErrors.age = 'Age must be a valid non-negative number';
    }

    if (formData.isWearableConnected && !formData.wearableType) {
      newErrors.wearableType = 'Please select your wearable type';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      const formDataToSend = new FormData();
      
      // Add basic fields
      if (formData.age) formDataToSend.append('age', String(parseInt(formData.age, 10)));
      if (formData.gender) formDataToSend.append('gender', formData.gender);
      if (formData.profilePicture) formDataToSend.append('profilePicture', formData.profilePicture);
      
      formDataToSend.append('surgeryHistory', String(formData.surgeryHistory));
      formDataToSend.append('isResearchOpt', String(formData.isResearchOpt));
      formDataToSend.append('isWearableConnected', String(formData.isWearableConnected));
      
      if (formData.wearableType) formDataToSend.append('wearableType', formData.wearableType);

      // Add lists
      formData.userInjuries.forEach((injuryType, i) => {
        formDataToSend.append(`userInjuries[${i}].injuryType`, injuryType);
      });

      formData.userSurgeries.forEach((surgeryType, i) => {
        formDataToSend.append(`userSurgeries[${i}].surgeryType`, surgeryType);
      });

      formData.userDiscIssues.forEach((discLevel, i) => {
        formDataToSend.append(`userDiscIssues[${i}].discLevel`, discLevel);
      });

      // Debug: Log what we're sending
      console.log('Sending form data:', {
        age: formData.age,
        gender: formData.gender,
        surgeryHistory: formData.surgeryHistory,
        isResearchOpt: formData.isResearchOpt,
        isWearableConnected: formData.isWearableConnected,
        wearableType: formData.wearableType,
        userInjuries: formData.userInjuries,
        userSurgeries: formData.userSurgeries,
        userDiscIssues: formData.userDiscIssues
      });

      // Make API call
      const response = await api.put(`/api/user/${user.id}`, formDataToSend);
      
      // Debug: Log the response
      console.log('Update response:', response.data);
      
      // Update user context with new data
      updateUserFromResponse(response.data);
      
      // Refresh profile data to show updated information
      const refreshResponse = await api.get('/api/user/me');
      setUserProfile(refreshResponse.data);
      
      setSnackbar({
        open: true,
        message: 'Profile updated successfully!',
        severity: 'success',
      });

    } catch (error) {
      console.error('Profile update failed:', error);
      
      let errorMessage = 'Failed to update profile. Please try again.';
      if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      }
      
      setSnackbar({
        open: true,
        message: errorMessage,
        severity: 'error',
      });
    } finally {
      setLoading(false);
    }
  };

  // Handle cancel
  const handleCancel = () => {
    navigate('/dashboard');
  };

  // Close snackbar
  const handleCloseSnackbar = () => {
    setSnackbar(prev => ({ ...prev, open: false }));
  };

  if (!user) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <ProfileLayout>
      <Container maxWidth="lg" sx={{ py: 3 }}>
        {/* Header */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
            Profile Settings
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Update your personal information and preferences
          </Typography>
        </Box>

        {/* Snackbar for notifications */}
        <Snackbar
          open={snackbar.open}
          autoHideDuration={4000}
          onClose={handleCloseSnackbar}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
          <Alert
            elevation={6}
            variant="filled"
            onClose={handleCloseSnackbar}
            severity={snackbar.severity}
            sx={{ width: '100%' }}
          >
            {snackbar.message}
          </Alert>
        </Snackbar>

        <Paper
          elevation={0}
          sx={{
            p: { xs: 3, md: 4 },
            borderRadius: 3,
            border: '1px solid #E5E7EB',
          }}
        >
          <form onSubmit={handleSubmit}>
            {/* Profile Picture Section */}
            <Box sx={{ mb: 4 }}>
              <Typography variant="h6" sx={{ mb: 3, color: 'primary.main', fontWeight: 600 }}>
                Profile Picture
              </Typography>
              
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                <Avatar
                  src={userProfile?.profilePicture || user.profilePicture}
                  sx={{ width: 80, height: 80 }}
                >
                  {userProfile?.fullName?.charAt(0) || user.fullName?.charAt(0) || 'U'}
                </Avatar>
                
                <Box>
                  <input
                    accept="image/*"
                    id="profile-picture-upload"
                    type="file"
                    hidden
                    onChange={handleFileChange}
                  />
                  <label htmlFor="profile-picture-upload">
                    <Button
                      variant="outlined"
                      component="span"
                      startIcon={<PhotoCamera />}
                      sx={{ borderRadius: 2 }}
                    >
                      {formData.profilePicture ? formData.profilePicture.name : 'Choose New Photo'}
                    </Button>
                  </label>
                  {formData.profilePicture && (
                    <Typography variant="caption" display="block" sx={{ mt: 1, color: 'text.secondary' }}>
                      Selected: {formData.profilePicture.name}
                    </Typography>
                  )}
                </Box>
              </Box>
            </Box>

            <Divider sx={{ my: 4 }} />

            {/* Personal Information */}
            <Box sx={{ mb: 4 }}>
              <Typography variant="h6" sx={{ mb: 3, color: 'primary.main', fontWeight: 600 }}>
                Personal Information
              </Typography>

              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Age"
                    name="age"
                    type="number"
                    value={formData.age}
                    onChange={handleChange}
                    error={!!errors.age}
                    helperText={errors.age}
                    sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    select
                    label="Gender"
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                  >
                    {GENDERS.map((gender) => (
                      <MenuItem key={gender} value={gender}>
                        {gender.replace('_', ' ')}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
              </Grid>
            </Box>

            <Divider sx={{ my: 4 }} />

            {/* Preferences */}
            <Box sx={{ mb: 4 }}>
              <Typography variant="h6" sx={{ mb: 3, color: 'primary.main', fontWeight: 600 }}>
                Preferences
              </Typography>

              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        name="surgeryHistory"
                        checked={formData.surgeryHistory}
                        onChange={handleChange}
                        color="primary"
                      />
                    }
                    label="Surgery History"
                    sx={{
                      p: 2,
                      border: '1px solid #E5E7EB',
                      borderRadius: 2,
                      backgroundColor: 'background.default',
                    }}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        name="isResearchOpt"
                        checked={formData.isResearchOpt}
                        onChange={handleChange}
                        color="primary"
                      />
                    }
                    label="Research Opt-in"
                    sx={{
                      p: 2,
                      border: '1px solid #E5E7EB',
                      borderRadius: 2,
                      backgroundColor: 'background.default',
                    }}
                  />
                </Grid>
              </Grid>
            </Box>

            <Divider sx={{ my: 4 }} />

            {/* Wearable Integration */}
            <Box sx={{ mb: 4 }}>
              <Typography variant="h6" sx={{ mb: 3, color: 'primary.main', fontWeight: 600 }}>
                Wearable Integration
              </Typography>

              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        name="isWearableConnected"
                        checked={formData.isWearableConnected}
                        onChange={handleChange}
                        color="primary"
                      />
                    }
                    label="Connect Wearable Device"
                    sx={{
                      p: 2,
                      border: '1px solid #E5E7EB',
                      borderRadius: 2,
                      backgroundColor: 'background.default',
                    }}
                  />
                </Grid>

                {formData.isWearableConnected && (
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      select
                      label="Wearable Type"
                      name="wearableType"
                      value={formData.wearableType}
                      onChange={handleChange}
                      error={!!errors.wearableType}
                      helperText={errors.wearableType}
                      sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                    >
                      {WEARABLE_TYPES.map((type) => (
                        <MenuItem key={type} value={type}>
                          {type.replace('_', ' ')}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>
                )}
              </Grid>
            </Box>

            <Divider sx={{ my: 4 }} />

            {/* Medical Information */}
            <Box sx={{ mb: 4 }}>
              <Typography variant="h6" sx={{ mb: 3, color: 'primary.main', fontWeight: 600 }}>
                Medical Information
              </Typography>

              {/* Injuries */}
              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 600 }}>
                  Injuries
                </Typography>
                <FormControl fullWidth>
                  <InputLabel>Select Injuries</InputLabel>
                  <Select
                    multiple
                    value={formData.userInjuries}
                    onChange={(e) => setFormData(prev => ({ ...prev, userInjuries: e.target.value }))}
                    label="Select Injuries"
                    renderValue={(selected) => (
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                        {selected.map((value) => (
                          <Chip
                            key={value}
                            label={value.replace(/_/g, ' ')}
                            size="small"
                            sx={{ backgroundColor: 'primary.light', color: 'primary.contrastText' }}
                          />
                        ))}
                      </Box>
                    )}
                    sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                  >
                    {INJURY_TYPE.map((type) => (
                      <MenuItem key={type} value={type}>
                        {type.replace(/_/g, ' ')}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>

              {/* Surgeries */}
              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 600 }}>
                  Surgeries
                </Typography>
                <FormControl fullWidth>
                  <InputLabel>Select Surgeries</InputLabel>
                  <Select
                    multiple
                    value={formData.userSurgeries}
                    onChange={(e) => setFormData(prev => ({ ...prev, userSurgeries: e.target.value }))}
                    label="Select Surgeries"
                    renderValue={(selected) => (
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                        {selected.map((value) => (
                          <Chip
                            key={value}
                            label={value.replace(/_/g, ' ')}
                            size="small"
                            sx={{ backgroundColor: 'secondary.light', color: 'secondary.contrastText' }}
                          />
                        ))}
                      </Box>
                    )}
                    sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                  >
                    {SURGERY_TYPE.map((type) => (
                      <MenuItem key={type} value={type}>
                        {type.replace(/_/g, ' ')}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>

              {/* Disc Issues */}
              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 600 }}>
                  Disc Issues
                </Typography>
                <FormControl fullWidth>
                  <InputLabel>Select Disc Levels</InputLabel>
                  <Select
                    multiple
                    value={formData.userDiscIssues}
                    onChange={(e) => setFormData(prev => ({ ...prev, userDiscIssues: e.target.value }))}
                    label="Select Disc Levels"
                    renderValue={(selected) => (
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                        {selected.map((value) => (
                          <Chip
                            key={value}
                            label={value.replace(/_/g, ' ')}
                            size="small"
                            sx={{ backgroundColor: 'info.light', color: 'info.contrastText' }}
                          />
                        ))}
                      </Box>
                    )}
                    sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                  >
                    {DISC_LEVEL.map((level) => (
                      <MenuItem key={level} value={level}>
                        {level.replace(/_/g, ' ')}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>
            </Box>

            {/* Action Buttons */}
            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
              <Button
                variant="outlined"
                onClick={handleCancel}
                disabled={loading}
                sx={{ borderRadius: 2 }}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="contained"
                disabled={loading}
                startIcon={loading ? <CircularProgress size={20} /> : <Save />}
                sx={{ borderRadius: 2 }}
              >
                {loading ? 'Saving...' : 'Save Changes'}
              </Button>
            </Box>
          </form>
        </Paper>
      </Container>
    </ProfileLayout>
  );
};

export default Profile;
