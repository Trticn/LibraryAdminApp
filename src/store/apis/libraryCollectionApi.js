import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const libraryCollectionApi = createApi({
  reducerPath: "libraryCollection",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://libraryappbackend-1.onrender.com",
  }),
  tagTypes: ["LibraryCollection"],
  endpoints: (builder) => ({
    fetchLibraryCollection: builder.query({
      query: () => "/libraryCollection",
      providesTags: ["LibraryCollection"],
    }),

    fetchBook: builder.query({
      query: (bookId) => `/libraryCollection/${bookId}`,
      providesTags: (result, error, book) => [{ type: "LibraryCollection", id: book.id }],
    }),
    
    

    addBook: builder.mutation({
      query: (book) => ({
        url: "/libraryCollection",
        method: "POST",
        body: {
          title: book.title,
          author: book.author,
          available: book.quantity,
          borrowCount:0
        },
      }),
      invalidatesTags: ["LibraryCollection"],
    }),
    

    removeBook: builder.mutation({
      query: (book) => ({
        url: `/libraryCollection/${book.id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["LibraryCollection"],
    }),




    
    updateBook: builder.mutation({
      query: (book) => ({
        url: `/libraryCollection/${book.id}`,
        method: 'PATCH',
        body: book
      }),
      invalidatesTags: ["LibraryCollection"],
    }),
    
    
    
  }),
});

export const {
  useFetchLibraryCollectionQuery,
  useFetchBookQuery,
  useAddBookMutation,
  useRemoveBookMutation,
  useBorrowBookMutation,
  useReturnBookMutation,
  useUpdateBookMutation
} = libraryCollectionApi;

export { libraryCollectionApi };
