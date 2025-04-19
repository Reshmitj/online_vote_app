import React, { useState, useEffect } from "react";
import { AppBar, Toolbar, Typography, Box } from "@mui/material";

const Navbar = () => {
  const [currentTime, setCurrentTime] = useState("");
  const [currentDate, setCurrentDate] = useState("");

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();

      // Format Date: e.g., "Tuesday, March 11, 2025"
      const formattedDate = now.toLocaleDateString("en-US", {
        weekday: "long",
        month: "long",
        day: "numeric",
        year: "numeric",
      });

      // Format Time: e.g., "10:30 AM" (No Seconds)
      const formattedTime = now.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      });

      setCurrentDate(formattedDate);
      setCurrentTime(formattedTime);
    };

    updateDateTime(); // Initial call
    const interval = setInterval(updateDateTime, 60000); // Update every minute

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  return (
    <AppBar position="static" sx={{ background: "linear-gradient(135deg, #2193b0, #6dd5ed)" }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 20px" }}>
        {/* Title with Custom Font */}
        <Typography variant="h5" sx={{ fontFamily: "Montserrat, sans-serif", fontWeight: 600, color: "#fff" }}>
          Online Voting System
        </Typography>

        {/* Date & Time Box with Custom Styling */}
        <Box sx={{ 
          background: "#ffffff", 
          padding: "10px 15px", 
          borderRadius: "10px",
          boxShadow: "2px 2px 10px rgba(0, 0, 0, 0.1)",
          textAlign: "center",
          minWidth: "180px",
        }}>
          <Typography 
            variant="body2" 
            sx={{ fontFamily: "Montserrat, sans-serif", color: "#333", fontWeight: 500 }}
          >
            {currentDate}
          </Typography>
          <Typography 
            variant="h6" 
            sx={{ fontFamily: "Montserrat, sans-serif", color: "#333", fontWeight: "bold" }}
          >
            {currentTime}
          </Typography>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
