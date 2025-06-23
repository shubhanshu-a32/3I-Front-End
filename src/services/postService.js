import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL + '/posts';

const postService = {
  async getPosts() {
    const response = await axios.get(API_URL);
    return response.data;
  },
  
  async getPostById(id) {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  },

  async createPost(postData) {
    const response = await axios.post(API_URL, postData, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });
    return response.data;
  },

  async updatePost(id, postData) {
    const response = await axios.put(`${API_URL}/${id}`, postData, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });
    return response.data;
  },
  
  async deletePost(id) {
    const response = await axios.delete(`${API_URL}/${id}`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });
    return response.data;
  },
  
  async likePost(id) {
    const response = await axios.put(`${API_URL}/${id}/like`, {}, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });
    return response.data;
  },
  
  async sharePost(id) {
    const response = await axios.put(`${API_URL}/${id}/share`, {}, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });
    return response.data;
  }
};

export default postService;