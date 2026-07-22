import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  // GitHub Pages serve este projeto em /vitae/ (página de projeto, não a raiz
  // do domínio) — o build do GitHub Actions define GITHUB_PAGES=true. Em dev
  // local e em qualquer outro host, o base continua "/".
  base: process.env.GITHUB_PAGES ? '/vitae/' : '/',
})
