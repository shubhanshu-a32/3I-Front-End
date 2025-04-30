import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import postService from '../api/postService';
import PostItem from '../components/PostItem';

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await postService.getPosts();
        setPosts(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching posts:', error);
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="home-page">
      <div className="hero">
        <h1>Welcome to 3I Platform</h1>
        <p>Share your ideas, innovations, and identity with the world</p>
        <Link to="/register" className="btn btn-primary">
          Get Started
        </Link>
      </div>

      <div className="posts-container">
        <h2>Latest Ideas & Innovations</h2>
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
    </div>
  );
};

export default Home;