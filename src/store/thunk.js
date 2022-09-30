import { createAsyncThunk } from '@reduxjs/toolkit';
// import axios from 'axios';

const BASE_USER_URL = 'https://drag-95cad-default-rtdb.firebaseio.com/';

const userRegister = 'users/register';
// const userLogin = '/user/login';
// const userLogout = '/user/logout';
// const userCurrent = '/user/current';

export const registerThunk = createAsyncThunk(
    'user/register',
    async (user, { rejectWithValue }) => {
        try {
            const resp = await fetch(BASE_USER_URL + userRegister, {
                method: 'POST',
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify(user),
            });
            console.log(resp);


        } catch (error) {}
    }
);
