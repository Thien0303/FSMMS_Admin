import api from '../api';
export const getFruitHistory = async (location, createdDate) =>{
    const response = await api.get(`api/fruit-histories?location=${location}&createdDate=${createdDate}`);
    return response.data;
};
export const createFruitHistory = async (userId) =>{
    const response = await api.post(`api/fruit-histories/scrape-fruit-histories?userId=${userId}`);
    return response.data;
};