import avatar from "@images/icp.png";

import bellIcon from "@iconify/icons-lucide/bell";
import logoutIcon from "@iconify/icons-lucide/log-out";
import menuIcon from "@iconify/icons-lucide/menu";
import userIcon from "@iconify/icons-lucide/user";

import { iconToHTML } from '@iconify/utils/lib/svg/html';

// import { useNavigate } from "react-router-dom";

import {
  Avatar,
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Mask,
  Navbar,
  NavbarCenter,
  NavbarEnd,
  NavbarStart,
	Toggle,
} from "@/components/daisyui";

import Icon from "@/components/Icon";
import ThemeToggleButton from "@/components/ThemeToggleButton";
import NotificationButton from "@/components/NotificationButton";
import CollectionButton from "@/components/CollectionButton";
import SwitchModeButton from "@/components/SwitchModeButton";

import { iconToSVG } from "@iconify/utils";

import { WhoAmIIsland } from "@generated/islands";

const Topbar = ({ theme, currentPage }) => {
  return (
    <Navbar className="z-10  border-b border-base-200 px-3">
      <NavbarStart className="gap-3">
        <CollectionButton />
      </NavbarStart>
      <NavbarCenter>
        <SwitchModeButton currentView={currentPage} />
      </NavbarCenter>
      <NavbarEnd className="gap-1.5">
        <ThemeToggleButton theme={theme} shape="circle" color="ghost" size="sm" />
        <Dropdown vertical="bottom" end>
          <DropdownToggle
            className="btn btn-ghost rounded-btn px-1.5 hover:bg-base-content/20"
            button={false}>
            <div className="flex items-center gap-2">
              <Avatar
                src={avatar}
                size={30}
                innerClassName={Mask.className({ variant: "squircle" })}></Avatar>
              <WhoAmIIsland />
            </div>
          </DropdownToggle>
          <DropdownMenu className="mt-4 w-52">
            <DropdownItem className="text-error"   _="on click
           js
navigator.serviceWorker.getRegistrations().then(async registrations => {
    for (const registration of registrations) {
        await registration.unregister();
    }
    window.location = '/';
});
           end
           ">
              <Icon icon={logoutIcon} fontSize={16} />
              Logout
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </NavbarEnd>
    </Navbar>
  );
};

export default Topbar;
