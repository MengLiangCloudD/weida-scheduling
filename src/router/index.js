import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import table from './../components/table.vue';
// Vue.use(VueRouter)
// export default new VueRouter({
//   routes:[
//       {
//         path: '/',
//         name: 'Home',
//         component: Home
//       }
//     ]
// })

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/table',
    name: 'table',
    component: table
  },
  
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
