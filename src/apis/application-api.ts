//TODO board api 정리 필요
import instance from "./index";
export interface Result<T = any> {

}
import { } from '../types/application';

const path ='/system/application'

class ApplicationApi {

    // application list 조회
    getApplications(params?:any): Promise<any> {
        return instance.get<Result<any>,Result<any>>(`${path}`,{params});
    }

    getApplication(id:string | string[] | undefined ) : Promise<any> {
        return instance.get<Result<any>,Result<any>>(`${path}/${id}`);
    }

    // application 생성
    createApplication(application:any): Promise<any> {
        return instance.post<Result<any>,Result<any>>(`${path}`,application);
    }

    updateApplication(application:any): Promise<any> {
        return instance.put<Result<any>,Result<any>>(`${path}`,application);
    }

    deleteApplication(deleteParam:any): Promise<any> {
        // console.log(body);
        // console.log(typeof body.delYn);
        // console.log(typeof body.applicationId);
        console.log(deleteParam);
        // return instance.delete<Result<any>,Result<any>>(`${path}/${body.applicationId}`,body.delYn);
        return instance.delete<Result<any>,Result<any>>(`${path}/${deleteParam.applicationId}/del`);
    }

    // application 이름 중복 검사
    getExistsApplication(name:any): Promise<any> {
        return instance.get<Result<any>,Result<any>>(`${path}/exists?applicationName=${name}`);
    }
    
    // 미등록 url ?
    getApplicationUnRegisterd(): Promise<any> {
        return instance.get<Result<any>,Result<any>>(`${path}/unregisterd`);
    }

    

}

export const applicationApi = new ApplicationApi();