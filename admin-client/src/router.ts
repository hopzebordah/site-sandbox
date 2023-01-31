import * as VueRouter from 'vue-router'

import LoginPage from './components/Login.vue'
import Settings from './components/Settings.vue'
import { verifyLogin } from './api'

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
    {
        path: '/:pathMatch(.*)*',
        alias: '/404',
        name: '404',
        component: '<h2>404 Not Found</h2>',
    },
]

const router = VueRouter.createRouter({
    history: VueRouter.createWebHashHistory(),
    routes,
})

router.beforeEach(async (to, from) => {
    const validLogin = await verifyLogin()
    console.log({ to, from, validLogin })
    if (!validLogin) {
        if (to.name === 'login') return true
        return { name: 'login', replace: true }
    }
    if (to.name === 'login') return { name: '/', replace: true }
    return true
})

export default router
