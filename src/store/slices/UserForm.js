import { createSlice } from "@reduxjs/toolkit";

const UserFormSlice = createSlice({
    name:'userForm',
    initialState:{
    username:"",
    borrowedBooks:[],
    active:true,
    },
    reducers:{
        changeUsername(state,action){
            state.username = action.payload
        },
        changeStatus(state,action){
            state.active = action.payload
        },

        setUserForEdit(state, action) {
            const user = action.payload;
            state.username = user?.username || '';
            state.active = user?.active || false;
          },
        

    },
})



export const {changeStatus,changeUsername,setUserForEdit} = UserFormSlice.actions;
export const UserFormReducer = UserFormSlice.reducer