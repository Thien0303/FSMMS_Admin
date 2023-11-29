import api from '../api';
export const getUser = async () => {
    const response = await api.get(`api/users?activeOnly=true`);
    return response.data;
};
export const getPostAdmin = async (postTitle) =>{
    const response = await api.get(`api/posts?postTitle=${postTitle}&activeOnly=false`);
    return response.data;
};
export const updatePost = async (id, action) => {
    const response = await api.put(`api/posts/${id}/process`, {status: action});
    return response.data;
};