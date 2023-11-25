import api from '../api';
export const getDiscountFruit = async (discountName, discountExpiryDate) =>{
    const response = await api.get(`api/fruit-discounts?discountName=${discountName}&discountExpiryDate=${discountExpiryDate}&activeOnly=true`);
    return response.data;
};
export const getDiscountSupplier = async (discountName, discountExpiryDate,  userId, fruitId) => {
    try {
      if(userId){
        const response = await api.get(`api/fruit-discounts?discountName=${discountName}&discountExpiryDate=${discountExpiryDate}&activeOnly=true&userId=${userId}&fruitId=${fruitId}`);
        return response.data;
      } else {
        const response = await api.get(`api/fruit-discounts?discountName=${discountName}&discountExpiryDate=${discountExpiryDate}&activeOnly=true&userId=${userId}&fruitId=${fruitId}`);
        return response.data;
      }
    } catch (error) {
        console.error("Error fetching post data:", error);
        throw error; 
    }
  };
export const createFruitDiscount = async (data) => {
    const response = await api.post(`api/fruit-discounts`, data);
    return response.data;
  };