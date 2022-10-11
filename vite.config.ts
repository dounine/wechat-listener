import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import {viteMockServe} from 'vite-plugin-mock'
import importToCDN, {autoComplete} from 'vite-plugin-cdn-import'

const localEnabled: boolean = (process.env.USE_MOCK as unknown as boolean) || false;
const prodEnabled: boolean = (process.env.USE_CHUNK_MOCK as unknown as boolean) || false;

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [vue(), importToCDN({
        modules: [
            {
                name: 'axios',
                var: 'axios',
                path: 'https://douyin.61week.com/pet-qrcode/static/js/axios-0.21.4.js'//可自己找其它cdn地址
            },
            {
                name: 'vue',
                var: 'Vue',
                path: 'https://douyin.61week.com/pet-qrcode/static/js/vue-3.2.36.js'//可自己找其它cdn地址
            },
            {
                name: 'vue-router',
                var: 'VueRouter',
                path: 'https://douyin.61week.com/pet-qrcode/static/js/vue-router-4.0.13.js'//可自己找其它cdn地址
            },
            {
                name: 'element-plus',
                var: 'element',
                path: 'https://douyin.61week.com/pet-qrcode/static/js/element-plus-2.2.6.js'//可自己找其它cdn地址
            },
        ],
    }), viteMockServe({
        // ↓解析根目录下的mock文件夹
        mockPath: "mock",
        localEnabled: localEnabled,  // 开发打包开关
        prodEnabled: prodEnabled, // 生产打包开关
        supportTs: true, // 打开后，可以读取 ts 文件模块。 请注意，打开后将无法监视.js 文件。
        watchFiles: true, // 监视文件更改
    })],
    server: {
        port: 8080,
        // proxy: localEnabled ? {} : {
        //     '/api': {
        //         target: 'https://127.0.0.1:40000',   //实际请求地址
        //         changeOrigin: true,
        //         rewrite: (path) => path.replace(/^\/api/, '/api')
        //     },
        // }
    },
})
