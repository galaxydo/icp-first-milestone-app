import { h } from 'preact';
import FilesPage from '@/pages/FilesPage';
import state from '@/sw/state';

export async function GET() {
  const theme = state.isDarkTheme ? 'dark' : 'light';

  return (
    <html data-theme={theme}>
      <head lang="en">
        <meta charSet="UTF-8" />
        <title>Galaxy File Manager</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link href="/main.css" rel="stylesheet" />
        <link href="/index.css" rel="stylesheet" />
        <link href="/styles/app.css" rel="stylesheet" />
        <script src="/htmx/htmx2.min.js"></script>
        <script src="/htmx/sse.js"></script>
        <script type="text/hyperscript" src="/scripts/may26._hs"></script>
        <script src="/htmx/_hyperscript.min.js"></script>
        <script src="/htmx/eventsource.js"></script>
        <script type="module" src="/scripts/jun2.js"></script>
        <link href="/filepond/filepond.css" rel="stylesheet" />
        <link href="/filepond/filepond-plugin-image-preview.css" rel="stylesheet" />
        <script src="/tagify/tagify.js"></script>
        <script src="/tagify/tagify.polyfills.min.js"></script>
        <link href="/tagify/tagify.css" rel="stylesheet" type="text/css" />
      </head>
      <body class="slide-it" _="on every htmx:beforeSend in <button:not(.no-disable)/> 
           tell it 
               toggle [@disabled='true'] until htmx:afterOnLoad
        on every htmx:sendError call alert('sendError' + it)
        on htmx:responseError
          put 'Unexpected Response Error' into #htmx-alert's innerHTML
          then remove .hidden from #htmx-alert
          then wait 2s then add .hidden to #htmx-alert
        ">
        <FilesPage theme={theme} />
        <script src="/filepond/filepond-plugin-image-preview.js"></script>
        <script src="/filepond/filepond-plugin-file-encode.js"></script>
        <script src="/filepond/filepond-plugin-file-validate-type.js"></script>
        <script src="/filepond/filepond-plugin-image-validate-size.js"></script>
        <script src="/filepond/filepond.js"></script>
        <script src="/scripts/files.js"></script>
      </body>
    </html>
  );
}
