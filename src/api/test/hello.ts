import http from "@/utils/request";

export const helloData = (data?: object) => {
    return http.request({
        url: '/helloData',
        method: 'POST',
        data
    })
}