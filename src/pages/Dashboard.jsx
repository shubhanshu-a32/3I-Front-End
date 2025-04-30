import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import postService from '../api/postService';
import PostItem from '../components/PostItem';

const Dashboard = () => {
  const { user } = useAuth();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [deleteError, setDeleteError] = useState('');
  
  console.log('Dashboard - User:', user);
  
  useEffect(() => {
    console.log('Dashboard - useEffect triggered, user._id:', user?._id);
    if (user?._id) {
      const fetchUserPosts = async () => {
        try {
          console.log('Dashboard - Fetching posts...');
          setLoading(true);
          setError('');
          const allPosts = await postService.getPosts();
          console.log('Dashboard - All posts:', allPosts);
          const userPosts = allPosts.filter(
            (post) => post.user?._id === user._id
          );
          console.log('Dashboard - User posts:', userPosts);
          setPosts(userPosts);
        } catch (error) {
          console.error('Error fetching user posts:', error);
          setError(error.response?.data?.message || 'Failed to load posts');
        } finally {
          setLoading(false);
        }
      };
      
      fetchUserPosts();
    } else {
      console.log('Dashboard - No user ID available');
      setLoading(false);
    }
  }, [user?._id]);
  
  const handleDeletePost = async (postId) => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      try {
        console.log('Dashboard - Deleting post:', postId);
        setDeleteError('');
        await postService.deletePost(postId);
        setPosts(posts.filter((post) => post._id !== postId));
      } catch (error) {
        console.error('Error deleting post:', error);
        setDeleteError(error.response?.data?.message || 'Failed to delete post');
      }
    }
  };
  
  if (loading) {
    console.log('Dashboard - Loading state');
    return <div className="loading">Loading...</div>;
  }

  if (error) {
    console.log('Dashboard - Error state:', error);
    return <div className="error">{error}</div>;
  }
  
  return (
    <div className="dashboard-page">
      <div className="dashboard-header">
        <h1>Dashboard</h1>
        <Link to="/create-post" className="btn btn-primary">
          Create New Post
        </Link>
      </div>
      
      {deleteError && <div className="alert alert-danger">{deleteError}</div>}
      
      <div className="dashboard-stats">
        <div className="stat-card">
          <h3>Your Posts</h3>
          <p className="stat-number">{posts.length}</p>
        </div>
        <div className="stat-card">
          <h3>Total Likes</h3>
          <p className="stat-number">
            {posts.reduce((total, post) => total + (post.likes?.length || 0), 0)}
          </p>
        </div>
        <div className="stat-card">
          <h3>Total Shares</h3>
          <p className="stat-number">
            {posts.reduce((total, post) => total + (post.shares || 0), 0)}
          </p>
        </div>
      </div>
      
      <div className="dashboard-posts">
        <h2>Your Posts</h2>
        {posts.length === 0 ? (
          <p>You haven't created any posts yet.</p>
        ) : (
          posts.map((post) => (
            <PostItem
              key={post._id}
              post={post}
              onDelete={() => handleDeletePost(post._id)}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default Dashboard;