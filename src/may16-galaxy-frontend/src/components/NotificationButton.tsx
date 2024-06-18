import avatar1Img from "@/assets/images/avatars/1.png";
import avatar2Img from "@/assets/images/avatars/2.png";
import avatar3Img from "@/assets/images/avatars/3.png";
import avatar4Img from "@/assets/images/avatars/4.png";
import avatar5Img from "@/assets/images/avatars/5.png";

import bellIcon from "@iconify/icons-lucide/bell";
import xIcon from "@iconify/icons-lucide/x";

import { useState } from "react";

import { Button, Dropdown, DropdownMenu, DropdownToggle, Mask } from "@/components/daisyui";

import Icon from "@/components/Icon";

const NotificationButton = () => {
  const [open, setOpen] = useState(false);

  const closeMenu = () => {
    //TODO: Need to change close logic
    setOpen(true);
    setTimeout(() => {
      setOpen(false);
    }, 1);
  };

  return (
    <div>
      <Dropdown vertical={"bottom"} end open={open}>
        <DropdownToggle className="btn btn-circle btn-ghost btn-sm" button={false}>
          <Icon icon={bellIcon} fontSize={20} />
        </DropdownToggle>
        <DropdownMenu className="card card-compact m-1 w-96  p-3 shadow">
          <div className="flex items-center justify-between px-2">
            <p className="text-base font-medium">Notification</p>
            <Button
              size={"sm"}
              shape={"circle"}
              color={"ghost"}
              startIcon={<Icon icon={xIcon} fontSize={16} />}
              onClick={closeMenu}
            />
          </div>
          <div className="flex items-center justify-center">
            <div className=" rounded-full border  border-base-content/10 px-3 text-center">
              <p className="text-xs  text-base-content/80">Today</p>
            </div>
          </div>
          <hr className="-mx-2 mt-2 border-base-content/10" />
          <div className="flex items-center justify-between pt-2">
            <Button disabled size={"sm"} color={"ghost"} className="text-primary hover:bg-primary/10">
              View All
            </Button>
            <Button disabled size={"sm"} color={"ghost"} className="text-base-content/80 hover:bg-base-content/10">
              Mark as read
            </Button>
          </div>
        </DropdownMenu>
      </Dropdown>
    </div>
  );
};

export default NotificationButton;
