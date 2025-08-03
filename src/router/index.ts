import {createRouter, RouteRecordRaw, createWebHistory} from 'vue-router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

// 组合路由信息
const modules: Record<string, any> = import.meta.glob(['./modules/*.ts'], {eager: true});

// 配置路由
const routes: Array<RouteRecordRaw> = [];
Object.keys(modules).forEach((key) => {
    const module = modules[key].default;
    routes.push(module);
});

const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach((to, from, next) => {
    NProgress.start();
    next();
});

router.afterEach((to) => {
    NProgress.done();
});

export default router;


