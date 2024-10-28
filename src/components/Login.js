// src/components/Login.js
import React, { useState } from 'react';
import axios from '../axiosConfig';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { TextField, Button, Container, Typography } from '@mui/material';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [, setCookie] = useCookies(['token']);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post('/login', { username, password })
      .then((response) => {
        setCookie('token', response.data.token, { path: '/' });
        navigate('/');
      })
      .catch((error) => {
        console.error('Login error:', error);
        alert('Invalid credentials');
      });
  };

  return (
    <Container maxWidth="sm" className="login-container">
      <Typography variant="h4" component="h1" gutterBottom>
        Login
      </Typography>
      <form onSubmit={handleSubmit} className="login-form">
        <TextField
          label="Username"
          variant="outlined"
          fullWidth
          margin="normal"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <TextField
          label="Password"
          variant="outlined"
          type="password"
          fullWidth
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <Button variant="contained" color="primary" type="submit" fullWidth>
          Login
        </Button>
      </form>
    </Container>
  );
}

export default Login;
