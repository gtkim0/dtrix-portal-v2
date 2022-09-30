import instance from './index';

const path = '/user/privilege/users'

export interface Result<T = any> {
    code:number;
    message?:string;
    data:T;
}

export interface IPrivilegeForm {
    userId:number,
    privilegeId:number
}

class PrivilegeUserDetailApi {

    getPrivilegeUsers(params?:any): Promise<Result<any>> {
        return instance.get<Result<any>,Result<any>>(path, params);
    }

    createPrivilegeUsers (privilege:any) : Promise<Result<any>> {
        return instance.post<Result<any>,Result<any>>(path, privilege);
    }

    deletePrivilege (privilegeId:number): Promise<Result<any>> {
        return instance.delete<Result<any>, Result<any>>(`${path}/${privilegeId}`);
    }

}

export const privilegeUserDetailApi = new PrivilegeUserDetailApi();