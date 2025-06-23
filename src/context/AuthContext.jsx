import { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';

const AuthContext = createContext();

// Custom hook to use the auth context
export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  // Set auth token in axios headers
  const setAuthToken = (token) => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      localStorage.setItem('token', token);
    } else {
      delete axios.defaults.headers.common['Authorization'];
      localStorage.removeItem('token');
    }
  };

  useEffect(() => {
    // Check if user is logged in
    const loadUser = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setLoading(false);
          return;
        }

        setAuthToken(token);
        const response = await axios.get(
          import.meta.env.VITE_API_URL + '/users/profile'
        );
        setUser(response.data);
        setIsAuthenticated(true);
      } catch (error) {
        console.error('Error loading user:', error);
        localStorage.removeItem('token');
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, []);

  // Register user
  const register = async (userData) => {
    try {
      const response = await axios.post(
        import.meta.env.VITE_API_URL + '/users/register',
        userData
      );
      const { token } = response.data;
      
      // Set token in localStorage and axios headers
      setAuthToken(token);
      
      // Set user data
      setUser(response.data);
      setIsAuthenticated(true);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Registration failed' };
    }
  };

  // Login user
  const login = async (userData) => {
    try {
      const response = await axios.post(
        import.meta.env.VITE_API_URL + '/users/login',
        userData
      );
      const { token } = response.data;
      
      // Set token in localStorage and axios headers
      setAuthToken(token);
      
      // Set user data
      setUser(response.data);
      setIsAuthenticated(true);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Invalid credentials' };
    }
  };

  // Logout user
  const logout = () => {
    setAuthToken(null);
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        loading,
        register,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;