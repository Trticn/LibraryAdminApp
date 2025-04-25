import { configureStore } from "@reduxjs/toolkit";
import { libraryCollectionApi } from "./apis/libraryCollectionApi";
import { setupListeners } from "@reduxjs/toolkit/query";
import { searchReducer } from "./slices/searchSlice"; // Importuj searchReducer
import { changeSearchTerm } from "./slices/searchSlice";
import { BookFormReducer, changeAuthor,changeQuantity,changeTitle,setBookForEdit,resetForm } from "./slices/BookFormSlice";
import { UserFormReducer,changeStatus,changeUsername,setUserForEdit } from "./slices/UserForm";
import { LentBookFormReducer,changeUser } from "./slices/LentBookFormSlice";


import { usersApi } from "./apis/usersApi";
export const store = configureStore({
  reducer: {

    [libraryCollectionApi.reducerPath]: libraryCollectionApi.reducer,
    [usersApi.reducerPath]:usersApi.reducer,
    search: searchReducer,
    bookForm:BookFormReducer,
    lentBookForm:LentBookFormReducer,
    userForm:UserFormReducer


  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(libraryCollectionApi.middleware).concat(usersApi.middleware);
  },
});

setupListeners(store.dispatch);

export {
  useFetchLibraryCollectionQuery,
  useAddBookMutation,
  useRemoveBookMutation,

  useUpdateBookMutation,
  useFetchBookQuery
} from './apis/libraryCollectionApi';



export {
  useFetchUserQuery,
  useAddUserMutation,
  useFetchUsersQuery,
  useUpdateUserMutation
  
} from './apis/usersApi';

export {
  changeAuthor,changeQuantity,changeTitle,changeSearchTerm,changeUser,changeStatus,changeUsername,setBookForEdit,resetForm,setUserForEdit
};


