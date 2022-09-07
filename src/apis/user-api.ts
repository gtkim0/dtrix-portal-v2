import instance from "./index";
import type { User, UserBase } from '../types/user';

const path = '/user/users';

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

class UserApi {

    getUsers(params?: any): Promise<Result<UserBase[] | Page<User>>> {
        return instance.get<Result<UserBase[] | Page<User>>, Result<UserBase[] | Page<User>>>(path, { params });
    }

    getUser(id: any): Promise<Result<User>> {
        return instance.get<Result<User>, Result<User>>(`${path}/${id}`);
    }

    createUser(user: User): Promise<Result<User>> {
        return instance.post<Result<User>, Result<User>>(path, user);
    }

    updateUser(id: any, user: User): Promise<Result<User>> {
        return instance.put<Result<User>, Result<User>>(`${path}/${id}`, user);
    }

    updateUserPassword(user: User): Promise<Result<User>> {
        return instance.patch<Result<User>, Result<User>>(`${path}/${user.id}`, user);
    }

    deleteUser(id: any): Promise<Result<User>> {
        return instance.delete<Result<User>, Result<User>>(`${path}/${id}`);
    }
}

export const userApi = new UserApi();
