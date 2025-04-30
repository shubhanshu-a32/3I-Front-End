import axios from 'axios';

const API_URL = '/api/posts';

// Create axios instance with default config
const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor to include auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      return Promise.reject(error.response.data);
    } else if (error.request) {
      // The request was made but no response was received
      return Promise.reject({ message: 'No response from server' });
    } else {
      // Something happened in setting up the request that triggered an Error
      return Promise.reject({ message: error.message });
    }
  }
);

// Get all posts
const getPosts = async () => {
  try {
    const response = await api.get('/posts');
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Get post by ID
const getPostById = async (id) => {
  try {
    const response = await api.get(`/posts/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Create new post
const createPost = async (postData) => {
  try {
    const response = await api.post('/posts', postData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Update post
const updatePost = async (id, postData) => {
  try {
    const response = await api.put(`/posts/${id}`, postData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Delete post
const deletePost = async (id) => {
  try {
    const response = await api.delete(`/posts/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Like post
const likePost = async (id) => {
  try {
    const response = await api.put(`/posts/${id}/like`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Share post
const sharePost = async (id) => {
  try {
    const response = await api.put(`/posts/${id}/share`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const postService = {
  getPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
  likePost,
  sharePost,
};

export default postService;