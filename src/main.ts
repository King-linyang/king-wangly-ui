import { createApp, toRaw } from 'vue'
import './style.css'
import App from './App.vue'
import { createPinia, PiniaPluginContext } from 'pinia'
import router from './router'



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


//注册pinia
app.use(store)

//注册router
app.use(router)

app.mount('#app')
