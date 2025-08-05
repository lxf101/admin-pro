export default {
    path: '/',
    name: 'home',
    component: () => import('@/layout/index.vue'),
    meta: {
        role: ['common', 'admin']
    },
    children: [
        {
            path: '/',
            name: 'HomePage',
            component: () => import('@/views/home/index.vue'),
            meta: {
                isShow: true,
                title: '项目介绍'
            }
        },
        {
            path: '/user',
            name: 'UserPage',
            component: () => import('@/views/user/index.vue'),
            meta: {
                isShow: true,
                title: '用户模块'
            }
        },
        {
            path: '/role',
            name: 'RolePage',
            component: () => import('@/views/role/index.vue'),
            meta: {
                title: '角色模块',
                isShow: true
            }
        },
        {
            path: '/auth',
            name: 'AuthPage',
            component: import('@/views/auth/index.vue'),
            meta: {
                title: '权限模块',
                isShow: true
            }
        }
    ]
};
