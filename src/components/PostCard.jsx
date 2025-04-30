import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { formatDistanceToNow } from 'date-fns';

const PostCard = ({ post }) => {
  const { user } = useAuth();

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-4">
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-xl font-semibold mb-2">
            <Link to={`/post/${post._id}`} className="hover:text-blue-600">
              {post.title}
            </Link>
          </h2>
          <p className="text-gray-600 mb-4">{post.content.substring(0, 150)}...</p>
        </div>
        {user && user._id === post.author._id && (
          <div className="flex space-x-2">
            <Link
              to={`/edit-post/${post._id}`}
              className="text-blue-600 hover:text-blue-800"
            >
              Edit
            </Link>
          </div>
        )}
      </div>
      <div className="flex items-center justify-between text-sm text-gray-500">
        <div>
          <span>By {post.author.name}</span>
          <span className="mx-2">•</span>
          <span>{formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}</span>
        </div>
        <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">
          {post.category}
        </span>
      </div>
    </div>
  );
};

export default PostCard; 