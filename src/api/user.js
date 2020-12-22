// import request from '../utils/request'
const request = require('../utils/request')
// 登录接口
export function login(data){
    return request({
        url: '/user/login',
        method: 'post',
        data: data
    })
}
//获取用户信息
export function getUserInfo(token) {
    return request({
        url: '/user/userInfo',
        type: 'post',
        method: {token}
    })
}
// 登录退出接口
export function loginOut() {
    return request({
        url: '/user/loginOut',
        method: 'post',
    })
}