import { render } from 'preact-render-to-string';

import { GET as GET_Activity } from '@/islands/Activity';
import { GET as GET_AllFiles } from '@/islands/AllFiles';
import { GET as GET_CanvasPage } from '@/islands/CanvasPage';
import { GET as GET_FileRow } from '@/islands/FileRow';
import { GET as GET_FilesPage } from '@/islands/FilesPage';
import { GET as GET_FreeSpaceValue } from '@/islands/FreeSpaceValue';
import { GET as GET_GenerateLoginPage } from '@/islands/GenerateLoginPage';
import { GET as GET_NotFoundPage } from '@/islands/NotFoundPage';
import { GET as GET_RemainingBalance } from '@/islands/RemainingBalance';
import { POST as POST_ReplEval } from '@/islands/ReplEval';
import { GET as GET_SingleProcess } from '@/islands/SingleProcess';
import { POST as POST_SingleProcess } from '@/islands/SingleProcess';
import { GET as GET_ToggleTheme } from '@/islands/ToggleTheme';
import { POST as POST_UploadProcess } from '@/islands/UploadProcess';
import { GET as GET_UploadProcess } from '@/islands/UploadProcess';
import { GET as GET_WhoAmI } from '@/islands/WhoAmI';

export function registerRoutes(app) {
  
                app.get('/Activity', async (req, res) => {
                  try {
                    const result = await GET_Activity(req);
                    if (Array.isArray(result) && result.length === 2) {
                      const [component, headers] = result;
                      res.html(render(component), { headers });
                    } else {
                      res.html(render(result));
                    }
                  } catch (error) {
                    console.error('Error rendering component:', error);
                    const errorMessage = error.message ? error.message : 'Unknown error';
                    res.html(`<h1>Internal Server Error</h1><p>${errorMessage}</p>`, { status: 200 });
                  }
                });
                

                app.get('/AllFiles', async (req, res) => {
                  try {
                    const result = await GET_AllFiles(req);
                    if (Array.isArray(result) && result.length === 2) {
                      const [component, headers] = result;
                      res.html(render(component), { headers });
                    } else {
                      res.html(render(result));
                    }
                  } catch (error) {
                    console.error('Error rendering component:', error);
                    const errorMessage = error.message ? error.message : 'Unknown error';
                    res.html(`<h1>Internal Server Error</h1><p>${errorMessage}</p>`, { status: 200 });
                  }
                });
                

                app.get('/CanvasPage', async (req, res) => {
                  try {
                    const result = await GET_CanvasPage(req);
                    if (Array.isArray(result) && result.length === 2) {
                      const [component, headers] = result;
                      res.html(render(component), { headers });
                    } else {
                      res.html(render(result));
                    }
                  } catch (error) {
                    console.error('Error rendering component:', error);
                    const errorMessage = error.message ? error.message : 'Unknown error';
                    res.html(`<h1>Internal Server Error</h1><p>${errorMessage}</p>`, { status: 200 });
                  }
                });
                

                app.get('/FileRow', async (req, res) => {
                  try {
                    const result = await GET_FileRow(req);
                    if (Array.isArray(result) && result.length === 2) {
                      const [component, headers] = result;
                      res.html(render(component), { headers });
                    } else {
                      res.html(render(result));
                    }
                  } catch (error) {
                    console.error('Error rendering component:', error);
                    const errorMessage = error.message ? error.message : 'Unknown error';
                    res.html(`<h1>Internal Server Error</h1><p>${errorMessage}</p>`, { status: 200 });
                  }
                });
                

                app.get('/FilesPage', async (req, res) => {
                  try {
                    const result = await GET_FilesPage(req);
                    if (Array.isArray(result) && result.length === 2) {
                      const [component, headers] = result;
                      res.html(render(component), { headers });
                    } else {
                      res.html(render(result));
                    }
                  } catch (error) {
                    console.error('Error rendering component:', error);
                    const errorMessage = error.message ? error.message : 'Unknown error';
                    res.html(`<h1>Internal Server Error</h1><p>${errorMessage}</p>`, { status: 200 });
                  }
                });
                

                app.get('/FreeSpaceValue', async (req, res) => {
                  try {
                    const result = await GET_FreeSpaceValue(req);
                    if (Array.isArray(result) && result.length === 2) {
                      const [component, headers] = result;
                      res.html(render(component), { headers });
                    } else {
                      res.html(render(result));
                    }
                  } catch (error) {
                    console.error('Error rendering component:', error);
                    const errorMessage = error.message ? error.message : 'Unknown error';
                    res.html(`<h1>Internal Server Error</h1><p>${errorMessage}</p>`, { status: 200 });
                  }
                });
                

                app.get('/GenerateLoginPage', async (req, res) => {
                  try {
                    const result = await GET_GenerateLoginPage(req);
                    if (Array.isArray(result) && result.length === 2) {
                      const [component, headers] = result;
                      res.html(render(component), { headers });
                    } else {
                      res.html(render(result));
                    }
                  } catch (error) {
                    console.error('Error rendering component:', error);
                    const errorMessage = error.message ? error.message : 'Unknown error';
                    res.html(`<h1>Internal Server Error</h1><p>${errorMessage}</p>`, { status: 200 });
                  }
                });
                

                app.get('/NotFoundPage', async (req, res) => {
                  try {
                    const result = await GET_NotFoundPage(req);
                    if (Array.isArray(result) && result.length === 2) {
                      const [component, headers] = result;
                      res.html(render(component), { headers });
                    } else {
                      res.html(render(result));
                    }
                  } catch (error) {
                    console.error('Error rendering component:', error);
                    const errorMessage = error.message ? error.message : 'Unknown error';
                    res.html(`<h1>Internal Server Error</h1><p>${errorMessage}</p>`, { status: 200 });
                  }
                });
                

                app.get('/RemainingBalance', async (req, res) => {
                  try {
                    const result = await GET_RemainingBalance(req);
                    if (Array.isArray(result) && result.length === 2) {
                      const [component, headers] = result;
                      res.html(render(component), { headers });
                    } else {
                      res.html(render(result));
                    }
                  } catch (error) {
                    console.error('Error rendering component:', error);
                    const errorMessage = error.message ? error.message : 'Unknown error';
                    res.html(`<h1>Internal Server Error</h1><p>${errorMessage}</p>`, { status: 200 });
                  }
                });
                

                app.post('/ReplEval', async (req, res) => {
                  try {
                    const result = await POST_ReplEval(req);
                    if (Array.isArray(result) && result.length === 2) {
                      const [component, headers] = result;
                      res.html(render(component), { headers });
                    } else {
                      res.html(render(result));
                    }
                  } catch (error) {
                    console.error('Error rendering component:', error);
                    const errorMessage = error.message ? error.message : 'Unknown error';
                    res.html(`<h1>Internal Server Error</h1><p>${errorMessage}</p>`, { status: 200 });
                  }
                });
                

                app.get('/SingleProcess', async (req, res) => {
                  try {
                    const result = await GET_SingleProcess(req);
                    if (Array.isArray(result) && result.length === 2) {
                      const [component, headers] = result;
                      res.html(render(component), { headers });
                    } else {
                      res.html(render(result));
                    }
                  } catch (error) {
                    console.error('Error rendering component:', error);
                    const errorMessage = error.message ? error.message : 'Unknown error';
                    res.html(`<h1>Internal Server Error</h1><p>${errorMessage}</p>`, { status: 200 });
                  }
                });
                

                app.post('/SingleProcess', async (req, res) => {
                  try {
                    const result = await POST_SingleProcess(req);
                    if (Array.isArray(result) && result.length === 2) {
                      const [component, headers] = result;
                      res.html(render(component), { headers });
                    } else {
                      res.html(render(result));
                    }
                  } catch (error) {
                    console.error('Error rendering component:', error);
                    const errorMessage = error.message ? error.message : 'Unknown error';
                    res.html(`<h1>Internal Server Error</h1><p>${errorMessage}</p>`, { status: 200 });
                  }
                });
                

                app.get('/ToggleTheme', async (req, res) => {
                  try {
                    const result = await GET_ToggleTheme(req);
                    if (Array.isArray(result) && result.length === 2) {
                      const [component, headers] = result;
                      res.html(render(component), { headers });
                    } else {
                      res.html(render(result));
                    }
                  } catch (error) {
                    console.error('Error rendering component:', error);
                    const errorMessage = error.message ? error.message : 'Unknown error';
                    res.html(`<h1>Internal Server Error</h1><p>${errorMessage}</p>`, { status: 200 });
                  }
                });
                

                app.post('/UploadProcess', async (req, res) => {
                  try {
                    const result = await POST_UploadProcess(req);
                    if (Array.isArray(result) && result.length === 2) {
                      const [component, headers] = result;
                      res.html(render(component), { headers });
                    } else {
                      res.html(render(result));
                    }
                  } catch (error) {
                    console.error('Error rendering component:', error);
                    const errorMessage = error.message ? error.message : 'Unknown error';
                    res.html(`<h1>Internal Server Error</h1><p>${errorMessage}</p>`, { status: 200 });
                  }
                });
                

                app.get('/UploadProcess', async (req, res) => {
                  try {
                    const result = await GET_UploadProcess(req);
                    if (Array.isArray(result) && result.length === 2) {
                      const [component, headers] = result;
                      res.html(render(component), { headers });
                    } else {
                      res.html(render(result));
                    }
                  } catch (error) {
                    console.error('Error rendering component:', error);
                    const errorMessage = error.message ? error.message : 'Unknown error';
                    res.html(`<h1>Internal Server Error</h1><p>${errorMessage}</p>`, { status: 200 });
                  }
                });
                

                app.get('/WhoAmI', async (req, res) => {
                  try {
                    const result = await GET_WhoAmI(req);
                    if (Array.isArray(result) && result.length === 2) {
                      const [component, headers] = result;
                      res.html(render(component), { headers });
                    } else {
                      res.html(render(result));
                    }
                  } catch (error) {
                    console.error('Error rendering component:', error);
                    const errorMessage = error.message ? error.message : 'Unknown error';
                    res.html(`<h1>Internal Server Error</h1><p>${errorMessage}</p>`, { status: 200 });
                  }
                });
                
}


export const routes = {
  "get": {
    "Activity": "/Activity",
    "AllFiles": "/AllFiles",
    "CanvasPage": "/CanvasPage",
    "FileRow": "/FileRow",
    "FilesPage": "/FilesPage",
    "FreeSpaceValue": "/FreeSpaceValue",
    "GenerateLoginPage": "/GenerateLoginPage",
    "NotFoundPage": "/NotFoundPage",
    "RemainingBalance": "/RemainingBalance",
    "SingleProcess": "/SingleProcess",
    "ToggleTheme": "/ToggleTheme",
    "UploadProcess": "/UploadProcess",
    "WhoAmI": "/WhoAmI"
  },
  "post": {
    "ReplEval": "/ReplEval",
    "SingleProcess": "/SingleProcess",
    "UploadProcess": "/UploadProcess"
  }
};
        


export const hx = {
  "Activity": {
    "id": "#Activity",
    "get": "/Activity"
  },
  "AllFiles": {
    "id": "#AllFiles",
    "get": "/AllFiles"
  },
  "CanvasPage": {
    "id": "#CanvasPage",
    "get": "/CanvasPage"
  },
  "FileRow": {
    "id": "#FileRow",
    "get": "/FileRow"
  },
  "FilesPage": {
    "id": "#FilesPage",
    "get": "/FilesPage"
  },
  "FreeSpaceValue": {
    "id": "#FreeSpaceValue",
    "get": "/FreeSpaceValue"
  },
  "GenerateLoginPage": {
    "id": "#GenerateLoginPage",
    "get": "/GenerateLoginPage"
  },
  "NotFoundPage": {
    "id": "#NotFoundPage",
    "get": "/NotFoundPage"
  },
  "RemainingBalance": {
    "id": "#RemainingBalance",
    "get": "/RemainingBalance"
  },
  "ReplEval": {
    "id": "#ReplEval",
    "post": "/ReplEval"
  },
  "SingleProcess": {
    "id": "#SingleProcess",
    "get": "/SingleProcess",
    "post": "/SingleProcess"
  },
  "ToggleTheme": {
    "id": "#ToggleTheme",
    "get": "/ToggleTheme"
  },
  "UploadProcess": {
    "id": "#UploadProcess",
    "post": "/UploadProcess",
    "get": "/UploadProcess"
  },
  "WhoAmI": {
    "id": "#WhoAmI",
    "get": "/WhoAmI"
  }
};

export default hx;