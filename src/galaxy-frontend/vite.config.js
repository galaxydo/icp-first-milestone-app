import { defineConfig } from 'vite';
import { fileURLToPath, URL } from 'url';
import environment from 'vite-plugin-environment';
import dotenv from 'dotenv';
import path, { resolve } from 'path';
import preact from "@preact/preset-vite";
import { TailwindCSSVitePlugin } from 'tailwindcss-vite-plugin';
import islandsPlugin from './islands-plugin';

dotenv.config({ path: '../../.env' });

const enabledIslands = process.env.ENABLED_ISLANDS ? process.env.ENABLED_ISLANDS.split(',') : ['ALL'];

export default defineConfig({
  build: {
    minify: false,
    outDir: 'dist',
    rollupOptions: {
      input: {
        index: resolve(__dirname, 'index.html'),
        sw: resolve(__dirname, 'src/service_worker/index.tsx'),
      },
      output: {
        entryFileNames(chunk) {
          return chunk.name === 'sw' ? 'galaxy-service-worker.js' : 'assets/[name].js';
        },
        manualChunks: id => {
          if (id.includes('@dfinity')) {
            return 'dfinity-vendor';
          }

          if (id.includes('@mui')) {
            return 'mui-vendor';
          }
        },
        assetFileNames: (assetInfo) => assetInfo.name,
      }
    },
  },
  resolve: {
    alias: [
      { find: "@declarations", replacement: fileURLToPath(new URL("../declarations", import.meta.url)) },
      { find: "@generated", replacement: fileURLToPath(new URL("./generated", import.meta.url)) },
      { find: "@", replacement: fileURLToPath(new URL("./src/service_worker", import.meta.url)) },
      { find: "@images", replacement: fileURLToPath(new URL("./src/images", import.meta.url)) }
    ],
  },
  optimizeDeps: {
    esbuildOptions: {
      define: { global: "globalThis" },
    },
  },
  server: {
    proxy: {
      "/api": {
        target: "http://127.0.0.1:4943",
        changeOrigin: true,
      },
    },
  },
  root: './',
  publicDir: './public',
  plugins: [
    preact({
      prefreshEnabled: false,
      reactAliasesEnabled: true,
      devToolsEnabled: true,
    }),
    environment({
      DFX_NETWORK: undefined,
      CANISTER_ID_GALAXY_FRONTEND: undefined,
      CANISTER_ID_GALAXY_BACKEND: undefined,
      CANISTER_ID_INTERNET_IDENTITY: false,
      IS_PREACT: true,
    }),
    TailwindCSSVitePlugin({
      config: fileURLToPath(new URL('./tailwind.config.cjs', import.meta.url)),
    }),
    islandsPlugin({ enabledIslands }),
  ],
});
