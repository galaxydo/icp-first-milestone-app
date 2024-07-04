import { render } from 'preact-render-to-string';

import { GET as GET_CanvasPage } from '@/islands/CanvasPage';
import { GET as GET_FileRow } from '@/islands/FileRow';
import { GET as GET_FilesPage } from '@/islands/FilesPage';
import { GET as GET_FilesTableBody } from '@/islands/FilesTableBody';
import { GET as GET_FreeSpaceValue } from '@/islands/FreeSpaceValue';
import { GET as GET_GenerateLoginPage } from '@/islands/GenerateLoginPage';
import { GET as GET_ToggleTheme } from '@/islands/ToggleTheme';
import { POST as POST_UploadFiles } from '@/islands/UploadFiles';
import { GET as GET_WhoAmI } from '@/islands/WhoAmI';

export function registerRoutes(app) {
  
app.get('/CanvasPage', async (req, res) => {
  try {
    const component = await GET_CanvasPage();
    return res.html(render(component));
  } catch (error) {
    console.error('Error rendering component:', error);
    res.status(500).send('Internal Server Error');
  }
});
              

app.get('/FileRow', async (req, res) => {
  try {
    const component = await GET_FileRow();
    return res.html(render(component));
  } catch (error) {
    console.error('Error rendering component:', error);
    res.status(500).send('Internal Server Error');
  }
});
              

app.get('/FilesPage', async (req, res) => {
  try {
    const component = await GET_FilesPage();
    return res.html(render(component));
  } catch (error) {
    console.error('Error rendering component:', error);
    res.status(500).send('Internal Server Error');
  }
});
              

app.get('/FilesTableBody', async (req, res) => {
  try {
    const component = await GET_FilesTableBody();
    return res.html(render(component));
  } catch (error) {
    console.error('Error rendering component:', error);
    res.status(500).send('Internal Server Error');
  }
});
              

app.get('/FreeSpaceValue', async (req, res) => {
  try {
    const component = await GET_FreeSpaceValue();
    return res.html(render(component));
  } catch (error) {
    console.error('Error rendering component:', error);
    res.status(500).send('Internal Server Error');
  }
});
              

app.get('/GenerateLoginPage', async (req, res) => {
  try {
    const component = await GET_GenerateLoginPage();
    return res.html(render(component));
  } catch (error) {
    console.error('Error rendering component:', error);
    res.status(500).send('Internal Server Error');
  }
});
              

app.get('/ToggleTheme', async (req, res) => {
  try {
    const component = await GET_ToggleTheme();
    return res.html(render(component));
  } catch (error) {
    console.error('Error rendering component:', error);
    res.status(500).send('Internal Server Error');
  }
});
              

app.post('/UploadFiles', async (req, res) => {
  try {
    const component = await POST_UploadFiles();
    return res.html(render(component));
  } catch (error) {
    console.error('Error rendering component:', error);
    res.status(500).send('Internal Server Error');
  }
});
              

app.get('/WhoAmI', async (req, res) => {
  try {
    const component = await GET_WhoAmI();
    return res.html(render(component));
  } catch (error) {
    console.error('Error rendering component:', error);
    res.status(500).send('Internal Server Error');
  }
});
              
}


export const routes = {
  "get": {
    "CanvasPage": "/CanvasPage",
    "FileRow": "/FileRow",
    "FilesPage": "/FilesPage",
    "FilesTableBody": "/FilesTableBody",
    "FreeSpaceValue": "/FreeSpaceValue",
    "GenerateLoginPage": "/GenerateLoginPage",
    "ToggleTheme": "/ToggleTheme",
    "WhoAmI": "/WhoAmI"
  },
  "post": {
    "UploadFiles": "/UploadFiles"
  }
};