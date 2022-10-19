import { configureStore, Action, getDefaultMiddleware } from '@reduxjs/toolkit';
import {setupListeners} from "@reduxjs/toolkit/query";
import menuSlice from './slice/menuSlice';
// import {userApi} from "./sliceApi/userApliSlice";
import { privilegeApi } from "./sliceApi/privilegeApiSlice";
import { privilegeGroupApi } from "./sliceApi/privilegeGroup";
import { boardApi } from './sliceApi/boardApiSlice';


export const store = configureStore({
    reducer: {
        menu: menuSlice.reducer,
        [privilegeApi.reducerPath] : privilegeApi.reducer,
        [privilegeGroupApi.reducerPath] :privilegeGroupApi.reducer,
        [boardApi.reducerPath] : boardApi.reducer,        
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(privilegeApi.middleware),
    devTools:process.env.NODE_ENV ==="development"    
})

export type RootState = ReturnType<typeof store.getState>;
export default store;
setupListeners(store.dispatch);