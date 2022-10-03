import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import { getDatabase, ref, child, get, onValue } from 'firebase/database';
// import { useSelector } from 'react-redux';

export const fetchMainDragon = createAsyncThunk('dragons/fetchMainDragon', async function () {
    const response = await fetch('https://api.spacexdata.com/v4/dragons/5e9d058759b1ff74a7ad5f8f');

    const data = await response.json();

    return data;
});

const dragonSlice = createSlice({
    name: 'dragon',
    initialState: {
        dragons: [],
        status: null,
        error: null,
    },
    reducers: {
        addDragon(state, action) {
            state.dragons.push(action.payload);
        },
        removeDragon(state, action) {
            state.dragons = state.dragons.filter(dragon => dragon.id !== action.payload);
        },
        getDragonsCollection(state, action) {
            state.dragons = action.payload;
        },
    },
    extraReducers: {
        [fetchMainDragon.pending]: (state) => {
            state.status = 'pending';
            state.error = null;
        },
        [fetchMainDragon.fulfilled]: (state, action) => {
            state.status = 'resolved';
            state.dragons = action.payload;
            state.error = null;
        },
        [fetchMainDragon.rejected]: (state, action) => {
            state.error = action.payload;
        },
    },
});

export const { addDragon, removeDragon, getDragonsCollection } = dragonSlice.actions;

export default dragonSlice.reducer;
