import { useAuth } from '../context/AuthContext';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = () => {
  const { isAuthenticated, loading } = useAuth();
  
  // If still loading authentication status, show loading indicator
  if (loading) {
    return <div className="loading">Loading...</div>;
  }
  
  // If not authenticated, redirect to login
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  
  // If authenticated, render the protected content
  return <Outlet />;
};

export default PrivateRoute;