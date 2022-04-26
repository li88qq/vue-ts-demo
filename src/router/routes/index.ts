import {RouteRecordRaw} from "vue-router";

export const LAYOUT = import('/@/layouts/default/index.vue')

export const baseRoutes: RouteRecordRaw [] = [
    {path: '/', name: 'ROOT', redirect: '/sys'},
    {path: '/404', name: 'NOT FOUND', component: () => import('/@/views/error/404.vue')},
]