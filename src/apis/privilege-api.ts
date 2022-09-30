import instance from './index';
import type { PrivilegeType, PrivilegeBase} from "../types/privilege";
import {Group} from "../types/group";

const path = '/user/privilege'
// const path = '/user/privilege/users'

export interface Result<T = any> {
    code:number;
    message?:string;
    data:T;
}

export interface IPrivilegeForm {
    privilegeName:string,
    delYn:boolean,
    createdAt: number,
    modifiedAt: number,
    privilegeId: number
}

export interface IPrivilegeDataProps {
    privilegeId: number,
    privilegeName : string,

}

class PrivilegeApi {

    getPrivileges(params?:any): Promise<Result<any>> {
        return instance.get<Result<any>,Result<any>>(path, params);
    }

    getPrivilege(privilegeId:number) : Promise<Result<any>> {
        return instance.get<Result<any>,Result<any>>(`${path}/${privilegeId}`);
    }

    createPrivilege (privilege:any) : Promise<Result<PrivilegeType>> {
        return instance.post<Result<PrivilegeType>,Result<PrivilegeType>>(path, privilege);
    }

    updatePrivilege (privilegeId:number,privilege:PrivilegeType) : Promise<Result<PrivilegeType>> {
        return instance.put<Result<PrivilegeType>,Result<PrivilegeType>>(`${path}/${privilegeId}`,privilege);
    }
    // 그룹 삭제
    deletePrivilege (privilegeId:number): Promise<Result<PrivilegeType>> {
        return instance.delete<Result<PrivilegeType>, Result<PrivilegeType>>(`${path}/${privilegeId}`);
    }

}

export const privilegeApi = new PrivilegeApi();