import React, { useState, useContext } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { 
  Box, 
  Container, 
  Paper, 
  Typography, 
  TextField, 
  Button, 
  Divider, 
  Tab, 
  Tabs, 
  IconButton,
  InputAdornment,
  Alert,
  useTheme
} from '@mui/material';
import { 
  Google as GoogleIcon, 
  Visibility, 
  VisibilityOff 
} from '@mui/icons-material';
import { AuthContext } from '../context/AuthContext';

const Login = () => {
  const { currentUser, login, register, oauthLogin } = useContext(AuthContext);
  const navigate = useNavigate();
  const theme = useTheme();

  const [mode, setMode] = useState('login'); // 'login' or 'register'
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Form states
  const [loginForm, setLoginForm] = useState({
    email: '',
    password: ''
  });

  const [registerForm, setRegisterForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  // If already logged in, redirect to dashboard
  if (currentUser) {
    return <Navigate to="/dashboard" />;
  }

  const handleTabChange = (event, newValue) => {
    setMode(newValue);
    setError('');
  };

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginForm(prev => ({ ...prev, [name]: value }));
  };

  const handleRegisterChange = (e) => {
    const { name, value } = e.target;
    setRegisterForm(prev => ({ ...prev, [name]: value }));
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!loginForm.email || !loginForm.password) {
      setError('Please fill in all fields');
      return;
    }
    
    setLoading(true);
    setError('');
    
    try {
      const result = await login(loginForm.email, loginForm.password);
      if (!result.success) {
        setError(result.error);
      } else {
        navigate('/dashboard');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!registerForm.name || !registerForm.email || !registerForm.password || !registerForm.confirmPassword) {
      setError('Please fill in all fields');
      return;
    }
    
    if (registerForm.password !== registerForm.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    
    setLoading(true);
    setError('');
    
    try {
      const result = await register(registerForm.name, registerForm.email, registerForm.password);
      if (!result.success) {
        setError(result.error);
      } else {
        navigate('/dashboard');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    setError('');
    
    try {
      const result = await oauthLogin('google');
      if (!result.success) {
        setError(result.error);
      }
      // Don't navigate here - OAuth will redirect the browser
    } catch (err) {
      setError('Google authentication failed. Please try again.');
      console.error(err);
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ py: 8 }}>
      <Paper 
        elevation={3} 
        sx={{ 
          p: 4, 
          borderRadius: 2, 
          boxShadow: theme.palette.mode === 'dark' 
            ? '0 4px 20px rgba(0, 0, 0, 0.5)' 
            : '0 4px 20px rgba(0, 0, 0, 0.1)'
        }}
      >
        <Box sx={{ mb: 3, textAlign: 'center' }}>
          <Typography variant="h4" component="h1" fontWeight="bold" color="primary">
            {mode === 'login' ? 'Welcome Back' : 'Create Account'}
          </Typography>
          <Typography variant="body1" color="textSecondary" sx={{ mt: 1 }}>
            {mode === 'login' 
              ? 'Sign in to continue to your dashboard' 
              : 'Join to start managing your social media content'}
          </Typography>
        </Box>

        <Tabs 
          value={mode} 
          onChange={handleTabChange} 
          variant="fullWidth" 
          sx={{ mb: 3 }}
        >
          <Tab value="login" label="Login" />
          <Tab value="register" label="Register" />
        </Tabs>

        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

        {mode === 'login' ? (
          <Box component="form" onSubmit={handleLoginSubmit} noValidate>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={loginForm.email}
              onChange={handleLoginChange}
              sx={{ mb: 2 }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type={showPassword ? 'text' : 'password'}
              id="password"
              autoComplete="current-password"
              value={loginForm.password}
              onChange={handleLoginChange}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              size="large"
              disabled={loading}
              sx={{ mt: 3, mb: 2, py: 1.2, borderRadius: 2 }}
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </Button>

            <Divider sx={{ my: 3 }}>OR</Divider>
            
            <Button
              fullWidth
              variant="outlined"
              size="large"
              startIcon={<GoogleIcon />}
              onClick={handleGoogleLogin}
              disabled={loading}
              sx={{ 
                mb: 2, 
                py: 1.2, 
                borderRadius: 2,
                color: '#4285F4',
                borderColor: '#4285F4',
                '&:hover': {
                  borderColor: '#4285F4',
                  backgroundColor: 'rgba(66, 133, 244, 0.04)',
                }
              }}
            >
              Continue with Google
            </Button>
          </Box>
        ) : (
          <Box component="form" onSubmit={handleRegisterSubmit} noValidate>
            <TextField
              margin="normal"
              required
              fullWidth
              id="name"
              label="Full Name"
              name="name"
              autoComplete="name"
              autoFocus
              value={registerForm.name}
              onChange={handleRegisterChange}
              sx={{ mb: 2 }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              value={registerForm.email}
              onChange={handleRegisterChange}
              sx={{ mb: 2 }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type={showPassword ? 'text' : 'password'}
              id="password"
              autoComplete="new-password"
              value={registerForm.password}
              onChange={handleRegisterChange}
              sx={{ mb: 2 }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="confirmPassword"
              label="Confirm Password"
              type={showPassword ? 'text' : 'password'}
              id="confirmPassword"
              autoComplete="new-password"
              value={registerForm.confirmPassword}
              onChange={handleRegisterChange}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              size="large"
              disabled={loading}
              sx={{ mt: 3, mb: 2, py: 1.2, borderRadius: 2 }}
            >
              {loading ? 'Creating Account...' : 'Create Account'}
            </Button>

            <Divider sx={{ my: 3 }}>OR</Divider>
            
            <Button
              fullWidth
              variant="outlined"
              size="large"
              startIcon={<GoogleIcon />}
              onClick={handleGoogleLogin}
              disabled={loading}
              sx={{ 
                mb: 2, 
                py: 1.2, 
                borderRadius: 2,
                color: '#4285F4',
                borderColor: '#4285F4',
                '&:hover': {
                  borderColor: '#4285F4',
                  backgroundColor: 'rgba(66, 133, 244, 0.04)',
                }
              }}
            >
              Continue with Google
            </Button>
          </Box>
        )}
      </Paper>
    </Container>
  );
};

export default Login; 