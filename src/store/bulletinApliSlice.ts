import {BaseQueryFn, createApi, FetchArgs, fetchBaseQuery, FetchBaseQueryError} from '@reduxjs/toolkit/query/react';
// import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query';

const baseQuery = fetchBaseQuery({
    baseUrl: 'http://192.168.0.48:8088/',
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
      getUsers : builder.query<any,any>({
          query: () => ({
              url:"user/users",
              method:'get',
              params:{
                  page:0,
                  size:10,
                  userRole:"",
                  user:""
              }
          })
      })
    })
})

export const { useGetUsersQuery } = userApi;


//get 방식은 query 고 post 방식은 mutation 이 붙나봄

// export const { useLoginMutation } = AuthFlow;