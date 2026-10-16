import { fileURLToPath, URL } from 'node:url'

import tailwindcss from '@tailwindcss/vite'
import vue from '@vitejs/plugin-vue'
import unpluginFonts from 'unplugin-fonts/vite'
import { defineConfig } from 'vite'
import vuetify from 'vite-plugin-vuetify'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vuetify({ autoImport: true }),
    tailwindcss(),
    unpluginFonts({
      fontsource: {
        families: [
          { name: 'Roboto', weights: [100, 300, 400, 500, 700, 900], subset: 'latin' },
          { name: 'Roboto Mono', weights: [400, 500, 700], subset: 'latin' },
        ],
      },
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('src', import.meta.url)),
    },
  },
})
