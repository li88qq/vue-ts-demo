import {RouteRecordRaw} from 'vue-router'
import {LAYOUT} from "/@/router/routes/index";

export const system: RouteRecordRaw[] = [
    {
        path: '/navigation', component: () => LAYOUT, redirect: '/navigation/index',
        children: [
            {path: 'index', component: () => import('/@/views/system/navigation/index.vue'),}
        ]
    },
    {
        path: '/web', component: () => LAYOUT, redirect: '/web/js',
        children: [
            {path: 'js', component: () => import('/@/views/system/web/es/index.vue'),},
            {path: 'ts', component: () => import('/@/views/system/web/ts/index.vue'),},
            {path: 'css', component: () => import('/@/views/system/web/css/index.vue'),},
            {path: 'less', component: () => import('/@/views/system/web/less/index.vue'),},
            {path: 'node', component: () => import('/@/views/system/web/node/index.vue'),},
        ]
    },
    {
        path: '/vue', component: () => LAYOUT, redirect: '/vue/vue',
        children: [
            {path: 'vue', component: () => import('/@/views/system/vue/vue/index.vue'),},
            {path: 'vite', component: () => import('/@/views/system/vue/vite/index.vue'),},
            {path: 'axios', component: () => import('/@/views/system/vue/axios/index.vue'),},
            {path: 'pinia', component: () => import('/@/views/system/vue/pinia/index.vue'),},
            {path: 'router', component: () => import('/@/views/system/vue/router/index.vue'),},
        ]
    },
    {
        path: '/antd', component: () => LAYOUT, redirect: '/antd/antd',
        children: [
            {path: 'antd', component: () => import('/@/views/system/antd/antd/index.vue'),},
            {path: 'dayjs', component: () => import('/@/views/system/antd/dayjs/index.vue'),},
        ]
    },
    {
        path: '/doc', component: () => LAYOUT, redirect: '/doc/editor',
        children: [
            {path: 'editor', component: () => import('/@/views/system/doc/editor/index.vue'),},
            {path: 'layout', component: () => import('/@/views/system/doc/layout/index.vue'),},
        ]
    },
]