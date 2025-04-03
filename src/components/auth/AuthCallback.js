import React, { useEffect, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { CircularProgress, Box, Typography } from '@mui/material';

const AuthCallback = () => {
  const { handleAuthCallback } = useContext(AuthContext);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const processCallback = async () => {
      try {
        const result = await handleAuthCallback();
        if (result.success) {
          navigate('/dashboard');
        } else {
          setError(result.error);
          setTimeout(() => navigate('/login'), 3000);
        }
      } catch (err) {
        setError('Authentication failed. Redirecting to login...');
        setTimeout(() => navigate('/login'), 3000);
      }
    };

    processCallback();
  }, [handleAuthCallback, navigate]);

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      minHeight="100vh"
    >
      {error ? (
        <Typography color="error" variant="h6">
          {error}
        </Typography>
      ) : (
        <>
          <CircularProgress size={60} />
          <Typography variant="h6" style={{ marginTop: 20 }}>
            Completing authentication...
          </Typography>
        </>
      )}
    </Box>
  );
};

export default AuthCallback;
