import instance from "./index";
import type { Site, SiteBase } from '../types/site';

const path = '/system/site';

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

class SiteApi {

    getSites(params?: any): Promise<Result<SiteBase[] | Page<Site>>> {
        return instance.get<Result<SiteBase[] | Page<Site>>, Result<SiteBase[] | Page<Site>>>(path, { params });
    }

    getSearchSites(params?:any): Promise<Result<SiteBase[] | Page<Site>>> {
        return instance.get<Result<SiteBase[] | Page<Site>>, Result<SiteBase[] | Page<Site>>>(`${path}/search`, { params });
    }

    getSite(id: any): Promise<Result<Site>> {
        return instance.get<Result<Site>, Result<Site>>(`${path}/${id}`);
    }

    createSite(site: Site): Promise<Result<Site>> {
        return instance.post<Result<Site>, Result<Site>>(path, site);
    }

    updateSite(site: Site): Promise<Result<Site>> {
        return instance.put<Result<Site>, Result<Site>>(path, site);
    }

    getTotalSiteList(): Promise<Result<any>> {
        return instance.get<Result<any>,Result<any>>(`${path}/namelist`);
    }

    // updateUserPassword(user: User): Promise<Result<User>> {
    //     return instance.patch<Result<User>, Result<User>>(`${path}/${user.[id]}`, user);
    // }

    deleteSite(id: any): Promise<Result<Site>> {
        return instance.delete<Result<Site>, Result<Site>>(`${path}?siteId=${id}`);
    }
}

export const siteApi = new SiteApi();
