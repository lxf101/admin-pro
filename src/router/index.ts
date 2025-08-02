import {createRouter, RouteRecordRaw, createWebHashHistory} from 'vue-router'
import NProgress from 'nprogress'

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'home',
        component: () => import("../views/home/index.vue"),
        meta: {},
        children: []
    }
];

const router = createRouter({
    history: createWebHashHistory(),
    routes
});

router.beforeEach((to, from, next) => {
    NProgress.start();
    next();
});

router.afterEach(() => {
    NProgress.done();
});

export default router;


