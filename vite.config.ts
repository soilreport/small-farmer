import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(({ command }) => ({
  plugins: [react()],
  // GitHub Pages serves from https://soilreport.github.io/small-farmer/
  base: command === 'build' ? '/small-farmer/' : '/',
}))
