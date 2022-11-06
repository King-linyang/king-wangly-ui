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
//公共路由
export const constantRoutes: Array<RouteRecordRaw> = [
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
    },
    {
        path: "/codemirror/codemirror",
        name: "EditTest",
        meta: {
            title: '编辑案例页面',
            transition: "animate__bounceIn",
        },
        component: () => import('@/views/codemirror/CodeMirror.vue')
    },
    {
        path: "/MonacoEditor/MonacoEditor",
        name: "MonacoEditor",
        meta: {
            title: 'monaco-editor微软vscode富文本',
            transition: "animate__bounceIn",
        },
        component: () => import('@/views/monaco-editor/MonacoEditor.vue')
    },
    {
        path: "/MonacoHelloWorld/MonacoHelloWorldDiffV1",
        name: "MonacoHelloWorldDiffV1",
        meta: {
            title: 'monaco-editor微软vscode富文本',
            transition: "animate__bounceIn",
        },
        component: () => import('@/views/monaco-editor/MonacoHelloWorldDiffV1.vue')
    },
    {
        path: "/MonacoHelloWorld/MonacoHelloWorldV1",
        name: "MonacoHelloWorldV1",
        meta: {
            title: 'monaco-editor微软vscode富文本',
            transition: "animate__bounceIn",
        },
        component: () => import('@/views/monaco-editor/MonacoHelloWorldV1.vue')
    },
    {
        path: "/GoJsRelyV1/GoJsRelyV1",
        name: "GoJsRelyV1",
        meta: {
            title: 'monaco-editor微软vscode富文本',
            transition: "animate__bounceIn",
        },
        component: () => import('@/views/gojs-rely/GoJsRelyV1.vue')
    },
    {
        path: "/GoJsRelyV1/GoJsRelyV1Tmp",
        name: "GoJsRelyV1Tmp",
        meta: {
            title: 'monaco-editor微软vscode富文本',
            transition: "animate__bounceIn",
        },
        component: () => import('@/views/gojs-rely/GoJsRelyV1Tmp.vue')
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