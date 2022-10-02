import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import dragonReducer from './dragonSlice';

export default configureStore({
    reducer: {
        user: userReducer,  
        dragons: dragonReducer,
    },
});
