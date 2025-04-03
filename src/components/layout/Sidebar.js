// src/components/layout/Sidebar.js
import React, { useContext } from 'react';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import HomeIcon from '@mui/icons-material/Home';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import BarChartIcon from '@mui/icons-material/BarChart';
import PersonIcon from '@mui/icons-material/Person';
import LoginIcon from '@mui/icons-material/Login';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
import { Link, useLocation } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

const drawerWidth = 240;

const Sidebar = ({ open, onClose }) => {
  const { currentUser } = useContext(AuthContext);
  const location = useLocation();
  const currentPath = location.pathname;

  // Check if a route is active
  const isActive = (path) => {
    return currentPath === path;
  };

  // Styling for active/inactive menu items
  const getMenuItemStyles = (path) => {
    const active = isActive(path);
    return {
      backgroundColor: theme => active 
        ? (theme.palette.mode === 'dark' 
          ? 'rgba(144, 202, 249, 0.16)' 
          : 'rgba(25, 118, 210, 0.08)')
        : (theme.palette.mode === 'dark' && path === '/'
          ? 'rgba(255, 255, 255, 0.05)'
          : path === '/' ? 'rgba(0, 0, 0, 0.04)' : 'transparent'),
      my: path === '/' ? 1 : 0.5,
      mx: path === '/' ? 1 : 0,
      borderRadius: 1,
    };
  };

  return (
    <Drawer
      variant="temporary"
      open={open}
      onClose={onClose}
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
        },
      }}
    >
      <Box sx={{ pt: 2, pb: 2, display: 'flex', justifyContent: 'center' }}>
        <Box
          component="img"
          sx={{ height: 40 }}
          alt="Logo"
          src="/logo192.png"
        />
      </Box>
      <Divider />
      
      <List>
        {/* Home Button */}
        <ListItemButton 
          component={Link} 
          to="/" 
          onClick={onClose}
          sx={getMenuItemStyles('/')}
        >
          <ListItemIcon>
            <HomeIcon color={isActive('/') ? 'primary' : 'inherit'} />
          </ListItemIcon>
          <ListItemText 
            primary="Home" 
            primaryTypographyProps={{ 
              fontWeight: isActive('/') ? 'medium' : 'regular' 
            }} 
          />
        </ListItemButton>

        {/* Dashboard */}
        <ListItemButton 
          component={Link} 
          to="/dashboard" 
          onClick={onClose}
          sx={getMenuItemStyles('/dashboard')}
        >
          <ListItemIcon>
            <DashboardIcon color={isActive('/dashboard') ? 'primary' : 'inherit'} />
          </ListItemIcon>
          <ListItemText 
            primary="Dashboard" 
            primaryTypographyProps={{ 
              fontWeight: isActive('/dashboard') ? 'medium' : 'regular' 
            }}
          />
        </ListItemButton>

        {/* Calendar */}
        <ListItemButton 
          component={Link} 
          to="/calendar" 
          onClick={onClose}
          sx={getMenuItemStyles('/calendar')}
        >
          <ListItemIcon>
            <CalendarMonthIcon color={isActive('/calendar') ? 'primary' : 'inherit'} />
          </ListItemIcon>
          <ListItemText 
            primary="Calendar" 
            primaryTypographyProps={{ 
              fontWeight: isActive('/calendar') ? 'medium' : 'regular' 
            }}
          />
        </ListItemButton>

        {/* Analytics */}
        <ListItemButton 
          component={Link} 
          to="/analytics" 
          onClick={onClose}
          sx={getMenuItemStyles('/analytics')}
        >
          <ListItemIcon>
            <BarChartIcon color={isActive('/analytics') ? 'primary' : 'inherit'} />
          </ListItemIcon>
          <ListItemText 
            primary="Analytics" 
            primaryTypographyProps={{ 
              fontWeight: isActive('/analytics') ? 'medium' : 'regular' 
            }}
          />
        </ListItemButton>
      </List>
      
      <Divider />
      
      <List>
        {currentUser ? (
          <ListItemButton 
            component={Link} 
            to="/profile" 
            onClick={onClose}
            sx={getMenuItemStyles('/profile')}
          >
            <ListItemIcon>
              <PersonIcon color={isActive('/profile') ? 'primary' : 'inherit'} />
            </ListItemIcon>
            <ListItemText 
              primary="My Profile" 
              primaryTypographyProps={{ 
                fontWeight: isActive('/profile') ? 'medium' : 'regular' 
              }}
            />
          </ListItemButton>
        ) : (
          <ListItemButton 
            component={Link} 
            to="/login" 
            onClick={onClose}
            sx={getMenuItemStyles('/login')}
          >
            <ListItemIcon>
              <LoginIcon color={isActive('/login') ? 'primary' : 'inherit'} />
            </ListItemIcon>
            <ListItemText 
              primary="Login" 
              primaryTypographyProps={{ 
                fontWeight: isActive('/login') ? 'medium' : 'regular' 
              }}
            />
          </ListItemButton>
        )}
      </List>
    </Drawer>
  );
};

export default Sidebar;