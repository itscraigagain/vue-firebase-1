import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Register from '../views/auth/Register'
import Login from '../views/auth/Login'
import Dashboard from '../views/Dashboard'
import Spotting from '../views/spotting'
import { auth } from '../firebase'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard,
    meta: {
      auth: true
    }
  },
  {
    path: '/spotting',
    name: 'Spotting',
    component: Spotting,
    meta: {
      auth: true
    }
  },
  { 
    path : "/search",
    name: 'Search',
    component: () => import(/* webpackChunkName: "about" */ '../views/ClientSearch.vue')
  },
  { 
    path : "/adminDash",
    name: 'AdminDash',
    component: () => import(/* webpackChunkName: "about" */ '../views/adminDash.vue')
  },
  { 
    path : "/spotterProfile",
    name: 'spotterProfile',
    component: () => import(/* webpackChunkName: "about" */ '../views/ClientProfile.vue')
  },
  { 
    path : "/agentProfile",
    name: 'agentProfile',
    component: () => import(/* webpackChunkName: "about" */ '../views/agentProfile.vue')
  },
  // {
  //   path: '/dashboard',
  //   name: 'Dashboard',
  //   component: Dashboard,
  //   meta: {
  //     auth: true
  //   }
  // },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, form, next) => {
  const requiresAuth = to.matched.some(x => x.meta.auth)

  if(requiresAuth && !auth.currentUser) {
    next('/login')
  } else {
    next()
  }
})

export default router
