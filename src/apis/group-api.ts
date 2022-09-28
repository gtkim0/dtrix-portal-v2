import instance from "./index";
import {Group, GroupBase} from '../types/group';
import {User, UserBase} from "../types/user";

const path = '/user/groups';

interface IGroupForm {
    groupName:string,
    groupDescription:string,
    delYn:boolean
}

export interface Result<T = Group> {
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

class GroupApi {

    // 그룹 리스트 조회
    getGroups(params?:any): Promise<Result<GroupBase[] | Page<Group>>> {
        return instance.get<Result<GroupBase[] | Page<Group>>,Result<GroupBase[] | Page<Group>>>(path, {params});
    }

    // 그룹 상세정보
    getGroup(groupId:any): Promise<Result<any>> {
        return instance.get<Result<any>,Result<any>>(`${path}/${groupId}`);
    }

    // 그룹 생성
    createGroup (group:IGroupForm) : Promise<Result<Group>> {
        return instance.post<Result<Group>,Result<Group>>(path, group);
    }

    // 그룹정보 수정
    updateGroup(groupId:string, group:Group): Promise<Result<Group>> {
        return instance.put<Result<Group>,Result<Group>>(`${path}/${groupId}`,group);
    }

    // 그룹 삭제
    deleteGroup(groupId:number): Promise<Result<Group>> {
        return instance.delete<Result<Group>, Result<Group>>(`${path}/${groupId}`);
    }


}

export const groupApi = new GroupApi();
