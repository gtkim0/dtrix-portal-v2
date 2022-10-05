import instance from "./index";
import type { MenuType } from '../types/menu';

const path = '/menu/menu';

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

    getMenu(id: any): Promise<Result<any>> {
        return instance.get<Result<any>, Result<any>>(`${path}/${id}`);
    }

    createMenu(data: any): Promise<Result<any>> {
        return instance.post<Result<any>, Result<any>>(path, data);
    }

    updateMenu(id: any, data: any): Promise<Result<any>> {
        return instance.put<Result<any>, Result<any>>(`${path}/${id}`, data);
    }

    deleteMenu(id: any): Promise<Result<any>> {
        return instance.delete<Result<any>, Result<any>>(`${path}/${id}`);
    }

    // 메뉴 리스트 (페이징 적용 x) 
    // url : /menu/list/site
    getSideMenus(params:any): Promise<Result<MenuType>> {
        return instance.get<Result<any>,Result<any>>(`${path}/list/site`,{params});
    }

}

export const menuApi = new MenuApi();
