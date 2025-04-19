import React, { useState } from "react";
import { loginAdmin } from "../api";
import { Container, TextField, Button, Typography, Paper, Alert } from "@mui/material";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            const response = await loginAdmin(email, password);
            localStorage.setItem("adminEmail", email);
            navigate(response.redirect);
        } catch (err) {
            setError("Invalid email or password");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container maxWidth="sm">
            <Paper elevation={3} style={{ padding: "20px", marginTop: "40px", textAlign: "center" }}>
                <Typography variant="h5">Admin Login</Typography>
                {error && <Alert severity="error">{error}</Alert>}
                <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
                    <TextField label="Email" type="email" variant="outlined" onChange={(e) => setEmail(e.target.value)} required />
                    <TextField label="Password" type="password" variant="outlined" onChange={(e) => setPassword(e.target.value)} required />
                    <Button type="submit" variant="contained" color="primary" disabled={loading}>
                        {loading ? "Logging in..." : "Login"}
                    </Button>
                </form>
            </Paper>
        </Container>
    );
};

export default AdminLogin;
