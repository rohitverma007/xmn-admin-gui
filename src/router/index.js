import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import GenerateToken from '@/components/GenerateToken'
import Wallet from '@/components/Wallet'
import Dashboard from '@/components/dashboard'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    }, 
    {
      path: '/generateToken',
      name: 'GenerateToken',
      component: GenerateToken
    },
    {
      path: '/wallet',
      name: 'Wallet',
      component: Wallet
    },
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: Dashboard
    }    
  ]
})
