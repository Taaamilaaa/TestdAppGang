import { configureStore, combineReducers } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import dragonReducer from './dragonSlice';
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const rootReducer = combineReducers({
    user: userReducer,
    dragons: dragonReducer,
});

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['dragons','data']
};
const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
    reducer: persistedReducer,
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
});

export const persistor = persistStore(store);
export default store;


// import { configureStore } from '@reduxjs/toolkit';
// import userReducer from './userSlice';
// import dragonReducer from './dragonSlice';

// export default configureStore({
//     reducer: {
//         user: userReducer,  
//         dragons: dragonReducer,
//     },
// });