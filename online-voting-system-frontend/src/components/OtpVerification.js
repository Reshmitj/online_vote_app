import React, { useState, useEffect } from "react";
import { verifyOtp } from "../api";
import { Container, TextField, Button, Typography, Paper, Alert } from "@mui/material";
import { useNavigate } from "react-router-dom";

const VerifyOtp = () => {
    const navigate = useNavigate();
    const [otp, setOtp] = useState("");
    const [error, setError] = useState("");
    const email = localStorage.getItem("voterEmail"); // Fetch email from localStorage

    useEffect(() => {
        if (!email) {
            navigate("/login"); // Redirect to login if email is missing
        }
    }, [email, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        try {
            const response = await verifyOtp(email, otp);
            if (response.redirect) {
                navigate("/dashboard"); // Redirect to Dashboard
            } else {
                alert("OTP Verified Successfully!");
            }
        } catch (err) {
            console.error("OTP Verification Error:", err);
            setError(err.response?.data?.message || "Invalid OTP. Try again.");
        }
    };

    return (
        <Container maxWidth="sm">
            <Paper elevation={3} style={{ padding: "20px", marginTop: "40px", textAlign: "center" }}>
                <Typography variant="h5" gutterBottom>
                    OTP Verification
                </Typography>
                {error && <Alert severity="error">{error}</Alert>}
                <Typography variant="body1">Verifying for: {email}</Typography>
                <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
                    <TextField label="Enter OTP" type="number" variant="outlined" onChange={(e) => setOtp(e.target.value)} required />
                    <Button type="submit" variant="contained" color="primary">
                        Verify OTP
                    </Button>
                </form>
            </Paper>
        </Container>
    );
};

export default VerifyOtp;
