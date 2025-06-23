import { Link } from 'react-router-dom';
import { FaHeart, FaShareAlt, FaRegHeart, FaEdit, FaTrash } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';
import postService from '../api/postService';
import '../styles/PostItem.css';
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';

const PostItem = ({ post, onDelete }) => {
  const { user, isAuthenticated } = useAuth();

  // Check if current user has liked the post
  const isLiked = isAuthenticated && post.likes?.includes(user?._id);

  // Format date
  const formattedDate = new Date(post.createdAt).toLocaleDateString();

  // Handle like
  const handleLike = async () => {
    if (!isAuthenticated) {
      return;
    }

    try {
      await postService.likePost(post._id);
      // You would typically update the post in state here
      // This is simplified for the example
      window.location.reload();
    } catch (error) {
      console.error('Error liking post:', error);
    }
  };

  // Handle share
  const handleShare = async () => {
    if (!isAuthenticated) {
      return;
    }

    try {
      await postService.sharePost(post._id);
      const shareUrl = `${window.location.origin}/post/${post._id}`;
      await navigator.clipboard.writeText(shareUrl);
      toast.success('Share link copied to clipboard!');
    } catch (error) {
      toast.error('Error sharing post');
    }
  };

  return (
    <div className="post-card">
      <div className="post-category">{post.category}</div>
      <h3 className="post-title">
        <Link to={`/post/${post._id}`}>{post.title}</Link>
      </h3>
      <p className="post-content">
        {post.content.length > 100
          ? `${post.content.substring(0, 100)}...`
          : post.content}
      </p>
      <div className="post-meta">
        <div className="post-author">
          By: {post.user?.name}
        </div>
        <div className="post-date">{formattedDate}</div>
      </div>
      <div className="post-actions">
        <button
          onClick={handleLike}
          className={`btn-like ${isLiked ? 'liked' : ''}`}
          disabled={!isAuthenticated}
        >
          {isLiked ? <FaHeart /> : <FaRegHeart />} {post.likes?.length || 0}
        </button>
        <button
          onClick={handleShare}
          className="btn-share"
          disabled={!isAuthenticated}
        >
          <FaShareAlt />
        </button>
        {user?._id === post.user?._id && (
          <div className="post-owner-actions">
            <Link
              to={`/edit-post/${post._id}`}
              className="btn-edit"
            >
              <FaEdit /> Edit
            </Link>
            <button
              onClick={() => onDelete(post._id)}
              className="btn-delete"
            >
              <FaTrash /> Delete
            </button>
          </div>
        )}
      </div>
      <ToastContainer />
    </div>
  );
};

export default PostItem;
