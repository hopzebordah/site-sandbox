import { createApp, Component } from 'vue'
import * as VueRouter from 'vue-router'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap'
import './style.css'

import App from './App.vue'
import LoginPage from './components/Login.vue'
import Settings from './components/Settings.vue'

const routes: VueRouter.RouteRecordRaw[] = [
    {
        path: '/login',
        alias: '/auth',
        name: 'login',
        component: LoginPage,
    },
    {
        path: '/',
        alias: '/settings',
        name: 'settings',
        component: Settings,
    },
]

const router = VueRouter.createRouter({
    history: VueRouter.createWebHashHistory(),
    routes,
})

const app = createApp(App)

app.use(router)

const Login = app.mount('#app')
