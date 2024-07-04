import { defineConfig } from 'vite';
import { fileURLToPath, URL } from 'url';
import environment from 'vite-plugin-environment';
import dotenv from 'dotenv';
import path, { resolve } from 'path';
import fs from 'fs';

// import multiInput from 'rollup-plugin-multi-input';

import preact from "@preact/preset-vite";

import { TailwindCSSVitePlugin } from 'tailwindcss-vite-plugin';

import islandsPlugin from './islands-plugin';

dotenv.config({ path: '../../.env' });

export default defineConfig({
  build: {
    minify: false,
    outDir: 'dist',
    rollupOptions: {
      // plugins: [multiInput()],
      input: {
        // reload: resolve(__dirname, 'reload.html'),
        index: resolve(__dirname, 'index.html'),
        sw: resolve(__dirname, 'src/sw/index.tsx'),
        // login: resolve(__dirname, 'src/login.ts'),
        // canvas: resolve(__dirname, 'assets/scripts/canvas.js')
        // may16: resolve(__dirname, 'src/may16.ts'),
        // htmx: resolve(__dirname, 'src/htmx.min.js')
      },
      output: {
        entryFileNames(chunk) {
          if (chunk.name === 'sw') {
            return 'galaxy-service-worker.js'
          } else {
            return 'assets/[name].js'
          }
        },
        assetFileNames: (assetInfo) => {
          // if (assetInfo.name === 'style.css') return 'custom.css';
          return assetInfo.name;
        },
      }
    },
    // emptyOutDir: false,
  },
  resolve: {
    alias: [
      {
        find: "@declarations",
        replacement: fileURLToPath(
          new URL("../declarations", import.meta.url)
        ),
      },
      // {
      //   find: "@/assets",
      //   replacement: fileURLToPath(
      //     new URL("./assets", import.meta.url)
      //   ),
      // },
      {
        find: "@generated",
        replacement: fileURLToPath(
          new URL("./generated", import.meta.url)
        ),
      },
       {
        find: "@",
        replacement: fileURLToPath(
          new URL("./src", import.meta.url)
        ),
      }
    ],
  },
  optimizeDeps: {
    esbuildOptions: {
      define: {
        global: "globalThis",
      },
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
      CANISTER_ID_MAY16_GALAXY_FRONTEND: undefined,
      CANISTER_ID_MAY16_GALAXY_BACKEND: undefined,
      CANISTER_ID_INTERNET_IDENTITY: false,
      IS_PREACT: true,
    }),
    TailwindCSSVitePlugin(
      {
        // entry: fileURLToPath(
        //   new URL('./src/main.css', import.meta.url)
        // ),
        config:
          fileURLToPath(
            new URL('./tailwind.config.cjs', import.meta.url)
          ),
      }
    ),
    islandsPlugin(),
  ],
  // css: {
  //   postcss: {
  //     plugins: [tailwindcss()],
  //   },
  // },

});
