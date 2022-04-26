import {createRouter, createWebHistory, RouteRecordRaw, Router} from 'vue-router'

import {baseRoutes} from "/@/router/routes";
import {system} from '/@/router/routes/system'

const routes: RouteRecordRaw [] = [...baseRoutes, ...system]

const router: Router = createRouter({
    routes,
    history: createWebHistory()
})

export {router, routes,}