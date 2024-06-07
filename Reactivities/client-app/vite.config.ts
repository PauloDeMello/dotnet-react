import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
//Vite config file
export default defineConfig({
  server: {
    port: 3000
  },
  plugins: [react()],
})
