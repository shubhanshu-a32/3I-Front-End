import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';
import postService from '../api/postService';
import PostItem from '../components/PostItem';

const AllPosts = () => {
  const { isAuthenticated, loading: authLoading } = useAuth();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (isAuthenticated) {
      const fetchPosts = async () => {
        try {
          const data = await postService.getPosts();
          setPosts(Array.isArray(data) ? data : []);
          setLoading(false);
        } catch (error) {
          setError('Failed to load posts.');
          setLoading(false);
        }
      };
      fetchPosts();
    } else {
      setLoading(false);
    }
  }, [isAuthenticated]);

  if (authLoading || loading) {
    return <div className="loading">Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="all-posts-page">
      <h1>All Posts</h1>
      {posts.length === 0 ? (
        <p>No posts yet. Be the first to share your idea!</p>
      ) : (
        <div className="posts-grid">
          {posts.map((post) => (
            <PostItem key={post._id} post={post} />
          ))}
        </div>
      )}
    </div>
  );
};

export default AllPosts; 