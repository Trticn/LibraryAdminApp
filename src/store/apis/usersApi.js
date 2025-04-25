import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const usersApi = createApi({
  reducerPath: 'users',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3005',
  }),
  tagTypes: ["Users"],
  endpoints: (builder) => ({
    fetchUser: builder.query({
      query: (userId) => `/users/${userId}`, 
      providesTags: (result, error, userId) => [{ type: "Users", id: userId }],
    }),

    fetchUsers: builder.query({
      query: () => '/users', 
      providesTags: (result) => 
        result ? [
          ...result.map(({ id }) => ({ type: "Users", id })),
          { type: "Users", id: "LIST" }
        ] : [{ type: "Users", id: "LIST" }],
    }),

    addUser: builder.mutation({
      query: (user) => ({
        url: '/users',
        method: 'POST',
        body: user, 
      }),
      invalidatesTags: [{ type: "Users", id: "LIST" }],
    }),


 
    
    updateUser: builder.mutation({
      query: (user) => ({
        url: `/users/${user.id}`,
        method: 'PATCH',
        body: user
      }),
      invalidatesTags: [{ type: "Users", id: "LIST" }],
    }),
    
    


    
    

    
  }),
});

export const { 
  useFetchUserQuery, 
  useFetchUsersQuery, 
  useAddUserMutation,
  useUpdateUserMutation
} = usersApi;

export { usersApi };
 