import {MenuInfo} from "/@/components/subMenu/type";

export const menus: MenuInfo[] = [
    {id: '0100', url: '/navigation', title: '导航', icon: 'bx:navigation'},
    {
        id: '0200', url: '/web', title: 'web', icon: 'ant-design:ie-outlined', children: [
            {id: '0201', url: '/web/js', title: 'js',},
            {id: '0202', url: '/web/ts', title: 'ts',},
            {id: '0203', url: '/web/node', title: 'node',},
            {id: '0204', url: '/web/css', title: 'css',},
            {id: '0205', url: '/web/less', title: 'less',},
        ],
    },
    {
        id: '0300', url: '/vue', title: 'vue', icon: 'logos:vue', children: [
            {id: '0301', url: '/vue/vue', title: 'vue',},
            {id: '0302', url: '/vue/vite', title: 'vite',},
            {id: '0303', url: '/vue/router', title: 'router',},
            {id: '0304', url: '/vue/pinia', title: 'pinia',},
            {id: '0305', url: '/vue/axios', title: 'axios',},
        ]
    },
    {
        id: '0400', url: '/antd', title: 'antd', icon: 'ant-design:ant-design-outlined', children: [
            {id: '0401', url: '/antd/antd', title: 'antd',},
            {id: '0402', url: '/antd/dayjs', title: 'dayjs',},
        ]
    },
    {
        id: '0500', url: '/doc', title: '文档', icon: 'ant-design:github-outlined', children: [
            {id: '0501', url: '/doc/editor', title: '编辑器',},
            {id: '0502', url: '/doc/layout', title: '布局',},
        ]
    },
]