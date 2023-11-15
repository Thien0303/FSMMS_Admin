import api from '../api';
export const getPost = async (postTitle, userId) => {
    try {
      if(userId){
        const response = await api.get(`api/posts?postTitle=${postTitle}&activeOnly=true&userId=${userId}`);
        return response.data;
      } else {
        const response = await api.get(`api/posts?postTitle=${postTitle}&activeOnly=true`);
        return response.data;
      }
    } catch (error) {
        console.error("Error fetching post data:", error);
        throw error; 
    }
};
export const getPostDetail = async (id) =>{
    const response = await api.get(`api/posts/${id}`);
    return response.data;
};
export const createPost = async (data) =>{
    const response = await api.post(`api/posts`, data, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
    return response.data;
};
export const updatePost = async (id, data) =>{
    const response = await api.put(`api/posts/${id}`, data, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
    return response.data;
};