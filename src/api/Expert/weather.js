import api from '../api';
export const getWeather = async (location, createdDate) =>{
    const response = await api.get(`api/weathers?location=${location}&createdDate=${createdDate}`);
    return response.data;
};
export const createWeather = async (userId) =>{
    const response = await api.post(`api/weathers/scrape-weather-and-schedule?userId=${userId}`);
    return response.data;
};