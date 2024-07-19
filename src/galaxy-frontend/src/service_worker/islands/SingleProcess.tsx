import { h } from 'preact';
import state from '@/state';
import { StringUtil } from '@/utils/string';
import { Progress } from '@/components/daisyui';

export const ProcessPercent = (props) => <span {...props} className="text-sm text-base-content/70">{props.percent}%</span>

export const SingleProcess = ({ process }: { process: IFileManagerUploadProcess }) => {
  const { name, percent, size, state } = process;
  return (
    <div className='SingleProcess' hx-target="this" hx-swap="outerHTML" hx-trigger="every 800ms" hx-post={`/SingleProcess?name=${name}`}>
      <div className="flex items-center justify-between">
        <span className="font-medium">{name}</span>
      </div>
      <div className="mt-1 flex items-center justify-between">
        <ProcessPercent percent={process.percent} />
        <span className="text-xs text-base-content/70">{StringUtil.convertToStorageUnits(size)}</span>
      </div>
      <div>
        <Progress
          className="mt-0 h-1 bg-base-content/10 align-super"
          color={state == "play" ? "success" : "error"}
          max={100}
          value={percent}
        />
      </div>
    </div>
  );
};

export async function GET(req: Request) {
  const url = new URL(req.url);
  const name = url.searchParams.get('name');

  const process = state.inProcess.find(it => it.name === name);

  if (!process) {
    return [
      <></>,
      { 'HX-Trigger': 'upload-done' }
    ];
  }

  return <SingleProcess process={process} />;
}

export async function POST(req: Request) {
  const url = new URL(req.url);
  const name = url.searchParams.get('name');

  const process = state.inProcess.find(it => it.name === name);

  if (!process) {
    return [
      <></>,
      { 'HX-Trigger': 'upload-done' }
    ];
  }

  // Increase the percentage by a random number from 1 to 20 until the value of 99
  if (process.percent < 99) {
    process.percent += Math.floor(Math.random() * 20) + 1;
    if (process.percent > 99) {
      process.percent = 99;
    }
  }

  return <SingleProcess process={process} />;
}
