import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/',   // if your GitHub Pages is at hotelsupriyainternational.github.io (root domain)
               // change to '/repo-name/' if it's at username.github.io/repo-name
})