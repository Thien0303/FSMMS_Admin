import api from "../api";
export const getFruit = async (fruitName, minPrice, maxPrice, newestDate) => {
  const response = await api.get(
    `api/fruits/fruit-farmers?fruitName=${fruitName}&minPrice=${minPrice}&maxPrice=${maxPrice}&activeOnly=true&newestDate=${newestDate}`
  );
  return response.data;
};
export const getFruitDetail = async (id) => {
  const response = await api.get(`api/fruits/farmer/${id}`);
  return response.data;
};
export const createFruit = async (data) => {
  const response = await api.post(`api/fruits/fruit-suppliers`, data);
  return response.data;
};
export const getFruitSupplier = async (
  fruitName,
  minPrice,
  maxPrice,
  newestDate,
  createdDate,
  userId
) => {
  try {
    if (userId) {
      const response = await api.get(
        `api/fruits/fruit-suppliers?fruitName=${fruitName}&minPrice=${minPrice}&maxPrice=${maxPrice}&activeOnly=true&newestDate=${newestDate}&createdDate=${createdDate}&userId=${userId}`
      );
      return response.data;
    } else {
      const response = await api.get(
        `api/fruits/fruit-suppliers?fruitName=${fruitName}&minPrice=${minPrice}&maxPrice=${maxPrice}&activeOnly=true&newestDate=${newestDate}&createdDate=${createdDate}&userId=${userId}`
      );
      return response.data;
    }
  } catch (error) {
    console.error("Error fetching post data:", error);
    throw error;
  }
};
export const getFruitSupplierDetail = async (id) => {
  const response = await api.get(`api/fruits/supplier/${id}`);
  return response.data;
};
export const updateFruitSupplier = async (id, data) => {
  const response = await api.put(`api/fruits/supplier/${id}`, data);
  return response.data;
};
export const createFruitImage = async (data) => {
  const response = await api.post(`api/fruit-images`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};
