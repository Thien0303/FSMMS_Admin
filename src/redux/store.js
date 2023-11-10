import { configureStore } from '@reduxjs/toolkit'
import weatherSlice from './Reducers/ExpertSlice/weatherSlice'
import fruitHistorySlice from './Reducers/ExpertSlice/fruitHistorySlice'
import postSlice from './Reducers/ExpertSlice/postSlice'
import commentSlice from './Reducers/ExpertSlice/commentSlice'
const store = configureStore({
    reducer: {
      weather : weatherSlice,
      fruitHistory: fruitHistorySlice,
      post: postSlice,
      comment: commentSlice,
    },
    
} 
)

export default store
