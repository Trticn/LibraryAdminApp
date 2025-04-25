import { createSlice } from '@reduxjs/toolkit';



const searchSlice = createSlice({
  name: 'search',
  initialState :{
    searchTerm: '',
  },
  reducers: {
    changeSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
  },
});

export const { changeSearchTerm } = searchSlice.actions; // Izvozimo setSearchTerm akciju
export const searchReducer = searchSlice.reducer;
