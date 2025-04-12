import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  base: '/locolibs/', // Set the base path for hosting in a subdirectory
  plugins: [react()],
})
