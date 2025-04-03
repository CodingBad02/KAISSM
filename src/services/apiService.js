/**
 * API Service for social media platforms
 * 
 * This is a simulated service that would typically connect to a backend API.
 * In a real application, these functions would make actual API calls to your backend,
 * which would then interact with the social media platforms' APIs.
 */

// Simulates API response delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Mock data for demonstration
const MOCK_ANALYTICS = {
  instagram: {
    followers: 12584,
    engagement: 3.8,
    posts: 87,
    likes: 28451,
    comments: 1654,
    views: 105742,
    topPosts: [
      { id: 'post1', likes: 1254, comments: 87, date: '2023-04-15T14:30:00Z' },
      { id: 'post2', likes: 986, comments: 42, date: '2023-04-10T10:15:00Z' },
      { id: 'post3', likes: 1102, comments: 63, date: '2023-04-05T16:45:00Z' },
    ]
  },
  facebook: {
    followers: 8751,
    engagement: 2.5,
    posts: 62,
    likes: 15280,
    comments: 943,
    shares: 412,
    topPosts: [
      { id: 'post1', likes: 754, comments: 43, shares: 12, date: '2023-04-12T11:30:00Z' },
      { id: 'post2', likes: 631, comments: 28, shares: 8, date: '2023-04-08T09:20:00Z' },
      { id: 'post3', likes: 892, comments: 51, shares: 15, date: '2023-04-01T13:10:00Z' },
    ]
  },
  twitter: {
    followers: 5362,
    engagement: 1.9,
    posts: 124,
    likes: 9845,
    retweets: 756,
    replies: 421,
    topTweets: [
      { id: 'tweet1', likes: 423, retweets: 87, replies: 32, date: '2023-04-14T08:45:00Z' },
      { id: 'tweet2', likes: 367, retweets: 54, replies: 21, date: '2023-04-09T16:30:00Z' },
      { id: 'tweet3', likes: 289, retweets: 43, replies: 18, date: '2023-04-04T10:15:00Z' },
    ]
  },
  linkedin: {
    followers: 3841,
    engagement: 4.2,
    posts: 45,
    likes: 7689,
    comments: 543,
    shares: 378,
    topPosts: [
      { id: 'post1', likes: 542, comments: 38, shares: 25, date: '2023-04-13T09:30:00Z' },
      { id: 'post2', likes: 489, comments: 41, shares: 22, date: '2023-04-07T14:45:00Z' },
      { id: 'post3', likes: 621, comments: 56, shares: 31, date: '2023-04-02T11:20:00Z' },
    ]
  },
};

/**
 * Get analytics for all connected platforms
 * @returns {Promise<Object>} - Analytics data
 */
export const getAnalytics = async () => {
  await delay(1000);
  return { success: true, data: MOCK_ANALYTICS };
};

/**
 * Get analytics for a specific platform
 * @param {string} platform - Platform name (instagram, facebook, twitter, linkedin)
 * @returns {Promise<Object>} - Platform analytics
 */
export const getPlatformAnalytics = async (platform) => {
  await delay(800);
  
  if (!MOCK_ANALYTICS[platform]) {
    return { success: false, error: 'Platform not found' };
  }
  
  return { success: true, data: MOCK_ANALYTICS[platform] };
};

/**
 * Get scheduled posts for all platforms
 * @returns {Promise<Object>} - Scheduled posts
 */
export const getScheduledPosts = async () => {
  await delay(800);
  
  // Get existing posts from localStorage or create empty array
  const existingPosts = JSON.parse(localStorage.getItem('scheduledPosts') || '[]');
  
  return { success: true, data: existingPosts };
};

/**
 * Schedule a new post
 * @param {Object} post - Post details (title, content, platforms, media, etc.)
 * @returns {Promise<Object>} - Result with created post
 */
export const schedulePost = async (post) => {
  await delay(1200);
  
  // Get existing posts from localStorage or create empty array
  const existingPosts = JSON.parse(localStorage.getItem('scheduledPosts') || '[]');
  
  // Create new post with ID and dates
  const newPost = {
    id: `post-${Date.now()}`,
    ...post,
    createdAt: new Date().toISOString(),
    status: 'scheduled'
  };
  
  // Add to existing posts
  existingPosts.push(newPost);
  
  // Save back to localStorage
  localStorage.setItem('scheduledPosts', JSON.stringify(existingPosts));
  
  return { success: true, data: newPost };
};

/**
 * Update a scheduled post
 * @param {string} postId - Post ID
 * @param {Object} updates - Post updates
 * @returns {Promise<Object>} - Result with updated post
 */
export const updatePost = async (postId, updates) => {
  await delay(1000);
  
  // Get existing posts from localStorage
  const existingPosts = JSON.parse(localStorage.getItem('scheduledPosts') || '[]');
  
  // Find post index
  const postIndex = existingPosts.findIndex(p => p.id === postId);
  
  if (postIndex === -1) {
    return { success: false, error: 'Post not found' };
  }
  
  // Update post
  const updatedPost = {
    ...existingPosts[postIndex],
    ...updates,
    updatedAt: new Date().toISOString()
  };
  
  existingPosts[postIndex] = updatedPost;
  
  // Save back to localStorage
  localStorage.setItem('scheduledPosts', JSON.stringify(existingPosts));
  
  return { success: true, data: updatedPost };
};

/**
 * Delete a scheduled post
 * @param {string} postId - Post ID
 * @returns {Promise<Object>} - Result
 */
export const deletePost = async (postId) => {
  await delay(800);
  
  // Get existing posts from localStorage
  const existingPosts = JSON.parse(localStorage.getItem('scheduledPosts') || '[]');
  
  // Filter out the post to delete
  const updatedPosts = existingPosts.filter(p => p.id !== postId);
  
  if (updatedPosts.length === existingPosts.length) {
    return { success: false, error: 'Post not found' };
  }
  
  // Save back to localStorage
  localStorage.setItem('scheduledPosts', JSON.stringify(updatedPosts));
  
  return { success: true };
};

/**
 * Get available social media platforms
 * @returns {Promise<Object>} - Platforms data
 */
export const getPlatforms = async () => {
  await delay(500);
  
  const platforms = [
    {
      id: 'instagram',
      name: 'Instagram',
      icon: 'instagram',
      connected: true,
      stats: {
        followers: 12584,
        posts: 87
      }
    },
    {
      id: 'facebook',
      name: 'Facebook',
      icon: 'facebook',
      connected: true,
      stats: {
        followers: 8751,
        posts: 62
      }
    },
    {
      id: 'twitter',
      name: 'Twitter',
      icon: 'twitter',
      connected: true,
      stats: {
        followers: 5362,
        posts: 124
      }
    },
    {
      id: 'linkedin',
      name: 'LinkedIn',
      icon: 'linkedin',
      connected: true,
      stats: {
        followers: 3841,
        posts: 45
      }
    },
    {
      id: 'whatsapp',
      name: 'WhatsApp',
      icon: 'whatsapp',
      connected: false,
      stats: {
        followers: 0,
        posts: 0
      }
    }
  ];
  
  return { success: true, data: platforms };
};

/**
 * Connect a social media platform (simulated)
 * @param {string} platformId - Platform ID
 * @returns {Promise<Object>} - Result
 */
export const connectPlatform = async (platformId) => {
  await delay(1500);
  
  // In a real app, this would redirect to the platform OAuth flow
  // For simulation, we'll just return success
  
  return { 
    success: true, 
    data: { 
      id: platformId,
      connected: true,
      accessToken: `mock-token-${platformId}-${Date.now()}`
    } 
  };
};

/**
 * Disconnect a social media platform (simulated)
 * @param {string} platformId - Platform ID
 * @returns {Promise<Object>} - Result
 */
export const disconnectPlatform = async (platformId) => {
  await delay(800);
  
  // In a real app, this would revoke tokens and update the database
  // For simulation, we'll just return success
  
  return { success: true };
};

/**
 * Get content recommendations based on analytics (simulated AI suggestions)
 * @returns {Promise<Object>} - Content recommendations
 */
export const getContentRecommendations = async () => {
  await delay(1200);
  
  const recommendations = [
    {
      id: 'rec1',
      title: 'Increase engagement with video content',
      description: 'Based on your analytics, videos receive 2.5x more engagement than images.',
      suggestedAction: 'Try posting 2-3 videos per week.',
      platforms: ['instagram', 'facebook']
    },
    {
      id: 'rec2',
      title: 'Optimal posting times',
      description: 'Your audience is most active between 6-8pm on weekdays.',
      suggestedAction: 'Schedule important posts during these peak hours.',
      platforms: ['instagram', 'twitter', 'facebook', 'linkedin']
    },
    {
      id: 'rec3',
      title: 'Content themes that perform well',
      description: 'Posts about industry news and tips receive higher engagement.',
      suggestedAction: 'Create more educational content and industry insights.',
      platforms: ['linkedin', 'twitter']
    },
    {
      id: 'rec4',
      title: 'Hashtag optimization',
      description: 'Using 5-9 relevant hashtags on Instagram maximizes reach.',
      suggestedAction: 'Curate topic-specific hashtag sets for different types of content.',
      platforms: ['instagram']
    },
  ];
  
  return { success: true, data: recommendations };
}; 