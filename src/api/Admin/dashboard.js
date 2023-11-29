import api from '../api';
export const getTotalOrder = async (startDate, endDate) =>{
    const response = await api.get(`api/Dashboard/totalOrders?startDate=${startDate}&endDate=${endDate}`);
    return response.data;
};
export const getTotalPost = async (startDate, endDate) =>{
    const response = await api.get(`api/Dashboard/totalPosts?startDate=${startDate}&endDate=${endDate}`);
    return response.data;
};
export const getTotalScales = async (startDate, endDate) =>{
    const response = await api.get(`api/Dashboard/totalSales?startDate=${startDate}&endDate=${endDate}`);
    return response.data;
};
export const getTotalCustomer = async (startDate, endDate) =>{
    const response = await api.get(`api/Dashboard/newCustomers?startDate=${startDate}&endDate=${endDate}`);
    return response.data;
};