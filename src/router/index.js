import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomeView
        },
        {
            path: '/wizard',
            name: 'wizard',
            component: () => import('../components/Wizard.vue')
        },
        {
            path: '/description',
            name: 'description',
            component: () => import('../components/Description.vue')
        },
    ]
})

export default router
