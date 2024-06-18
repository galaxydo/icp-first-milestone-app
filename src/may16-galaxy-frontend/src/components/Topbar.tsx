import avatar1 from "@/images/avatars/1.png";
import avatar from "@/images/avatars/icp.png";

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
} from "@/components/daisyui";

import Icon from "@/components/Icon";
import ThemeToggleButton from "@/components/ThemeToggleButton";

import NotificationButton from "../components/NotificationButton";
import SearchButton from "../components/SearchButton";
import { iconToSVG } from "@iconify/utils";

const Topbar = ({ theme }) => {
  return (
    <Navbar className="z-10  border-b border-base-200 px-3">
      <NavbarStart className="gap-3">
        <Button
          shape="square"
          color="ghost"
          size="sm"
          _="on click toggle [@checked=true] on <div[role='leftDrawer'] .drawer-toggle />">
          <Icon icon={menuIcon} fontSize={20} />
        </Button>
        <SearchButton />
      </NavbarStart>
      <NavbarCenter></NavbarCenter>
      <NavbarEnd className="gap-1.5">
        <ThemeToggleButton theme={theme} shape="circle" color="ghost" size="sm" />
        <NotificationButton />
        <Dropdown vertical="bottom" end>
          <DropdownToggle
            className="btn btn-ghost rounded-btn px-1.5 hover:bg-base-content/20"
            button={false}>
            <div className="flex items-center gap-2">
              <Avatar
                src={avatar}
                size={30}
                innerClassName={Mask.className({ variant: "squircle" })}></Avatar>
              <div className="flex flex-col items-start">
                <p className="text-sm/none" hx-get="/whoami" hx-trigger="load">Anonymous</p>
                <p className="mt-1 text-xs/none text-primary">Edit</p>
              </div>
            </div>
          </DropdownToggle>
          <DropdownMenu className="mt-4 w-52">
            <DropdownItem className="disabled">
              <Icon icon={userIcon} fontSize={16} /> My Profile
            </DropdownItem>
            <hr className="-mx-2 my-1 border-base-content/10" />
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
