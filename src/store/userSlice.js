import { createSlice } from '@reduxjs/toolkit';

// const BASE_User_URL = 'https://63354c8b849edb52d6ff0fc2.mockapi.io/dragon/:';

// const userLogin = '/user/login';
// const userLogout = '/user/logout';

// const userRegister = '/user/register';

// const userCurrent = '/user/current';

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: {
            name: '',
            email: '',
        },
        token: '',
        error: null,
        isLoading: false,
        isAuth: false,

    },
    reducers:{},
    extraReducers:{},
});
// export const { login, logout, userEdit } = userSlice.actions;
export default authSlice.reducer;