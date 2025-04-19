import React, { useState } from "react";
import { loginUser } from "../api";
import { Container, TextField, Button, Typography, Paper, Alert } from "@mui/material";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true); // Start loading

        try {
            const response = await loginUser(email, password);
            if (response.redirect) {
                localStorage.setItem("voterEmail", email);
                navigate("/verify-otp");
            } else {
                alert("Login Successful! Check your email for OTP.");
            }
        } catch (err) {
            console.error("Login Error:", err);
            setError(err.response?.data?.message || "Invalid credentials.");
        } finally {
            setLoading(false); // Stop loading
        }
    };

    return (
        <Container maxWidth="sm">
            <Paper elevation={3} style={{ padding: "20px", marginTop: "40px", textAlign: "center" }}>
                <Typography variant="h5" gutterBottom>
                    Voter Login
                </Typography>
                {error && <Alert severity="error">{error}</Alert>}
                <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
                    <TextField label="Email" type="email" variant="outlined" onChange={(e) => setEmail(e.target.value)} required />
                    <TextField label="Password" type="password" variant="outlined" onChange={(e) => setPassword(e.target.value)} required />
                    <Button type="submit" variant="contained" color="primary" disabled={loading}>
                        {loading ? "Logging in..." : "Login"}
                    </Button>
                </form>
                <Typography variant="body2" style={{ marginTop: "15px" }}>
                    Not Registered? <Link to="/register">Register Here</Link>
                </Typography>
            </Paper>
        </Container>
    );
};

export default Login;
