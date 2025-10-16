import React, { createContext, useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import api from '../services/api';

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('umoja_token');
    if (!token) {
      setLoading(false);
      return;
    }

    api
      .get('/auth/me')
      .then((response) => {
        setUser(response.data.user);
      })
      .catch(() => {
        localStorage.removeItem('umoja_token');
      })
      .finally(() => setLoading(false));
  }, []);

  const value = useMemo(
    () => ({
      user,
      loading,
      isAuthenticated: Boolean(user),
      login: async (credentials) => {
        console.log('🔐 Attempting login...');
        try {
          const { data } = await api.post('/auth/login', credentials);
          console.log('✅ Login successful:', data.user);
          localStorage.setItem('umoja_token', data.token);
          setUser(data.user);
          return data.user;
        } catch (error) {
          console.error('❌ Login failed:', error.response?.data || error.message);
          throw error;
        }
      },
      register: async (payload) => {
        console.log('📝 Attempting registration...');
        try {
          const { data } = await api.post('/auth/register', payload);
          console.log('✅ Registration successful:', data.user);
          localStorage.setItem('umoja_token', data.token);
          setUser(data.user);
          return data.user;
        } catch (error) {
          console.error('❌ Registration failed:', error.response?.data || error.message);
          throw error;
        }
      },
      logout: () => {
        console.log('👋 Logging out...');
        localStorage.removeItem('umoja_token');
        setUser(null);
      },
    }),
    [user, loading]
  );

  return <AuthContext.Provider value={value}>{loading ? <div className="loading">Loading...</div> : children}</AuthContext.Provider>;
}

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
