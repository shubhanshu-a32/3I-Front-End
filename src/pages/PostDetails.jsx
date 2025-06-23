import { useState, useEffect, useContext } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { FaHeart, FaRegHeart, FaShareAlt, FaEdit, FaTrash } from 'react-icons/fa';
import AuthContext from '../context/AuthContext';
import postService from '../api/postService';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const PostDetails = () => {
  const { id } = useParams();
  const { user, isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();
  
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const data = await postService.getPostById(id);
        setPost(data);
        setLoading(false);
      } catch (err) {
        setError('Failed to load post');
        setLoading(false);
      }
    };
    
    fetchPost();
  }, [id]);
  
  const isLiked = isAuthenticated && post?.likes.includes(user?._id);
  const isOwner = isAuthenticated && post?.user._id === user?._id;
  
  const handleLike = async () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    
    try {
      const updatedPost = await postService.likePost(post._id);
      setPost(updatedPost);
    } catch (error) {
      console.error('Error liking post:', error);
    }
  };
  
  const handleShare = async () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    
    try {
      const updatedPost = await postService.sharePost(post._id);
      setPost(updatedPost);
      const shareUrl = `${window.location.origin}/post/${post._id}`;
      await navigator.clipboard.writeText(shareUrl);
      toast.success('Share link copied to clipboard!');
    } catch (error) {
      toast.error('Error sharing post');
    }
  };
  
  const handleDelete = async () => {
    if (!isOwner) return;
    
    if (window.confirm('Are you sure you want to delete this post?')) {
      try {
        await postService.deletePost(post._id);
        navigate('/dashboard');
      } catch (error) {
        console.error('Error deleting post:', error);
      }
    }
  };
  
  if (loading) {
    return <div className="loading">Loading...</div>;
  }
  
  if (error) {
    return <div className="error">{error}</div>;
  }
  
  if (!post) {
    return <div className="not-found">Post not found</div>;
  }
  
  return (
    <div className="post-details-page">
      <div className="post-details-container">
        <div className="post-category">{post.category}</div>
        <h1 className="post-title">{post.title}</h1>
        
        <div className="post-meta">
          <div className="post-author">
            By: {post.user.name}
          </div>
          <div className="post-date">
            {new Date(post.createdAt).toLocaleDateString()}
          </div>
        </div>
        
        <div className="post-content">
          {post.content}
        </div>
        
        <div className="post-actions">
          <button
            onClick={handleLike}
            className={`btn-like ${isLiked ? 'liked' : ''}`}
            disabled={!isAuthenticated}
          >
            {isLiked ? <FaHeart /> : <FaRegHeart />} {post.likes.length}
          </button>
          
          <button
            onClick={handleShare}
            className="btn-share"
            disabled={!isAuthenticated}
          >
            <FaShareAlt />
          </button>
          
          {isOwner && (
            <>
              <Link to={`/edit-post/${post._id}`} className="btn btn-edit">
                <FaEdit /> Edit
              </Link>
              
              <button onClick={handleDelete} className="btn btn-delete">
                <FaTrash /> Delete
              </button>
            </>
          )}
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default PostDetails;