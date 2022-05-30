import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import {viteMockServe} from 'vite-plugin-mock'

const localEnabled: boolean = (process.env.USE_MOCK as unknown as boolean) || false;
const prodEnabled: boolean = (process.env.USE_CHUNK_MOCK as unknown as boolean) || false;

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [vue(), viteMockServe({
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
