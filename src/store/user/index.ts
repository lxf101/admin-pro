import { defineStore } from 'pinia';
import pinia from '@/store';
import type { PersistenceOptions } from 'pinia-plugin-persistedstate';
import { userLogin, refreshUserInfo } from '@/api/user';

export interface UserState {
    username: string;
    accessToken: string;
    refreshToken?: string;
    roles: string[];
}

export const useUserStoreHook = defineStore('userInfo', {
    state: () => ({
        username: 'lxf',
        accessToken: '',
        roles: ['common']
    }),
    getters: {},
    actions: {
        storeUserLogin(data) {
            return userLogin(data).then((res) => {
                this.username = res.data.username;
                this.roles = res.data.roles;
                this.accessToken = res.data.accessToken;
                return res;
            });
        },
        storeRefreshUserInfo() {
            if (this.username == 'lxf' && this.accessToken != '') {
                refreshUserInfo({ accessToken: this.accessToken })
                    .then((res) => {
                        this.username = res.username;
                        this.roles = res.roles;
                        this.accessToken = res.accessToken;
                    })
                    .catch(() => {
                        this.accessToken = '';
                    });
            }
        }
    },
    persist: {
        key: 'userInfo',
        storage: sessionStorage,
        paths: ['accessToken']
    } as PersistenceOptions
});

export function useUserStore() {
    return useUserStoreHook(pinia);
}
