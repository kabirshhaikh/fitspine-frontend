import React, { useRef, useState, useEffect } from "react";
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
  Home,
  Add,
  Remove,
} from "@mui/icons-material";
import { useAuth } from "../../context/AuthContext";
import "../auth/Auth.css"; // Import Auth-specific CSS

const Register = () => {
  useEffect(() => {
    document.title = 'Register - Sphinic';
    window.scrollTo(0, 0);
  }, []);

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
    acceptedTerms: false,
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
  const { register, registerWithGoogle, loading, error, clearError } = useAuth();
  const googleBtnRef = useRef(null);

  // Initialize Google Sign-In button when script and client id are ready
  useEffect(() => {
    const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
    if (!clientId || !googleBtnRef.current) return;

    const initAndRender = () => {
      if (!window.google?.accounts?.id || !googleBtnRef.current) return false;
      try {
        window.google.accounts.id.initialize({
          client_id: clientId,
          callback: async (res) => {
            try {
              const result = await registerWithGoogle(res.credential);
              if (result?.needsProfileCompletion) {
                navigate("/complete-google-signup", { replace: true, state: { fromGoogleRegister: true } });
              } else {
                navigate("/dashboard", { replace: true });
              }
            } catch (_) {
              // error shown via AuthContext
            }
          },
        });
        window.google.accounts.id.renderButton(googleBtnRef.current, {
          type: "standard",
          theme: "filled_black",
          size: "large",
          text: "signup_with",
          width: 300,
        });
        return true;
      } catch (e) {
        console.warn("Google Sign-In init failed", e);
        return false;
      }
    };

    if (initAndRender()) return;
    const id = setInterval(() => { if (initAndRender()) clearInterval(id); }, 100);
    return () => clearInterval(id);
  }, [registerWithGoogle, navigate]);

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

    if (!formData.acceptedTerms) {
      newErrors.acceptedTerms = "You must accept the Terms of Service and Privacy Policy";
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
      fd.append("acceptedTerms", String(formData.acceptedTerms));

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
        alignItems: { xs: "flex-start", md: "center" },
        justifyContent: { xs: "flex-start", md: "center" },
        py: 4,
        pt: { xs: 2, md: 4 },
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
      <Container maxWidth="lg" className="auth-slide-from-top" sx={{ position: "relative", zIndex: 2 }}>
        {/* Back to Home Link */}
        <Link
          component={RouterLink}
          to="/"
          sx={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 1,
            color: 'rgba(255, 255, 255, 0.85)',
            textDecoration: 'none',
            fontSize: '0.95rem',
            mb: 3,
            padding: '8px 16px',
            borderRadius: '12px',
            background: 'rgba(255, 255, 255, 0.05)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            transition: 'all 0.3s ease',
            '&:hover': {
              color: 'white',
              background: 'rgba(255, 255, 255, 0.1)',
              borderColor: 'rgba(255, 255, 255, 0.2)',
              transform: 'translateX(-4px)',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
            },
          }}
        >
          <Home sx={{ fontSize: '1.1rem' }} />
          Home
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
              Your path to better spine health begins here
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
            {import.meta.env.VITE_GOOGLE_CLIENT_ID && (
              <Box sx={{ mb: 4, textAlign: "center" }}>
                <Typography variant="body2" sx={{ color: "rgba(255, 255, 255, 0.8)", mb: 1.5 }}>
                  Sign up using Google
                </Typography>
                <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
                  <div ref={googleBtnRef} />
                </Box>
                <Divider sx={{ my: 2, "&::before, &::after": { borderColor: "rgba(255,255,255,0.2)" } }}>
                  <Typography component="span" variant="body2" sx={{ color: "rgba(255,255,255,0.6)", px: 1 }}>or use the form below</Typography>
                </Divider>
              </Box>
            )}

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

              <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
                {/* Full Name */}
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

                {/* Email Address */}
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

                {/* Gender Dropdown - styled like injuries dropdown */}
                <FormControl fullWidth error={!!errors.gender}>
                  <InputLabel sx={{ color: "rgba(255, 255, 255, 0.7)" }}>
                    Gender
                  </InputLabel>
                  <Select
                    value={formData.gender}
                    onChange={handleChange}
                    name="gender"
                    label="Gender"
                    required
                    sx={{
                      borderRadius: "12px",
                      background: "rgba(255, 255, 255, 0.05)",
                      backdropFilter: "blur(10px)",
                      border: "1px solid rgba(255, 255, 255, 0.1)",
                      "& .MuiOutlinedInput-notchedOutline": {
                        border: "none",
                      },
                      "&:hover .MuiOutlinedInput-notchedOutline": {
                        border: "1px solid rgba(79, 195, 247, 0.3)",
                      },
                      "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                        border: "1px solid rgba(79, 195, 247, 0.5)",
                      },
                      "& .MuiSelect-select": {
                        color: "white",
                        padding: "16.5px 14px",
                      },
                      "& .MuiSvgIcon-root": {
                        color: "rgba(255, 255, 255, 0.7)",
                      },
                    }}
                  >
                    {GENDERS.map((gender) => (
                      <MenuItem key={gender} value={gender}>
                        {gender.replace("_", " ")}
                      </MenuItem>
                    ))}
                  </Select>
                  {errors.gender && (
                    <FormHelperText sx={{ color: "#f44336" }}>
                      {errors.gender}
                    </FormHelperText>
                  )}
                </FormControl>

                {/* Age */}
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

                {/* Profile Picture */}
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 2,
                    minHeight: 56,
                  }}
                >
                  <Typography
                    variant="body2"
                    sx={{ 
                      color: "rgba(255, 255, 255, 0.7)", 
                      whiteSpace: "nowrap",
                      minWidth: "fit-content",
                    }}
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
                    sx={{ 
                      minHeight: 56, 
                      borderRadius: "12px",
                      background: "rgba(255, 255, 255, 0.05)",
                      backdropFilter: "blur(10px)",
                      border: "1px solid rgba(255, 255, 255, 0.1)",
                      color: "rgba(255, 255, 255, 0.9)",
                      textTransform: "none",
                      "&:hover": {
                        background: "rgba(255, 255, 255, 0.1)",
                        border: "1px solid rgba(79, 195, 247, 0.3)",
                      },
                    }}
                  >
                    {formData.profilePicture
                      ? formData.profilePicture.name
                      : "Choose File"}
                  </Button>
                </Box>
              </Box>
            </Box>

            <Divider sx={{ my: 4 }} />

            {/* Account Security Section */}
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
                Account Security
              </Typography>

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
                        color: "rgba(255, 255, 255, 0.7)",
                        "&:hover": {
                          backgroundColor: "transparent",
                          color: "rgba(255, 255, 255, 0.9)",
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
            </Box>

            <Divider sx={{ my: 4 }} />

            {/* Preferences Section */}
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
                Preferences
              </Typography>

              <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                <FormControlLabel
                  control={
                    <Checkbox
                      name="surgeryHistory"
                      checked={formData.surgeryHistory}
                      onChange={handleChange}
                      sx={{
                        color: "rgba(79, 195, 247, 0.7)",
                        "&.Mui-checked": {
                          color: "#4fc3f7",
                        },
                        "& .MuiSvgIcon-root": {
                          fontSize: 28,
                        },
                      }}
                    />
                  }
                  label={
                    <Typography 
                      variant="body1" 
                      sx={{ 
                        fontWeight: 500,
                        color: "rgba(255, 255, 255, 0.9)",
                      }}
                    >
                      Surgery History
                    </Typography>
                  }
                  sx={{
                    p: 2.5,
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                    borderRadius: "12px",
                    background: "rgba(255, 255, 255, 0.05)",
                    backdropFilter: "blur(10px)",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      background: "rgba(255, 255, 255, 0.08)",
                      border: "1px solid rgba(79, 195, 247, 0.3)",
                      transform: "translateY(-2px)",
                      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
                    },
                  }}
                />

                <FormControlLabel
                  control={
                    <Checkbox
                      name="isResearchOpt"
                      checked={formData.isResearchOpt}
                      onChange={handleChange}
                      sx={{
                        color: "rgba(79, 195, 247, 0.7)",
                        "&.Mui-checked": {
                          color: "#4fc3f7",
                        },
                        "& .MuiSvgIcon-root": {
                          fontSize: 28,
                        },
                      }}
                    />
                  }
                  label={
                    <Typography 
                      variant="body1" 
                      sx={{ 
                        fontWeight: 500,
                        color: "rgba(255, 255, 255, 0.9)",
                      }}
                    >
                      Research Opt-in
                    </Typography>
                  }
                  sx={{
                    p: 2.5,
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                    borderRadius: "12px",
                    background: "rgba(255, 255, 255, 0.05)",
                    backdropFilter: "blur(10px)",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      background: "rgba(255, 255, 255, 0.08)",
                      border: "1px solid rgba(79, 195, 247, 0.3)",
                      transform: "translateY(-2px)",
                      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
                    },
                  }}
                />
              </Box>
            </Box>

            <Divider sx={{ my: 4 }} />

            {/* Medical Information Section */}
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
                Medical Information
              </Typography>

              {/* User Injuries Section */}
              <Box sx={{ mb: 4 }}>
                <Typography
                  variant="h6"
                  sx={{ 
                    mb: 2, 
                    color: "rgba(255, 255, 255, 0.9)", 
                    fontWeight: 600,
                    fontSize: "1.1rem",
                  }}
                >
                  Injuries
                </Typography>
                <FormControl fullWidth>
                  <InputLabel sx={{ color: "rgba(255, 255, 255, 0.7)" }}>
                    Select Injuries
                  </InputLabel>
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
                              backgroundColor: "#764ba2",
                              color: "white",
                              fontWeight: 500,
                            }}
                          />
                        ))}
                      </Box>
                    )}
                    MenuProps={{
                      PaperProps: {
                        sx: {
                          backgroundColor: "white",
                          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)",
                          borderRadius: "12px",
                          mt: 1,
                        },
                      },
                    }}
                    sx={{
                      borderRadius: "12px",
                      background: "rgba(255, 255, 255, 0.05)",
                      backdropFilter: "blur(10px)",
                      border: "1px solid rgba(255, 255, 255, 0.1)",
                      "& .MuiOutlinedInput-notchedOutline": {
                        border: "none",
                      },
                      "&:hover .MuiOutlinedInput-notchedOutline": {
                        border: "1px solid rgba(79, 195, 247, 0.3)",
                      },
                      "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                        border: "1px solid rgba(79, 195, 247, 0.5)",
                      },
                      "& .MuiSelect-select": {
                        color: "white",
                        padding: "16.5px 14px",
                      },
                      "& .MuiSvgIcon-root": {
                        color: "rgba(255, 255, 255, 0.7)",
                      },
                    }}
                  >
                    {INJURY_TYPE.map((type) => (
                      <MenuItem 
                        key={type} 
                        value={type}
                        sx={{
                          color: "#1a1a2e",
                          "&:hover": {
                            backgroundColor: "rgba(79, 195, 247, 0.1)",
                          },
                          "&.Mui-selected": {
                            backgroundColor: "rgba(79, 195, 247, 0.2)",
                            color: "#1a1a2e",
                            "&:hover": {
                              backgroundColor: "rgba(79, 195, 247, 0.3)",
                            },
                          },
                        }}
                      >
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
                  sx={{ 
                    mb: 2, 
                    color: "rgba(255, 255, 255, 0.9)", 
                    fontWeight: 600,
                    fontSize: "1.1rem",
                  }}
                >
                  Surgeries
                </Typography>
                <FormControl fullWidth>
                  <InputLabel sx={{ color: "rgba(255, 255, 255, 0.7)" }}>
                    Select Surgeries
                  </InputLabel>
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
                              backgroundColor: "#764ba2",
                              color: "white",
                              fontWeight: 500,
                            }}
                          />
                        ))}
                      </Box>
                    )}
                    MenuProps={{
                      PaperProps: {
                        sx: {
                          backgroundColor: "white",
                          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)",
                          borderRadius: "12px",
                          mt: 1,
                        },
                      },
                    }}
                    sx={{
                      borderRadius: "12px",
                      background: "rgba(255, 255, 255, 0.05)",
                      backdropFilter: "blur(10px)",
                      border: "1px solid rgba(255, 255, 255, 0.1)",
                      "& .MuiOutlinedInput-notchedOutline": {
                        border: "none",
                      },
                      "&:hover .MuiOutlinedInput-notchedOutline": {
                        border: "1px solid rgba(79, 195, 247, 0.3)",
                      },
                      "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                        border: "1px solid rgba(79, 195, 247, 0.5)",
                      },
                      "& .MuiSelect-select": {
                        color: "white",
                        padding: "16.5px 14px",
                      },
                      "& .MuiSvgIcon-root": {
                        color: "rgba(255, 255, 255, 0.7)",
                      },
                    }}
                  >
                    {SURGERY_TYPE.map((type) => (
                      <MenuItem 
                        key={type} 
                        value={type}
                        sx={{
                          color: "#1a1a2e",
                          "&:hover": {
                            backgroundColor: "rgba(118, 75, 162, 0.1)",
                          },
                          "&.Mui-selected": {
                            backgroundColor: "rgba(118, 75, 162, 0.2)",
                            color: "#1a1a2e",
                            "&:hover": {
                              backgroundColor: "rgba(118, 75, 162, 0.3)",
                            },
                          },
                        }}
                      >
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
                  sx={{ 
                    mb: 2, 
                    color: "rgba(255, 255, 255, 0.9)", 
                    fontWeight: 600,
                    fontSize: "1.1rem",
                  }}
                >
                  Disc Issues
                </Typography>
                <FormControl fullWidth>
                  <InputLabel sx={{ color: "rgba(255, 255, 255, 0.7)" }}>
                    Select Disc Levels
                  </InputLabel>
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
                              backgroundColor: "#764ba2",
                              color: "white",
                              fontWeight: 500,
                            }}
                          />
                        ))}
                      </Box>
                    )}
                    MenuProps={{
                      PaperProps: {
                        sx: {
                          backgroundColor: "white",
                          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)",
                          borderRadius: "12px",
                          mt: 1,
                        },
                      },
                    }}
                    sx={{
                      borderRadius: "12px",
                      background: "rgba(255, 255, 255, 0.05)",
                      backdropFilter: "blur(10px)",
                      border: "1px solid rgba(255, 255, 255, 0.1)",
                      "& .MuiOutlinedInput-notchedOutline": {
                        border: "none",
                      },
                      "&:hover .MuiOutlinedInput-notchedOutline": {
                        border: "1px solid rgba(79, 195, 247, 0.3)",
                      },
                      "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                        border: "1px solid rgba(79, 195, 247, 0.5)",
                      },
                      "& .MuiSelect-select": {
                        color: "white",
                        padding: "16.5px 14px",
                      },
                      "& .MuiSvgIcon-root": {
                        color: "rgba(255, 255, 255, 0.7)",
                      },
                    }}
                  >
                    {DISC_LEVEL.map((level) => (
                      <MenuItem 
                        key={level} 
                        value={level}
                        sx={{
                          color: "#1a1a2e",
                          "&:hover": {
                            backgroundColor: "rgba(0, 242, 254, 0.1)",
                          },
                          "&.Mui-selected": {
                            backgroundColor: "rgba(0, 242, 254, 0.2)",
                            color: "#1a1a2e",
                            "&:hover": {
                              backgroundColor: "rgba(0, 242, 254, 0.3)",
                            },
                          },
                        }}
                      >
                        {level.replace(/_/g, " ")}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>
            </Box>

            <Divider sx={{ my: 4 }} />

            {/* Terms and Privacy Acceptance Section */}
            <Box sx={{ mb: 4 }}>
              <Box
                sx={{
                  borderRadius: "12px",
                  background: errors.acceptedTerms 
                    ? "rgba(244, 67, 54, 0.1)" 
                    : "rgba(255, 255, 255, 0.05)",
                  backdropFilter: "blur(10px)",
                  border: errors.acceptedTerms 
                    ? "1px solid rgba(244, 67, 54, 0.5)" 
                    : "1px solid rgba(255, 255, 255, 0.1)",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    border: errors.acceptedTerms 
                      ? "1px solid rgba(244, 67, 54, 0.6)" 
                      : "1px solid rgba(79, 195, 247, 0.3)",
                  },
                  "&:focus-within": {
                    border: errors.acceptedTerms 
                      ? "1px solid rgba(244, 67, 54, 0.6)" 
                      : "1px solid rgba(79, 195, 247, 0.5)",
                  },
                }}
              >
                <FormControlLabel
                  control={
                    <Checkbox
                      name="acceptedTerms"
                      checked={formData.acceptedTerms}
                      onChange={handleChange}
                      required
                      sx={{
                        color: "rgba(79, 195, 247, 0.7)",
                        "&.Mui-checked": {
                          color: "#4fc3f7",
                        },
                        "& .MuiSvgIcon-root": {
                          fontSize: 28,
                        },
                      }}
                    />
                  }
                  label={
                    <Typography 
                      variant="body1" 
                      sx={{ 
                        color: "rgba(255, 255, 255, 0.9)",
                        fontWeight: 400,
                        lineHeight: 1.6,
                      }}
                    >
                      I accept the{" "}
                      <Link
                        component={RouterLink}
                        to="/terms"
                        sx={{
                          color: "#4fc3f7",
                          textDecoration: "none",
                          fontWeight: 600,
                          transition: "all 0.2s ease",
                          "&:hover": {
                            color: "#00f2fe",
                            textDecoration: "underline",
                            textShadow: "0 0 8px rgba(79, 195, 247, 0.5)",
                          },
                        }}
                      >
                        Terms of Service
                      </Link>
                      {" "}and{" "}
                      <Link
                        component={RouterLink}
                        to="/privacy"
                        sx={{
                          color: "#4fc3f7",
                          textDecoration: "none",
                          fontWeight: 600,
                          transition: "all 0.2s ease",
                          "&:hover": {
                            color: "#00f2fe",
                            textDecoration: "underline",
                            textShadow: "0 0 8px rgba(79, 195, 247, 0.5)",
                          },
                        }}
                      >
                        Privacy Policy
                      </Link>
                      <Typography
                        component="span"
                        sx={{
                          color: "#f44336",
                          ml: 0.5,
                          fontSize: "1.2rem",
                          verticalAlign: "middle",
                        }}
                      >
                        *
                      </Typography>
                    </Typography>
                  }
                  sx={{
                    p: "16.5px 14px",
                    m: 0,
                    width: "100%",
                    alignItems: "center",
                  }}
                />
              </Box>
              {errors.acceptedTerms && (
                <Typography 
                  variant="caption" 
                  sx={{ 
                    color: "#f44336", 
                    ml: 1.5, 
                    mt: 0.5, 
                    display: "block",
                    fontSize: "0.75rem",
                  }}
                >
                  {errors.acceptedTerms}
                </Typography>
              )}
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
              <Typography variant="body2" sx={{ color: "rgba(255, 255, 255, 0.8)" }}>
                Already have an account?{" "}
                <Link
                  component={RouterLink}
                  to="/login"
                  sx={{
                    color: "#4facfe",
                    textDecoration: "none",
                    fontWeight: 500,
                    "&:hover": {
                      color: "#00f2fe",
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
