import { post, get } from '@/http/request';

export type LoginRequest = {
    username: string;
    password: string;
};

// 刷新登录信息需要的参数
export type reLoginRequest = {
    accessToken: string;
};

export type LoginResponse = {
    username: string;
    roles: string[];
    accessToken: string;
};

// 定义的接口
export const userLogin = async (data) => {
    return post({}, '/login', data);
};

export const refreshUserInfo = async (data) => {
    return post({}, '/getUserInfo', data);
};

export const getUserList = async (data) => {
    return get({}, '/getUserList', data);
};
