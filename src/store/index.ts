import {configureStore} from "@reduxjs/toolkit";
import {setupListeners} from "@reduxjs/toolkit/query";
import {userApi} from "./sliceApi/userApliSlice";

export const store = configureStore({
    reducer: {
        [userApi.reducerPath] : userApi.reducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(userApi.middleware)
})


setupListeners(store.dispatch);