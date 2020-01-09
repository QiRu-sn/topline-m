import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    component: () => import('@/views/login')
  },
  {
    path: '/',
    component: () => import('@/views/tabbar'),
    children: [
      {
        path: '',
        component: () => import('@/views/home')
      },
      {
        path: 'questionAnswer',
        component: () => import('@/views/questionAnswer')
      },
      {
        path: 'video',
        component: () => import('@/views/video')
      },
      {
        path: 'userInfo',
        component: () => import('@/views/userInfo')
      } ]
  }]

const router = new VueRouter({
  routes
})

export default router
