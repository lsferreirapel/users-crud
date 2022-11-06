import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

import * as path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "@root": path.resolve(__dirname, './'),
      "@src": path.resolve(__dirname, './src'),
      "@pages": path.resolve(__dirname, './src/pages'),
      "@atomic": path.resolve(__dirname, './src/atomic'),
      "@services": path.resolve(__dirname, './src/services'),
      "@common": path.resolve(__dirname, './src/common'),
      "@assets": path.resolve(__dirname, './src/common/assets'),
    }
  },
  plugins: [react()]
})
