import React, { useState, useContext } from 'react';
import { Navigate } from 'react-router-dom';
import {
  Container,
  Box,
  Paper,
  Typography,
  Button,
  TextField,
  Avatar,
  Grid,
  Divider,
  Alert,
  Snackbar,
  IconButton,
  useTheme
} from '@mui/material';
import {
  Edit as EditIcon,
  Save as SaveIcon,
  Cancel as CancelIcon,
  Security as SecurityIcon,
  Notifications as NotificationsIcon,
  AccountCircle as AccountCircleIcon
} from '@mui/icons-material';
import { AuthContext } from '../context/AuthContext';

const Profile = () => {
  const { currentUser, updateProfile, logout } = useContext(AuthContext);
  const theme = useTheme();
  
  const [isEditing, setIsEditing] = useState(false);
  const [profileForm, setProfileForm] = useState({
    name: currentUser?.name || '',
    email: currentUser?.email || '',
  });
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  
  // Redirect if not logged in
  if (!currentUser) {
    return <Navigate to="/login" />;
  }
  
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setProfileForm(prev => ({ ...prev, [name]: value }));
  };
  
  const handleEditToggle = () => {
    if (isEditing) {
      // Cancel editing - reset form
      setProfileForm({
        name: currentUser.name,
        email: currentUser.email,
      });
    }
    setIsEditing(!isEditing);
    setError('');
  };
  
  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    
    if (!profileForm.name.trim() || !profileForm.email.trim()) {
      setError('Name and email are required');
      return;
    }
    
    try {
      const result = await updateProfile({
        name: profileForm.name,
        email: profileForm.email,
      });
      
      if (result.success) {
        setSuccess('Profile updated successfully');
        setIsEditing(false);
      } else {
        setError(result.error);
      }
    } catch (err) {
      setError('Failed to update profile');
      console.error(err);
    }
  };
  
  const handleLogout = () => {
    logout();
  };
  
  return (
    <Container maxWidth="md" sx={{ py: 6 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" fontWeight="bold">
          My Profile
        </Typography>
        <Typography variant="body1" color="textSecondary">
          Manage your account settings and preferences
        </Typography>
      </Box>
      
      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}
      
      <Snackbar
        open={!!success}
        autoHideDuration={6000}
        onClose={() => setSuccess('')}
        message={success}
      />
      
      <Grid container spacing={4}>
        {/* Profile Info Card */}
        <Grid item xs={12} md={8}>
          <Paper
            elevation={2}
            sx={{
              p: 3,
              borderRadius: 2,
            }}
          >
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <AccountCircleIcon color="primary" sx={{ mr: 1 }} />
                <Typography variant="h6" component="h2">
                  Account Information
                </Typography>
              </Box>
              <IconButton 
                color={isEditing ? 'error' : 'primary'} 
                onClick={handleEditToggle}
                aria-label={isEditing ? 'Cancel editing' : 'Edit profile'}
              >
                {isEditing ? <CancelIcon /> : <EditIcon />}
              </IconButton>
            </Box>
            
            <Box component="form" onSubmit={handleProfileUpdate}>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={4} sx={{ display: 'flex', justifyContent: 'center' }}>
                  <Avatar
                    src={currentUser.profilePic}
                    alt={currentUser.name}
                    sx={{ width: 120, height: 120, mb: 2 }}
                  />
                </Grid>
                <Grid item xs={12} sm={8}>
                  <TextField
                    margin="normal"
                    fullWidth
                    label="Full Name"
                    name="name"
                    value={profileForm.name}
                    onChange={handleFormChange}
                    disabled={!isEditing}
                    sx={{ mb: 2 }}
                  />
                  <TextField
                    margin="normal"
                    fullWidth
                    label="Email Address"
                    name="email"
                    value={profileForm.email}
                    onChange={handleFormChange}
                    disabled={!isEditing}
                    sx={{ mb: 2 }}
                  />
                  <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                    {isEditing && (
                      <Button
                        variant="contained"
                        startIcon={<SaveIcon />}
                        type="submit"
                      >
                        Save Changes
                      </Button>
                    )}
                  </Box>
                </Grid>
              </Grid>
            </Box>
            
            <Divider sx={{ my: 3 }} />
            
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <SecurityIcon color="primary" sx={{ mr: 1 }} />
              <Typography variant="h6" component="h2">
                Security
              </Typography>
            </Box>
            
            <Button 
              variant="outlined" 
              color="primary"
              disabled={isEditing}
              sx={{ mb: 2, mr: 2 }}
            >
              Change Password
            </Button>
            
            <Button 
              variant="outlined" 
              color="error"
              onClick={handleLogout}
              disabled={isEditing}
            >
              Logout
            </Button>
          </Paper>
        </Grid>
        
        {/* Preferences Card */}
        <Grid item xs={12} md={4}>
          <Paper
            elevation={2}
            sx={{
              p: 3,
              borderRadius: 2,
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
              <NotificationsIcon color="primary" sx={{ mr: 1 }} />
              <Typography variant="h6" component="h2">
                Preferences
              </Typography>
            </Box>
            
            <Typography variant="subtitle2" gutterBottom>
              Email Notifications
            </Typography>
            <Box sx={{ mb: 3 }}>
              <Button 
                variant="outlined" 
                size="small" 
                sx={{ mr: 1, mb: 1 }}
                disabled={isEditing}
              >
                Weekly Reports
              </Button>
              <Button 
                variant="outlined" 
                size="small" 
                sx={{ mr: 1, mb: 1 }}
                disabled={isEditing}
              >
                Post Updates
              </Button>
              <Button 
                variant="outlined" 
                size="small" 
                sx={{ mb: 1 }}
                disabled={isEditing}
              >
                Engagement
              </Button>
            </Box>
            
            <Typography variant="subtitle2" gutterBottom>
              Connected Accounts
            </Typography>
            <Box>
              <Button 
                variant="outlined" 
                size="small" 
                sx={{ mr: 1, mb: 1 }}
                disabled={isEditing}
              >
                Manage
              </Button>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Profile; 