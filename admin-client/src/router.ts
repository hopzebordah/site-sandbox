import * as VueRouter from 'vue-router'

import LoginPage from './components/Login.vue'
import ForgotPage from './components/Forgot.vue'
import Settings from './components/Settings.vue'
import NotFound from './components/NotFound.vue'

import { verifyLogin } from './api'

const routes: VueRouter.RouteRecordRaw[] = [
    {
        path: '/login',
        alias: '/auth',
        name: 'login',
        component: LoginPage,
    },
    {
        path: '/forgot',
        name: 'forgot',
        component: ForgotPage,
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
        component: NotFound,
    },
]

const router = VueRouter.createRouter({
    history: VueRouter.createWebHashHistory(),
    routes,
})

const unauthenticatedRoutes = ['login', 'forgot', 'reset']

router.beforeEach(async (to, from) => {
    const validLogin = await verifyLogin()
    if (!validLogin) {
        if (to.name && unauthenticatedRoutes.includes(to.name as string)) {
            return true
        }
        return { name: 'login', replace: true }
    }
    if (to.name === 'login') return { name: '/', replace: true }
    return true
})

export default router
