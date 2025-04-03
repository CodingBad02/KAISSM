// src/App.js
import React, { useState, useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import { createTheme, ThemeProvider, CssBaseline } from '@mui/material';

import Header from './components/layout/Header';
import Sidebar from './components/layout/Sidebar';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import ContentCalendar from './components/calendar/ContentCalendar';
import Analytics from './components/analytics/Analytics';
import OAuthCallback from './pages/OAuthCallback';
import Login from './pages/Login';
import Profile from './pages/Profile';
import { PostProvider } from './context/PostContext';
import { AuthProvider, AuthContext } from './context/AuthContext';

// Route guard for protected routes
const ProtectedRoute = ({ children }) => {
  const user = localStorage.getItem('currentUser');
  
  if (!user) {
    return <Navigate to="/login" />;
  }
  
  return children;
};

function AppContent() {
  const { currentUser } = useContext(AuthContext);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const handleMenuToggle = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  // Example events for the calendar
  const sampleEvents = [
    { title: 'Post about new product', start: new Date(), end: new Date() },
  ];

  // Example analytics data
  const sampleAnalyticsData = [
    { label: 'Post 1', value: 50 },
    { label: 'Post 2', value: 75 },
    { label: 'Post 3', value: 100 },
  ];

  // Create a theme based on the darkMode state
  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
      primary: { 
        main: darkMode ? '#90caf9' : '#1976d2',
        light: darkMode ? '#a6d4fa' : '#42a5f5',
        dark: darkMode ? '#648dae' : '#1565c0'
      },
      secondary: {
        main: darkMode ? '#f48fb1' : '#e91e63',
        light: darkMode ? '#f6a5c0' : '#ec407a',
        dark: darkMode ? '#aa647b' : '#c2185b'
      },
      background: { 
        default: darkMode ? '#121212' : '#f5f5f5',
        paper: darkMode ? '#1e1e1e' : '#fff',
        subtle: darkMode ? '#252525' : '#f9f9f9'
      },
      text: {
        primary: darkMode ? '#e0e0e0' : '#3e3e3e',
        secondary: darkMode ? '#aaaaaa' : '#666666'
      },
      action: {
        active: darkMode ? '#ffffff' : '#000000',
        hover: darkMode ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.04)',
        selected: darkMode ? 'rgba(255, 255, 255, 0.16)' : 'rgba(0, 0, 0, 0.08)'
      },
      divider: darkMode ? 'rgba(255, 255, 255, 0.12)' : 'rgba(0, 0, 0, 0.12)'
    },
    components: {
      MuiCard: {
        styleOverrides: {
          root: {
            boxShadow: darkMode ? '0 4px 20px rgba(0, 0, 0, 0.5)' : '0 2px 10px rgba(0, 0, 0, 0.05)',
            transition: 'box-shadow 0.3s ease-in-out',
            '&:hover': {
              boxShadow: darkMode ? '0 6px 25px rgba(0, 0, 0, 0.7)' : '0 4px 15px rgba(0, 0, 0, 0.1)'
            }
          }
        }
      },
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: 'none',
            borderRadius: '8px',
            fontWeight: 500,
            boxShadow: darkMode ? '0 2px 8px rgba(0, 0, 0, 0.5)' : 'none'
          },
          contained: {
            boxShadow: darkMode ? '0 2px 8px rgba(0, 0, 0, 0.5)' : '0 1px 5px rgba(0, 0, 0, 0.2)'
          }
        }
      },
      MuiAppBar: {
        styleOverrides: {
          root: {
            background: darkMode 
              ? 'linear-gradient(to right, #1e1e1e, #2d2d2d)' 
              : 'linear-gradient(to right, #1976d2, #1e88e5)'
          }
        }
      }
    },
    shape: {
      borderRadius: 8
    },
    typography: {
      fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
      h1: {
        fontWeight: 600
      },
      h2: {
        fontWeight: 600
      },
      h3: {
        fontWeight: 600
      },
      h4: {
        fontWeight: 600
      },
      h5: {
        fontWeight: 600
      },
      h6: {
        fontWeight: 600
      },
      button: {
        fontWeight: 500
      }
    }
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Box sx={{ display: 'flex' }}>
          {/* Header */}
          <Header onMenuToggle={handleMenuToggle} darkMode={darkMode} toggleDarkMode={toggleDarkMode} />

          {/* Sidebar - Only show when user is logged in */}
          {currentUser && <Sidebar open={isSidebarOpen} onClose={handleMenuToggle} />}

          {/* Main Content Area */}
          <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
            <Toolbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/dashboard" element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              } />
              <Route path="/calendar" element={
                <ProtectedRoute>
                  <ContentCalendar events={sampleEvents} />
                </ProtectedRoute>
              } />
              <Route path="/analytics" element={
                <ProtectedRoute>
                  <Analytics data={sampleAnalyticsData} />
                </ProtectedRoute>
              } />
              <Route path="/profile" element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              } />
              {/* OAuth callback routes */}
              <Route path="/oauth/callback" element={<OAuthCallback />} />
              <Route path="/auth/callback" element={<OAuthCallback />} />
            </Routes>
          </Box>
        </Box>
      </Router>
    </ThemeProvider>
  );
}

function App() {
  return (
    <AuthProvider>
      <PostProvider>
        <AppContent />
      </PostProvider>
    </AuthProvider>
  );
}

export default App;
