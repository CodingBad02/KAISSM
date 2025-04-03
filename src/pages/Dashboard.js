import React, { useContext, useState } from 'react';
import { 
  Box, 
  Grid, 
  Card, 
  CardContent, 
  CardHeader, 
  Typography, 
  Button, 
  Avatar, 
  IconButton, 
  Divider, 
  List, 
  ListItem, 
  ListItemText, 
  ListItemAvatar, 
  Chip,
  Tabs,
  Tab,
  Badge,
  useTheme
} from '@mui/material';
import { 
  CalendarToday as CalendarIcon, 
  TrendingUp as TrendingUpIcon, 
  Message as MessageIcon, 
  Notifications as NotificationsIcon,
  Add as AddIcon,
  MoreVert as MoreVertIcon,
  ArrowForward as ArrowForwardIcon,
  Schedule as ScheduleIcon,
  Visibility as VisibilityIcon,
  ThumbUp as ThumbUpIcon,
  Comment as CommentIcon,
  BarChart as BarChartIcon,
  DonutLarge as DonutLargeIcon,
  Timeline as TimelineIcon
} from '@mui/icons-material';
import { FaInstagram, FaLinkedin, FaWhatsapp, FaFacebook, FaTwitter } from 'react-icons/fa';
import { PostContext } from '../context/PostContext';
import moment from 'moment';
import { Link, useNavigate } from 'react-router-dom';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';

const Dashboard = () => {
  const { posts } = useContext(PostContext);
  const theme = useTheme();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(0);
  
  // Sort posts by date to get the upcoming ones
  const upcomingPosts = [...posts]
    .filter(post => {
      // Check if the post has a start date and it's in the future
      if (!post.start) return false;
      const postDate = new Date(post.start);
      return postDate > new Date();
    })
    .sort((a, b) => new Date(a.start) - new Date(b.start))
    .slice(0, 5); // Show only next 5 posts

  // Completed and published posts count (in the past)
  const completedPosts = posts.filter(post => {
    if (!post.start) return false;
    const postDate = new Date(post.start);
    return postDate < new Date();
  }).length;
  
  // Sample data for charts
  const weeklyEngagementData = [
    { day: 'Mon', likes: 120, comments: 45, shares: 20 },
    { day: 'Tue', likes: 150, comments: 55, shares: 30 },
    { day: 'Wed', likes: 180, comments: 70, shares: 40 },
    { day: 'Thu', likes: 135, comments: 50, shares: 25 },
    { day: 'Fri', likes: 200, comments: 80, shares: 50 },
    { day: 'Sat', likes: 220, comments: 90, shares: 60 },
    { day: 'Sun', likes: 170, comments: 65, shares: 35 }
  ];

  const platformDistributionData = [
    { name: 'Instagram', value: 35, color: '#E1306C' },
    { name: 'LinkedIn', value: 25, color: '#0077B5' },
    { name: 'Facebook', value: 20, color: '#1877F2' },
    { name: 'Twitter', value: 15, color: '#1DA1F2' },
    { name: 'WhatsApp', value: 5, color: '#25D366' }
  ];

  const contentPerformanceData = [
    { type: 'Images', engagement: 65 },
    { type: 'Videos', engagement: 85 },
    { type: 'Text', engagement: 40 },
    { type: 'Links', engagement: 55 },
    { type: 'Stories', engagement: 75 }
  ];

  const recentActivities = [
    { 
      platform: 'instagram', 
      time: '10:23 AM', 
      content: 'New comment on your post', 
      isNew: true 
    },
    { 
      platform: 'linkedin', 
      time: 'Yesterday', 
      content: '5 new post reactions', 
      isNew: true 
    },
    { 
      platform: 'whatsapp', 
      time: 'Yesterday', 
      content: '3 new customer inquiries', 
      isNew: false 
    },
    { 
      platform: 'facebook', 
      time: 'Jun 15', 
      content: '2 new shares on your post', 
      isNew: false 
    },
    { 
      platform: 'twitter', 
      time: 'Jun 15', 
      content: '10 new retweets', 
      isNew: false 
    },
    { 
      platform: 'system', 
      time: 'Jun 15', 
      content: 'Weekly analytics report generated', 
      isNew: false 
    }
  ];

  const getPlatformIcon = (platform, size = 24) => {
    switch (platform) {
      case 'instagram': return <FaInstagram size={size} color="#E1306C" />;
      case 'linkedin': return <FaLinkedin size={size} color="#0077B5" />;
      case 'whatsapp': return <FaWhatsapp size={size} color="#25D366" />;
      case 'facebook': return <FaFacebook size={size} color="#1877F2" />;
      case 'twitter': return <FaTwitter size={size} color="#1DA1F2" />;
      case 'system': return <BarChartIcon style={{ fontSize: size, color: theme.palette.primary.main }} />;
      default: return null;
    }
  };

  const getPlatformColor = (platform) => {
    switch (platform) {
      case 'instagram': return '#E1306C';
      case 'linkedin': return '#0077B5';
      case 'whatsapp': return '#25D366';
      case 'facebook': return '#1877F2';
      case 'twitter': return '#1DA1F2';
      default: return theme.palette.primary.main;
    }
  };

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  return (
    <Box sx={{ pb: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Typography variant="h4" component="h1" fontWeight="bold">
            Dashboard
          </Typography>
          <Button 
            variant="outlined" 
            size="small"
            startIcon={<ArrowForwardIcon sx={{ transform: 'rotate(180deg)' }} />}
            onClick={() => navigate('/')}
            sx={{ borderRadius: 2 }}
          >
            Back to Home
          </Button>
        </Box>
        <Button 
          variant="contained" 
          startIcon={<AddIcon />}
          onClick={() => navigate('/calendar')}
          sx={{ borderRadius: 2 }}
        >
          Create Post
        </Button>
      </Box>
      
      {/* Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card 
            elevation={2} 
            sx={{ 
              borderRadius: 3,
              height: '100%',
              position: 'relative',
              overflow: 'hidden'
            }}
          >
            <Box 
              sx={{ 
                position: 'absolute', 
                top: 0, 
                left: 0, 
                width: '100%', 
                height: '4px', 
                bgcolor: theme.palette.primary.main 
              }} 
            />
            <CardContent sx={{ p: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 2 }}>
                <Avatar 
                  sx={{ 
                    bgcolor: theme.palette.mode === 'dark' 
                      ? 'rgba(144, 202, 249, 0.2)' 
                      : 'rgba(25, 118, 210, 0.1)', 
                    color: theme.palette.primary.main,
                    mr: 2
                  }}
                >
                  <CalendarIcon />
                </Avatar>
                <Box>
                  <Typography variant="subtitle2" color="textSecondary">
                    Scheduled Posts
                  </Typography>
                  <Typography variant="h4" component="div" fontWeight="bold">
                    {upcomingPosts.length || 0}
                  </Typography>
                </Box>
              </Box>
              <Typography variant="body2" color="textSecondary">
                {upcomingPosts.length > 0 
                  ? <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <ScheduleIcon sx={{ fontSize: 16, mr: 0.5 }} />
                      Next post in {moment(upcomingPosts[0].start).fromNow()}
                    </Box>
                  : 'No upcoming posts'}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} sm={6} md={3}>
          <Card 
            elevation={2} 
            sx={{ 
              borderRadius: 3,
              height: '100%',
              position: 'relative',
              overflow: 'hidden'
            }}
          >
            <Box 
              sx={{ 
                position: 'absolute', 
                top: 0, 
                left: 0, 
                width: '100%', 
                height: '4px', 
                bgcolor: theme.palette.success.main 
              }} 
            />
            <CardContent sx={{ p: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 2 }}>
                <Avatar 
                  sx={{ 
                    bgcolor: theme.palette.mode === 'dark' 
                      ? 'rgba(102, 187, 106, 0.2)' 
                      : 'rgba(76, 175, 80, 0.1)', 
                    color: theme.palette.success.main,
                    mr: 2
                  }}
                >
                  <TrendingUpIcon />
                </Avatar>
                <Box>
                  <Typography variant="subtitle2" color="textSecondary">
                    Engagement
                  </Typography>
                  <Typography variant="h4" component="div" fontWeight="bold">
                    +24%
                  </Typography>
                </Box>
              </Box>
              <Typography variant="body2" color="textSecondary">
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <ThumbUpIcon sx={{ fontSize: 16, mr: 0.5 }} />
                  Compared to last week
                </Box>
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} sm={6} md={3}>
          <Card 
            elevation={2} 
            sx={{ 
              borderRadius: 3,
              height: '100%',
              position: 'relative',
              overflow: 'hidden'
            }}
          >
            <Box 
              sx={{ 
                position: 'absolute', 
                top: 0, 
                left: 0, 
                width: '100%', 
                height: '4px', 
                bgcolor: theme.palette.info.main 
              }} 
            />
            <CardContent sx={{ p: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 2 }}>
                <Avatar 
                  sx={{ 
                    bgcolor: theme.palette.mode === 'dark' 
                      ? 'rgba(41, 182, 246, 0.2)' 
                      : 'rgba(3, 169, 244, 0.1)', 
                    color: theme.palette.info.main,
                    mr: 2
                  }}
                >
                  <MessageIcon />
                </Avatar>
                <Box>
                  <Typography variant="subtitle2" color="textSecondary">
                    Unread Messages
                  </Typography>
                  <Typography variant="h4" component="div" fontWeight="bold">
                    8
                  </Typography>
                </Box>
              </Box>
              <Typography variant="body2" color="textSecondary">
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <CommentIcon sx={{ fontSize: 16, mr: 0.5 }} />
                  Across 3 platforms
                </Box>
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} sm={6} md={3}>
          <Card 
            elevation={2} 
            sx={{ 
              borderRadius: 3,
              height: '100%',
              position: 'relative',
              overflow: 'hidden'
            }}
          >
            <Box 
              sx={{ 
                position: 'absolute', 
                top: 0, 
                left: 0, 
                width: '100%', 
                height: '4px', 
                bgcolor: theme.palette.warning.main 
              }} 
            />
            <CardContent sx={{ p: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 2 }}>
                <Avatar 
                  sx={{ 
                    bgcolor: theme.palette.mode === 'dark' 
                      ? 'rgba(255, 167, 38, 0.2)' 
                      : 'rgba(255, 152, 0, 0.1)', 
                    color: theme.palette.warning.main,
                    mr: 2
                  }}
                >
                  <NotificationsIcon />
                </Avatar>
                <Box>
                  <Typography variant="subtitle2" color="textSecondary">
                    Notifications
                  </Typography>
                  <Typography variant="h4" component="div" fontWeight="bold">
                    3
                  </Typography>
                </Box>
              </Box>
              <Typography variant="body2" color="textSecondary">
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <VisibilityIcon sx={{ fontSize: 16, mr: 0.5 }} />
                  2 require attention
                </Box>
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      
      {/* Main Dashboard Content */}
      <Grid container spacing={3}>
        {/* Left Column */}
        <Grid item xs={12} md={8}>
          {/* Analytics Overview */}
          <Card sx={{ mb: 3, borderRadius: 3 }}>
            <CardHeader 
              title={
                <Typography variant="h6" fontWeight="bold">
                  Analytics Overview
                </Typography>
              }
              action={
                <Tabs 
                  value={activeTab} 
                  onChange={handleTabChange}
                  textColor="primary"
                  indicatorColor="primary"
                  sx={{ minHeight: 0 }}
                >
                  <Tab 
                    label="Engagement" 
                    icon={<ThumbUpIcon sx={{ fontSize: 16 }} />} 
                    iconPosition="start"
                    sx={{ minHeight: 0, py: 1 }}
                  />
                  <Tab 
                    label="Platforms" 
                    icon={<DonutLargeIcon sx={{ fontSize: 16 }} />} 
                    iconPosition="start"
                    sx={{ minHeight: 0, py: 1 }}
                  />
                  <Tab 
                    label="Content" 
                    icon={<TimelineIcon sx={{ fontSize: 16 }} />} 
                    iconPosition="start"
                    sx={{ minHeight: 0, py: 1 }}
                  />
                </Tabs>
              }
            />
            <Divider />
            <CardContent sx={{ p: 2 }}>
              {activeTab === 0 && (
                <Box sx={{ height: 300 }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={weeklyEngagementData}
                      margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="day" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="likes" fill={theme.palette.primary.main} />
                      <Bar dataKey="comments" fill={theme.palette.secondary.main} />
                      <Bar dataKey="shares" fill={theme.palette.success.main} />
                    </BarChart>
                  </ResponsiveContainer>
                </Box>
              )}
              {activeTab === 1 && (
                <Box sx={{ height: 300, display: 'flex', justifyContent: 'center' }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={platformDistributionData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {platformDistributionData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </Box>
              )}
              {activeTab === 2 && (
                <Box sx={{ height: 300 }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={contentPerformanceData}
                      layout="vertical"
                      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis type="number" />
                      <YAxis dataKey="type" type="category" />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="engagement" fill={theme.palette.primary.main} />
                    </BarChart>
                  </ResponsiveContainer>
                </Box>
              )}
            </CardContent>
          </Card>

          {/* Upcoming Posts */}
          <Card sx={{ borderRadius: 3 }}>
            <CardHeader 
              title={
                <Typography variant="h6" fontWeight="bold">
                  Upcoming Posts
                </Typography>
              }
              action={
                <Button 
                  variant="text" 
                  endIcon={<ArrowForwardIcon />}
                  component={Link}
                  to="/calendar"
                  size="small"
                >
                  View Calendar
                </Button>
              }
            />
            <Divider />
            <CardContent sx={{ p: 0 }}>
              {upcomingPosts.length > 0 ? (
                <List sx={{ p: 0 }}>
                  {upcomingPosts.map((post, index) => (
                    <React.Fragment key={post.id}>
                      <ListItem 
                        sx={{ 
                          py: 2,
                          px: 3,
                          '&:hover': {
                            bgcolor: theme.palette.mode === 'dark' 
                              ? 'rgba(255, 255, 255, 0.05)' 
                              : 'rgba(0, 0, 0, 0.02)'
                          }
                        }}
                        secondaryAction={
                          <Button 
                            variant="outlined" 
                            size="small"
                            component={Link}
                            to="/calendar"
                            sx={{ 
                              borderRadius: 2,
                              borderColor: getPlatformColor(post.platform),
                              color: getPlatformColor(post.platform),
                              '&:hover': {
                                borderColor: getPlatformColor(post.platform),
                                bgcolor: theme.palette.mode === 'dark' 
                                  ? 'rgba(255, 255, 255, 0.05)' 
                                  : 'rgba(0, 0, 0, 0.02)'
                              }
                            }}
                          >
                            View
                          </Button>
                        }
                      >
                        <ListItemAvatar>
                          <Avatar 
                            sx={{ 
                              bgcolor: theme.palette.mode === 'dark' 
                                ? 'rgba(255, 255, 255, 0.1)' 
                                : 'rgba(0, 0, 0, 0.05)',
                              color: getPlatformColor(post.platform)
                            }}
                          >
                            {getPlatformIcon(post.platform)}
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                          primary={
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                              <Typography variant="subtitle1" fontWeight="medium">
                                {post.title}
                              </Typography>
                              <Chip 
                                label={post.platform.charAt(0).toUpperCase() + post.platform.slice(1)} 
                                size="small"
                                sx={{ 
                                  ml: 1,
                                  bgcolor: theme.palette.mode === 'dark' 
                                    ? 'rgba(255, 255, 255, 0.05)' 
                                    : 'rgba(0, 0, 0, 0.05)',
                                  color: getPlatformColor(post.platform),
                                  fontWeight: 'medium',
                                  borderRadius: 1
                                }}
                              />
                            </Box>
                          }
                          secondary={
                            <Typography variant="body2" color="textSecondary">
                              Scheduled for: {moment(post.start).format('MMM D, h:mm A')}
                            </Typography>
                          }
                        />
                      </ListItem>
                      {index < upcomingPosts.length - 1 && <Divider component="li" />}
                    </React.Fragment>
                  ))}
                </List>
              ) : (
                <Box sx={{ p: 4, textAlign: 'center' }}>
                  <Typography variant="body1" color="textSecondary" gutterBottom>
                    No upcoming posts scheduled
                  </Typography>
                  <Button 
                    variant="contained" 
                    startIcon={<AddIcon />}
                    component={Link}
                    to="/calendar"
                    sx={{ mt: 2, borderRadius: 2 }}
                  >
                    Schedule a Post
                  </Button>
                </Box>
              )}
            </CardContent>
          </Card>
        </Grid>
        
        {/* Right Column */}
        <Grid item xs={12} md={4}>
          {/* Recent Activity */}
          <Card sx={{ borderRadius: 3, mb: 3 }}>
            <CardHeader 
              title={
                <Typography variant="h6" fontWeight="bold">
                  Recent Activity
                </Typography>
              }
              action={
                <IconButton size="small">
                  <MoreVertIcon />
                </IconButton>
              }
            />
            <Divider />
            <CardContent sx={{ p: 0 }}>
              <List sx={{ p: 0 }}>
                {recentActivities.map((activity, index) => (
                  <React.Fragment key={index}>
                    <ListItem 
                      sx={{ 
                        py: 2,
                        px: 3,
                        '&:hover': {
                          bgcolor: theme.palette.mode === 'dark' 
                            ? 'rgba(255, 255, 255, 0.05)' 
                            : 'rgba(0, 0, 0, 0.02)'
                        }
                      }}
                    >
                      <ListItemAvatar>
                        <Badge 
                          variant="dot" 
                          color="error" 
                          invisible={!activity.isNew}
                          overlap="circular"
                          anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                          }}
                        >
                          <Avatar 
                            sx={{ 
                              bgcolor: theme.palette.mode === 'dark' 
                                ? 'rgba(255, 255, 255, 0.1)' 
                                : 'rgba(0, 0, 0, 0.05)',
                              color: getPlatformColor(activity.platform)
                            }}
                          >
                            {getPlatformIcon(activity.platform)}
                          </Avatar>
                        </Badge>
                      </ListItemAvatar>
                      <ListItemText
                        primary={
                          <Typography variant="body2">
                            <Box component="span" fontWeight="bold" sx={{ color: getPlatformColor(activity.platform) }}>
                              {activity.platform.charAt(0).toUpperCase() + activity.platform.slice(1)}:
                            </Box> {activity.content}
                          </Typography>
                        }
                        secondary={
                          <Typography variant="caption" color="textSecondary">
                            {activity.time}
                          </Typography>
                        }
                      />
                    </ListItem>
                    {index < recentActivities.length - 1 && <Divider component="li" />}
                  </React.Fragment>
                ))}
              </List>
            </CardContent>
          </Card>
          
          {/* Platform Performance */}
          <Card sx={{ borderRadius: 3 }}>
            <CardHeader 
              title={
                <Typography variant="h6" fontWeight="bold">
                  Platform Performance
                </Typography>
              }
            />
            <Divider />
            <CardContent>
              <List sx={{ p: 0 }}>
                {platformDistributionData.map((platform, index) => (
                  <React.Fragment key={platform.name}>
                    <ListItem sx={{ px: 0 }}>
                      <ListItemAvatar>
                        <Avatar 
                          sx={{ 
                            bgcolor: theme.palette.mode === 'dark' 
                              ? 'rgba(255, 255, 255, 0.1)' 
                              : 'rgba(0, 0, 0, 0.05)',
                            color: platform.color
                          }}
                        >
                          {getPlatformIcon(platform.name.toLowerCase())}
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Typography variant="body2" fontWeight="medium">
                              {platform.name}
                            </Typography>
                            <Typography variant="body2" fontWeight="bold">
                              {platform.value}%
                            </Typography>
                          </Box>
                        }
                        secondary={
                          <Box sx={{ mt: 1, width: '100%', height: 4, bgcolor: 'rgba(0, 0, 0, 0.1)', borderRadius: 2 }}>
                            <Box 
                              sx={{ 
                                height: '100%', 
                                width: `${platform.value}%`, 
                                bgcolor: platform.color,
                                borderRadius: 2
                              }} 
                            />
                          </Box>
                        }
                      />
                    </ListItem>
                    {index < platformDistributionData.length - 1 && <Divider component="li" sx={{ my: 1 }} />}
                  </React.Fragment>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
