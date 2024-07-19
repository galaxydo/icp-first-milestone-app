import hx from '@generated/routes';
        



  export function ActivityIsland(props) {
    const queryParams = props.params ? new URLSearchParams(props.params).toString() : '';
    const url = `/Activity?${queryParams}`;
    const trigger = props.trigger || 'load';
    delete props.trigger;
    const swap = props.swap || 'innerHTML transition:true scroll:top';
    delete props.swap;

    return (
      <div id="Activity" hx-get={url} hx-trigger={trigger} hx-swap={swap} {...props}>
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

    return (
      <div id="AllFiles" hx-get={url} hx-trigger={trigger} hx-swap={swap} {...props}>
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

    return (
      <div id="CanvasPage" hx-get={url} hx-trigger={trigger} hx-swap={swap} {...props}>
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

    return (
      <div id="FileRow" hx-get={url} hx-trigger={trigger} hx-swap={swap} {...props}>
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

    return (
      <div id="FilesPage" hx-get={url} hx-trigger={trigger} hx-swap={swap} {...props}>
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

    return (
      <div id="FreeSpaceValue" hx-get={url} hx-trigger={trigger} hx-swap={swap} {...props}>
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

    return (
      <div id="GenerateLoginPage" hx-get={url} hx-trigger={trigger} hx-swap={swap} {...props}>
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

    return (
      <div id="NotFoundPage" hx-get={url} hx-trigger={trigger} hx-swap={swap} {...props}>
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

    return (
      <div id="RemainingBalance" hx-get={url} hx-trigger={trigger} hx-swap={swap} {...props}>
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

    return (
      <div id="ReplEval" hx-get={url} hx-trigger={trigger} hx-swap={swap} {...props}>
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

    return (
      <div id="SingleProcess" hx-get={url} hx-trigger={trigger} hx-swap={swap} {...props}>
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

    return (
      <div id="ToggleTheme" hx-get={url} hx-trigger={trigger} hx-swap={swap} {...props}>
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

    return (
      <div id="UploadProcess" hx-get={url} hx-trigger={trigger} hx-swap={swap} {...props}>
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

    return (
      <div id="WhoAmI" hx-get={url} hx-trigger={trigger} hx-swap={swap} {...props}>
        Loading...
      </div>
    );
  }