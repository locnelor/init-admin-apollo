import react from '@vitejs/plugin-react'
import tailwindcss from 'tailwindcss'
import { defineConfig, loadEnv, ConfigEnv } from "vite";
import { resolve } from "path";
// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  // const env = loadEnv(mode, process.cwd(), "");
  return {
    plugins: [react()],
    base: "./",
    resolve: {
      alias: {
        "@": resolve(__dirname, "./src"),
      },
    },
    css: {
      postcss: {
        plugins: [
          tailwindcss({
            content: ['./src/**/*.{js,ts,jsx,tsx,mdx}']
          })
        ]
      }
    }
  }
})