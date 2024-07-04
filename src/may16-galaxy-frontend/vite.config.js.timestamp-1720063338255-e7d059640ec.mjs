// vite.config.js
import { defineConfig } from "file:///Users/gur/Documents/april17/may16-galaxy/node_modules/vite/dist/node/index.js";
import { fileURLToPath, URL } from "url";
import environment from "file:///Users/gur/Documents/april17/may16-galaxy/node_modules/vite-plugin-environment/dist/index.js";
import dotenv from "file:///Users/gur/Documents/april17/may16-galaxy/node_modules/dotenv/lib/main.js";
import path2, { resolve } from "path";
import preact from "file:///Users/gur/Documents/april17/may16-galaxy/node_modules/@preact/preset-vite/dist/esm/index.mjs";
import { TailwindCSSVitePlugin } from "file:///Users/gur/Documents/april17/may16-galaxy/node_modules/tailwindcss-vite-plugin/dist/index.mjs";

// islands-plugin.ts
import fs from "fs";
import path from "path";
import { parse } from "file:///Users/gur/Documents/april17/may16-galaxy/node_modules/@babel/parser/lib/index.js";
import traverse from "file:///Users/gur/Documents/april17/may16-galaxy/node_modules/@babel/traverse/lib/index.js";
var __vite_injected_original_dirname = "/Users/gur/Documents/april17/may16-galaxy/src/may16-galaxy-frontend";
function islandsPlugin() {
  return {
    name: "vite-plugin-islands",
    buildStart() {
      try {
        const islandsDir = path.resolve(__vite_injected_original_dirname, "src/islands");
        const outputFilePath = path.resolve(__vite_injected_original_dirname, "generated/routes.ts");
        if (!fs.existsSync(islandsDir)) {
          console.error(`Islands directory does not exist: ${islandsDir}`);
          return;
        }
        const islandFiles = fs.readdirSync(islandsDir).filter((file) => file.endsWith(".tsx"));
        if (islandFiles.length === 0) {
          console.error(`No .tsx files found in islands directory: ${islandsDir}`);
          return;
        }
        const importStatements = [];
        const routeRegistrations = islandFiles.map((file) => {
          const componentName = file.replace(".tsx", "");
          const componentPath = `@/islands/${componentName}`;
          const fileContent = fs.readFileSync(path.join(islandsDir, file), "utf-8");
          let ast;
          try {
            ast = parse(fileContent, { sourceType: "module", plugins: ["jsx"], strictMode: false, errorRecovery: true });
          } catch (parseError) {
            console.error(`Error parsing file: ${file}`, parseError);
            return "";
          }
          const exportedMethods = [];
          try {
            traverse.default(ast, {
              ExportNamedDeclaration(path3) {
                const declaration = path3.node.declaration;
                if (declaration.type === "FunctionDeclaration") {
                  exportedMethods.push(declaration.id.name);
                }
              }
            });
          } catch (traverseError) {
            console.error(`Error traversing AST for file: ${file}`, traverseError);
            return "";
          }
          exportedMethods.forEach((method) => {
            if (["GET", "POST", "PUT", "DELETE"].includes(method)) {
              importStatements.push(`import { ${method} as ${method}_${componentName} } from '${componentPath}';`);
            }
          });
          return exportedMethods.map((method) => {
            if (["GET", "POST", "PUT", "DELETE"].includes(method)) {
              return `
app.${method.toLowerCase()}('/${componentName}', async (req, res) => {
  try {
    const component = await ${method}_${componentName}();
    return res.html(render(component));
  } catch (error) {
    console.error('Error rendering component:', error);
    res.status(500).send('Internal Server Error');
  }
});
              `;
            }
            return "";
          }).join("\n");
        }).join("\n");
        const nestedRoutes = islandFiles.reduce((acc, island) => {
          const name = path.basename(island, path.extname(island));
          const fileContent = fs.readFileSync(path.join(islandsDir, island), "utf-8");
          let ast;
          try {
            ast = parse(fileContent, { sourceType: "module", plugins: ["jsx", "typescript"], allowImportExportEverywhere: true });
          } catch (parseError) {
            console.error(`Error parsing file: ${island}`, parseError);
            return acc;
          }
          const exportedMethods = [];
          try {
            traverse.default(ast, {
              ExportNamedDeclaration(path3) {
                const declaration = path3.node.declaration;
                if (declaration.type === "FunctionDeclaration") {
                  exportedMethods.push(declaration.id.name);
                }
              }
            });
          } catch (traverseError) {
            console.error(`Error traversing AST for file: ${island}`, traverseError);
            return acc;
          }
          exportedMethods.forEach((method) => {
            if (["GET", "POST", "PUT", "DELETE"].includes(method)) {
              if (!acc[method.toLowerCase()]) {
                acc[method.toLowerCase()] = {};
              }
              acc[method.toLowerCase()][name] = `/${name}`;
            }
          });
          return acc;
        }, {});
        const routesContent = `
export const routes = ${JSON.stringify(nestedRoutes, null, 2)};
        `;
        const outputContent = `
import { render } from 'preact-render-to-string';

${importStatements.join("\n")}

export function registerRoutes(app) {
  ${routeRegistrations}
}

${routesContent}
        `;
        fs.writeFileSync(outputFilePath, outputContent.trim());
      } catch (error) {
        console.error("Error in islandsPlugin buildStart:", error);
      }
    }
  };
}

// vite.config.js
var __vite_injected_original_dirname2 = "/Users/gur/Documents/april17/may16-galaxy/src/may16-galaxy-frontend";
var __vite_injected_original_import_meta_url = "file:///Users/gur/Documents/april17/may16-galaxy/src/may16-galaxy-frontend/vite.config.js";
dotenv.config({ path: "../../.env" });
var vite_config_default = defineConfig({
  build: {
    minify: false,
    outDir: "dist",
    rollupOptions: {
      // plugins: [multiInput()],
      input: {
        // reload: resolve(__dirname, 'reload.html'),
        index: resolve(__vite_injected_original_dirname2, "index.html"),
        sw: resolve(__vite_injected_original_dirname2, "src/sw/index.tsx")
        // login: resolve(__dirname, 'src/login.ts'),
        // canvas: resolve(__dirname, 'assets/scripts/canvas.js')
        // may16: resolve(__dirname, 'src/may16.ts'),
        // htmx: resolve(__dirname, 'src/htmx.min.js')
      },
      output: {
        entryFileNames(chunk) {
          if (chunk.name === "sw") {
            return "galaxy-service-worker.js";
          } else {
            return "assets/[name].js";
          }
        },
        assetFileNames: (assetInfo) => {
          return assetInfo.name;
        }
      }
    }
    // emptyOutDir: false,
  },
  resolve: {
    alias: [
      {
        find: "@declarations",
        replacement: fileURLToPath(
          new URL("../declarations", __vite_injected_original_import_meta_url)
        )
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
          new URL("./generated", __vite_injected_original_import_meta_url)
        )
      },
      {
        find: "@",
        replacement: fileURLToPath(
          new URL("./src", __vite_injected_original_import_meta_url)
        )
      }
    ]
  },
  optimizeDeps: {
    esbuildOptions: {
      define: {
        global: "globalThis"
      }
    }
  },
  server: {
    proxy: {
      "/api": {
        target: "http://127.0.0.1:4943",
        changeOrigin: true
      }
    }
  },
  root: "./",
  publicDir: "./public",
  plugins: [
    preact({
      prefreshEnabled: false,
      reactAliasesEnabled: true,
      devToolsEnabled: true
    }),
    environment({
      DFX_NETWORK: void 0,
      CANISTER_ID_MAY16_GALAXY_FRONTEND: void 0,
      CANISTER_ID_MAY16_GALAXY_BACKEND: void 0,
      CANISTER_ID_INTERNET_IDENTITY: false,
      IS_PREACT: true
    }),
    TailwindCSSVitePlugin(
      {
        // entry: fileURLToPath(
        //   new URL('./src/main.css', import.meta.url)
        // ),
        config: fileURLToPath(
          new URL("./tailwind.config.cjs", __vite_injected_original_import_meta_url)
        )
      }
    ),
    islandsPlugin()
  ]
  // css: {
  //   postcss: {
  //     plugins: [tailwindcss()],
  //   },
  // },
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiLCAiaXNsYW5kcy1wbHVnaW4udHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvVXNlcnMvZ3VyL0RvY3VtZW50cy9hcHJpbDE3L21heTE2LWdhbGF4eS9zcmMvbWF5MTYtZ2FsYXh5LWZyb250ZW5kXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvVXNlcnMvZ3VyL0RvY3VtZW50cy9hcHJpbDE3L21heTE2LWdhbGF4eS9zcmMvbWF5MTYtZ2FsYXh5LWZyb250ZW5kL3ZpdGUuY29uZmlnLmpzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9Vc2Vycy9ndXIvRG9jdW1lbnRzL2FwcmlsMTcvbWF5MTYtZ2FsYXh5L3NyYy9tYXkxNi1nYWxheHktZnJvbnRlbmQvdml0ZS5jb25maWcuanNcIjtpbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tICd2aXRlJztcbmltcG9ydCB7IGZpbGVVUkxUb1BhdGgsIFVSTCB9IGZyb20gJ3VybCc7XG5pbXBvcnQgZW52aXJvbm1lbnQgZnJvbSAndml0ZS1wbHVnaW4tZW52aXJvbm1lbnQnO1xuaW1wb3J0IGRvdGVudiBmcm9tICdkb3RlbnYnO1xuaW1wb3J0IHBhdGgsIHsgcmVzb2x2ZSB9IGZyb20gJ3BhdGgnO1xuaW1wb3J0IGZzIGZyb20gJ2ZzJztcblxuLy8gaW1wb3J0IG11bHRpSW5wdXQgZnJvbSAncm9sbHVwLXBsdWdpbi1tdWx0aS1pbnB1dCc7XG5cbmltcG9ydCBwcmVhY3QgZnJvbSBcIkBwcmVhY3QvcHJlc2V0LXZpdGVcIjtcblxuaW1wb3J0IHsgVGFpbHdpbmRDU1NWaXRlUGx1Z2luIH0gZnJvbSAndGFpbHdpbmRjc3Mtdml0ZS1wbHVnaW4nO1xuXG5pbXBvcnQgaXNsYW5kc1BsdWdpbiBmcm9tICcuL2lzbGFuZHMtcGx1Z2luJztcblxuZG90ZW52LmNvbmZpZyh7IHBhdGg6ICcuLi8uLi8uZW52JyB9KTtcblxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcbiAgYnVpbGQ6IHtcbiAgICBtaW5pZnk6IGZhbHNlLFxuICAgIG91dERpcjogJ2Rpc3QnLFxuICAgIHJvbGx1cE9wdGlvbnM6IHtcbiAgICAgIC8vIHBsdWdpbnM6IFttdWx0aUlucHV0KCldLFxuICAgICAgaW5wdXQ6IHtcbiAgICAgICAgLy8gcmVsb2FkOiByZXNvbHZlKF9fZGlybmFtZSwgJ3JlbG9hZC5odG1sJyksXG4gICAgICAgIGluZGV4OiByZXNvbHZlKF9fZGlybmFtZSwgJ2luZGV4Lmh0bWwnKSxcbiAgICAgICAgc3c6IHJlc29sdmUoX19kaXJuYW1lLCAnc3JjL3N3L2luZGV4LnRzeCcpLFxuICAgICAgICAvLyBsb2dpbjogcmVzb2x2ZShfX2Rpcm5hbWUsICdzcmMvbG9naW4udHMnKSxcbiAgICAgICAgLy8gY2FudmFzOiByZXNvbHZlKF9fZGlybmFtZSwgJ2Fzc2V0cy9zY3JpcHRzL2NhbnZhcy5qcycpXG4gICAgICAgIC8vIG1heTE2OiByZXNvbHZlKF9fZGlybmFtZSwgJ3NyYy9tYXkxNi50cycpLFxuICAgICAgICAvLyBodG14OiByZXNvbHZlKF9fZGlybmFtZSwgJ3NyYy9odG14Lm1pbi5qcycpXG4gICAgICB9LFxuICAgICAgb3V0cHV0OiB7XG4gICAgICAgIGVudHJ5RmlsZU5hbWVzKGNodW5rKSB7XG4gICAgICAgICAgaWYgKGNodW5rLm5hbWUgPT09ICdzdycpIHtcbiAgICAgICAgICAgIHJldHVybiAnZ2FsYXh5LXNlcnZpY2Utd29ya2VyLmpzJ1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gJ2Fzc2V0cy9bbmFtZV0uanMnXG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBhc3NldEZpbGVOYW1lczogKGFzc2V0SW5mbykgPT4ge1xuICAgICAgICAgIC8vIGlmIChhc3NldEluZm8ubmFtZSA9PT0gJ3N0eWxlLmNzcycpIHJldHVybiAnY3VzdG9tLmNzcyc7XG4gICAgICAgICAgcmV0dXJuIGFzc2V0SW5mby5uYW1lO1xuICAgICAgICB9LFxuICAgICAgfVxuICAgIH0sXG4gICAgLy8gZW1wdHlPdXREaXI6IGZhbHNlLFxuICB9LFxuICByZXNvbHZlOiB7XG4gICAgYWxpYXM6IFtcbiAgICAgIHtcbiAgICAgICAgZmluZDogXCJAZGVjbGFyYXRpb25zXCIsXG4gICAgICAgIHJlcGxhY2VtZW50OiBmaWxlVVJMVG9QYXRoKFxuICAgICAgICAgIG5ldyBVUkwoXCIuLi9kZWNsYXJhdGlvbnNcIiwgaW1wb3J0Lm1ldGEudXJsKVxuICAgICAgICApLFxuICAgICAgfSxcbiAgICAgIC8vIHtcbiAgICAgIC8vICAgZmluZDogXCJAL2Fzc2V0c1wiLFxuICAgICAgLy8gICByZXBsYWNlbWVudDogZmlsZVVSTFRvUGF0aChcbiAgICAgIC8vICAgICBuZXcgVVJMKFwiLi9hc3NldHNcIiwgaW1wb3J0Lm1ldGEudXJsKVxuICAgICAgLy8gICApLFxuICAgICAgLy8gfSxcbiAgICAgIHtcbiAgICAgICAgZmluZDogXCJAZ2VuZXJhdGVkXCIsXG4gICAgICAgIHJlcGxhY2VtZW50OiBmaWxlVVJMVG9QYXRoKFxuICAgICAgICAgIG5ldyBVUkwoXCIuL2dlbmVyYXRlZFwiLCBpbXBvcnQubWV0YS51cmwpXG4gICAgICAgICksXG4gICAgICB9LFxuICAgICAgIHtcbiAgICAgICAgZmluZDogXCJAXCIsXG4gICAgICAgIHJlcGxhY2VtZW50OiBmaWxlVVJMVG9QYXRoKFxuICAgICAgICAgIG5ldyBVUkwoXCIuL3NyY1wiLCBpbXBvcnQubWV0YS51cmwpXG4gICAgICAgICksXG4gICAgICB9XG4gICAgXSxcbiAgfSxcbiAgb3B0aW1pemVEZXBzOiB7XG4gICAgZXNidWlsZE9wdGlvbnM6IHtcbiAgICAgIGRlZmluZToge1xuICAgICAgICBnbG9iYWw6IFwiZ2xvYmFsVGhpc1wiLFxuICAgICAgfSxcbiAgICB9LFxuICB9LFxuICBzZXJ2ZXI6IHtcbiAgICBwcm94eToge1xuICAgICAgXCIvYXBpXCI6IHtcbiAgICAgICAgdGFyZ2V0OiBcImh0dHA6Ly8xMjcuMC4wLjE6NDk0M1wiLFxuICAgICAgICBjaGFuZ2VPcmlnaW46IHRydWUsXG4gICAgICB9LFxuICAgIH0sXG4gIH0sXG4gIHJvb3Q6ICcuLycsXG4gIHB1YmxpY0RpcjogJy4vcHVibGljJyxcbiAgcGx1Z2luczogW1xuICAgIHByZWFjdCh7XG4gICAgICBwcmVmcmVzaEVuYWJsZWQ6IGZhbHNlLFxuICAgICAgcmVhY3RBbGlhc2VzRW5hYmxlZDogdHJ1ZSxcbiAgICAgIGRldlRvb2xzRW5hYmxlZDogdHJ1ZSxcbiAgICB9KSxcbiAgICBlbnZpcm9ubWVudCh7XG4gICAgICBERlhfTkVUV09SSzogdW5kZWZpbmVkLFxuICAgICAgQ0FOSVNURVJfSURfTUFZMTZfR0FMQVhZX0ZST05URU5EOiB1bmRlZmluZWQsXG4gICAgICBDQU5JU1RFUl9JRF9NQVkxNl9HQUxBWFlfQkFDS0VORDogdW5kZWZpbmVkLFxuICAgICAgQ0FOSVNURVJfSURfSU5URVJORVRfSURFTlRJVFk6IGZhbHNlLFxuICAgICAgSVNfUFJFQUNUOiB0cnVlLFxuICAgIH0pLFxuICAgIFRhaWx3aW5kQ1NTVml0ZVBsdWdpbihcbiAgICAgIHtcbiAgICAgICAgLy8gZW50cnk6IGZpbGVVUkxUb1BhdGgoXG4gICAgICAgIC8vICAgbmV3IFVSTCgnLi9zcmMvbWFpbi5jc3MnLCBpbXBvcnQubWV0YS51cmwpXG4gICAgICAgIC8vICksXG4gICAgICAgIGNvbmZpZzpcbiAgICAgICAgICBmaWxlVVJMVG9QYXRoKFxuICAgICAgICAgICAgbmV3IFVSTCgnLi90YWlsd2luZC5jb25maWcuY2pzJywgaW1wb3J0Lm1ldGEudXJsKVxuICAgICAgICAgICksXG4gICAgICB9XG4gICAgKSxcbiAgICBpc2xhbmRzUGx1Z2luKCksXG4gIF0sXG4gIC8vIGNzczoge1xuICAvLyAgIHBvc3Rjc3M6IHtcbiAgLy8gICAgIHBsdWdpbnM6IFt0YWlsd2luZGNzcygpXSxcbiAgLy8gICB9LFxuICAvLyB9LFxuXG59KTtcbiIsICJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiL1VzZXJzL2d1ci9Eb2N1bWVudHMvYXByaWwxNy9tYXkxNi1nYWxheHkvc3JjL21heTE2LWdhbGF4eS1mcm9udGVuZFwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiL1VzZXJzL2d1ci9Eb2N1bWVudHMvYXByaWwxNy9tYXkxNi1nYWxheHkvc3JjL21heTE2LWdhbGF4eS1mcm9udGVuZC9pc2xhbmRzLXBsdWdpbi50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vVXNlcnMvZ3VyL0RvY3VtZW50cy9hcHJpbDE3L21heTE2LWdhbGF4eS9zcmMvbWF5MTYtZ2FsYXh5LWZyb250ZW5kL2lzbGFuZHMtcGx1Z2luLnRzXCI7aW1wb3J0IGZzIGZyb20gJ2ZzJztcbmltcG9ydCBwYXRoIGZyb20gJ3BhdGgnO1xuaW1wb3J0IHsgcGFyc2UgfSBmcm9tICdAYmFiZWwvcGFyc2VyJztcbmltcG9ydCB0cmF2ZXJzZSBmcm9tICdAYmFiZWwvdHJhdmVyc2UnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBpc2xhbmRzUGx1Z2luKCkge1xuICByZXR1cm4ge1xuICAgIG5hbWU6ICd2aXRlLXBsdWdpbi1pc2xhbmRzJyxcbiAgICBidWlsZFN0YXJ0KCkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgY29uc3QgaXNsYW5kc0RpciA9IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsICdzcmMvaXNsYW5kcycpO1xuICAgICAgICBjb25zdCBvdXRwdXRGaWxlUGF0aCA9IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsICdnZW5lcmF0ZWQvcm91dGVzLnRzJyk7XG5cbiAgICAgICAgaWYgKCFmcy5leGlzdHNTeW5jKGlzbGFuZHNEaXIpKSB7XG4gICAgICAgICAgY29uc29sZS5lcnJvcihgSXNsYW5kcyBkaXJlY3RvcnkgZG9lcyBub3QgZXhpc3Q6ICR7aXNsYW5kc0Rpcn1gKTtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBpc2xhbmRGaWxlcyA9IGZzLnJlYWRkaXJTeW5jKGlzbGFuZHNEaXIpLmZpbHRlcihmaWxlID0+IGZpbGUuZW5kc1dpdGgoJy50c3gnKSk7XG5cbiAgICAgICAgaWYgKGlzbGFuZEZpbGVzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgIGNvbnNvbGUuZXJyb3IoYE5vIC50c3ggZmlsZXMgZm91bmQgaW4gaXNsYW5kcyBkaXJlY3Rvcnk6ICR7aXNsYW5kc0Rpcn1gKTtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBpbXBvcnRTdGF0ZW1lbnRzID0gW107XG4gICAgICAgIGNvbnN0IHJvdXRlUmVnaXN0cmF0aW9ucyA9IGlzbGFuZEZpbGVzLm1hcChmaWxlID0+IHtcbiAgICAgICAgICBjb25zdCBjb21wb25lbnROYW1lID0gZmlsZS5yZXBsYWNlKCcudHN4JywgJycpO1xuICAgICAgICAgIGNvbnN0IGNvbXBvbmVudFBhdGggPSBgQC9pc2xhbmRzLyR7Y29tcG9uZW50TmFtZX1gO1xuICAgICAgICAgIGNvbnN0IGZpbGVDb250ZW50ID0gZnMucmVhZEZpbGVTeW5jKHBhdGguam9pbihpc2xhbmRzRGlyLCBmaWxlKSwgJ3V0Zi04Jyk7XG5cbiAgICAgICAgICBsZXQgYXN0O1xuICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICBhc3QgPSBwYXJzZShmaWxlQ29udGVudCwgeyBzb3VyY2VUeXBlOiAnbW9kdWxlJywgcGx1Z2luczogW1wianN4XCJdLCBzdHJpY3RNb2RlOiBmYWxzZSwgZXJyb3JSZWNvdmVyeTogdHJ1ZSB9KTtcbiAgICAgICAgICB9IGNhdGNoIChwYXJzZUVycm9yKSB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKGBFcnJvciBwYXJzaW5nIGZpbGU6ICR7ZmlsZX1gLCBwYXJzZUVycm9yKTtcbiAgICAgICAgICAgIHJldHVybiAnJztcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBjb25zdCBleHBvcnRlZE1ldGhvZHMgPSBbXTtcblxuICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICB0cmF2ZXJzZS5kZWZhdWx0KGFzdCwge1xuICAgICAgICAgICAgICBFeHBvcnROYW1lZERlY2xhcmF0aW9uKHBhdGgpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBkZWNsYXJhdGlvbiA9IHBhdGgubm9kZS5kZWNsYXJhdGlvbjtcbiAgICAgICAgICAgICAgICBpZiAoZGVjbGFyYXRpb24udHlwZSA9PT0gJ0Z1bmN0aW9uRGVjbGFyYXRpb24nKSB7XG4gICAgICAgICAgICAgICAgICBleHBvcnRlZE1ldGhvZHMucHVzaChkZWNsYXJhdGlvbi5pZC5uYW1lKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH0gY2F0Y2ggKHRyYXZlcnNlRXJyb3IpIHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoYEVycm9yIHRyYXZlcnNpbmcgQVNUIGZvciBmaWxlOiAke2ZpbGV9YCwgdHJhdmVyc2VFcnJvcik7XG4gICAgICAgICAgICByZXR1cm4gJyc7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgZXhwb3J0ZWRNZXRob2RzLmZvckVhY2gobWV0aG9kID0+IHtcbiAgICAgICAgICAgIGlmIChbJ0dFVCcsICdQT1NUJywgJ1BVVCcsICdERUxFVEUnXS5pbmNsdWRlcyhtZXRob2QpKSB7XG4gICAgICAgICAgICAgIGltcG9ydFN0YXRlbWVudHMucHVzaChgaW1wb3J0IHsgJHttZXRob2R9IGFzICR7bWV0aG9kfV8ke2NvbXBvbmVudE5hbWV9IH0gZnJvbSAnJHtjb21wb25lbnRQYXRofSc7YCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgICByZXR1cm4gZXhwb3J0ZWRNZXRob2RzLm1hcChtZXRob2QgPT4ge1xuICAgICAgICAgICAgaWYgKFsnR0VUJywgJ1BPU1QnLCAnUFVUJywgJ0RFTEVURSddLmluY2x1ZGVzKG1ldGhvZCkpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIGBcbmFwcC4ke21ldGhvZC50b0xvd2VyQ2FzZSgpfSgnLyR7Y29tcG9uZW50TmFtZX0nLCBhc3luYyAocmVxLCByZXMpID0+IHtcbiAgdHJ5IHtcbiAgICBjb25zdCBjb21wb25lbnQgPSBhd2FpdCAke21ldGhvZH1fJHtjb21wb25lbnROYW1lfSgpO1xuICAgIHJldHVybiByZXMuaHRtbChyZW5kZXIoY29tcG9uZW50KSk7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgY29uc29sZS5lcnJvcignRXJyb3IgcmVuZGVyaW5nIGNvbXBvbmVudDonLCBlcnJvcik7XG4gICAgcmVzLnN0YXR1cyg1MDApLnNlbmQoJ0ludGVybmFsIFNlcnZlciBFcnJvcicpO1xuICB9XG59KTtcbiAgICAgICAgICAgICAgYDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiAnJztcbiAgICAgICAgICB9KS5qb2luKCdcXG4nKTtcbiAgICAgICAgfSkuam9pbignXFxuJyk7XG5cbiAgICAgICAgY29uc3QgbmVzdGVkUm91dGVzID0gaXNsYW5kRmlsZXMucmVkdWNlKChhY2MsIGlzbGFuZCkgPT4ge1xuICAgICAgICAgIGNvbnN0IG5hbWUgPSBwYXRoLmJhc2VuYW1lKGlzbGFuZCwgcGF0aC5leHRuYW1lKGlzbGFuZCkpO1xuICAgICAgICAgIGNvbnN0IGZpbGVDb250ZW50ID0gZnMucmVhZEZpbGVTeW5jKHBhdGguam9pbihpc2xhbmRzRGlyLCBpc2xhbmQpLCAndXRmLTgnKTtcbiAgICAgICAgICBsZXQgYXN0O1xuICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICBhc3QgPSBwYXJzZShmaWxlQ29udGVudCwgeyBzb3VyY2VUeXBlOiAnbW9kdWxlJywgcGx1Z2luczogW1wianN4XCIsIFwidHlwZXNjcmlwdFwiXSwgYWxsb3dJbXBvcnRFeHBvcnRFdmVyeXdoZXJlOiB0cnVlIH0pO1xuICAgICAgICAgIH0gY2F0Y2ggKHBhcnNlRXJyb3IpIHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoYEVycm9yIHBhcnNpbmcgZmlsZTogJHtpc2xhbmR9YCwgcGFyc2VFcnJvcik7XG4gICAgICAgICAgICByZXR1cm4gYWNjO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGNvbnN0IGV4cG9ydGVkTWV0aG9kcyA9IFtdO1xuXG4gICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHRyYXZlcnNlLmRlZmF1bHQoYXN0LCB7XG4gICAgICAgICAgICAgIEV4cG9ydE5hbWVkRGVjbGFyYXRpb24ocGF0aCkge1xuICAgICAgICAgICAgICAgIGNvbnN0IGRlY2xhcmF0aW9uID0gcGF0aC5ub2RlLmRlY2xhcmF0aW9uO1xuICAgICAgICAgICAgICAgIGlmIChkZWNsYXJhdGlvbi50eXBlID09PSAnRnVuY3Rpb25EZWNsYXJhdGlvbicpIHtcbiAgICAgICAgICAgICAgICAgIGV4cG9ydGVkTWV0aG9kcy5wdXNoKGRlY2xhcmF0aW9uLmlkLm5hbWUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfSBjYXRjaCAodHJhdmVyc2VFcnJvcikge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcihgRXJyb3IgdHJhdmVyc2luZyBBU1QgZm9yIGZpbGU6ICR7aXNsYW5kfWAsIHRyYXZlcnNlRXJyb3IpO1xuICAgICAgICAgICAgcmV0dXJuIGFjYztcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBleHBvcnRlZE1ldGhvZHMuZm9yRWFjaChtZXRob2QgPT4ge1xuICAgICAgICAgICAgaWYgKFsnR0VUJywgJ1BPU1QnLCAnUFVUJywgJ0RFTEVURSddLmluY2x1ZGVzKG1ldGhvZCkpIHtcbiAgICAgICAgICAgICAgaWYgKCFhY2NbbWV0aG9kLnRvTG93ZXJDYXNlKCldKSB7XG4gICAgICAgICAgICAgICAgYWNjW21ldGhvZC50b0xvd2VyQ2FzZSgpXSA9IHt9O1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIGFjY1ttZXRob2QudG9Mb3dlckNhc2UoKV1bbmFtZV0gPSBgLyR7bmFtZX1gO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgcmV0dXJuIGFjYztcbiAgICAgICAgfSwge30pO1xuXG4gICAgICAgIGNvbnN0IHJvdXRlc0NvbnRlbnQgPSBgXG5leHBvcnQgY29uc3Qgcm91dGVzID0gJHtKU09OLnN0cmluZ2lmeShuZXN0ZWRSb3V0ZXMsIG51bGwsIDIpfTtcbiAgICAgICAgYDtcblxuICAgICAgICBjb25zdCBvdXRwdXRDb250ZW50ID0gYFxuaW1wb3J0IHsgcmVuZGVyIH0gZnJvbSAncHJlYWN0LXJlbmRlci10by1zdHJpbmcnO1xuXG4ke2ltcG9ydFN0YXRlbWVudHMuam9pbignXFxuJyl9XG5cbmV4cG9ydCBmdW5jdGlvbiByZWdpc3RlclJvdXRlcyhhcHApIHtcbiAgJHtyb3V0ZVJlZ2lzdHJhdGlvbnN9XG59XG5cbiR7cm91dGVzQ29udGVudH1cbiAgICAgICAgYDtcblxuICAgICAgICBmcy53cml0ZUZpbGVTeW5jKG91dHB1dEZpbGVQYXRoLCBvdXRwdXRDb250ZW50LnRyaW0oKSk7XG4gICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICBjb25zb2xlLmVycm9yKCdFcnJvciBpbiBpc2xhbmRzUGx1Z2luIGJ1aWxkU3RhcnQ6JywgZXJyb3IpO1xuICAgICAgfVxuICAgIH1cbiAgfTtcbn1cbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBMlgsU0FBUyxvQkFBb0I7QUFDeFosU0FBUyxlQUFlLFdBQVc7QUFDbkMsT0FBTyxpQkFBaUI7QUFDeEIsT0FBTyxZQUFZO0FBQ25CLE9BQU9BLFNBQVEsZUFBZTtBQUs5QixPQUFPLFlBQVk7QUFFbkIs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QUFBQSxJQUNGO0FBQUEsRUFDRjtBQUFBLEVBQ0EsY0FBYztBQUFBLElBQ1osZ0JBQWdCO0FBQUEsTUFDZCxRQUFRO0FBQUEsUUFDTixRQUFRO0FBQUEsTUFDVjtBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBQUEsRUFDQSxRQUFRO0FBQUEsSUFDTixPQUFPO0FBQUEsTUFDTCxRQUFRO0FBQUEsUUFDTixRQUFRO0FBQUEsUUFDUixjQUFjO0FBQUEsTUFDaEI7QUFBQSxJQUNGO0FBQUEsRUFDRjtBQUFBLEVBQ0EsTUFBTTtBQUFBLEVBQ04sV0FBVztBQUFBLEVBQ1gsU0FBUztBQUFBLElBQ1AsT0FBTztBQUFBLE1BQ0wsaUJBQWlCO0FBQUEsTUFDakIscUJBQXFCO0FBQUEsTUFDckIsaUJBQWlCO0FBQUEsSUFDbkIsQ0FBQztBQUFBLElBQ0QsWUFBWTtBQUFBLE1BQ1YsYUFBYTtBQUFBLE1BQ2IsbUNBQW1DO0FBQUEsTUFDbkMsa0NBQWtDO0FBQUEsTUFDbEMsK0JBQStCO0FBQUEsTUFDL0IsV0FBVztBQUFBLElBQ2IsQ0FBQztBQUFBLElBQ0Q7QUFBQSxNQUNFO0FBQUE7QUFBQTtBQUFBO0FBQUEsUUFJRSxRQUNFO0FBQUEsVUFDRSxJQUFJLElBQUkseUJBQXlCLHdDQUFlO0FBQUEsUUFDbEQ7QUFBQSxNQUNKO0FBQUEsSUFDRjtBQUFBLElBQ0EsY0FBYztBQUFBLEVBQ2hCO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQU9GLENBQUM7IiwKICAibmFtZXMiOiBbInBhdGgiLCAicGF0aCIsICJfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSIsICJfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSJdCn0K
