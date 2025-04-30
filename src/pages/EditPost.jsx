import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import postService from '../services/postService';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EditPost = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');
  const [wordCount, setWordCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const { user } = useAuth();
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const post = await postService.getPostById(id);
        if (post.author._id !== user._id) {
          toast.error('You are not authorized to edit this post');
          navigate('/dashboard');
          return;
        }
        setTitle(post.title);
        setContent(post.content);
        setCategory(post.category);
        setWordCount(post.content.split(/\s+/).filter(Boolean).length);
        setIsLoading(false);
      } catch (error) {
        setError('Failed to load post');
        setIsLoading(false);
      }
    };

    fetchPost();
  }, [id, user._id, navigate]);

  const handleContentChange = (e) => {
    const newContent = e.target.value;
    const words = newContent.split(/\s+/).filter(Boolean);
    setWordCount(words.length);
    setContent(newContent);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (wordCount > 300) {
      toast.error('Post content cannot exceed 300 words');
      return;
    }

    try {
      await postService.updatePost(id, { title, content, category });
      toast.success('Post updated successfully');
      navigate('/dashboard');
    } catch (error) {
      setError('Failed to update post');
    }
  };

  if (isLoading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <ToastContainer />
      <h1 className="text-3xl font-bold mb-8">Edit Post</h1>
      {error && <div className="text-red-500 mb-4">{error}</div>}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full p-2 border rounded"
            required
          >
            <option value="">Select a category</option>
            <option value="Technology">Technology</option>
            <option value="Business">Business</option>
            <option value="Health">Health</option>
            <option value="Education">Education</option>
            <option value="Entertainment">Entertainment</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Content</label>
          <textarea
            value={content}
            onChange={handleContentChange}
            className="w-full p-2 border rounded h-64"
            required
          />
          <div className="text-sm text-gray-500 mt-2">
            Word count: {wordCount}/300
          </div>
        </div>
        <div className="flex space-x-4">
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Update Post
          </button>
          <button
            type="button"
            onClick={() => navigate('/dashboard')}
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditPost; 