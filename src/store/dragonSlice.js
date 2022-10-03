import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchMainDragonfromAPI = createAsyncThunk(
    'dragons/fetchMainDragon',
    async function (_, { rejectWithValue }) {
        try {
            const response = await fetch(
                'https://api.spacexdata.com/v4/dragons/5e9d058759b1ff74a7ad5f8f'
            );
            if (!response.ok) {
                throw new Error('Server Error!');
            }
            const data = await response.json();

            return data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

const dragonSlice = createSlice({
    name: 'dragons',
    initialState: {
        data: [],
        dragons: [],
        isLoading: false,
       
        error: null,
    },

    reducers: {
        getDragonsCollection(state, action) {
         state.dragons = action.payload;
        },
    },

    extraReducers: {
        [fetchMainDragonfromAPI.pending]: state => {
            state.isLoading = true;            
            state.error = null;
        },
        [fetchMainDragonfromAPI.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.data = action.payload;
            state.error = null;
        },
        [fetchMainDragonfromAPI.rejected]: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        },
    },
});

export const { getDragonsCollection } = dragonSlice.actions;

export default dragonSlice.reducer;
