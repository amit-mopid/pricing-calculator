import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from "vite-plugin-svgr";
import path from 'path';

// https://vite.dev/config/
export default defineConfig(() => {
  const config = {
    base: "/",
    plugins: [react(), svgr()],
    define: {},
    resolve: {
      alias: {
        '@': '/src',
        path: "path-browserify",
      },
    },
    css: {
      preprocessorOptions: {
        scss: {
          api: "modern",
          silenceDeprecations: ["legacy-js-api"],
          loadPaths: [path.resolve(__dirname, 'src/partials')],
        },
      },
    }
  };

  return config;
})
