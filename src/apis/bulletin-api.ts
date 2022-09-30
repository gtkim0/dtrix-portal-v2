//TODO board api 정리 필요
import instance from "./index";
export interface Result<T = any> {

}
import { BaseBulletinType, BulletInType } from '../types/bulletin';

const path ='/bulletin'

class BulletinApi {

    // 게시판 페이지 검색?
    getBulletin(params?:any) :Promise<any> {
        return instance.get<Result<any>,Result<any>>(`${path}/page`,{params});
    }

    // 게시판 검색
    getSearchBulletin({type,keyword,page}:any) : Promise<any> {
        return instance.post<Result<any>,Result<any>>(`${path}/searchPage/${type}/${keyword}/${page}`)
    }

    // 게시판 상세조회?
    getDetailBulletin(bulletinId:any) : Promise<any> {
        return instance.get<Result<any>, Result<any>>(`${path}/pageDetail/${bulletinId}`)
    }

    // 게시판 생성
    createBulletin(form:any) : Promise<any> {
        return instance.post<Result<any>, Result<any>>(`${path}/register`,form);
    }

    // 게시판 삭제
    deleteBulletin(bulletinId:any) : Promise<any> {
        return instance.post<Result<any>,Result<any>>(`${path}/remove`,bulletinId);
    }

  
}

export const bulletinApi = new BulletinApi();