
import fs from 'fs';
import path from 'path';
import { parse } from '@babel/parser';
import traverse from '@babel/traverse';

export default function islandsPlugin() {
  return {
    name: 'vite-plugin-islands',
    buildStart() {
      try {
        const islandsDir = path.resolve(__dirname, 'src/islands');
        const outputFilePath = path.resolve(__dirname, 'generated/routes.ts');

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

          try {
            traverse.default(ast, {
              ExportNamedDeclaration(path) {
                const declaration = path.node.declaration;
                if (declaration.type === 'FunctionDeclaration') {
                  exportedMethods.push(declaration.id.name);
                }
              }
            });
          } catch (traverseError) {
            console.error(`Error traversing AST for file: ${file}`, traverseError);
            return;
          }

          exportedMethods.forEach(method => {
            if (['GET', 'POST', 'PUT', 'DELETE'].includes(method)) {
              importStatements.push(`import { ${method} as ${method}_${componentName} } from '${componentPath}';`);
              routeRegistrations.push(`
app.${method.toLowerCase()}('/${componentName}', async (req, res) => {
  try {
    const component = await ${method}_${componentName}();
    return res.html(render(component));
  } catch (error) {
    console.error('Error rendering component:', error);
    res.status(500).send('Internal Server Error');
  }
});
              `);

              if (!nestedRoutes[method.toLowerCase()]) {
                nestedRoutes[method.toLowerCase()] = {};
              }
              nestedRoutes[method.toLowerCase()][componentName] = `/${componentName}`;
            }
          });
        });

        const routesContent = `
export const routes = ${JSON.stringify(nestedRoutes, null, 2)};
        `;

        const outputContent = `
import { render } from 'preact-render-to-string';

${importStatements.join('\n')}

export function registerRoutes(app) {
  ${routeRegistrations.join('\n')}
}

${routesContent}
        `;

        fs.writeFileSync(outputFilePath, outputContent.trim());
      } catch (error) {
        console.error('Error in islandsPlugin buildStart:', error);
      }
    }
  };
}
