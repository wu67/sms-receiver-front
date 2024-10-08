import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
// import type { PluginOption } from 'vite'
// import { visualizer } from 'rollup-plugin-visualizer'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  return {
    base: mode === 'production' ? '/' : '/',
    plugins: [
      react(),
    ],
    server: {
      host: '0.0.0.0',
      port: 3002,
      proxy: {
        '/api': {
          target: 'http://localhost:3001',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ''),
        },
      },
    },
    resolve: {
      alias: {
        '@': '/src/',
      },
    },
    css: {
      devSourcemap: true,
    },
    build: {
      // 设置最终构建的浏览器兼容目标
      target: 'es2022',
      // 构建后是否生成 source map 文件
      sourcemap: mode !== 'production',
      // 启用/禁用 gzip 压缩大小报告
      reportCompressedSize: mode !== 'development',
      // 单文件输出超出该大小会警告, 单位kb
      chunkSizeWarningLimit: 1000,
      // roolup 配置项. https://rollupjs.org/configuration-options
      rollupOptions: {
        output: {
          manualChunks: {
            antd: ['antd'],
          },
        },
      },
    },
  }
})
