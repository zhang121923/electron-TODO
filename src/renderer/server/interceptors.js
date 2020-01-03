/**
 * 接口访问拦截器
 */
import axios from 'axios'
import {message} from 'antd'

axios.interceptors.request.use((config) => {
    return config
}, (error) => {
    return Promise.reject(error)
})

axios.interceptors.response.use((response) => {
    // 过滤掉请求失败的数据
    if (response.status !== 200) {
        message.error('请求数据失败！')
        return false;
    }
    return response.data;
}, (error) => {
    return Promise.reject(error)
})

export default axios;
