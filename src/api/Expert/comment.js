import api from '../api';
export const getComment = async (activeOnly = true) =>{
    const response = await api.get(`api/comments?activeOnly=${activeOnly}`);
    return response.data;
};
export const createComment = async (data) =>{
    const response = await api.post(`api/comments`, data);
    return response.data;
};
export const removeComment = async (id) => {
    const response = await api.delete(`api/comments/${id}`);
    return response.data;
};