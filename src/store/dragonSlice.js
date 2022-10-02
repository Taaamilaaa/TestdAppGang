import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import { getDatabase, ref, child, get, onValue } from 'firebase/database';
// import { useSelector } from 'react-redux';

// export const fetchCollection = createAsyncThunk(
//     'dragons/fetchCollection',
//     async function () {

//         const user = useSelector(state => state.user)
//         console.log(user);
//         const db = getDatabase();
//         const collectionRef = ref(db, 'users/' + `${user.id}/` + 'collection');


//         onValue(collectionRef, snapshot => {
           
//             if (snapshot.val()) {
               
//                 let response = []
//                 for (const key in snapshot.val()) {
//                     if (Object.hasOwnProperty.call(snapshot.val(), key)) {

//                         const element = snapshot.val()[key];

//                         for (const key in element) {

//                             if (Object.hasOwnProperty.call(element, key)) {
//                                 const dataElement = element[key];
//                                 response.push(dataElement)

//                             }
//                         }
//                     }
//                 }
//                 console.log(response);
//                 return response
          
//             }
//         });
  
       
          
// });

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
    // extraReducers: {
    //     [fetchCollection.pending]: (state, action) => {
    //         console.log('pending',action);

    //         state.status = 'isLoading';
    //         state.error = null;
    //     },
    //     [fetchCollection.fulfilled]: (state, action) => {
    //         console.log('fulfilled', action);

    //         state.status = 'isLoading';
    //         state.dragons = action.payload;
    //         state.error = null;
    //     },
    //     [fetchCollection.rejected]: (state, action) => {
    //         console.log('rejected', action);
    //         state.error = action.payload;
    //     },
    // },
});

export const { addDragon, removeDragon, getDragonsCollection } = dragonSlice.actions;

export default dragonSlice.reducer;
