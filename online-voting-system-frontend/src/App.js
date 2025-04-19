import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Register from "./components/Register";
import OtpVerification from "./components/OtpVerification";
import Login from "./components/Login";
import AdminLogin from "./components/AdminLogin";
import AdminDashboard from "./components/AdminDashboard";
import Dashboard from "./components/Dashboard";
import Ballot from "./components/Ballot";
import Navbar from "./components/Navbar";
import { Container } from "@mui/material";

const AppRoutes = () => {
  const location = useLocation();
  const hideNavbarOn = ["/admin-dashboard"];

  return (
    <>
      {!hideNavbarOn.includes(location.pathname) && <Navbar />}

      <Container maxWidth="md" style={{ marginTop: "40px" }}>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/verify-otp" element={<OtpVerification />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/ballot" element={<Ballot />} />
          <Route path="/admin-login" element={<AdminLogin />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
        </Routes>
      </Container>
    </>
  );
};

const App = () => (
  <Router>
    <AppRoutes />
  </Router>
);

export default App;
