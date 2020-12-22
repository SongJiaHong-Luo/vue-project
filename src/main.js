// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuex from 'vuex'
import store from './store/index'
import ElementUI, { Message, MessageBox }  from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// 引入全局样式
import global from './assets/global.css'

if(process.env.NODE_ENV === 'development') {
  const { mockXHR } = require('../mock')
  mockXHR();
}

Vue.use(ElementUI)
Vue.use(Vuex)
Vue.use(global)

Vue.prototype.$message = Message
Vue.prototype.$confirm = MessageBox.confirm

Vue.config.productionTip = false
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
