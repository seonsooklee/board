import Error404 from '../pages/Error404.vue'
import { RouteRecordRaw } from "vue-router";

export const routes: RouteRecordRaw[]= [
    {
        path: '/',
        redirect: '/login'
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('../pages/login/login.vue')
    },
    {
        path: '/main',
        name: 'main',
        redirect: '/main/list',
        component: () => import('../layouts/MainLayout.vue'),
        children: [
            {
                path: 'list',
                name: 'list',
                component: () => import('../pages/board/list.vue'),
                children: []
            },
            {
                path: 'detail/:id',
                name: 'detail',
                component: () => import('../pages/board/detail.vue'),
                children: []
            },
            {
                path: 'edit/:id',
                name: 'edit',
                component: () => import('../pages/board/edit.vue'),
                children: []
            },
            {
                path: 'create',
                name: 'create',
                component: () => import('../pages/board/create.vue'),
                children: []
            },
            {
                path: 'admin',
                name: 'admin',
                component: () => import('../pages/admin/list.vue'),
                children: []
            },
        ],
    },
    {
        path: '/join',
        name: 'join',
        component: () => import('../pages/join/join.vue')
    },
    {
        path: '/404',
        component: Error404,
    }
]
