//引入路由对象
import { createRouter, createWebHistory, createWebHashHistory, createMemoryHistory, RouteRecordRaw } from 'vue-router'

//vue2 mode history vue3 createWebHistory
//vue2 mode  hash  vue3  createWebHashHistory
//vue2 mode abstact vue3  createMemoryHistory

// 定义meta的类型
declare module 'vue-router' {
    interface RouteMeta {
        title: string,
        transition: string,
    }
}


//路由数组的类型 RouteRecordRaw
// 定义一些路由
// 每个路由都需要映射到一个组件。
const routes: Array<RouteRecordRaw> = [
    {
        path: "/",
        name: "Login",
        meta: {
            title: '登录页面',
            transition: "animate__fadeInUp",
        },
        component: () => import('@/views/Login.vue')
    },
    {
        path: "/red",
        name: "Red",
        meta: {
            title: '首页',
            transition: "animate__bounceIn",
        },
        component: () => import('@/views/Red.vue')
    }
]



const router = createRouter({
    history: createWebHashHistory(import.meta.env.BASE_URL),
    // history: createWebHistory(),
    routes
})

//导出router
export default router