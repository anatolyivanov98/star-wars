import Vue from 'vue'
import VueRouter from 'vue-router'
import People from '../views/People.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'People',
    meta: {
      layout: 'default'
    },
    component: People
  },
  {
    path: '/favorite',
    name: 'Favorite',
    meta: {
      layout: 'default'
    },
    component: () => import('../views/Favorite.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
