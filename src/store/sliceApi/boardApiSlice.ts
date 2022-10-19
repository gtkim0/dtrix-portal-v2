import {BaseQueryFn, createApi, FetchArgs, fetchBaseQuery, FetchBaseQueryError} from '@reduxjs/toolkit/query/react';
import { BoardType } from '../../types/board';

const baseQuery = fetchBaseQuery({
    baseUrl: 'http://192.168.0.40:8088/board',
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

export const boardApi = createApi({
    reducerPath: 'boardApi',
    baseQuery: baseQueryWithIntercept,
    endpoints: (builder) => ({

      getBoard: builder.query({
          query: ({id}) => ({
              url:`${id}`,
              method:'GET',
              params: {
                //   page,
                //   size
              }
          }),
          transformResponse: (response: any) => {
              console.log(response);
              return response;
          }
      }),

      getBulletinDetail: builder.query({
          query:({id}) => ({
              url:`bulletin/pageDetail/${id}`,
              method:'GET',
          }),
          transformResponse: (response: BoardType) => {
            console.log(response);
            return response;
        }
      }),

      updateBulletin: builder.mutation({
         query: (body:any) => {
            console.log(body);
            return {
                url:'bulletin/modify',
                method:'POST',
                body
            }
         }
      }),

      createBulletin : builder.mutation({
        query : (body:any) => ({
            url:`${body.menuId}/register`,
            method:'post',
            body: {
                title:body.title,
                content:body.content
            }
        })
      }),

      deleteBulletin : builder.mutation({
        query : (body:any) => ({
            url:'bulletin/remove',
            method:'POST',
            body
        })
      })
    })
})

export const { useGetBoardQuery, useGetBulletinDetailQuery, useUpdateBulletinMutation,
    useCreateBulletinMutation, useDeleteBulletinMutation
} = boardApi;
