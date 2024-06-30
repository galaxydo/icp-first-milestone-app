import pauseIcon from "@iconify/icons-lucide/pause";
import playIcon from "@iconify/icons-lucide/play";
import xCircleIcon from "@iconify/icons-lucide/x-circle";

import { Progress } from "@/components/daisyui";

import Icon from "@/components/Icon";
import { StringUtil } from "@/utils/string";
import { IFileManagerUploadProcess } from "@/types/apps/file-manager";

import { useFileManager, useFileManagerHook } from "@/hooks/use-file-manager";

export const ProcessPercent = (props) => <span {...props} className="text-sm text-base-content/70">{props.percent}%</span>

//.SingleProcess
export const SingleProcess = ({ process, ...props }: { process: IFileManagerUploadProcess }) => {
  const { name, percent, size, state } = process;
  return (
    <div {...props} className='SingleProcess' hx-target="this" hx-swap="delete" sse-swap={`completed-${process.name}`}>
      <div className="flex items-center justify-between">
        <span className="font-medium">{name}</span>
      </div>
      <div className="mt-1 flex items-center justify-between">
        <ProcessPercent sse-swap={`progress-${process.name}`} percent={process.percent} />
        <span className="text-xs text-base-content/70">{StringUtil.convertToStorageUnits(size)}</span>
      </div>
      <div sse-swap={`progress-${process.name}-indicator`}>
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

//.UploadProcess
const UploadProcess = ({ uploadData }: { uploadData: IFileManagerUploadProcess[] }) => {
  debugger;
  return (
    <div className="space-y-2 rounded-box border border-base-content/20 px-4 pb-2 pt-3" id="UploadProcess" hx-ext="sse" sse-connect="/sse">
      <div hx-swap="afterbegin transition:true" hx-target="#Timeline" sse-swap={`completed`}></div>
      <div hx-swap="afterbegin transition:true" hx-target="#Files" sse-swap={`completed-fileRow`}></div>
      {uploadData.map((process, index) => (
        <SingleProcess process={process} key={index} />
      ))}
    </div>
  );
};
export default UploadProcess;
