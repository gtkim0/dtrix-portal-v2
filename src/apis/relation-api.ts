import instance from "./index";

const path = '/system/relation';

export interface Result<T = any> {
}

export interface Page<T = any>{
    total:number;
    size:number;
    page:number;
    list:T[];
}

class RelationApi {

    // 메뉴 리스트 (페이징 적용 O)  params 값에 site_id 와 currentPage 들어옴.
    getSiteRelation(siteId:any): Promise<Result<any>> {
        return instance.get<Result<any>, Result<any>>(`${path}?siteId=${siteId.siteId}`);
        // return instance.get<Result<any>, Result<any>>(`${path}`,siteId);
    }

    createSiteRelation(data:any): Promise<Result<any>> {
        return instance.post<Result<any>, Result<any>>(`${path}`,data);
        // return instance.get<Result<any>, Result<any>>(`${path}`,siteId);
    }

    deleteSiteRelation(siteId:any): Promise<Result<any>> {
        return instance.delete<Result<any>, Result<any>>(`${path}/del?siteId=${siteId}`);
        // return instance.get<Result<any>, Result<any>>(`${path}`,siteId);
    }

}

export const relationApi = new RelationApi();
