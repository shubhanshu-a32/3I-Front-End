import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';

const CreatePost = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    category: 'Idea',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [wordCount, setWordCount] = useState(0);
  
  const { title, content, category } = formData;
  
  const onChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    
    // Update word count when content changes
    if (name === 'content') {
      // Count words by splitting on whitespace and filtering out empty strings
      const words = value.trim().split(/\s+/).filter(word => word !== '');
      setWordCount(words.length);
    }
  };
  
  const onSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (!title || !content || !category) {
      setError('Please fill in all fields');
      return;
    }
    
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      };
      
      await axios.post('/api/posts', formData, config);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create post');
      setLoading(false);
    }
  };
  
  return (
    <div className="create-post-page">
      <div className="form-container">
        <h1>Create New Post</h1>
        {error && <div className="alert alert-danger">{error}</div>}
        
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              name="title"
              value={title}
              onChange={onChange}
              placeholder="Enter post title"
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="category">Category</label>
            <select
              id="category"
              name="category"
              value={category}
              onChange={onChange}
              required
            >
              <option value="Idea">Idea</option>
              <option value="Innovation">Innovation</option>
              <option value="Identity">Identity</option>
            </select>
          </div>
          
          <div className="form-group">
            <label htmlFor="content">Content</label>
            <textarea
              id="content"
              name="content"
              value={content}
              onChange={onChange}
              rows="6"
              placeholder="Share your thoughts..."
              required
            ></textarea>
            <div className="word-count">
              Word count: {wordCount}
            </div>
          </div>
          
          <button 
            type="submit" 
            className="btn btn-primary"
            disabled={loading}
          >
            {loading ? 'Creating...' : 'Create Post'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreatePost;