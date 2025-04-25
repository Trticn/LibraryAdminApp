import { createSlice } from "@reduxjs/toolkit";
import { libraryCollectionApi } from "../apis/libraryCollectionApi"

const BookFormSlice = createSlice({
    name:'bookForm',
    initialState:{
        title:"",
        author:"",
        quantity:0
    },
    reducers:{
        changeTitle(state,action){
            state.title = action.payload
        },
        changeAuthor(state,action){
            state.author = action.payload
        },
        changeQuantity(state,action){
            state.quantity = action.payload
        },

        setBookForEdit(state, action) {
            const book = action.payload;
            state.title = book?.title || '';
            state.author = book?.author || '';
            state.quantity = book?.available || 0;
          },
          resetForm(state) {
            state.title = '';
            state.author = '';
            state.quantity = 0;
          }
    },

    extraReducers(builder){
        builder.addMatcher(
            libraryCollectionApi.endpoints.addBook.matchFulfilled,
            (state, action) => {
                state.title = "";
                state.author = "";
                state.quantity = 0;
            }
        );
        
    }
})



export const { changeTitle,
    changeAuthor,
    changeQuantity,
    setBookForEdit,
    resetForm,} = BookFormSlice.actions;
    
export const BookFormReducer = BookFormSlice.reducer