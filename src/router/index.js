import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {path: '/',name: 'home',component: HomeView},
    {path: '/reg64',name: 'reg64',component: () => import("../views/Reg64View.vue")},
    {path: '/editor',name: 'editor',component: () => import("../views/EditorView.vue")},
  ]
})

export default router
