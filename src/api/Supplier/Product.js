import api from '../api';
export const getFruit = async (fruitName, minPrice, maxPrice,newestDate) =>{
    const response = await api.get(`api/fruits/fruit-farmers?fruitName=${fruitName}&minPrice=${minPrice}&maxPrice=${maxPrice}&activeOnly=true&newestDate=${newestDate}`);
    return response.data;
};
export const getFruitDetail = async (id) =>{
    const response = await api.get(`api/fruits/farmer/${id}`);
    return response.data;
};