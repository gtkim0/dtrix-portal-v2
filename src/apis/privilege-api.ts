import instance from './index';
import type { Privilege, PrivilegeBase} from "../types/privilege";
import {Group} from "../types/group";

const path = '/user/privilege'

export interface Result<T = any> {
    code:number;
    message?:string;
    data:T;
}

export interface IPrivilegeForm {
    privilegeName:string,
    delYn:boolean
}

class PrivilegeApi {

    getPrivileges(params?:any): Promise<Result<any>> {
        return instance.get<Result<any>,Result<any>>(path, params);
    }

    getPrivilege(privilegeId:number) : Promise<Result<any>> {
        return instance.get<Result<any>,Result<any>>(`${path}/${privilegeId}`);
    }

    createPrivilege (privilege:IPrivilegeForm) : Promise<Result<Privilege>> {
        return instance.post<Result<Privilege>,Result<Privilege>>(path, privilege);
    }

    updatePrivilege (privilegeId:number,privilege:Privilege) : Promise<Result<Privilege>> {
        return instance.put<Result<Privilege>,Result<Privilege>>(`${path}/${privilegeId}`,privilege);
    }
    // 그룹 삭제
    deletePrivilege (privilegeId:number): Promise<Result<Privilege>> {
        return instance.delete<Result<Privilege>, Result<Privilege>>(`${path}/${privilegeId}`);
    }

}

export const privilegeApi = new PrivilegeApi();