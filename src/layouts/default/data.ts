import {MenuInfo} from "/@/components/subMenu/type";

export const menus: MenuInfo[] = [
    {key: 'navigation', title: '导航', icon: 'bx:navigation'},
    {
        key: 'web', title: 'web', icon: 'ant-design:ie-outlined', children: [
            {key: 'js', title: 'js',},
            {key: 'ts', title: 'ts',},
            {key: 'node', title: 'node',},
            {key: 'css', title: 'css',},
            {key: 'less', title: 'less',},
        ],
    },
    {
        key: 'vue', title: 'vue', icon: 'logos:vue', children: [
            {key: 'vue', title: 'vue',},
            {key: 'vite', title: 'vite',},
            {key: 'router', title: 'router',},
            {key: 'pinia', title: 'pinia',},
            {key: 'axios', title: 'axios',},
        ]
    },
    {
        key: 'antd', title: 'antd', icon: 'ant-design:ant-design-outlined', children: [
            {key: 'antd', title: 'antd',},
            {key: 'dayjs', title: 'dayjs',},
        ]
    },
]