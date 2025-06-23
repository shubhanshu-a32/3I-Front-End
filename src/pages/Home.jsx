import { useAuth } from '../context/AuthContext';
import { Link, Navigate } from 'react-router-dom';

const Home = () => {
  const { isAuthenticated, loading: authLoading } = useAuth();

  // If authenticated, redirect to dashboard
  if (!authLoading && isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  // Show loading spinner while auth is being checked
  if (authLoading) {
    return <div className="loading">Loading...</div>;
  }

  // Show public landing page for unauthenticated users
  return (
    <div className="home-page">
      <div className="hero">
        <h1>Welcome to 3I Platform</h1>
        <p>Share your ideas, innovations, and identity with the world</p>
        <Link to="/register" className="btn btn-primary">
          Get Started
        </Link>
      </div>
    </div>
  );
};

export default Home;