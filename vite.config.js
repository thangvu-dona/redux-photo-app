import { defineConfig } from 'vite'
// import { fileURLToPath } from "url";
import react from '@vitejs/plugin-react'
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'), // install `npm install -D @types/node` for resolve __dirname, path
      // '@assets': path.resolve(__dirname, './src/assets'),
      // '@components': path.resolve(__dirname, './src/components'),
      // '@constants': path.resolve(__dirname, './src/constants'),
    },
  },
  plugins: [react()],
})
