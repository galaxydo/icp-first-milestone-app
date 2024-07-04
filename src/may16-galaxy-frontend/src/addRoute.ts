import { render } from "preact-render-to-string";
import { app } from "./sw";

const addRoute = async (componentName) => {
  const componentPath = `@/islands/${componentName}.tsx`;
  const module = await import(componentPath);

  const routePath = `/${componentName}`;

  Object.keys(module).forEach((method) => {
    if (['GET', 'POST', 'PUT', 'DELETE'].includes(method)) {
      app[method.toLowerCase()](routePath, async (req, res) => {
        const component = await module[method]();
        return res.html(render(component));
      });
    }
  });
};

export default addRoute;
