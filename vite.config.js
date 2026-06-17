import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// GitHub Pages(every-dev 레포)에 올릴 때 base 경로를 맞춘다.
// 로컬 dev/preview 에서는 '/' 로 동작.
export default defineConfig(({ command }) => ({
  base: command === 'build' ? '/every-dev/' : '/',
  plugins: [vue()],
  server: { host: true, port: 5173 },
}))
