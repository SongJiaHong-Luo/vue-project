import Vue from 'vue'
import Router from 'vue-router'
import home from '../components/home'

Vue.use(Router)
export const routes = [
  {
    path: '/',
    component: () => import('../view/login.vue'),
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../view/login.vue'),
  },
  {
    path: '/home',
    name: 'home',
    component: home
  }
]
const creatRouter = () => new Router({
  routes
});
const router = creatRouter()
// 重置或者替换当前router
export function resetRouter() {
  const newRouter = creatRouter()
  router.matcher = newRouter.matcher
}

export default router
