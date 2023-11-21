import api from '../api';
export const getReviewFruit = async (fruitId) =>{
    const response = await api.get(`api/review-fruits?activeOnly=true&fruitId=${fruitId}`);
    return response.data;
};
export const createReviewFruit = async (data) =>{
    const response = await api.post(`api/review-fruits`, data, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
    return response.data;
};