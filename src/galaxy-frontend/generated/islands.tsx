import hx from '@generated/routes';
        



              export function ActivityIsland(props) {
                const queryParams = props.params ? new URLSearchParams(props.params).toString() : '';
                const url = `/Activity?${queryParams}`;
                const trigger = props.trigger || 'load';
                delete props.trigger;
                const swap = props.swap || 'innerHTML transition:true scroll:top';
                delete props.swap;

                const divProps = {
                  id: "Activity",
                  "hx-get": url,
                  "hx-trigger": trigger,
                  "hx-swap": swap,
                  "hx-on:htmx:after-request": "_hyperscript.processNode(document.querySelector('#Activity'))",
                  ...props
                };

                return (
                  <div {...divProps}>
                    Loading...
                  </div>
                );
              }
                            

              export function AllFilesIsland(props) {
                const queryParams = props.params ? new URLSearchParams(props.params).toString() : '';
                const url = `/AllFiles?${queryParams}`;
                const trigger = props.trigger || 'load';
                delete props.trigger;
                const swap = props.swap || 'innerHTML transition:true scroll:top';
                delete props.swap;

                const divProps = {
                  id: "AllFiles",
                  "hx-get": url,
                  "hx-trigger": trigger,
                  "hx-swap": swap,
                  "hx-on:htmx:after-request": "_hyperscript.processNode(document.querySelector('#AllFiles'))",
                  ...props
                };

                return (
                  <div {...divProps}>
                    Loading...
                  </div>
                );
              }
                            

              export function CanvasPageIsland(props) {
                const queryParams = props.params ? new URLSearchParams(props.params).toString() : '';
                const url = `/CanvasPage?${queryParams}`;
                const trigger = props.trigger || 'load';
                delete props.trigger;
                const swap = props.swap || 'innerHTML transition:true scroll:top';
                delete props.swap;

                const divProps = {
                  id: "CanvasPage",
                  "hx-get": url,
                  "hx-trigger": trigger,
                  "hx-swap": swap,
                  "hx-on:htmx:after-request": "_hyperscript.processNode(document.querySelector('#CanvasPage'))",
                  ...props
                };

                return (
                  <div {...divProps}>
                    Loading...
                  </div>
                );
              }
                            

              export function DeleteButtonIsland(props) {
                const queryParams = props.params ? new URLSearchParams(props.params).toString() : '';
                const url = `/DeleteButton?${queryParams}`;
                const trigger = props.trigger || 'load';
                delete props.trigger;
                const swap = props.swap || 'innerHTML transition:true scroll:top';
                delete props.swap;

                const divProps = {
                  id: "DeleteButton",
                  "hx-get": url,
                  "hx-trigger": trigger,
                  "hx-swap": swap,
                  "hx-on:htmx:after-request": "_hyperscript.processNode(document.querySelector('#DeleteButton'))",
                  ...props
                };

                return (
                  <div {...divProps}>
                    Loading...
                  </div>
                );
              }
                            

              export function FileRowIsland(props) {
                const queryParams = props.params ? new URLSearchParams(props.params).toString() : '';
                const url = `/FileRow?${queryParams}`;
                const trigger = props.trigger || 'load';
                delete props.trigger;
                const swap = props.swap || 'innerHTML transition:true scroll:top';
                delete props.swap;

                const divProps = {
                  id: "FileRow",
                  "hx-get": url,
                  "hx-trigger": trigger,
                  "hx-swap": swap,
                  "hx-on:htmx:after-request": "_hyperscript.processNode(document.querySelector('#FileRow'))",
                  ...props
                };

                return (
                  <div {...divProps}>
                    Loading...
                  </div>
                );
              }
                            

              export function FilesPageIsland(props) {
                const queryParams = props.params ? new URLSearchParams(props.params).toString() : '';
                const url = `/FilesPage?${queryParams}`;
                const trigger = props.trigger || 'load';
                delete props.trigger;
                const swap = props.swap || 'innerHTML transition:true scroll:top';
                delete props.swap;

                const divProps = {
                  id: "FilesPage",
                  "hx-get": url,
                  "hx-trigger": trigger,
                  "hx-swap": swap,
                  "hx-on:htmx:after-request": "_hyperscript.processNode(document.querySelector('#FilesPage'))",
                  ...props
                };

                return (
                  <div {...divProps}>
                    Loading...
                  </div>
                );
              }
                            

              export function FreeSpaceValueIsland(props) {
                const queryParams = props.params ? new URLSearchParams(props.params).toString() : '';
                const url = `/FreeSpaceValue?${queryParams}`;
                const trigger = props.trigger || 'load';
                delete props.trigger;
                const swap = props.swap || 'innerHTML transition:true scroll:top';
                delete props.swap;

                const divProps = {
                  id: "FreeSpaceValue",
                  "hx-get": url,
                  "hx-trigger": trigger,
                  "hx-swap": swap,
                  "hx-on:htmx:after-request": "_hyperscript.processNode(document.querySelector('#FreeSpaceValue'))",
                  ...props
                };

                return (
                  <div {...divProps}>
                    Loading...
                  </div>
                );
              }
                            

              export function GenerateLoginPageIsland(props) {
                const queryParams = props.params ? new URLSearchParams(props.params).toString() : '';
                const url = `/GenerateLoginPage?${queryParams}`;
                const trigger = props.trigger || 'load';
                delete props.trigger;
                const swap = props.swap || 'innerHTML transition:true scroll:top';
                delete props.swap;

                const divProps = {
                  id: "GenerateLoginPage",
                  "hx-get": url,
                  "hx-trigger": trigger,
                  "hx-swap": swap,
                  "hx-on:htmx:after-request": "_hyperscript.processNode(document.querySelector('#GenerateLoginPage'))",
                  ...props
                };

                return (
                  <div {...divProps}>
                    Loading...
                  </div>
                );
              }
                            

              export function NotFoundPageIsland(props) {
                const queryParams = props.params ? new URLSearchParams(props.params).toString() : '';
                const url = `/NotFoundPage?${queryParams}`;
                const trigger = props.trigger || 'load';
                delete props.trigger;
                const swap = props.swap || 'innerHTML transition:true scroll:top';
                delete props.swap;

                const divProps = {
                  id: "NotFoundPage",
                  "hx-get": url,
                  "hx-trigger": trigger,
                  "hx-swap": swap,
                  "hx-on:htmx:after-request": "_hyperscript.processNode(document.querySelector('#NotFoundPage'))",
                  ...props
                };

                return (
                  <div {...divProps}>
                    Loading...
                  </div>
                );
              }
                            

              export function RemainingBalanceIsland(props) {
                const queryParams = props.params ? new URLSearchParams(props.params).toString() : '';
                const url = `/RemainingBalance?${queryParams}`;
                const trigger = props.trigger || 'load';
                delete props.trigger;
                const swap = props.swap || 'innerHTML transition:true scroll:top';
                delete props.swap;

                const divProps = {
                  id: "RemainingBalance",
                  "hx-get": url,
                  "hx-trigger": trigger,
                  "hx-swap": swap,
                  "hx-on:htmx:after-request": "_hyperscript.processNode(document.querySelector('#RemainingBalance'))",
                  ...props
                };

                return (
                  <div {...divProps}>
                    Loading...
                  </div>
                );
              }
                            

              export function ReplEvalIsland(props) {
                const queryParams = props.params ? new URLSearchParams(props.params).toString() : '';
                const url = `/ReplEval?${queryParams}`;
                const trigger = props.trigger || 'load';
                delete props.trigger;
                const swap = props.swap || 'innerHTML transition:true scroll:top';
                delete props.swap;

                const divProps = {
                  id: "ReplEval",
                  "hx-get": url,
                  "hx-trigger": trigger,
                  "hx-swap": swap,
                  "hx-on:htmx:after-request": "_hyperscript.processNode(document.querySelector('#ReplEval'))",
                  ...props
                };

                return (
                  <div {...divProps}>
                    Loading...
                  </div>
                );
              }
                            

              export function SingleProcessIsland(props) {
                const queryParams = props.params ? new URLSearchParams(props.params).toString() : '';
                const url = `/SingleProcess?${queryParams}`;
                const trigger = props.trigger || 'load';
                delete props.trigger;
                const swap = props.swap || 'innerHTML transition:true scroll:top';
                delete props.swap;

                const divProps = {
                  id: "SingleProcess",
                  "hx-get": url,
                  "hx-trigger": trigger,
                  "hx-swap": swap,
                  "hx-on:htmx:after-request": "_hyperscript.processNode(document.querySelector('#SingleProcess'))",
                  ...props
                };

                return (
                  <div {...divProps}>
                    Loading...
                  </div>
                );
              }
                            

              export function ToggleThemeIsland(props) {
                const queryParams = props.params ? new URLSearchParams(props.params).toString() : '';
                const url = `/ToggleTheme?${queryParams}`;
                const trigger = props.trigger || 'load';
                delete props.trigger;
                const swap = props.swap || 'innerHTML transition:true scroll:top';
                delete props.swap;

                const divProps = {
                  id: "ToggleTheme",
                  "hx-get": url,
                  "hx-trigger": trigger,
                  "hx-swap": swap,
                  "hx-on:htmx:after-request": "_hyperscript.processNode(document.querySelector('#ToggleTheme'))",
                  ...props
                };

                return (
                  <div {...divProps}>
                    Loading...
                  </div>
                );
              }
                            

              export function UploadProcessIsland(props) {
                const queryParams = props.params ? new URLSearchParams(props.params).toString() : '';
                const url = `/UploadProcess?${queryParams}`;
                const trigger = props.trigger || 'load';
                delete props.trigger;
                const swap = props.swap || 'innerHTML transition:true scroll:top';
                delete props.swap;

                const divProps = {
                  id: "UploadProcess",
                  "hx-get": url,
                  "hx-trigger": trigger,
                  "hx-swap": swap,
                  "hx-on:htmx:after-request": "_hyperscript.processNode(document.querySelector('#UploadProcess'))",
                  ...props
                };

                return (
                  <div {...divProps}>
                    Loading...
                  </div>
                );
              }
                            

              export function WhoAmIIsland(props) {
                const queryParams = props.params ? new URLSearchParams(props.params).toString() : '';
                const url = `/WhoAmI?${queryParams}`;
                const trigger = props.trigger || 'load';
                delete props.trigger;
                const swap = props.swap || 'innerHTML transition:true scroll:top';
                delete props.swap;

                const divProps = {
                  id: "WhoAmI",
                  "hx-get": url,
                  "hx-trigger": trigger,
                  "hx-swap": swap,
                  "hx-on:htmx:after-request": "_hyperscript.processNode(document.querySelector('#WhoAmI'))",
                  ...props
                };

                return (
                  <div {...divProps}>
                    Loading...
                  </div>
                );
              }