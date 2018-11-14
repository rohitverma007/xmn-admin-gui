import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import GenerateToken from '@/components/GenerateToken'
import WithdrawToken from '@/components/WithdrawToken'
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
      path: '/withdrawToken',
      name: 'WithdrawToken',
      component: WithdrawToken
    },
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: Dashboard
    }    
  ]
})
