import axios, { AxiosError, AxiosResponse, InternalAxiosRequestConfig, AxiosRequestConfig } from 'axios';
import { ElMessage } from 'element-plus';
import { getMessageInfo } from './status';

// 定义后端返回的结构
interface BaseResponse<T = any> {
    code: number;
    message: string;
    data: T;
    status?: number | string;
}

// 创建 axios 实例
const service = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    timeout: 15000
});

// axios 请求拦截器
service.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        return config;
    },
    (error: AxiosError) => {
        return Promise.reject(error);
    }
);

// axios 响应拦截器
service.interceptors.response.use(
    (response: AxiosResponse) => {
        // 响应成功
        if (response.status == 200) {
            let data = response.data;
            if (data.code != 0) {
                ElMessage({
                    message: data.message,
                    type: 'error'
                });
                return Promise.reject(data);
            } else {
                return data;
            }
        }
        ElMessage({
            message: getMessageInfo(response.status),
            type: 'error'
        });
        return response;
    },
    (error: any) => {
        // 响应失败
        const { response } = error;
        if (response) {
            // 请求已发出，但服务器响应的状态码不在2xx范围内
            ElMessage({
                message: getMessageInfo(response.status),
                type: 'error'
            });
            return Promise.reject(response.data);
        }
        ElMessage({
            message: '网络连接异常，请稍后再试！',
            type: 'error'
        });
    }
);

export default service;

// export function get<T = any, U = any>(config: AxiosRequestConfig, url: string, params?: U): Promise<T> {
//     return requestInstance({ ...config, url, method: 'GET', params });
// }

// export function post<T = any, U = any>(config: AxiosRequestConfig, url: string, data: U): Promise<T> {
//     return requestInstance({ ...config, url, method: 'POST', data });
// }

// export function put<T = any, U = any>(config: AxiosRequestConfig, url: string, params?: U): Promise<T> {
//     return requestInstance({ ...config, url, method: 'PUT', params });
// }

// export function del<T = any, U = any>(config: AxiosRequestConfig, url: string, data: U): Promise<T> {
//     return requestInstance({ ...config, url, method: 'DELETE', data });
// }
