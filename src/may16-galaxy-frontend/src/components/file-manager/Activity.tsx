import arrowUpFromLineIcon from "@iconify/icons-lucide/arrow-up-from-line";
import folderInputIcon from "@iconify/icons-lucide/folder-input";
import folderPlusIcon from "@iconify/icons-lucide/folder-plus";
import moreHorizontalIcon from "@iconify/icons-lucide/more-horizontal";
import pencilIcon from "@iconify/icons-lucide/pencil";
import trashIcon from "@iconify/icons-lucide/trash";

import { Button, Timeline, TimelineEnd, TimelineItem, TimelineMiddle } from "@/components/daisyui";

import Icon from "@/components/Icon";

export const ActivityItem = (props: { fileName: string, size: string }) => {
  return <TimelineItem connect="both">
    <TimelineMiddle>
      <div className="rounded-full bg-primary/10 p-2 text-primary">
          <Icon icon={folderPlusIcon} fontSize={14} />
      </div>
    </TimelineMiddle>
    <TimelineEnd className="w-full border-0 shadow-none">
      <div>
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">Image Uploaded</span>
          <span className="text-xs text-base-content/70">Just Now</span>
        </div>
        <p className="text-sm text-base-content/80">{props.fileName} ({props.size})</p>
      </div>
    </TimelineEnd>
  </TimelineItem>
}

const Activity = (props) => {
  return (
    <Timeline vertical className="timeline-hr-sm -ms-[100%] ps-10" id="Timeline">
      {props?.activityItems?.map(it => <ActivityItem fileName={it.fileName} size={it.size} />)}
    </Timeline>
  );
};

export default Activity;
