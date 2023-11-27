import api from '../api';
export const getCategories = async (categoryName) =>{
    const response = await api.get(`api/category-products?categoryName=${categoryName}&activeOnly=true`);
    return response.data;
};
export const createCategory = async (data) =>{
    const response = await api.post(`api/category-products`, data);
    console.log("data: ", data);
    return response.data;
};