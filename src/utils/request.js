import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
import store from '../store'
import { getToken } from '../utils/auth'
// axios配置
const http = axios.create({
    baseURL:process.env.VUE_APP_BASE_API,
    timeout:5000
})
// 设置请求拦截器
http.interceptors.request.use(config => {
  debugger
  console.log(store.getters)
  if(store.getters.token) {
    console.log(config.headers);
    config.headers['Authorization'] = `Bearer ${getToken()}` // 加Bearer是jwt的规范
  }
  console.log(config);  
  return config
},
error => {
  // 捕获错误
  console.log(error)
  return Promise.reject(error)
}
)
// 拦截响应的数据，进行操作
http.interceptors.response.use(response => {
  console.log(response)
    const res = response.data
    if(res.code !== 200) {
      const errMsg = res.msg || '请求失败'
      Message({
        message: errMsg || '请求失败',
        type: 'error',
        duration: 5*1000
      })
    } else if(res.code === 200){
      const msg = res.msg || '请求成功'
      Message({
        message: msg || '请求成功',
        type: 'success',
      })
    }
    if (res.code === 50008 || res.code === 50012 || res.code == 50014) {
      MessageBox.confirm('您已经登出，您可以取消停留在此页面，或再次登录', {
        confirmButtonText: '重新登录',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // store.dispatch分发action
        store.dispatch('/user/resetToken').then(() => {
          // 重新载入当前文档，类似于刷新按钮
          location.reload()
        })
      })
  }
  return response
},
  error => {
    console.log('request的err' + error)
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
  }
)
export default http