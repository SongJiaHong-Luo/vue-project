import {getToken, setToken, removeToken} from '../../utils/auth'
import {login, loginOut, getUserInfo} from '../../api/user'
// 设置默认的state参数
const state = {
    token: getToken(),
    roleName: '',
    avatar: '',
    introduction: '',
    roles: []
}
// 设置同步函数
const mutations = {
    // 重置state
    reset_state:(newState) => {
        Object.assign(newState,state)
    },
    set_token: (state, token) => {
        state.token = token
    },
    set_name: (state, roleName) => {
        state.name = roleName
    },
    set_avatar: (state, avatar) => {
        state.avatar = avatar
    },
    set_roles: (state, roles) => {
        state.roles = roles
    },
    set_introduction: (state, introduction) => {
        state.introduction = introduction
    },
}
// 处理异步函数
const actions = {
    // 用户登录  commit提交mutation
    login({commit},userInfo) {
        const {userName, password} = userInfo
        return new Promise((resolve, reject) => {
            console.log({userName: userName.trim(), password: password})
            debugger
           login({userName: userName.trim(), password: password}).then(response => {
               console.log(response);
               const {data} = response
               console.log(data)
            //    把token传给setToken
            commit('set_token',data.token)
            setToken(data.token)
            resolve();
           }).catch(err => {
               console.log(err);
               reject(err);
           })
        })
    },
    getUserInfo({commit, state}) {
        return new Promise((resolve, reject) => {
           getUserInfo(state.token).then(response => {
              const {data} = response
            //   对data中的数据进行判断
            if(!data) {
                reject('验证失败，请重新登录')
            }
            const {roles,roleName,avatar,introduction} = response;
            // roles是一个数组，并且这个数组一定不能为空
            if (!roles || roles.length <= 0) {
                reject('roles必须是一个非空数组！')
            }
            commit('set_roles',roles)
            commit('set_name',roleName)
            commit('set_avatar',avatar)
            commit('set_introduction',introduction)
            resolve();
           }).catch(err => {
               reject(err);
           })
        })
    },
    loginOut({ commit, state }) {
        return new Promise((resolve,reject) => {
            loginOut(state.token).then(() => {
                // 退出登录移除token,重置路径
                removeToken()
                commit('reset_state')
                resolve()
            }).catch(err => {
                reject(err)
            })
        })
    },
    // 移除token
    resetToken({commit}) {
        return new Promise(resolve => {
            removeToken()
            commit('reset_state')
            resolve()
        })
    }
}
export default {
     // namespaced是指在使用state等，需要声明所在的模块名 this.$store.commit('user下/login函数',某值)
    namespaced: true,
    state,
    mutations,
    actions
}