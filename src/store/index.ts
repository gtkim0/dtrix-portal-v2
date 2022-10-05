import {configureStore} from "@reduxjs/toolkit";
import {setupListeners} from "@reduxjs/toolkit/query";
// import {userApi} from "./sliceApi/userApliSlice";
import { privilegeApi } from "./sliceApi/privilegeApiSlice";
import { privilegeGroupApi } from "./sliceApi/privilegeGroup";

export const store = configureStore({
    reducer: {
        // [userApi.reducerPath] : userApi.reducer,
        [privilegeApi.reducerPath] : privilegeApi.reducer,
        [privilegeGroupApi.reducerPath] :privilegeGroupApi.reducer        
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(privilegeApi.middleware)
})


setupListeners(store.dispatch);