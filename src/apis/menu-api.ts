import instance from "./index";
import type { MenuType } from '../types/menu';
import { AnyAction } from "@reduxjs/toolkit";

const path = '/menu';

export interface MenuPaging {
    currentPage:number,
    endPage:number,
    pageSize:number,
    paginationSize:number,
    startPage:number,
    totalPageCount:number,
    totalRecordCount:number
}

export interface Result<T = any> {
    menuMngList: MenuType[]
    menuMngPaging: MenuPaging
}

export interface Page<T = any>{
    total:number;
    size:number;
    page:number;
    list:T[];
}

export interface IGetMenuParams {
    currentPage:number,
    site_id:number
}

class MenuApi {

    // 메뉴 리스트 (페이징 적용 O)  params 값에 site_id 와 currentPage 들어옴.
    getMenus(params:IGetMenuParams): Promise<Result<any>> {
        return instance.get<Result<any>, Result<any>>(`${path}/list`,{params});
    }

    // 메뉴 리스트 (페이징 적용 x) 
    // url : /menu/list/site
    getSideMenus(params:any): Promise<Result<MenuType>> {
        return instance.get<Result<any>,Result<any>>(`${path}/list/site`,{params});
    }

    getModifyInfoData(site_id:any,menu_id:AnyAction): Promise<Result<any>> {
        return instance.get<Result<any>,Result<any>>(`${path}/modify/info?site_id=${site_id}&menu_id=${menu_id}`)
    }

    // 메뉴 등록 ResponseBody 로 전송(GET,POST 관계없음)
    createMenu(body:any): Promise<Result<any>> {
        return instance.post<Result<any>, Result<any>>(`${path}/regist/process`,body);
    }

    // 메뉴 수정  ResponseBody 로 전송(GET,POST 관계없음)
    updateMenu(body:any): Promise<Result<any>> {
        return instance.post<Result<any>, Result<any>>(`${path}/modify/process`,body);
    }

    // 메뉴 삭제 menu_id, site_id 값 전송
    deleteMenu(body: any): Promise<Result<any>> {
        return instance.delete<Result<any>, Result<any>>(`${path}/remove/process?site_id=${body.site_id}&menu_id=${body.menu_id}`);
    }

}

export const menuApi = new MenuApi();
