import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';

const Profile = () => {
  const { user, isAuthenticated } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    bio: '',
    password: '',
    confirmPassword: '',
  });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        bio: user.bio || '',
        password: '',
        confirmPassword: '',
      });
    }
  }, [user]);

  const { name, email, bio, password, confirmPassword } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    // Validate passwords if provided
    if (password && password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      setLoading(true);
      
      // Only include password if it's provided
      const updateData = {
        name,
        email,
        bio
      };
      
      if (password) {
        updateData.password = password;
      }

      const token = localStorage.getItem('token');
      const config = {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      };

      const response = await axios.put('/api/users/profile', updateData, config);
      
      setMessage('Profile updated successfully');
      // Update local user data if needed
      
      setLoading(false);
    } catch (err) {
      setError(err.response?.data?.message || 'Error updating profile');
      setLoading(false);
    }
  };

  if (!isAuthenticated) {
    return <div>Please log in to view your profile</div>;
  }

  return (
    <div className="profile-page">
      <div className="profile-container">
        <h1>Your Profile</h1>
        {message && <div className="alert alert-success">{message}</div>}
        {error && <div className="alert alert-danger">{error}</div>}
        
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={name}
              onChange={onChange}
              placeholder="Your name"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={onChange}
              placeholder="Your email"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="bio">Bio</label>
            <textarea
              id="bio"
              name="bio"
              value={bio}
              onChange={onChange}
              placeholder="Tell us about yourself"
              rows="4"
            ></textarea>
          </div>
          
          <div className="form-group">
            <label htmlFor="password">New Password (leave blank to keep current)</label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={onChange}
              placeholder="New password"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm New Password</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={confirmPassword}
              onChange={onChange}
              placeholder="Confirm new password"
            />
          </div>
          
          <button 
            type="submit" 
            className="btn btn-primary"
            disabled={loading}
          >
            {loading ? 'Updating...' : 'Update Profile'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Profile;