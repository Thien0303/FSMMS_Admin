import api from '../api';
export const createOrder = async (data) =>{
    const response = await api.post(`api/orders`, data);
    console.log("data: ", data);
    return response.data;
};
export const getFarmer = async (fullName, roleName) =>{
    const response = await api.get(`api/users/get-all?fullName=${fullName}&activeOnly=true&roleName=${roleName}`);
    return response.data;
};
export const getOrder = async (buyerUserId, sellerUserId, status) =>{
    const response = await api.get(`api/orders?buyerUserId=${buyerUserId}&sellerUserId=${sellerUserId}&status=${status}`);
    return response.data;
};