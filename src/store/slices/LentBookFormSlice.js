import { createSlice } from "@reduxjs/toolkit";

const LentBookFormSlice = createSlice({
    name:'lentBookForm',
    initialState:{
        userId:"",
    },
    reducers:{
        changeUser(state,action){
            state.userId = action.payload
        },
    },
})



export const {changeUser} = LentBookFormSlice.actions;
export const LentBookFormReducer = LentBookFormSlice.reducer