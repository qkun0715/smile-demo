import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Register from './views/Register'
import Login from './views/Login'
import Goods from './views/Goods'
import CategoryList from './views/CategoryList'
import Cart from './views/Cart'
import Main from './views/Main'

Vue.use(Router)

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            name: 'Main',
            component: Main,
            children:[
                {path: '/', name: 'Home', component: Home},
                {path: '/categorylist', name: 'CategoryList', component: CategoryList},
                {path: '/cart', name: 'Cart', component: Cart},
            ]
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
            path: '/goods',
            name: 'Goods',
            component: Goods
        },


        {
            path: '/about',
            name: 'about',
            // route level code-splitting
            // this generates a separate chunk (about.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
        }
    ]
})
