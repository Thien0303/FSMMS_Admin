import api from '../api';
export const getTotalOrder = async () =>{
    const response = await api.get(`api/Dashboard/totalOrders`);
    return response.data;
};
export const getTotalPost = async () =>{
    const response = await api.get(`api/Dashboard/totalPosts`);
    return response.data;
};
export const getTotalScales = async () =>{
    const response = await api.get(`api/Dashboard/totalPlants`);
    return response.data;
};
export const getTotalGarden = async () =>{
    const response = await api.get(`api/Dashboard/totalGardens`);
    return response.data;
};
export const getOrderStatus = async () =>{
    const response = await api.get(`api/Dashboard/totalOrdersGroupByStatus`);
    return response.data;
};
