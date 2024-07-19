import fs from 'fs';
import path from 'path';
import { parse } from '@babel/parser';
import traverse from '@babel/traverse';

export default function islandsPlugin(options = {}) {
  const { enabledIslands = [] } = options;

  return {
    name: 'vite-plugin-islands',
    buildStart() {
      try {
        const islandsDir = path.resolve(__dirname, 'src/service_worker/islands');
        const outputFilePath = path.resolve(__dirname, 'generated/routes.ts');
        const islandsFilePath = path.resolve(__dirname, 'generated/islands.tsx');

        if (!fs.existsSync(islandsDir)) {
          console.error(`Islands directory does not exist: ${islandsDir}`);
          return;
        }

        const islandFiles = fs.readdirSync(islandsDir).filter(file => file.endsWith('.tsx'));

        if (islandFiles.length === 0) {
          console.error(`No .tsx files found in islands directory: ${islandsDir}`);
          return;
        }

        const importStatements = [];
        const routeRegistrations = [];
        const nestedRoutes = {};
        const hxMappings = {};
        const islandExports = [];
        const asyncComponentWrappers = [];

        islandFiles.forEach(file => {
          const componentName = file.replace('.tsx', '');
          const componentPath = `@/islands/${componentName}`;
          const fileContent = fs.readFileSync(path.join(islandsDir, file), 'utf-8');

          let ast;
          try {
            ast = parse(fileContent, { sourceType: 'module', plugins: ["jsx", "typescript"], strictMode: false, errorRecovery: true });
          } catch (parseError) {
            console.error(`Error parsing file: ${file}`, parseError);
            return;
          }

          const exportedMethods = [];
          const swapValues = {};

          try {
            traverse.default(ast, {
              ExportNamedDeclaration(path) {
                const declaration = path.node.declaration;
                if (declaration.type === 'FunctionDeclaration') {
                  exportedMethods.push(declaration.id.name);
                } else if (declaration.type === 'VariableDeclaration') {
                  declaration.declarations.forEach(decl => {
                    if (decl.id.name.endsWith('_SWAP')) {
                      const methodName = decl.id.name.replace('_SWAP', '');
                      swapValues[methodName] = decl.init.value;
                    }
                  });
                }
              }
            });
          } catch (traverseError) {
            console.error(`Error traversing AST for file: ${file}`, traverseError);
            return;
          }

          exportedMethods.forEach(method => {
            if (['GET', 'POST', 'PUT', 'DELETE', 'PATCH'].includes(method)) {
              if (enabledIslands.includes(componentName) || enabledIslands.includes('ALL')) {
                importStatements.push(`import { ${method} as ${method}_${componentName} } from '${componentPath}';`);
                routeRegistrations.push(`
                app.${method.toLowerCase()}('/${componentName}', async (req, res) => {
                  try {
                    const result = await ${method}_${componentName}(req);
                    if (Array.isArray(result) && result.length === 2) {
                      const [component, headers] = result;
                      res.html(render(component), { headers });
                    } else {
                      res.html(render(result));
                    }
                  } catch (error) {
                    console.error('Error rendering component:', error);
                    const errorMessage = error.message ? error.message : 'Unknown error';
                    res.html(\`<h1>Internal Server Error</h1><p>\${errorMessage}</p>\`, { status: 200 });
                  }
                });
                `);
              } else {
                routeRegistrations.push(`
app.${method.toLowerCase()}('/${componentName}', (req, res) => {
  res.html('<h1>[${componentName}]</h1>');
})`);
              }

              if (!nestedRoutes[method.toLowerCase()]) {
                nestedRoutes[method.toLowerCase()] = {};
              }
              nestedRoutes[method.toLowerCase()][componentName] = `/${componentName}`;

              if (!hxMappings[componentName]) {
                hxMappings[componentName] = {
                  id: `#${componentName}`,
                };

                // Generate async component wrapper or placeholder based on enabledIslands
                asyncComponentWrappers.push(`
  export function ${componentName}Island(props) {
    const queryParams = props.params ? new URLSearchParams(props.params).toString() : '';
    const url = \`/${componentName}?\${queryParams}\`;
    const trigger = props.trigger || 'load';
    delete props.trigger;
    const swap = props.swap || 'innerHTML transition:true scroll:top';
    delete props.swap;

    return (
      <div id="${componentName}" hx-get={url} hx-trigger={trigger} hx-swap={swap} {...props}>
        Loading...
      </div>
    );
  }
                `);
              }
              hxMappings[componentName][method.toLowerCase()] = `/${componentName}`;
            }
          });
        });

        const routesContent = `
export const routes = ${JSON.stringify(nestedRoutes, null, 2)};
        `;

        const hxMappingsContent = `
export const hx = ${JSON.stringify(hxMappings, null, 2)};

export default hx;
        `;

        const outputContent = `
import { render } from 'preact-render-to-string';

${importStatements.join('\n')}

export function registerRoutes(app) {
  ${routeRegistrations.join('\n')}
}

${routesContent}

${hxMappingsContent}
        `;

        const islandsContent = `
import hx from '@generated/routes';
        
${islandExports.join('\n')}

${asyncComponentWrappers.join('\n')}
        `;

        fs.writeFileSync(outputFilePath, outputContent.trim());
        fs.writeFileSync(islandsFilePath, islandsContent.trim());
      } catch (error) {
        console.error('Error in islandsPlugin buildStart:', error);
      }
    }
  };
}
