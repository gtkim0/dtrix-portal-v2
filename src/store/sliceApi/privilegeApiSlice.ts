import {BaseQueryFn, createApi, FetchArgs, fetchBaseQuery, FetchBaseQueryError} from '@reduxjs/toolkit/query/react';
// import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query';
import {BASE_URL} from '../../config';
interface IBody {
    content:string,
    hashtag:string,
    title:string
}

const baseQuery = fetchBaseQuery({
    baseUrl: BASE_URL,
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

export const privilegeApi = createApi({
    reducerPath: 'privilegeApi',
    baseQuery: baseQueryWithIntercept,
    // refetchOnMountOrArgChange:60,
    endpoints: (builder) => ({
      getPrivilege: builder.query({
          query: ({page,size}) => ({
              url:`/user/privilege`,
              method:'GET',
              proviedsTags: ['Post'], 
              params: {
                page,size
              }
               
          }),
          transformResponse: (response: any) => {
              return response;
          }
      }),
    //   createArticle:builder.mutation<IBody,any>({
    //     query: (body:IBody) => ({
    //         url:`/articles`,
    //         method:'POST',
    //         body: body
    //     }),
    //     invalidatesTags: ['Post'] as any,
    //     transformResponse: (response:any, meta, arg) => response.data,
    //     async onQueryStarted(
    //         arg,
    //         { dispatch, getState, queryFulfilled, requestId, extra, getCacheEntry }
    //       ) {
    //         const result = dispatch(userApi.util.updateQueryData('getArticle','',(draft)=> {
    //             Object.assign(draft,arg.patch);
    //         }))
    //         try {
    //             await queryFulfilled    
    //         } catch {
    //             result.undo()
    //         }
    //       },
         
    
    //       async onCacheEntryAdded(
    //         arg,
    //         { dispatch, getState, extra, requestId, cacheEntryRemoved, cacheDataLoaded, getCacheEntry}
    //       ) {},

         
    //   })
      

    //   getUser: builder.query({
    //       query:(id) => ({
    //           url:`user/users/${id}`,
    //           method:'GET',
    //       })
    //   }),
    })
})

export const { useGetPrivilegeQuery } = privilegeApi;


//get 방식은 query 고 post 방식은 mutation 이 붙나봄

// export const { useLoginMutation } = AuthFlow;