import { h } from 'preact';
import state from '@/state';
import { Timeline, TimelineItem, TimelineMiddle, TimelineEnd } from '@/components/daisyui';
import Icon from '@/components/Icon';
import folderKanbanIcon from "@iconify/icons-lucide/folder-kanban";
import alertCircleIcon from "@iconify/icons-lucide/alert-circle"; // Import an error icon

export const ActivityItem = (props: { fileName: string, size: string, error?: string }) => {
  return (
    <TimelineItem connect="both">
      <TimelineMiddle>
        <div className={`rounded-full p-2 ${props.error ? 'bg-error/10 text-error' : 'bg-primary/10 text-primary'}`}>
          <Icon icon={props.error ? alertCircleIcon : folderKanbanIcon} fontSize={14} />
        </div>
      </TimelineMiddle>
      <TimelineEnd className="w-full border-0 shadow-none">
        <div>
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">{props.error ? 'Upload Failed' : 'Image Uploaded'}</span>
            <span className="text-xs text-base-content/70">Just Now</span>
          </div>
          <p className="text-sm text-base-content/80">
            {props.fileName} ({props.size})
          </p>
          {props.error && (
            <p className="text-sm text-error mt-1">
              {props.error}
            </p>
          )}
        </div>
      </TimelineEnd>
    </TimelineItem>
  );
}

const Activity = () => {
  const activityItems = state.activity;

  return (
    <Timeline vertical className="timeline-hr-sm -ms-[100%] ps-10" id="Timeline">
      {activityItems?.map(it => (
        <ActivityItem 
          fileName={it.fileName} 
          size={it.size} 
          error={it.error} 
        />
      ))}
    </Timeline>
  );
};

export async function GET() {
  return <Activity />;
}
