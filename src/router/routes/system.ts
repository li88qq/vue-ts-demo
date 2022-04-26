import {RouteRecordRaw} from 'vue-router'
import {LAYOUT} from "/@/router/routes/index";

export const system: RouteRecordRaw[] = [
    {
        path: '/sys', component: () => LAYOUT, redirect: '/sys/navigation',
        children: [
            {path: 'navigation', component: () => import('/@/views/system/navigation/index.vue'),}
        ]
    },
]