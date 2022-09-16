import instance from "./index";
import type {User} from '../types/user';
import {Result} from "../types/common";

const path = '/auth';

class AuthApi {

    async login(userId:string, userPw:string): Promise<string> {
        const result:any = await instance.post<Result<string>, Result<string>>(`${path}/login`, {userId, userPw});
        const {code,data,message}:any = result;
        const {token, domain} = data;

        // data 에는 domain token 이 들어감.
        // const {code, message, data: accessToken} = result;

        return new Promise((resolve, reject) => {
            try {
                if (code === 0) {
                    resolve(data);
                } else {
                    // reject(new Error('Please check your email and password'));
                    reject(new Error(message));
                    return;
                }
            } catch (err) {
                console.error('[Auth Api]: ', err);
                reject(new Error('Internal server error'));
            }
        });
    }

    async logout(): Promise<Result<string>> {
        console.log("여기2");
        return instance.post<Result<string>, Result<string>>(`${path}/logout`);
    }

    async register({username, name, password}:any): Promise<Result<User>> {
        return instance.post<Result<User>, Result<User>>(`${path}/register`, {username, name, password});
    }

    me(): Promise<Result<User>> {
        return instance.get<Result<User>, Result<User>>(`${path}/me`);
    }

    async getToken({token}:any): Promise<Result<User>> {
        return instance.post<Result<User>, Result<User>>(`${path}/token`);
    }

}

export const authApi = new AuthApi();
