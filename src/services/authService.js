import { supabase } from './supabaseClient';

/**
 * Authentication service using Supabase
 */

/**
 * Login user with email and password
 * @param {string} email - User email
 * @param {string} password - User password
 * @returns {Promise<Object>} - Authentication result
 */
export const login = async (email, password) => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    
    if (error) throw error;
    
    // Get user profile data from profiles table
    const { data: profileData, error: profileError } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', data.user.id)
      .single();
      
    if (profileError) throw profileError;
    
    const userData = {
      ...data.user,
      name: profileData.name,
      role: profileData.role,
      profilePic: profileData.profile_pic,
    };
    
    localStorage.setItem('currentUser', JSON.stringify(userData));
    
    return { 
      success: true, 
      user: userData,
      token: data.session.access_token
    };
  } catch (error) {
    console.error('Login error:', error.message);
    return { success: false, error: error.message };
  }
};

/**
 * Register new user
 * @param {string} name - User name
 * @param {string} email - User email
 * @param {string} password - User password
 * @returns {Promise<Object>} - Registration result
 */
export const register = async (name, email, password) => {
  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });
    
    if (error) throw error;
    
    // Create a profile record for the new user
    const { error: profileError } = await supabase
      .from('profiles')
      .insert([
        { 
          id: data.user.id,
          name,
          email,
          role: 'user', // Default role
          profile_pic: 'https://via.placeholder.com/150',
          created_at: new Date().toISOString()
        }
      ]);
      
    if (profileError) throw profileError;
    
    const userData = {
      ...data.user,
      name,
      role: 'user',
      profilePic: 'https://via.placeholder.com/150',
    };
    
    localStorage.setItem('currentUser', JSON.stringify(userData));
    
    return { 
      success: true, 
      user: userData,
      token: data.session?.access_token
    };
  } catch (error) {
    console.error('Registration error:', error.message);
    return { success: false, error: error.message };
  }
};

/**
 * Logout user
 * @returns {Promise<Object>} - Logout result
 */
export const logout = async () => {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    
    localStorage.removeItem('currentUser');
    return { success: true };
  } catch (error) {
    console.error('Logout error:', error.message);
    return { success: false, error: error.message };
  }
};

/**
 * OAuth login with provider
 * @param {string} provider - OAuth provider (google, facebook, twitter, etc.)
 * @returns {Promise<Object>} - OAuth result
 */
export const oauthLogin = async (provider) => {
  try {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: window.location.origin + '/auth/callback',
      }
    });
    
    if (error) throw error;
    
    return { success: true, url: data.url };
  } catch (error) {
    console.error(`${provider} OAuth error:`, error.message);
    return { success: false, error: error.message };
  }
};

/**
 * Handle OAuth callback
 * @returns {Promise<Object>} - User data
 */
export const handleAuthCallback = async () => {
  try {
    const { data, error } = await supabase.auth.getSession();
    
    if (error) throw error;
    if (!data.session) return { success: false, error: 'No session found' };
    
    // Get user profile data
    const { data: profileData, error: profileError } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', data.session.user.id)
      .single();
    
    // If profile doesn't exist, create one
    if (profileError && profileError.code === 'PGRST116') {
      const newProfile = {
        id: data.session.user.id,
        name: data.session.user.user_metadata?.full_name || 'User',
        email: data.session.user.email,
        role: 'user',
        profile_pic: data.session.user.user_metadata?.avatar_url || 'https://via.placeholder.com/150',
        created_at: new Date().toISOString()
      };
      
      await supabase.from('profiles').insert([newProfile]);
      
      const userData = {
        ...data.session.user,
        name: newProfile.name,
        role: newProfile.role,
        profilePic: newProfile.profile_pic,
      };
      
      localStorage.setItem('currentUser', JSON.stringify(userData));
      
      return { success: true, user: userData };
    }
    
    const userData = {
      ...data.session.user,
      name: profileData.name,
      role: profileData.role,
      profilePic: profileData.profile_pic,
    };
    
    localStorage.setItem('currentUser', JSON.stringify(userData));
    
    return { success: true, user: userData };
  } catch (error) {
    console.error('Auth callback error:', error.message);
    return { success: false, error: error.message };
  }
};
