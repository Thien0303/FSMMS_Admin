import api from "../api";
export const createCropVarities = async (data) => {
  const response = await api.post(`api/crop-varieties`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};
export const createCropVarietyStages = async (data) => {
  const response = await api.post(`api/crop-variety-stages`, data);
  return response.data;
};
export const createCropVarietyGrowthTasks = async (data) => {
  const response = await api.post(`api/crop-variety-growth-tasks`, data);
  return response.data;
};
export const getCropVarities = async () => {
  const response = await api.get(`api/crop-varieties?activeOnly=true`);
  return response.data;
};
export const getCropVarietyStages = async (id) => {
  const response = await api.get(`api/crop-variety-stages?activeOnly=false&CropVarietyId=${id}`);
  return response.data;
};
export const getCropVarietyGrowthTasks = async (id) => {
  const response = await api.get(`api/crop-variety-growth-tasks?activeOnly=true&cropVarietyStageId=${id}`);
  return response.data;
};
