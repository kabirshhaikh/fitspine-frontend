import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Box } from "@mui/material";
import HeroSection from "../components/landing/HeroSection";
import StorySection from "../components/landing/StorySection";
import FeaturesSection from "../components/landing/FeaturesSection";
import CTASection from "../components/landing/CTASection";
import Footer from "../components/landing/Footer";
import AnimationBackground from "../components/landing/AnimationBackground";
import FloatingOrbs from "../components/landing/FloatingOrbs";
import "../styles/animations.css";
import "../styles/landing.css";

const Landing = () => {
  const navigate = useNavigate();
  const observerRef = useRef();

  useEffect(() => {
    // Intersection Observer for smooth animations
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-in");
          }
        });
      },
      { threshold: 0.1 }
    );

    const animatedElements = document.querySelectorAll(".animate-on-scroll");
    animatedElements.forEach((el) => observerRef.current.observe(el));

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  const handleGetStarted = () => {
    navigate("/login");
  };

  return (
    <Box className="landing-container">
      {/* Animated Background Particles */}
      <AnimationBackground />

      {/* Floating Orbs */}
      <FloatingOrbs />

      {/* Hero Section */}
      <HeroSection onGetStarted={handleGetStarted} />

      {/* Story Section */}
      <StorySection />

      {/* Features Section */}
      <FeaturesSection />

      {/* Closing CTA Section */}
      <CTASection />

      {/* Footer Disclaimer */}
      <Footer />
    </Box>
  );
};

export default Landing;
