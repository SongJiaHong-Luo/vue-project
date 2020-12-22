import Cookies from 'js-cookie'
// 设置token
const tokenKey = 'Admin-Token'
// 读取tokenKey中的cookie
export function getToken () {
    return Cookies.get(tokenKey)
}
export function setToken (token) {
    console.log(token)
    return Cookies.set(tokenKey,token)
}
export function removeToken () {
    return Cookies.remove(tokenKey)
}