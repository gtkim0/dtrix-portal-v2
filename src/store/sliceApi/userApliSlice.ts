import {BaseQueryFn, createApi, FetchArgs, fetchBaseQuery, FetchBaseQueryError} from '@reduxjs/toolkit/query/react';
// import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query';

const baseQuery = fetchBaseQuery({
    baseUrl: 'http://192.168.0.40:8088/',
    prepareHeaders: (headers, {getState}) => {
        const accessToken = window.localStorage.getItem("accessToken");
        if(accessToken) {
            headers.set('Authorization',`Bearer_${accessToken}`)
        }
        return headers;
    },
});

const baseQueryWithIntercept: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (
    args,
    api,
    extraOptions,
) => {
    let result = await baseQuery(args, api, extraOptions);
    return result;
};

export const userApi = createApi({
    reducerPath: 'userApi',
    baseQuery: baseQueryWithIntercept,
    endpoints: (builder) => ({
      getUsers: builder.query({
          query: ({page,size}) => ({
              url:`user/users`,
              method:'GET',
              params: {
                  page,
                  size
              }
          }),
          transformResponse: (response: any) => {
              console.log(response);
              return response;
          }
      }),

      getUser: builder.query({
          query:(id) => ({
              url:`user/users/${id}`,
              method:'GET',
          })
      }),
      // createUser: builder.mutation<any,any>({
      //     query (data) {
      //
      //     }
      // })
    })
})

export const { useGetUsersQuery } = userApi;


//get 방식은 query 고 post 방식은 mutation 이 붙나봄

// export const { useLoginMutation } = AuthFlow;