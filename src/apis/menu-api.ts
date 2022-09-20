import instance from "./index";
import type { Menu } from '../types/menu';

const path = '/menu';

export interface Result<T = any> {
    code:number;
    message?:string;
    data:T;
}

export interface Page<T = any>{
    total:number;
    size:number;
    page:number;
    list:T[];
}

class MenuApi {

    getMenus(params?: any): Promise<Result<any>> {
        return instance.get<Result<any>, Result<any>>(path, { params });
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
}

export const menuApi = new MenuApi();
