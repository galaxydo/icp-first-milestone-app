import { h } from 'preact';
import state from '@/sw/state';

export async function GET() {
  const theme = state.isDarkTheme ? 'dark' : 'light';

  return (
    <html data-theme={theme}>
      <head lang="en">
        <meta charSet="UTF-8" />
        <title>Galaxy PKM | Canvas</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link href="/main.css" rel="stylesheet" />
        <link href="/index.css" rel="stylesheet" />
        <link href="styles/app.css" rel="stylesheet" />
        <script src="/htmx/htmx2.min.js"></script>
        <script src="/htmx/_hyperscript.min.js"></script>
        <script src="/excalidraw/react.development.js"></script>
        <script src="/excalidraw/react-dom.development.js"></script>
        <script type="text/javascript" src="/excalidraw/excalidraw.development.js"></script>
      </head>
      <body>
        <div id="app"></div>
        <script src="/scripts/canvas.js"></script>
      </body>
    </html>
  );
}
