import React, { useRef, useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import {
  Box,
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Link,
  Alert,
  CircularProgress,
  Grid,
  FormControlLabel,
  Checkbox,
  useTheme,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  OutlinedInput,
  FormHelperText,
  Divider,
  Snackbar,
} from "@mui/material";
import {
  HealthAndSafety,
  Visibility,
  VisibilityOff,
  Add,
  Remove,
} from "@mui/icons-material";
import { useAuth } from "../../context/AuthContext";
import "../auth/Auth.css"; // Import Auth-specific CSS

const Register = () => {
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

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    age: "",
    password: "",
    gender: "",
    profilePicture: null,
    surgeryHistory: false,
    isResearchOpt: false,
    userInjuries: [],
    userSurgeries: [],
    userDiscIssues: [],
  });

  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});

  const [snack, setSnack] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const timerRef = useRef(null);

  const theme = useTheme();
  const navigate = useNavigate();
  const { register, loading, error, clearError } = useAuth();

  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }

    // Clear auth error when user interacts with form
    if (error) {
      clearError();
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required";
    }

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.age) {
      newErrors.age = "Age is required";
    } else if (isNaN(formData.age) || parseInt(formData.age) < 0) {
      newErrors.age = "Age must be a valid non-negative number";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      newErrors.password =
        "Password must contain at least one uppercase letter, one lowercase letter, and one number";
    }

    if (!formData.gender) {
      newErrors.gender = "Gender is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const fd = new FormData();
      fd.append("fullName", formData.fullName.trim());
      fd.append("email", formData.email);
      fd.append("age", String(parseInt(formData.age, 10)));
      fd.append("password", formData.password);
      fd.append("gender", formData.gender);

      fd.append("surgeryHistory", String(formData.surgeryHistory));
      fd.append("isResearchOpt", String(formData.isResearchOpt));

      if (formData.profilePicture) {
        fd.append("profilePicture", formData.profilePicture); // MultipartFile
      }

      // ---- Lists (CRITICAL) ----
      // userInjuries: List<UserInjuryDto> with field "injuryType"
      formData.userInjuries.forEach((injuryType, i) => {
        fd.append(`userInjuries[${i}].injuryType`, injuryType);
      });

      // userSurgeries: List<UserSurgeryDto> with field "surgeryType"
      formData.userSurgeries.forEach((surgeryType, i) => {
        fd.append(`userSurgeries[${i}].surgeryType`, surgeryType);
      });

      // userDiscIssues: List<UserDiscIssueDto> with field "discLevel"
      formData.userDiscIssues.forEach((discLevel, i) => {
        fd.append(`userDiscIssues[${i}].discLevel`, discLevel);
      });

      await register(fd);
      setSnack({
        open: true,
        message: "Account created successfully! Please sign in",
        severity: "success",
      });

      timerRef.current = setTimeout(() => navigate("/login"), 1500);
    } catch (err) {
      console.error("Registration failed:", err);

      let apiMsg = "Registration failed. Please try again.";
      if (err.response) {
        // Backend responded with an error
        if (err.response.data?.message) {
          apiMsg = err.response.data.message;
        } else if (typeof err.response.data === "string") {
          apiMsg = err.response.data; // plain string body
        }
      } else if (err.request) {
        // Request was made but no response (network issue)
        apiMsg =
          "No response from server. Please check your internet connection.";
      } else {
        // Something else triggered the error
        apiMsg = err.message;
      }

      setSnack({
        open: true,
        message: apiMsg,
        severity: "error",
      });
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: `
          radial-gradient(circle at 20% 50%, rgba(120, 119, 198, 0.3) 0%, transparent 50%),
          radial-gradient(circle at 80% 20%, rgba(255, 119, 198, 0.3) 0%, transparent 50%),
          radial-gradient(circle at 40% 80%, rgba(120, 219, 255, 0.3) 0%, transparent 50%),
          linear-gradient(135deg, #0f0f23 0%, #1a1a2e 25%, #16213e 50%, #0f3460 75%, #533483 100%)
        `,
        display: "flex",
        alignItems: "center",
        py: 4,
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Animated Background Particles */}
      <Box
        sx={{
          position: "absolute",
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
          backgroundRepeat: "repeat",
          backgroundSize: "200px 200px",
          animation: "sparkle 20s linear infinite",
          zIndex: 1,
        }}
      />
      
      {/* Floating Orbs */}
      <Box
        sx={{
          position: "absolute",
          top: "10%",
          left: "10%",
          width: 300,
          height: 300,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(120, 119, 198, 0.1) 0%, transparent 70%)",
          animation: "float 15s ease-in-out infinite",
          filter: "blur(1px)",
        }}
      />
      <Box
        sx={{
          position: "absolute",
          bottom: "20%",
          right: "15%",
          width: 200,
          height: 200,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(255, 119, 198, 0.1) 0%, transparent 70%)",
          animation: "float 12s ease-in-out infinite reverse",
          filter: "blur(1px)",
        }}
      />
      <Box
        sx={{
          position: "absolute",
          top: "60%",
          left: "70%",
          width: 150,
          height: 150,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(120, 219, 255, 0.1) 0%, transparent 70%)",
          animation: "float 18s ease-in-out infinite",
          filter: "blur(1px)",
        }}
      />
      <Container maxWidth="lg" sx={{ position: "relative", zIndex: 2 }}>
        {/* Back to Home Link */}
        <Link
          component={RouterLink}
          to="/"
          sx={{
            display: 'inline-flex',
            alignItems: 'center',
            color: 'rgba(255, 255, 255, 0.8)',
            textDecoration: 'none',
            fontSize: '0.95rem',
            mb: 3,
            transition: 'all 0.3s ease',
            '&:hover': {
              color: 'white',
              transform: 'translateX(-4px)',
            },
          }}
        >
          ← Back to Home
        </Link>

        <Box sx={{ textAlign: "center", mb: 6 }}>
          <Box
            sx={{
              background: "rgba(255, 255, 255, 0.05)",
              backdropFilter: "blur(20px)",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              borderRadius: "24px",
              p: 4,
              mb: 4,
              boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)",
              position: "relative",
              overflow: "hidden",
              animation: "morphing 15s ease-in-out infinite",
              "&::before": {
                content: '""',
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                height: "1px",
                background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)",
              },
            }}
          >
            <HealthAndSafety
              sx={{
                fontSize: 80,
                color: "#4fc3f7",
                mb: 3,
                filter: "drop-shadow(0 0 20px rgba(79, 195, 247, 0.5))",
              }}
            />
            <Typography
              variant="h2"
              sx={{
                fontWeight: 900,
                mb: 2,
                background: "linear-gradient(135deg, #ffffff 0%, #a8edea 50%, #fed6e3 100%)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                textShadow: "0 0 30px rgba(255,255,255,0.3)",
                letterSpacing: "-0.02em",
                fontSize: { xs: "2.5rem", md: "3.5rem" },
              }}
            >
              Start Your Journey
            </Typography>
            <Typography
              variant="h6"
              sx={{
                color: "rgba(255, 255, 255, 0.8)",
                fontWeight: 300,
                fontSize: "1.2rem",
                textShadow: "0 2px 4px rgba(0,0,0,0.3)",
              }}
            >
              Join thousands of users protecting their spine health
            </Typography>
          </Box>
        </Box>

        <Snackbar
          open={snack.open}
          autoHideDuration={2000}
          onClose={() => setSnack((s) => ({ ...s, open: false }))}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        >
          <Alert
            elevation={6}
            variant="filled"
            onClose={() => setSnack((s) => ({ ...s, open: false }))}
            severity={snack.severity}
            sx={{ width: "100%" }}
          >
            {snack.message}
          </Alert>
        </Snackbar>

        <Paper
          elevation={0}
          sx={{
            p: { xs: 4, md: 6 },
            borderRadius: "24px",
            background: "rgba(255, 255, 255, 0.05)",
            backdropFilter: "blur(20px)",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)",
            position: "relative",
            overflow: "hidden",
            animation: "morphing 12s ease-in-out infinite",
            "&::before": {
              content: '""',
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: "1px",
              background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)",
            },
          }}
        >
          {error && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {error}
            </Alert>
          )}

          <form onSubmit={handleSubmit}>
            {/* Personal Information Section */}
            <Box sx={{ mb: 4 }}>
              <Typography
                variant="h5"
                sx={{ 
                  mb: 3, 
                  color: "#4fc3f7", 
                  fontWeight: 700,
                  textShadow: "0 2px 4px rgba(0,0,0,0.3)",
                  fontSize: "1.5rem",
                }}
              >
                Personal Information
              </Typography>

              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Full Name"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    error={!!errors.fullName}
                    helperText={errors.fullName}
                    required
                    autoComplete="name"
                    autoFocus
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: "12px",
                        background: "rgba(255, 255, 255, 0.05)",
                        backdropFilter: "blur(10px)",
                        border: "1px solid rgba(255, 255, 255, 0.1)",
                        "& fieldset": {
                          border: "none",
                        },
                        "&:hover fieldset": {
                          border: "1px solid rgba(79, 195, 247, 0.3)",
                        },
                        "&.Mui-focused fieldset": {
                          border: "1px solid rgba(79, 195, 247, 0.5)",
                        },
                      },
                      "& .MuiInputLabel-root": {
                        color: "rgba(255, 255, 255, 0.7)",
                      },
                      "& .MuiInputBase-input": {
                        color: "white",
                      },
                    }}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Email Address"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    error={!!errors.email}
                    helperText={errors.email}
                    required
                    autoComplete="email"
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: "12px",
                        background: "rgba(255, 255, 255, 0.05)",
                        backdropFilter: "blur(10px)",
                        border: "1px solid rgba(255, 255, 255, 0.1)",
                        "& fieldset": {
                          border: "none",
                        },
                        "&:hover fieldset": {
                          border: "1px solid rgba(79, 195, 247, 0.3)",
                        },
                        "&.Mui-focused fieldset": {
                          border: "1px solid rgba(79, 195, 247, 0.5)",
                        },
                      },
                      "& .MuiInputLabel-root": {
                        color: "rgba(255, 255, 255, 0.7)",
                      },
                      "& .MuiInputBase-input": {
                        color: "white",
                      },
                    }}
                  />
                </Grid>

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
                    required
                    autoComplete="age"
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: "12px",
                        background: "rgba(255, 255, 255, 0.05)",
                        backdropFilter: "blur(10px)",
                        border: "1px solid rgba(255, 255, 255, 0.1)",
                        "& fieldset": {
                          border: "none",
                        },
                        "&:hover fieldset": {
                          border: "1px solid rgba(79, 195, 247, 0.3)",
                        },
                        "&.Mui-focused fieldset": {
                          border: "1px solid rgba(79, 195, 247, 0.5)",
                        },
                      },
                      "& .MuiInputLabel-root": {
                        color: "rgba(255, 255, 255, 0.7)",
                      },
                      "& .MuiInputBase-input": {
                        color: "white",
                      },
                    }}
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
                    error={!!errors.gender}
                    helperText={errors.gender}
                    required
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: "12px",
                        background: "rgba(255, 255, 255, 0.05)",
                        backdropFilter: "blur(10px)",
                        border: "1px solid rgba(255, 255, 255, 0.1)",
                        "& fieldset": {
                          border: "none",
                        },
                        "&:hover fieldset": {
                          border: "1px solid rgba(79, 195, 247, 0.3)",
                        },
                        "&.Mui-focused fieldset": {
                          border: "1px solid rgba(79, 195, 247, 0.5)",
                        },
                      },
                      "& .MuiInputLabel-root": {
                        color: "rgba(255, 255, 255, 0.7)",
                      },
                      "& .MuiInputBase-input": {
                        color: "white",
                      },
                    }}
                  >
                    {GENDERS.map((gender) => (
                      <MenuItem key={gender} value={gender}>
                        {gender.replace("_", " ")}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
              </Grid>

              <Grid container spacing={3} sx={{ mt: 2 }}>
                <Grid item xs={12}>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 2,
                      height: 56,
                    }}
                  >
                    <Typography
                      variant="body2"
                      sx={{ color: "text.secondary", whiteSpace: "nowrap" }}
                    >
                      Profile Picture (Optional)
                    </Typography>

                    <input
                      accept="image/*"
                      id="profile-picture-upload"
                      type="file"
                      hidden
                      onChange={(e) => {
                        const file = e.target.files?.[0] || null;
                        setFormData((prev) => ({
                          ...prev,
                          profilePicture: file,
                        }));
                      }}
                    />
                    <Button
                      variant="outlined"
                      component="label"
                      htmlFor="profile-picture-upload"
                      sx={{ height: 56, borderRadius: 2 }}
                    >
                      {formData.profilePicture
                        ? formData.profilePicture.name
                        : "Choose File"}
                    </Button>
                  </Box>
                </Grid>
              </Grid>
            </Box>

            <Divider sx={{ my: 4 }} />

            {/* Account Security Section */}
            <Box sx={{ mb: 4 }}>
              <Typography
                variant="h5"
                sx={{ mb: 3, color: "primary.main", fontWeight: 600 }}
              >
                Account Security
              </Typography>

              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={handleChange}
                    error={!!errors.password}
                    helperText={errors.password}
                    required
                    autoComplete="new-password"
                    InputProps={{
                      endAdornment: (
                        <Button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          sx={{
                            minWidth: "auto",
                            p: 1,
                            color: "text.secondary",
                            "&:hover": {
                              backgroundColor: "transparent",
                            },
                          }}
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </Button>
                      ),
                    }}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: "12px",
                        background: "rgba(255, 255, 255, 0.05)",
                        backdropFilter: "blur(10px)",
                        border: "1px solid rgba(255, 255, 255, 0.1)",
                        "& fieldset": {
                          border: "none",
                        },
                        "&:hover fieldset": {
                          border: "1px solid rgba(79, 195, 247, 0.3)",
                        },
                        "&.Mui-focused fieldset": {
                          border: "1px solid rgba(79, 195, 247, 0.5)",
                        },
                      },
                      "& .MuiInputLabel-root": {
                        color: "rgba(255, 255, 255, 0.7)",
                      },
                      "& .MuiInputBase-input": {
                        color: "white",
                      },
                    }}
                  />
                </Grid>
              </Grid>
            </Box>

            <Divider sx={{ my: 4 }} />

            {/* Preferences Section */}
            <Box sx={{ mb: 4 }}>
              <Typography
                variant="h5"
                sx={{ mb: 3, color: "primary.main", fontWeight: 600 }}
              >
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
                    label={
                      <Typography variant="body1" sx={{ fontWeight: 500 }}>
                        Surgery History
                      </Typography>
                    }
                    sx={{
                      p: 2,
                      border: "1px solid #E5E7EB",
                      borderRadius: 2,
                      backgroundColor: "background.default",
                      "&:hover": {
                        backgroundColor: "action.hover",
                      },
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
                    label={
                      <Typography variant="body1" sx={{ fontWeight: 500 }}>
                        Research Opt-in
                      </Typography>
                    }
                    sx={{
                      p: 2,
                      border: "1px solid #E5E7EB",
                      borderRadius: 2,
                      backgroundColor: "background.default",
                      "&:hover": {
                        backgroundColor: "action.hover",
                      },
                    }}
                  />
                </Grid>
              </Grid>
            </Box>

            <Divider sx={{ my: 4 }} />

            {/* Medical Information Section */}
            <Box sx={{ mb: 4 }}>
              <Typography
                variant="h5"
                sx={{ mb: 3, color: "primary.main", fontWeight: 600 }}
              >
                Medical Information
              </Typography>

              {/* User Injuries Section */}
              <Box sx={{ mb: 4 }}>
                <Typography
                  variant="h6"
                  sx={{ mb: 2, color: "text.primary", fontWeight: 600 }}
                >
                  Injuries
                </Typography>
                <FormControl fullWidth>
                  <InputLabel>Select Injuries</InputLabel>
                  <Select
                    multiple
                    value={formData.userInjuries}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        userInjuries: e.target.value,
                      }))
                    }
                    label="Select Injuries"
                    renderValue={(selected) => (
                      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                        {selected.map((value) => (
                          <Chip
                            key={value}
                            label={value.replace(/_/g, " ")}
                            size="small"
                            sx={{
                              backgroundColor: "primary.light",
                              color: "primary.contrastText",
                            }}
                          />
                        ))}
                      </Box>
                    )}
                    sx={{
                      borderRadius: 2,
                      "& .MuiOutlinedInput-root": {
                        borderRadius: 2,
                      },
                    }}
                  >
                    {INJURY_TYPE.map((type) => (
                      <MenuItem key={type} value={type}>
                        {type.replace(/_/g, " ")}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>

              {/* User Surgeries Section */}
              <Box sx={{ mb: 4 }}>
                <Typography
                  variant="h6"
                  sx={{ mb: 2, color: "text.primary", fontWeight: 600 }}
                >
                  Surgeries
                </Typography>
                <FormControl fullWidth>
                  <InputLabel>Select Surgeries</InputLabel>
                  <Select
                    multiple
                    value={formData.userSurgeries}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        userSurgeries: e.target.value,
                      }))
                    }
                    label="Select Surgeries"
                    renderValue={(selected) => (
                      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                        {selected.map((value) => (
                          <Chip
                            key={value}
                            label={value.replace(/_/g, " ")}
                            size="small"
                            sx={{
                              backgroundColor: "secondary.light",
                              color: "secondary.contrastText",
                            }}
                          />
                        ))}
                      </Box>
                    )}
                    sx={{
                      borderRadius: 2,
                      "& .MuiOutlinedInput-root": {
                        borderRadius: 2,
                      },
                    }}
                  >
                    {SURGERY_TYPE.map((type) => (
                      <MenuItem key={type} value={type}>
                        {type.replace(/_/g, " ")}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>

              {/* User Disc Issues Section */}
              <Box sx={{ mb: 4 }}>
                <Typography
                  variant="h6"
                  sx={{ mb: 2, color: "text.primary", fontWeight: 600 }}
                >
                  Disc Issues
                </Typography>
                <FormControl fullWidth>
                  <InputLabel>Select Disc Levels</InputLabel>
                  <Select
                    multiple
                    value={formData.userDiscIssues}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        userDiscIssues: e.target.value,
                      }))
                    }
                    label="Select Disc Levels"
                    renderValue={(selected) => (
                      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                        {selected.map((value) => (
                          <Chip
                            key={value}
                            label={value.replace(/_/g, " ")}
                            size="small"
                            sx={{
                              backgroundColor: "info.light",
                              color: "info.contrastText",
                            }}
                          />
                        ))}
                      </Box>
                    )}
                    sx={{
                      borderRadius: 2,
                      "& .MuiOutlinedInput-root": {
                        borderRadius: 2,
                      },
                    }}
                  >
                    {DISC_LEVEL.map((level) => (
                      <MenuItem key={level} value={level}>
                        {level.replace(/_/g, " ")}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>
            </Box>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              size="large"
              disabled={loading}
              sx={{
                py: 2,
                fontSize: "1.2rem",
                textTransform: "none",
                fontWeight: 600,
                mb: 3,
                borderRadius: "50px",
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                boxShadow: "0 10px 40px rgba(102, 126, 234, 0.4)",
                border: "1px solid rgba(255, 255, 255, 0.2)",
                position: "relative",
                overflow: "hidden",
                transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                zIndex: 1,
                cursor: "pointer",
                "&::before": {
                  content: '""',
                  position: "absolute",
                  top: 0,
                  left: "-100%",
                  width: "100%",
                  height: "100%",
                  background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)",
                  transition: "left 0.5s",
                  zIndex: -1,
                  pointerEvents: "none",
                },
                "&:hover": {
                  transform: "translateY(-3px) scale(1.02)",
                  boxShadow: "0 20px 60px rgba(102, 126, 234, 0.6)",
                  background: "linear-gradient(135deg, #764ba2 0%, #667eea 100%)",
                  "&::before": {
                    left: "100%",
                  },
                },
              }}
            >
              {loading ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                "Create Account"
              )}
            </Button>

            <Box sx={{ textAlign: "center" }}>
              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                Already have an account?{" "}
                <Link
                  component={RouterLink}
                  to="/login"
                  sx={{
                    color: "primary.main",
                    textDecoration: "none",
                    fontWeight: 500,
                    "&:hover": {
                      textDecoration: "underline",
                    },
                  }}
                >
                  Sign in
                </Link>
              </Typography>
            </Box>
          </form>
        </Paper>

        <Box sx={{ textAlign: "center", mt: 4 }}>
          <Typography variant="body2" sx={{ color: "text.secondary", mb: 2 }}>
            By creating an account, you'll get:
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              gap: 3,
              flexWrap: "wrap",
            }}
          >
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              ✓ Personalized spine routines
            </Typography>
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              ✓ Flare-up tracking
            </Typography>
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              ✓ Sitting timer reminders
            </Typography>
          </Box>
        </Box>
      </Container>

      {/* CSS Animations */}
      <style>
        {`
          @keyframes float {
            0%, 100% { transform: translateY(0px) rotate(0deg); }
            50% { transform: translateY(-30px) rotate(5deg); }
          }
          
          @keyframes sparkle {
            0% { transform: translateX(0) translateY(0); }
            25% { transform: translateX(100px) translateY(-50px); }
            50% { transform: translateX(-50px) translateY(100px); }
            75% { transform: translateX(50px) translateY(-25px); }
            100% { transform: translateX(0) translateY(0); }
          }
          
          @keyframes morphing {
            0%, 100% { 
              border-radius: 24px;
              transform: rotate(0deg);
            }
            25% { 
              border-radius: 30px;
              transform: rotate(1deg);
            }
            50% { 
              border-radius: 18px;
              transform: rotate(-1deg);
            }
            75% { 
              border-radius: 28px;
              transform: rotate(0.5deg);
            }
          }
          
          /* Smooth scrolling */
          html {
            scroll-behavior: smooth;
          }
          
          /* Custom scrollbar */
          ::-webkit-scrollbar {
            width: 8px;
          }
          
          ::-webkit-scrollbar-track {
            background: rgba(255, 255, 255, 0.1);
          }
          
          ::-webkit-scrollbar-thumb {
            background: linear-gradient(135deg, #667eea, #764ba2);
            border-radius: 4px;
          }
          
          ::-webkit-scrollbar-thumb:hover {
            background: linear-gradient(135deg, #764ba2, #667eea);
          }
        `}
      </style>
    </Box>
  );
};

export default Register;
