import { h } from 'preact';
import state from '@/state';
import Topbar from '@/components/Topbar';
import { Alert, Button, Drawer, Toast, Card, CardBody, Checkbox, Input, Table, TableBody, TableRow, Progress, Timeline, TimelineEnd, TimelineItem, TimelineMiddle } from '@/components/daisyui';
import Icon from '@/components/Icon';

export async function GET() {
  const theme = state.isDarkTheme ? 'dark' : 'light';

  return (
    <html data-theme={theme}>
      <head lang="en">
        <meta charSet="UTF-8" />
        <title>Galaxy | Canvas</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link href="/styles/main.css" rel="stylesheet" />
        <link href="/index.css" rel="stylesheet" />
        <script src="/htmx/htmx2.min.js"></script>
        <script src="/htmx/sse.js"></script>
        <script src="/htmx/_hyperscript.min.js"></script>
        <script src="/htmx/eventsource.js"></script>
        <script type="text/hyperscript" src="/scripts/debug._hs"></script>
        <script src="/excalidraw/react.development.js"></script>
        <script src="/excalidraw/react-dom.development.js"></script>
        <script type="text/javascript" src="/excalidraw/excalidraw.production.min.js"></script>
      </head>
      <body _="on every htmx:beforeSend in <button:not(.no-disable)/> 
           tell it 
               toggle [@disabled='true'] until htmx:afterOnLoad
        on every htmx:sendError call alert('sendError' + it)
        on htmx:responseError
          put 'Unexpected Response Error' into #htmx-alert's innerHTML
          then remove .hidden from #htmx-alert
          then wait 2s then add .hidden to #htmx-alert
        ">
        <div class="size-full">
          <div class="flex overflow-hidden">
            <div class="main-wrapper overflow-auto">
              <div class="flex h-full flex-col">
                <Topbar theme={theme} currentPage="canvas" />
                <div id="app" class="grow bg-content-background p-0 transition-all">
                </div>
              </div>
            </div>
          </div>
        </div>
        <script src="/scripts/canvas.js"></script>
      </body>
    </html>
  );
}
