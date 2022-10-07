import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { menuApi } from "../../apis/menu-api";

type StateType = {
    menuCreateState:boolean,
    menuList:Array<any>,
    editMenuInfo:object
}

const initialState:StateType = {
    menuCreateState: false,
    menuList:[],
    editMenuInfo:{}
}

export const fetchMenu:any = createAsyncThunk<any>('/menu/list/site',async (site_id:any, thunkAPI:any) => {
    try {
        const value:any = {
            site_id : 1,
        }
        const data:any = await menuApi.getMenus(value);
        return data.menuInfoList;
    } catch(err) {

    }
})

export const getSidePrivilegeMenus:any = createAsyncThunk<any>('menu/modify/info',async(body:any,thunkAPI)=> {
    try {
        const data = await menuApi.getModifyInfoData(body.site_id,body.menu_id);
        return data;
    } catch(err) {
        console.error(err);
    }
})

export const menuSlice = createSlice ({
    name:'menu',
    initialState,
    reducers: {
        openMenu : (state:StateType, action:PayloadAction) => {
            // state.menuCreateState = false;
        },
        closeMenu : (state:StateType, action:PayloadAction) => {
            state.menuCreateState = !state.menuCreateState;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchMenu.fulfilled, (state,{payload})=> {
                state.menuList = payload;
            })

        builder
            .addCase(getSidePrivilegeMenus.fulfilled,(state,{payload})=> {
                state.editMenuInfo = payload;
            })    
    }
})

export const {openMenu, closeMenu} = menuSlice.actions;

export default menuSlice;