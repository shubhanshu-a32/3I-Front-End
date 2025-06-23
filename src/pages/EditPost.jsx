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
    if (!user || !user._id) {
      // Wait for user to be loaded
      return;
    }
    const fetchPost = async () => {
      try {
        const post = await postService.getPostById(id);
        if (!post.user || !post.user._id) {
          setError('Post owner information is missing.');
          setIsLoading(false);
          return;
        }
        if (post.user._id !== user._id) {
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
  }, [id, user, navigate]);

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

  if (!user || !user._id) {
    return <div className="flex justify-center items-center h-screen">Loading user...</div>;
  }

  if (isLoading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6 min-h-screen flex flex-col">
      <ToastContainer />
      <h1 className="text-3xl font-bold mb-8">Edit Post</h1>
      {error && <div className="text-red-500 mb-4">{error}</div>}
      <form id="edit-post-form" onSubmit={handleSubmit} className="space-y-6 flex-1 overflow-auto pb-32">
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
            <option value="Idea">Idea</option>
            <option value="Innovation">Innovation</option>
            <option value="Identity">Identity</option>
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
        {/* Empty div for spacing above sticky buttons */}
        <div style={{ height: '80px' }}></div>
      </form>
      {/* Sticky button bar */}
      <div className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 py-4 flex justify-center space-x-6 z-50">
        <button
          type="submit"
          form="edit-post-form"
          className="px-8 py-3 text-lg font-bold rounded shadow transition-all duration-200 bg-blue-600 text-white hover:bg-green-500 focus:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-400"
        >
          Update Post
        </button>
        <button
          type="button"
          onClick={() => navigate('/dashboard')}
          className="px-8 py-3 text-lg font-bold rounded shadow transition-all duration-200 bg-red-500 text-white hover:bg-yellow-500 focus:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-yellow-400"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default EditPost; 