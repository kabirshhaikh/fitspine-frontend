import React from "react";
import { Box, Typography, Link } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import "../../styles/footer.css";

const Footer = () => {
  return (
    <Box 
      className="landing-footer"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Typography 
        variant="body2" 
        className="footer-disclaimer"
        sx={{ textAlign: 'center', width: '100%', mb: 2 }}
      >
        Sphinic is an informational wellness and data-analysis platform. The content, insights, and outputs provided by Sphinic are for general informational purposes only and are not intended to diagnose, treat, cure, prevent, or manage any disease or medical condition. Sphinic is not a medical device and does not provide medical or clinical advice. Users should not rely on Sphinic for medical decisions and should always consult a qualified healthcare professional for medical concerns.
      </Typography>
      <Box sx={{ textAlign: 'center', mt: 2 }}>
        <Link
          component={RouterLink}
          to="/feedback"
          underline="hover"
          sx={{
            color: 'rgba(255, 255, 255, 0.7)',
            fontSize: '0.875rem',
            cursor: 'pointer',
            display: 'inline-block',
            '&:hover': {
              color: '#4facfe',
            },
          }}
        >
          Share Feedback
        </Link>
      </Box>
    </Box>
  );
};

export default Footer;

