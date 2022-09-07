import axios, {AxiosResponse} from 'axios';
import {BASE_URL} from "../config";


const instance = axios.create({
    baseURL: BASE_URL,
    timeout: 15000
})

const responseBody = (response:AxiosResponse) => {
    return response;
}

export const requests = {
    get: (url: string) => instance.get(url).then(responseBody),
    post: (url: string, body: any) => instance.post(url, body).then(responseBody),
    put: (url: string, body: any) => instance.put(url, body).then(responseBody),
    delete: (url: string) => instance.delete(url).then(responseBody),
}

instance.interceptors.request.use(
    function (config) {
        const token = window.localStorage.getItem('accessToken');
        if (token) {
            // @ts-ignore
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    function (error) {
        console.log(error);
        return Promise.reject(error);
    }
);

instance.interceptors.response.use(
    function (response) {
        return response.data;
    },
    function (error) {
        console.log(error);
    }
);

export default instance;