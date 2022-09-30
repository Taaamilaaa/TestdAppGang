import { configureStore } from '@reduxjs/toolkit';
import authReducer from './userSlice';

import dragonReducer from './dragonSlice';

export default configureStore({
    reducer: {
        auth: authReducer,

        dragons: dragonReducer,
    },
});
