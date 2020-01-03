/**
 * 此处主要用于处理首页的数据接口访问
 */
import axios from './interceptors'

/**
 * 用户信息获取
 */
export const getUserInfo = () => {
    return axios.post('http://170.240.110.200:7300/mock/5e099d3911bfdd345c63858e/electron-todo/userInfo', {});
}

/**
 * 获取TODO数量列表
 */
export const getTODONumber = () => {
    return axios.post('http://170.240.110.200:7300/mock/5e099d3911bfdd345c63858e/electron-todo/getTODOList', {});
}
