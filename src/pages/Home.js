import React, { useContext } from 'react';
import { 
  Box, 
  Typography, 
  Button, 
  Grid, 
  Card, 
  CardContent, 
  CardMedia, 
  Container,
  Paper,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  useTheme
} from '@mui/material';
import { 
  CalendarMonth as CalendarIcon, 
  BarChart as AnalyticsIcon, 
  Dashboard as DashboardIcon,
  Speed as SpeedIcon,
  Security as SecurityIcon,
  Devices as DevicesIcon,
  Notifications as NotificationsIcon,
  Chat as ChatIcon,
  AutoGraph as AutoGraphIcon,
  Login as LoginIcon
} from '@mui/icons-material';
import { FaInstagram, FaLinkedin, FaFacebook, FaTwitter, FaWhatsapp } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Home = () => {
  const theme = useTheme();
  const { currentUser } = useContext(AuthContext);
  
  // Features list for the home page
  const features = [
    {
      title: 'Content Calendar',
      description: 'Schedule and manage your social media posts across multiple platforms with our intuitive calendar interface.',
      icon: <CalendarIcon fontSize="large" color="primary" />,
      link: '/calendar'
    },
    {
      title: 'Analytics Dashboard',
      description: 'Track your social media performance with detailed analytics and insights.',
      icon: <AnalyticsIcon fontSize="large" color="primary" />,
      link: '/analytics'
    },
    {
      title: 'Multi-Platform Support',
      description: 'Connect and manage all your social media accounts in one place.',
      icon: <DevicesIcon fontSize="large" color="primary" />,
      link: '/dashboard'
    },
    {
      title: 'AI-Powered Insights',
      description: 'Get intelligent recommendations to improve your social media strategy.',
      icon: <AutoGraphIcon fontSize="large" color="primary" />,
      link: '/analytics'
    }
  ];

  // Platforms supported
  const platforms = [
    { name: 'Instagram', icon: <FaInstagram size={40} color="#E1306C" /> },
    { name: 'LinkedIn', icon: <FaLinkedin size={40} color="#0077B5" /> },
    { name: 'Facebook', icon: <FaFacebook size={40} color="#1877F2" /> },
    { name: 'Twitter', icon: <FaTwitter size={40} color="#1DA1F2" /> },
    { name: 'WhatsApp', icon: <FaWhatsapp size={40} color="#25D366" /> }
  ];

  // Benefits list
  const benefits = [
    {
      title: 'Save Time',
      description: 'Automate your social media workflow and save hours each week.',
      icon: <SpeedIcon fontSize="large" sx={{ color: theme.palette.success.main }} />
    },
    {
      title: 'Increase Engagement',
      description: 'Post at optimal times and track what content performs best.',
      icon: <NotificationsIcon fontSize="large" sx={{ color: theme.palette.warning.main }} />
    },
    {
      title: 'Secure & Private',
      description: 'Your data is encrypted and never shared with third parties.',
      icon: <SecurityIcon fontSize="large" sx={{ color: theme.palette.info.main }} />
    },
    {
      title: 'Customer Interaction',
      description: 'Manage all your customer messages in one unified inbox.',
      icon: <ChatIcon fontSize="large" sx={{ color: theme.palette.secondary.main }} />
    }
  ];

  return (
    <Box sx={{ pb: 8 }}>
      {/* Hero Section */}
      <Paper 
        elevation={0}
        sx={{
          position: 'relative',
          backgroundColor: theme.palette.mode === 'dark' ? 'rgba(0, 0, 0, 0.2)' : 'rgba(25, 118, 210, 0.05)',
          mb: 4,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          borderRadius: 2,
          overflow: 'hidden',
          py: 8
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography 
                component="h1" 
                variant="h2" 
                color="primary"
                sx={{ 
                  fontWeight: 700,
                  mb: 2,
                  fontSize: { xs: '2.5rem', md: '3.5rem' }
                }}
              >
                Manage Your Social Media Presence
              </Typography>
              <Typography 
                variant="h5" 
                color="textSecondary" 
                paragraph
                sx={{ mb: 4 }}
              >
                Schedule posts, analyze performance, and engage with your audience across all platforms in one powerful dashboard.
              </Typography>
              <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                {currentUser ? (
                  <Button 
                    component={Link} 
                    to="/dashboard" 
                    variant="contained" 
                    size="large"
                    sx={{ 
                      px: 4, 
                      py: 1.5,
                      borderRadius: 2,
                      fontWeight: 600
                    }}
                  >
                    Go to Dashboard
                  </Button>
                ) : (
                  <Button 
                    component={Link} 
                    to="/login" 
                    variant="contained" 
                    size="large"
                    startIcon={<LoginIcon />}
                    sx={{ 
                      px: 4, 
                      py: 1.5,
                      borderRadius: 2,
                      fontWeight: 600
                    }}
                  >
                    Login / Sign Up
                  </Button>
                )}
                <Button 
                  component={Link} 
                  to="/calendar" 
                  variant="outlined" 
                  size="large"
                  sx={{ 
                    px: 4, 
                    py: 1.5,
                    borderRadius: 2,
                    fontWeight: 600
                  }}
                >
                  View Calendar
                </Button>
              </Box>
            </Grid>
            <Grid item xs={12} md={6} sx={{ display: { xs: 'none', md: 'block' } }}>
              <Box 
                sx={{ 
                  position: 'relative',
                  height: '400px',
                  width: '100%',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center'
                }}
              >
                <Box 
                  sx={{ 
                    position: 'absolute',
                    width: '80%',
                    height: '80%',
                    background: `linear-gradient(45deg, ${theme.palette.primary.main} 30%, ${theme.palette.secondary.main} 90%)`,
                    borderRadius: 4,
                    opacity: 0.7,
                    transform: 'rotate(-5deg)'
                  }}
                />
                <Paper
                  elevation={6}
                  sx={{
                    position: 'relative',
                    width: '80%',
                    height: '80%',
                    borderRadius: 4,
                    overflow: 'hidden',
                    display: 'flex',
                    flexDirection: 'column'
                  }}
                >
                  <Box 
                    sx={{ 
                      height: '40px', 
                      bgcolor: theme.palette.mode === 'dark' ? 'rgba(0,0,0,0.2)' : 'rgba(0,0,0,0.05)',
                      display: 'flex',
                      alignItems: 'center',
                      px: 2
                    }}
                  >
                    <Box sx={{ display: 'flex', gap: 1 }}>
                      <Box sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: '#ff5f57' }} />
                      <Box sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: '#febc2e' }} />
                      <Box sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: '#28c840' }} />
                    </Box>
                  </Box>
                  <Box 
                    sx={{ 
                      flex: 1, 
                      bgcolor: theme.palette.background.paper,
                      p: 2,
                      display: 'flex',
                      flexDirection: 'column',
                      gap: 2
                    }}
                  >
                    <Box sx={{ display: 'flex', gap: 2 }}>
                      <Box 
                        sx={{ 
                          width: '30%', 
                          height: 20, 
                          bgcolor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)',
                          borderRadius: 1
                        }} 
                      />
                      <Box 
                        sx={{ 
                          width: '20%', 
                          height: 20, 
                          bgcolor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)',
                          borderRadius: 1
                        }} 
                      />
                    </Box>
                    <Box 
                      sx={{ 
                        display: 'grid',
                        gridTemplateColumns: 'repeat(3, 1fr)',
                        gap: 2,
                        flex: 1
                      }}
                    >
                      {[1, 2, 3, 4, 5, 6].map((item) => (
                        <Box 
                          key={item}
                          sx={{ 
                            bgcolor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)',
                            borderRadius: 2,
                            p: 1,
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 1
                          }}
                        >
                          <Box 
                            sx={{ 
                              height: 40, 
                              bgcolor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)',
                              borderRadius: 1
                            }} 
                          />
                          <Box 
                            sx={{ 
                              height: 10, 
                              width: '80%',
                              bgcolor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)',
                              borderRadius: 0.5
                            }} 
                          />
                          <Box 
                            sx={{ 
                              height: 10, 
                              width: '60%',
                              bgcolor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)',
                              borderRadius: 0.5
                            }} 
                          />
                        </Box>
                      ))}
                    </Box>
                  </Box>
                </Paper>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Paper>

      {/* Platforms Section */}
      <Container maxWidth="lg">
        <Box sx={{ mb: 8, textAlign: 'center' }}>
          <Typography 
            variant="h4" 
            component="h2" 
            gutterBottom
            sx={{ fontWeight: 700 }}
          >
            Manage All Your Social Media Platforms
          </Typography>
          <Typography 
            variant="subtitle1" 
            color="textSecondary" 
            sx={{ mb: 4, maxWidth: 700, mx: 'auto' }}
          >
            Connect your accounts and manage everything from one dashboard
          </Typography>
          <Grid container spacing={2} justifyContent="center">
            {platforms.map((platform) => (
              <Grid item key={platform.name}>
                <Paper
                  elevation={2}
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: 1,
                    width: 120,
                    height: 120,
                    borderRadius: 2,
                    transition: 'transform 0.2s, box-shadow 0.2s',
                    '&:hover': {
                      transform: 'translateY(-5px)',
                      boxShadow: 4
                    }
                  }}
                >
                  {platform.icon}
                  <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                    {platform.name}
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Features Section */}
        <Box sx={{ mb: 8 }}>
          <Typography 
            variant="h4" 
            component="h2" 
            gutterBottom 
            sx={{ fontWeight: 700, textAlign: 'center', mb: 4 }}
          >
            Key Features
          </Typography>
          <Grid container spacing={4}>
            {features.map((feature) => (
              <Grid item xs={12} sm={6} md={3} key={feature.title}>
                <Card 
                  sx={{ 
                    height: '100%', 
                    display: 'flex', 
                    flexDirection: 'column',
                    borderRadius: 3,
                    transition: 'transform 0.2s, box-shadow 0.2s',
                    '&:hover': {
                      transform: 'translateY(-5px)',
                      boxShadow: 6
                    }
                  }}
                >
                  <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                    <Box sx={{ mb: 2, display: 'flex', justifyContent: 'center' }}>
                      {feature.icon}
                    </Box>
                    <Typography gutterBottom variant="h5" component="h3" sx={{ fontWeight: 600 }}>
                      {feature.title}
                    </Typography>
                    <Typography sx={{ mb: 2 }}>
                      {feature.description}
                    </Typography>
                    <Box sx={{ mt: 'auto' }}>
                      <Button 
                        component={Link} 
                        to={feature.link} 
                        variant="outlined" 
                        size="small"
                        sx={{ borderRadius: 2 }}
                      >
                        Learn More
                      </Button>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Benefits Section */}
        <Box sx={{ mb: 8 }}>
          <Typography 
            variant="h4" 
            component="h2" 
            gutterBottom 
            sx={{ fontWeight: 700, textAlign: 'center', mb: 4 }}
          >
            Why Choose Our Platform?
          </Typography>
          <Grid container spacing={4}>
            {benefits.map((benefit) => (
              <Grid item xs={12} md={6} key={benefit.title}>
                <Paper
                  elevation={2}
                  sx={{
                    p: 3,
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: 3,
                    borderRadius: 3,
                    height: '100%'
                  }}
                >
                  <Box>
                    {benefit.icon}
                  </Box>
                  <Box>
                    <Typography variant="h6" component="h3" sx={{ fontWeight: 600, mb: 1 }}>
                      {benefit.title}
                    </Typography>
                    <Typography variant="body1" color="textSecondary">
                      {benefit.description}
                    </Typography>
                  </Box>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Call to Action */}
        <Box 
          sx={{ 
            textAlign: 'center', 
            py: 6, 
            px: 4,
            borderRadius: 4,
            background: `linear-gradient(45deg, ${theme.palette.primary.dark} 30%, ${theme.palette.primary.main} 90%)`,
            color: 'white'
          }}
        >
          <Typography variant="h4" component="h2" gutterBottom sx={{ fontWeight: 700 }}>
            Ready to Streamline Your Social Media Management?
          </Typography>
          <Typography variant="h6" sx={{ mb: 4, opacity: 0.9 }}>
            Get started today and take control of your social media presence
          </Typography>
          <Button 
            component={Link} 
            to="/dashboard" 
            variant="contained" 
            size="large"
            sx={{ 
              px: 4, 
              py: 1.5,
              borderRadius: 2,
              fontWeight: 600,
              bgcolor: 'white',
              color: theme.palette.primary.dark,
              '&:hover': {
                bgcolor: 'rgba(255, 255, 255, 0.9)'
              }
            }}
          >
            Get Started Now
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default Home;
