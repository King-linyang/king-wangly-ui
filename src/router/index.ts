//引入路由对象
import { createRouter, createWebHistory, createWebHashHistory, createMemoryHistory, RouteRecordRaw } from 'vue-router'

/* Layout */
import Layout from '@/Layout'

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
//公共路由
export const constantRoutes: Array<RouteRecordRaw> = [
    {
        path: '',
        component: Layout,
        redirect: '/index',
        children: [
            {
                path: '/index',
                component: () => import('@/views/index.vue'),
                name: 'Index',
                //   meta: { title: '首页', icon: 'dashboard', affix: true }
            }
        ]
    },
    {
        path: "/denglu",
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
    },
    {
        path: "/codemirror/editTest",
        name: "EditTest",
        meta: {
            title: '编辑案例页面',
            transition: "animate__bounceIn",
        },
        component: () => import('@/views/codemirror/EditTest.vue')
    }
]

//动态路由-----做权限
export const dynamicRoutes: Array<RouteRecordRaw> = [

]
const router = createRouter({
    history: createWebHashHistory(import.meta.env.BASE_URL),
    // history: createWebHistory(),
    routes: constantRoutes,
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition
        } else {
            return { top: 0 }
        }
    },
})

//导出router
export default router