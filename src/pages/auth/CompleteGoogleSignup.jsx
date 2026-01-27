import React, { useState, useEffect } from "react";
import { Link as RouterLink, useNavigate, useLocation } from "react-router-dom";
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
  FormControlLabel,
  Checkbox,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  Divider,
  Snackbar,
  FormHelperText,
} from "@mui/material";
import { HealthAndSafety, Home } from "@mui/icons-material";
import { useAuth } from "../../context/AuthContext";
import authService from "../../services/auth.service";
import "../auth/Auth.css";

const GENDERS = ["MALE", "FEMALE", "OTHER"];
const DISC_LEVEL = [
  "C1_C2", "C2_C3", "C3_C4", "C4_C5", "C5_C6", "C6_C7", "C7_T1", "T1_T2", "T2_T3", "T3_T4", "T4_T5", "T5_T6", "T6_T7", "T7_T8", "T8_T9", "T9_T10", "T10_T11", "T11_T12", "T12_L1", "L1_L2", "L2_L3", "L3_L4", "L4_L5", "L5_S1", "OTHER",
];
const INJURY_TYPE = [
  "HERNIATED_DISC", "BULGING_DISC", "SCIATICA", "SPINAL_STENOSIS", "DEGENERATIVE_DISC_DISEASE", "ANNULAR_TEAR", "FACET_JOINT_SYNDROME", "SPONDYLOLISTHESIS", "CERVICAL_RADICULOPATHY", "THORACIC_DISC_HERNIATION", "LUMBAR_RADICULOPATHY", "DISC_EXTRUSION", "DISC_SEQUESTRATION", "SPINAL_FRACTURE", "SPINAL_TUMOR", "SPINAL_INFECTION", "POST_SURGICAL_PAIN", "NON_SPECIFIC_LOWER_BACK_PAIN", "NON_SPECIFIC_NECK_PAIN", "OTHER",
];
const SURGERY_TYPE = [
  "MICRODISCECTOMY", "LAMINECTOMY", "SPINAL_FUSION", "ARTIFICIAL_DISC_REPLACEMENT", "FORAMINOTOMY", "FACET_JOINT_FUSION", "VERTEBROPLASTY", "KYPHOPLASTY", "DISC_NUCLEOPLASTY", "DECOMPRESSION_SURGERY", "POSTERIOR_CERVICAL_FUSION", "ANTERIOR_CERVICAL_DISCECTOMY_FUSION", "ANTERIOR_LUMBAR_INTERBODY_FUSION", "LATERAL_LUMBAR_INTERBODY_FUSION", "POSTERIOR_LUMBAR_INTERBODY_FUSION", "TRANSFORAMINAL_LUMBAR_INTERBODY_FUSION", "SPINAL_TUMOR_REMOVAL", "SPINAL_DEFORMITY_CORRECTION", "SPINAL_REVISION_SURGERY", "OTHER",
];

const inputSx = {
  "& .MuiOutlinedInput-root": {
    borderRadius: "12px",
    background: "rgba(255, 255, 255, 0.05)",
    backdropFilter: "blur(10px)",
    border: "1px solid rgba(255, 255, 255, 0.1)",
    "& fieldset": { border: "none" },
    "&:hover fieldset": { border: "1px solid rgba(79, 195, 247, 0.3)" },
    "&.Mui-focused fieldset": { border: "1px solid rgba(79, 195, 247, 0.5)" },
  },
  "& .MuiInputLabel-root": { color: "rgba(255, 255, 255, 0.7)" },
  "& .MuiInputBase-input": { color: "white" },
};
const selectSx = {
  borderRadius: "12px",
  background: "rgba(255, 255, 255, 0.05)",
  border: "1px solid rgba(255, 255, 255, 0.1)",
  "& .MuiOutlinedInput-notchedOutline": { border: "none" },
  "&:hover .MuiOutlinedInput-notchedOutline": { border: "1px solid rgba(79, 195, 247, 0.3)" },
  "&.Mui-focused .MuiOutlinedInput-notchedOutline": { border: "1px solid rgba(79, 195, 247, 0.5)" },
  "& .MuiSelect-select": { color: "white", padding: "16.5px 14px" },
  "& .MuiSvgIcon-root": { color: "rgba(255, 255, 255, 0.7)" },
};
const sectionTitleSx = {
  mb: 3,
  color: "#4fc3f7",
  fontWeight: 700,
  textShadow: "0 2px 4px rgba(0,0,0,0.3)",
  fontSize: "1.5rem",
};

const CompleteGoogleSignup = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, loading, error, clearError, completeGoogleProfile, updateUser } = useAuth();

  const [formData, setFormData] = useState({
    age: "",
    gender: "",
    profilePicture: null,
    surgeryHistory: false,
    isResearchOpt: false,
    acceptedTerms: false,
    userInjuries: [],
    userSurgeries: [],
    userDiscIssues: [],
  });
  const [errors, setErrors] = useState({});
  const [snack, setSnack] = useState({ open: false, message: "", severity: "success" });

  useEffect(() => {
    document.title = "Complete your profile - Sphinic";
    window.scrollTo(0, 0);
  }, []);

  // Guard: must be logged in and need profile completion. If we just came from Google register, context may not have updated yet — sync from localStorage.
  useEffect(() => {
    const effectiveUser = user ?? (location.state?.fromGoogleRegister ? authService.getCurrentUser() : null);
    if (!effectiveUser) {
      navigate("/login", { replace: true });
      return;
    }
    if (!effectiveUser.needsProfileCompletion) {
      navigate("/dashboard", { replace: true });
      return;
    }
    if (!user && effectiveUser) {
      updateUser(effectiveUser);
    }
  }, [user, location.state?.fromGoogleRegister, navigate, updateUser]);

  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
    if (error) clearError();
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.age) newErrors.age = "Age is required";
    else if (isNaN(formData.age) || parseInt(formData.age, 10) < 0) newErrors.age = "Age must be a valid non-negative number";
    if (!formData.gender) newErrors.gender = "Gender is required";
    if (!formData.acceptedTerms) newErrors.acceptedTerms = "You must accept the Terms of Service and Privacy Policy";
    if (!formData.surgeryHistory && formData.userSurgeries?.length > 0) {
      newErrors.userSurgeries = "Clear surgeries or check surgery history";
    }
    if (formData.surgeryHistory && (!formData.userSurgeries || formData.userSurgeries.length === 0)) {
      newErrors.userSurgeries = "At least one surgery is required when you have surgery history";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    try {
      const fd = new FormData();
      fd.append("age", String(parseInt(formData.age, 10)));
      fd.append("gender", formData.gender);
      if (formData.profilePicture) {
        fd.append("profilePicture", formData.profilePicture);
      }
      fd.append("surgeryHistory", String(formData.surgeryHistory));
      fd.append("isResearchOpt", String(formData.isResearchOpt));
      fd.append("acceptedTerms", String(formData.acceptedTerms));
      (formData.userInjuries || []).forEach((v, i) => fd.append(`userInjuries[${i}].injuryType`, v));
      (formData.userSurgeries || []).forEach((v, i) => fd.append(`userSurgeries[${i}].surgeryType`, v));
      (formData.userDiscIssues || []).forEach((v, i) => fd.append(`userDiscIssues[${i}].discLevel`, v));
      await completeGoogleProfile(fd);
      setSnack({ open: true, message: "Profile completed. Taking you to the dashboard…", severity: "success" });
      setTimeout(() => navigate("/dashboard", { replace: true }), 1000);
    } catch (err) {
      const apiMsg = err.response?.data?.message || err.message || "Could not complete profile. Please try again.";
      setSnack({ open: true, message: apiMsg, severity: "error" });
    }
  };

  const effectiveUser = user ?? (location.state?.fromGoogleRegister ? authService.getCurrentUser() : null);
  if (!effectiveUser || !effectiveUser.needsProfileCompletion) {
    return null;
  }

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
      <Box
        sx={{
          position: "absolute", top: 0, left: 0, right: 0, bottom: 0,
          background: `radial-gradient(2px 2px at 20px 30px, rgba(255,255,255,0.3), transparent), radial-gradient(2px 2px at 40px 70px, rgba(255,255,255,0.2), transparent)`,
          backgroundRepeat: "repeat", backgroundSize: "200px 200px", animation: "sparkle 20s linear infinite", zIndex: 1,
        }}
      />
      <Container maxWidth="md" className="auth-slide-from-top" sx={{ position: "relative", zIndex: 2 }}>
        <Link component={RouterLink} to="/" sx={{ display: "inline-flex", alignItems: "center", gap: 1, color: "rgba(255,255,255,0.85)", textDecoration: "none", fontSize: "0.95rem", mb: 3, padding: "8px 16px", borderRadius: "12px", background: "rgba(255,255,255,0.05)", backdropFilter: "blur(10px)", border: "1px solid rgba(255,255,255,0.1)", "&:hover": { color: "white", background: "rgba(255,255,255,0.1)" } }}>
          <Home sx={{ fontSize: "1.1rem" }} /> Home
        </Link>
        <Box sx={{ textAlign: "center", mb: 4 }}>
          <HealthAndSafety sx={{ fontSize: 64, color: "#4fc3f7", mb: 2, filter: "drop-shadow(0 0 20px rgba(79, 195, 247, 0.5))" }} />
          <Typography variant="h4" sx={{ fontWeight: 700, mb: 1, background: "linear-gradient(135deg, #ffffff 0%, #a8edea 50%, #fed6e3 100%)", backgroundClip: "text", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            Complete your profile
          </Typography>
          <Typography variant="body1" sx={{ color: "rgba(255,255,255,0.8)" }}>
            Add a few details so we can personalize your spine health experience.
          </Typography>
        </Box>
        <Snackbar open={snack.open} autoHideDuration={4000} onClose={() => setSnack((s) => ({ ...s, open: false }))} anchorOrigin={{ vertical: "bottom", horizontal: "center" }}>
          <Alert elevation={6} variant="filled" onClose={() => setSnack((s) => ({ ...s, open: false }))} severity={snack.severity}>{snack.message}</Alert>
        </Snackbar>
        <Paper elevation={0} sx={{ p: { xs: 4, md: 5 }, borderRadius: "24px", background: "rgba(255,255,255,0.05)", backdropFilter: "blur(20px)", border: "1px solid rgba(255,255,255,0.1)", boxShadow: "0 8px 32px rgba(0,0,0,0.3)" }}>
          {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}
          <form onSubmit={handleSubmit}>
            <Typography variant="h5" sx={sectionTitleSx}>Personal Information</Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mb: 4 }}>
              <FormControl fullWidth error={!!errors.gender}>
                <InputLabel sx={{ color: "rgba(255,255,255,0.7)" }}>Gender</InputLabel>
                <Select value={formData.gender} onChange={handleChange} name="gender" label="Gender" required sx={selectSx}>
                  {GENDERS.map((g) => <MenuItem key={g} value={g}>{g.replace("_", " ")}</MenuItem>)}
                </Select>
                {errors.gender && <FormHelperText sx={{ color: "#f44336" }}>{errors.gender}</FormHelperText>}
              </FormControl>
              <TextField fullWidth label="Age" name="age" type="number" value={formData.age} onChange={handleChange} error={!!errors.age} helperText={errors.age} required autoComplete="age" sx={inputSx} />
              <Box sx={{ display: "flex", alignItems: "center", gap: 2, minHeight: 56 }}>
                <Typography variant="body2" sx={{ color: "rgba(255, 255, 255, 0.7)", whiteSpace: "nowrap", minWidth: "fit-content" }}>
                  Profile Picture (Optional)
                </Typography>
                <input
                  accept="image/*"
                  id="complete-profile-picture-upload"
                  type="file"
                  hidden
                  onChange={(e) => {
                    const file = e.target.files?.[0] || null;
                    setFormData((prev) => ({ ...prev, profilePicture: file }));
                  }}
                />
                <Button
                  variant="outlined"
                  component="label"
                  htmlFor="complete-profile-picture-upload"
                  sx={{
                    minHeight: 56,
                    borderRadius: "12px",
                    background: "rgba(255, 255, 255, 0.05)",
                    backdropFilter: "blur(10px)",
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                    color: "rgba(255, 255, 255, 0.9)",
                    textTransform: "none",
                    "&:hover": { background: "rgba(255, 255, 255, 0.1)", border: "1px solid rgba(79, 195, 247, 0.3)" },
                  }}
                >
                  {formData.profilePicture ? formData.profilePicture.name : "Choose File"}
                </Button>
              </Box>
            </Box>
            <Divider sx={{ my: 4 }} />
            <Typography variant="h5" sx={sectionTitleSx}>Preferences</Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mb: 4 }}>
              <FormControlLabel
                control={<Checkbox name="surgeryHistory" checked={formData.surgeryHistory} onChange={handleChange} sx={{ color: "rgba(79,195,247,0.7)", "&.Mui-checked": { color: "#4fc3f7" } }} />}
                label={<Typography variant="body1" sx={{ fontWeight: 500, color: "rgba(255,255,255,0.9)" }}>Surgery History</Typography>}
                sx={{ p: 2, border: "1px solid rgba(255,255,255,0.1)", borderRadius: "12px", background: "rgba(255,255,255,0.05)" }}
              />
              <FormControlLabel
                control={<Checkbox name="isResearchOpt" checked={formData.isResearchOpt} onChange={handleChange} sx={{ color: "rgba(79,195,247,0.7)", "&.Mui-checked": { color: "#4fc3f7" } }} />}
                label={<Typography variant="body1" sx={{ fontWeight: 500, color: "rgba(255,255,255,0.9)" }}>Research Opt-in</Typography>}
                sx={{ p: 2, border: "1px solid rgba(255,255,255,0.1)", borderRadius: "12px", background: "rgba(255,255,255,0.05)" }}
              />
            </Box>
            <Divider sx={{ my: 4 }} />
            <Typography variant="h5" sx={sectionTitleSx}>Medical Information</Typography>
            <Box sx={{ mb: 4 }}>
              <Typography variant="subtitle1" sx={{ mb: 1.5, color: "rgba(255,255,255,0.9)", fontWeight: 600 }}>Injuries</Typography>
              <FormControl fullWidth sx={selectSx}>
                <InputLabel sx={{ color: "rgba(255,255,255,0.7)" }}>Select Injuries</InputLabel>
                <Select multiple value={formData.userInjuries} onChange={(e) => setFormData((p) => ({ ...p, userInjuries: e.target.value }))} label="Select Injuries"
                  renderValue={(sel) => <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>{sel.map((v) => <Chip key={v} label={v.replace(/_/g, " ")} size="small" sx={{ backgroundColor: "#764ba2", color: "white" }} />)}</Box>}
                  MenuProps={{ PaperProps: { sx: { backgroundColor: "white", borderRadius: "12px", mt: 1 } } }}>
                  {INJURY_TYPE.map((t) => <MenuItem key={t} value={t} sx={{ color: "#1a1a2e" }}>{t.replace(/_/g, " ")}</MenuItem>)}
                </Select>
              </FormControl>
            </Box>
            <Box sx={{ mb: 4 }}>
              <Typography variant="subtitle1" sx={{ mb: 1.5, color: "rgba(255,255,255,0.9)", fontWeight: 600 }}>Surgeries</Typography>
              <FormControl fullWidth error={!!errors.userSurgeries} sx={selectSx}>
                <InputLabel sx={{ color: "rgba(255,255,255,0.7)" }}>Select Surgeries</InputLabel>
                <Select multiple value={formData.userSurgeries} onChange={(e) => setFormData((p) => ({ ...p, userSurgeries: e.target.value }))} label="Select Surgeries"
                  renderValue={(sel) => <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>{sel.map((v) => <Chip key={v} label={v.replace(/_/g, " ")} size="small" sx={{ backgroundColor: "#764ba2", color: "white" }} />)}</Box>}
                  MenuProps={{ PaperProps: { sx: { backgroundColor: "white", borderRadius: "12px", mt: 1 } } }}>
                  {SURGERY_TYPE.map((t) => <MenuItem key={t} value={t} sx={{ color: "#1a1a2e" }}>{t.replace(/_/g, " ")}</MenuItem>)}
                </Select>
                {errors.userSurgeries && <FormHelperText sx={{ color: "#f44336" }}>{errors.userSurgeries}</FormHelperText>}
              </FormControl>
            </Box>
            <Box sx={{ mb: 4 }}>
              <Typography variant="subtitle1" sx={{ mb: 1.5, color: "rgba(255,255,255,0.9)", fontWeight: 600 }}>Disc Issues</Typography>
              <FormControl fullWidth sx={selectSx}>
                <InputLabel sx={{ color: "rgba(255,255,255,0.7)" }}>Select Disc Levels</InputLabel>
                <Select multiple value={formData.userDiscIssues} onChange={(e) => setFormData((p) => ({ ...p, userDiscIssues: e.target.value }))} label="Select Disc Levels"
                  renderValue={(sel) => <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>{sel.map((v) => <Chip key={v} label={v.replace(/_/g, " ")} size="small" sx={{ backgroundColor: "#764ba2", color: "white" }} />)}</Box>}
                  MenuProps={{ PaperProps: { sx: { backgroundColor: "white", borderRadius: "12px", mt: 1 } } }}>
                  {DISC_LEVEL.map((l) => <MenuItem key={l} value={l} sx={{ color: "#1a1a2e" }}>{l.replace(/_/g, " ")}</MenuItem>)}
                </Select>
              </FormControl>
            </Box>
            <Divider sx={{ my: 4 }} />
            <Box sx={{ mb: 4 }}>
              <FormControlLabel
                control={<Checkbox name="acceptedTerms" checked={formData.acceptedTerms} onChange={handleChange} sx={{ color: "rgba(79,195,247,0.7)", "&.Mui-checked": { color: "#4fc3f7" } }} />}
                label={
                  <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.9)", lineHeight: 1.5 }}>
                    I accept the{" "}
                    <Link component={RouterLink} to="/terms" sx={{ color: "#4fc3f7", textDecoration: "none", fontWeight: 600, "&:hover": { textDecoration: "underline" } }}>Terms of Service</Link>
                    {" "}and{" "}
                    <Link component={RouterLink} to="/privacy" sx={{ color: "#4fc3f7", textDecoration: "none", fontWeight: 600, "&:hover": { textDecoration: "underline" } }}>Privacy Policy</Link>
                    <Typography component="span" sx={{ color: "#f44336", ml: 0.5 }}>*</Typography>
                  </Typography>
                }
                sx={{
                  p: 2,
                  border: errors.acceptedTerms ? "1px solid rgba(244,67,54,0.5)" : "1px solid rgba(255,255,255,0.1)",
                  borderRadius: "12px",
                  background: errors.acceptedTerms ? "rgba(244,67,54,0.08)" : "rgba(255,255,255,0.05)",
                  width: "100%",
                }}
              />
              {errors.acceptedTerms && <FormHelperText sx={{ color: "#f44336", mt: 0.5 }}>{errors.acceptedTerms}</FormHelperText>}
            </Box>
            <Button type="submit" fullWidth variant="contained" size="large" disabled={loading}
              sx={{ py: 2, fontSize: "1.1rem", textTransform: "none", fontWeight: 600, borderRadius: "50px", background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)", "&:hover": { background: "linear-gradient(135deg, #764ba2 0%, #667eea 100%)" } }}>
              {loading ? <CircularProgress size={24} color="inherit" /> : "Complete registration"}
            </Button>
          </form>
        </Paper>
      </Container>
    </Box>
  );
};

export default CompleteGoogleSignup;
