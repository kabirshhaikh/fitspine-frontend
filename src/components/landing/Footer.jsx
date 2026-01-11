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
        Disclaimer: FitSpine does not provide medical advice, diagnosis, or
        treatment. The insights and scores are for informational and educational
        purposes only. Always consult a qualified healthcare professional for
        medical concerns or before making changes to your health routine.
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

