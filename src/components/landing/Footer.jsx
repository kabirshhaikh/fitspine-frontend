import React from "react";
import { Box, Typography } from "@mui/material";
import "../../styles/footer.css";

const Footer = () => {
  return (
    <Box className="landing-footer">
      <Typography 
        variant="body2" 
        className="footer-disclaimer"
        sx={{ textAlign: 'center', width: '100%' }}
      >
        Disclaimer: FitSpine does not provide medical advice, diagnosis, or
        treatment. The insights and scores are for informational and educational
        purposes only. Always consult a qualified healthcare professional for
        medical concerns or before making changes to your health routine.
      </Typography>
    </Box>
  );
};

export default Footer;

