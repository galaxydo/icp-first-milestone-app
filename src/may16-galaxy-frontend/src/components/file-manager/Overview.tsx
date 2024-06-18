import hardDriveIcon from "@iconify/icons-lucide/hard-drive";

import { Button, Card, CardBody, Progress, Tab, Tabs } from "@/components/daisyui";

import Icon from "@/components/Icon";

import Activity from "./Activity";
import UploadProcess from "./UploadProcess";
import state from '@/sw/state';

const Overview = () => {
  const { inProcess: uploadData, activity } = state;

  return (
    <Card className="rounded-br-none rounded-tl-none border-0 bg-base-100">
      <CardBody className="gap-0">
        <div className="flex items-center justify-between">
          <p className="font-medium">Canister Overview</p>
          <Button disabled color="ghost" size="sm" className="text-success hover:bg-success/20">
            Deposit Stars
          </Button>
        </div>

        <div className="mt-3 rounded bg-primary/5 p-4">
          <div className="flex items-center gap-3">
            <Icon icon={hardDriveIcon} fontSize={18} className="text-primary" />
            <span className="text-base font-medium text-primary">Free Space <span class="font-bold" hx-get="/size" hx-trigger="load">-</span> Kb</span>
            <span className="ms-auto text-sm font-semibold text-primary">5 GB</span>
          </div>
          <p className="mt-3 text-sm font-medium text-base-content/70">Used 0%</p>
          <Progress max={250} value={1} color={"primary"} className="mt-0 h-1.5  bg-primary/20" />
        </div>
        <p className="mt-6 text-sm font-medium text-base-content/70">In Process</p>
        <div className="mt-3">
          <UploadProcess uploadData={uploadData} />
        </div>
        <div className="mt-6">
          <Activity />
        </div>
      </CardBody>
    </Card>
  );
};

export default Overview;
