import React, { useState } from "react";
import { registerVoter } from "../api";
import { Container, TextField, Button, Typography, Paper, Alert } from "@mui/material";
import { useNavigate, Link } from "react-router-dom";

const Register = () => {
    const [voter, setVoter] = useState({
        voterId: "",
        name: "",
        email: "",
        password: "",
    });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setVoter({ ...voter, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            await registerVoter(voter);
            localStorage.setItem("voterEmail", voter.email);
            alert("Registration successful! Check your email for OTP.");
            navigate("/verify-otp");
        } catch (err) {
            console.error("Registration failed:", err);
            setError("Registration failed. Try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container maxWidth="sm">
            <Paper elevation={3} style={{ padding: "20px", marginTop: "40px", textAlign: "center" }}>
                <Typography variant="h5" gutterBottom>
                    Voter Registration
                </Typography>
                {error && <Alert severity="error">{error}</Alert>}
                <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
                    <TextField label="Voter ID" name="voterId" variant="outlined" onChange={handleChange} required />
                    <TextField label="Full Name" name="name" variant="outlined" onChange={handleChange} required />
                    <TextField label="Email" name="email" type="email" variant="outlined" onChange={handleChange} required />
                    <TextField label="Password" name="password" type="password" variant="outlined" onChange={handleChange} required />
                    <Button type="submit" variant="contained" color="primary" disabled={loading}>
                        {loading ? "Registering..." : "Register"}
                    </Button>
                </form>
                <Typography variant="body2" style={{ marginTop: "15px" }}>
                    Already have an account? <Link to="/">Login Here</Link>
                </Typography>
            </Paper>
        </Container>
    );
};

export default Register;
