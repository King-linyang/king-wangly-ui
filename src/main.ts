import { createApp, toRaw, createVNode, render, CreateAppFunction } from 'vue'
import './style.css'
import App from './App.vue'
import { createPinia, PiniaPluginContext } from 'pinia'
import router from './router'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

import { RouterHistory, createRouter } from 'vue-router'

//codemirror 代码编辑器
import { createTheme, Theme } from '@/composables/codemirror/theme'

export interface AppCreatorOptions {
    appCreator: CreateAppFunction<Element>
    routerHistory: RouterHistory
    initTheme: Theme
    language: string
    userAgent: string
}

import LoadingBar from '@/components/LoadingBar.vue'
//转成虚拟dom
const Vnode = createVNode(LoadingBar)
//挂载到body
render(Vnode, document.body)

//定义兜底变量
const __piniaKey = '__PINIAKEY__'
//定义入参类型
type Options = {
    key?: string
}
//将数据存在本地
const setStorage = (key: string, value: any): void => {
    localStorage.setItem(key, JSON.stringify(value))
}
//存缓存中读取
const getStorage = (key: string) => {
    return (localStorage.getItem(key) ? JSON.parse(localStorage.getItem(key) as string) : {})
}
//利用函数柯丽华接受用户入参
const piniaPlugin = (options: Options) => {
    //将函数返回给pinia  让pinia  调用 注入 context
    return (context: PiniaPluginContext) => {
        const { store } = context;
        const data = getStorage(`${options?.key ?? __piniaKey}-${store.$id}`)
        store.$subscribe(() => {
            setStorage(`${options?.key ?? __piniaKey}-${store.$id}`, toRaw(store.$state));
        })
        //返回值覆盖pinia 原始值
        return {
            ...data
        }
    }
}
//初始化pinia
const store = createPinia()
store.use(piniaPlugin({
    key: "pina"
}))




const app = createApp(App)

//代码编辑器主题
const theme = createTheme(Theme.Light)


//注册主题
app.use(theme)

//注册pinia
app.use(store)
//注册router
app.use(router)
//引入elementui-plus
app.use(ElementPlus)


//路由白名单
const whileList = ['/']
//前置路由守卫
router.beforeEach((to, from, next) => {
    document.title = to.meta.title
    //加载进度条
    Vnode.component?.exposed?.startLoading()
    let token = localStorage.getItem('token')
    //白名单 有值 或者登陆过存储了token信息可以跳转 否则就去登录页面
    if (whileList.includes(to.path) || token) {
        next()
    } else {
        next({
            path: '/'
        })
    }
})
//后置路由守卫
router.afterEach((to, from) => {
    Vnode.component?.exposed?.endLoading()
})


app.mount('#app')

