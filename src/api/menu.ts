import http from '@/utils/request'

// 获取路由
export const getRouters = () => {
    return http.request({
        url: '/system/menu/getRouters',
        method: 'get'
    })
}