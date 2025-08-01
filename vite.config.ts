import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // server: {
  //   watch: {
  //     usePolling: true // Necesario para algunos entornos de Windows
  //   }
  // },
  // cacheDir: './.vite' // Cambia la ubicación de la caché
})
