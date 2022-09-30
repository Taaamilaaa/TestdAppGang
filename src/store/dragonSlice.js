import { createSlice} from '@reduxjs/toolkit';
  


const dragonSlice = createSlice({
    name: 'dragon',
    initialState: {
        dragons: []
    },
    reducers: {
        addDragon(state, action) {
           state.dragons.push(action.payload)
        },
        removeDragon(state, action) {
           state.dragons = state.dragons.filter(dragon => dragon.id !== action.payload)         
        }
    }
}) 

export const { addDragon, removeDragon } = dragonSlice.actions;

export default dragonSlice.reducer;