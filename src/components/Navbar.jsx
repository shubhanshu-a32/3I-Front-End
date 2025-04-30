import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import { FaSignInAlt, FaSignOutAlt, FaUser, FaPlus } from 'react-icons/fa';

const Navbar = () => {
  const { user, isAuthenticated, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const onLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="container">
        <Link to="/" className="navbar-brand">
          <h1>3I - Idea Innovation Identity</h1>
        </Link>
        <ul className="navbar-nav">
          {isAuthenticated ? (
            <>
              <li className="nav-item">
                <Link to="/dashboard" className="nav-link">
                  Dashboard
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/create-post" className="nav-link">
                  <FaPlus /> Create Post
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/profile" className="nav-link">
                  <FaUser /> {user.name}
                </Link>
              </li>
              <li className="nav-item">
                <button onClick={onLogout} className="btn btn-link nav-link">
                  <FaSignOutAlt /> Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li className="nav-item">
                <Link to="/login" className="nav-link">
                  <FaSignInAlt /> Login
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/register" className="nav-link">
                  <FaUser /> Register
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;