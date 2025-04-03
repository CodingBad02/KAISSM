// src/pages/OAuthCallback.js
import React, { useEffect, useState, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Box, Typography, CircularProgress } from '@mui/material';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { supabase } from '../services/supabaseClient';

const OAuthCallback = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { handleAuthCallback } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const processOAuthCallback = async () => {
      try {
        setLoading(true);
        
        // Check if this is an Instagram callback
        const queryParams = new URLSearchParams(location.search);
        const instagramCode = queryParams.get('code');
        const source = queryParams.get('source');

        if (instagramCode && source === 'instagram') {
          // Handle Instagram authentication
          await exchangeCodeForToken(instagramCode);
          navigate('/dashboard');
        } else {
          // Handle Supabase OAuth callback
          const result = await handleAuthCallback();
          if (!result.success) {
            setError(result.error || 'Authentication failed');
          } else {
            navigate('/dashboard');
          }
        }
      } catch (err) {
        console.error('Error in OAuth callback:', err);
        setError('Authentication failed. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    processOAuthCallback();
  }, [location, handleAuthCallback, navigate]);

  const exchangeCodeForToken = async (code) => {
    try {
      // For Instagram Basic Display API
      const response = await axios.get(
        `http://localhost:5000/api/instagram/token?code=${code}`
      );
      console.log('Instagram Access Token:', response.data.access_token);
      
      // Store the token in local storage
      localStorage.setItem('instagramToken', response.data.access_token);
    } catch (err) {
      console.error('Error exchanging code for Instagram token:', err);
      throw err;
    }
  };

  return (
    <Box sx={{ 
      display: 'flex', 
      flexDirection: 'column',
      alignItems: 'center', 
      justifyContent: 'center',
      minHeight: '50vh',
      textAlign: 'center',
      p: 4
    }}>
      {loading ? (
        <>
          <CircularProgress size={60} thickness={4} sx={{ mb: 3 }} />
          <Typography variant="h5">Authenticating...</Typography>
          <Typography variant="body1" color="textSecondary">
            Please wait while we complete the authentication process
          </Typography>
        </>
      ) : error ? (
        <>
          <Typography variant="h5" color="error" sx={{ mb: 2 }}>
            Authentication Error
          </Typography>
          <Typography variant="body1">
            {error}
          </Typography>
          <Typography variant="body2" sx={{ mt: 2 }}>
            <a href="/login">Return to login</a>
          </Typography>
        </>
      ) : null}
    </Box>
  );
};

export default OAuthCallback;