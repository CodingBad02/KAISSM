import React, { createContext, useState, useEffect } from 'react';
import * as authService from '../services/authService';
import { supabase } from '../services/supabaseClient';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for authenticated user in Supabase session
    const checkSession = async () => {
      const { data, error } = await supabase.auth.getSession();
      
      if (!error && data.session) {
        // Get user profile data
        const { data: profileData } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', data.session.user.id)
          .single();
          
        const userData = {
          ...data.session.user,
          name: profileData?.name || data.session.user.user_metadata?.full_name || 'User',
          role: profileData?.role || 'user',
          profilePic: profileData?.profile_pic || data.session.user.user_metadata?.avatar_url || 'https://via.placeholder.com/150',
        };
        
        setCurrentUser(userData);
        localStorage.setItem('currentUser', JSON.stringify(userData));
      } else {
        // Fallback to localStorage for compatibility
        const user = localStorage.getItem('currentUser');
        if (user) {
          setCurrentUser(JSON.parse(user));
        }
      }
      
      setLoading(false);
    };
    
    checkSession();
    
    // Set up auth state listener
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (event === 'SIGNED_IN' && session) {
          // Get user profile data
          const { data: profileData } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', session.user.id)
            .single();
            
          const userData = {
            ...session.user,
            name: profileData?.name || session.user.user_metadata?.full_name || 'User',
            role: profileData?.role || 'user',
            profilePic: profileData?.profile_pic || session.user.user_metadata?.avatar_url || 'https://via.placeholder.com/150',
          };
          
          setCurrentUser(userData);
          localStorage.setItem('currentUser', JSON.stringify(userData));
        } else if (event === 'SIGNED_OUT') {
          setCurrentUser(null);
          localStorage.removeItem('currentUser');
        }
      }
    );
    
    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  // Login function
  const login = async (email, password) => {
    try {
      const result = await authService.login(email, password);
      if (result.success) {
        setCurrentUser(result.user);
      }
      return result;
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, error: 'Authentication failed' };
    }
  };

  // Logout function
  const logout = async () => {
    try {
      const result = await authService.logout();
      if (result.success) {
        setCurrentUser(null);
      }
      return result;
    } catch (error) {
      console.error('Logout error:', error);
      return { success: false, error: 'Logout failed' };
    }
  };

  // Register function
  const register = async (name, email, password) => {
    try {
      const result = await authService.register(name, email, password);
      if (result.success) {
        setCurrentUser(result.user);
      }
      return result;
    } catch (error) {
      console.error('Registration error:', error);
      return { success: false, error: 'Registration failed' };
    }
  };

  // OAuth login function
  const oauthLogin = async (provider) => {
    try {
      return await authService.oauthLogin(provider);
    } catch (error) {
      console.error('OAuth login error:', error);
      return { success: false, error: 'OAuth authentication failed' };
    }
  };

  // Google OAuth login function
  const googleLogin = async () => {
    try {
      return await authService.oauthLogin('google');
    } catch (error) {
      console.error('Google login error:', error);
      return { success: false, error: 'Google authentication failed' };
    }
  };

  // Handle OAuth callback
  const handleAuthCallback = async () => {
    try {
      const result = await authService.handleAuthCallback();
      if (result.success) {
        setCurrentUser(result.user);
      }
      return result;
    } catch (error) {
      console.error('Auth callback error:', error);
      return { success: false, error: 'Authentication callback failed' };
    }
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        loading,
        login,
        logout,
        register,
        oauthLogin,
        googleLogin,
        handleAuthCallback
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
