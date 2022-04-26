import {ConfigEnv, UserConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import {resolve} from "path";

function pathResolve(dir: string) {
    return resolve(process.cwd(), '.', dir);
}

// https://vitejs.dev/config/
export default ({command, mode}: ConfigEnv): UserConfig => {
    const root = process.cwd();
    return {
        root,
        server: {
            host: true,
        },
        plugins: [vue()],
        resolve: {
            alias: [
                // /@/xxxx => src/xxxx
                {
                    find: /\/@\//,
                    replacement: pathResolve('src') + '/',
                },
                // /#/xxxx => types/xxxx
                {
                    find: /\/#\//,
                    replacement: pathResolve('types') + '/',
                },
            ]
        },
        build: {},
        css: {
            preprocessorOptions: {
                less: {
                    modifyVars: {
                        hack: `true;@import (reference) "${resolve('src/design/config.less')}";`,
                    },
                    javascriptEnabled: true,
                },
            },
        },
    }
}
