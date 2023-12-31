import { configureStore } from '@reduxjs/toolkit';
import weatherSlice from './Reducers/ExpertSlice/weatherSlice';
import fruitHistorySlice from './Reducers/ExpertSlice/fruitHistorySlice';
import postSlice from './Reducers/ExpertSlice/postSlice';
import commentSlice from './Reducers/ExpertSlice/commentSlice';
import fruitSlice from './Reducers/SupplierSlice/fruitSlice';
import cartSlice from './Reducers/SupplierSlice/cartSlice';
import discountFruitSlice from './Reducers/SupplierSlice/discountFruitSlice';
import reviewSlice from './Reducers/SupplierSlice/reviewSlice';
import orderSlice from './Reducers/SupplierSlice/orderSlice';
import categorySlice from './Reducers/SupplierSlice/categorySlice';
import systemSlice from './Reducers/AdminSlice/systemSlice';
import growthSlice from './Reducers/AdminSlice/growthSlice';
const store = configureStore({
    reducer: {
      weather : weatherSlice,
      fruitHistory: fruitHistorySlice,
      post: postSlice,
      comment: commentSlice,
      fruit: fruitSlice,
      cart: cartSlice,
      discountFruit: discountFruitSlice,
      review: reviewSlice,
      order: orderSlice,
      category: categorySlice,
      getUser: systemSlice,
      getGrowth: growthSlice,
    },
} 
)

export default store;
