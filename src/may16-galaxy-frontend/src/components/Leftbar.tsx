import { useMemo } from "react";
// import { Link, useLocation } from "react-router-dom";
import SimpleBar from "simplebar-react";
import "simplebar/dist/simplebar.css";

import { Button, Link, Menu, MenuDetails, MenuItem, MenuTitle } from "@/components/daisyui";

import Icon from "@/components/Icon";
import Logo from "@/components/Logo";
import { getActivatedLeftbarParentKeys } from "@/helpers/layout/admin/leftbar";
import { cn } from "@/helpers/utils/cn";
import { IMenuItem } from "@/types/leftbar";

const LeftMenuItem = ({ menuItem, selected }: { menuItem: IMenuItem; selected: boolean }) => {
  const { icon, isTitle, label, children, url } = menuItem;

  if (isTitle) {
    return <MenuTitle className="font-semibold">{label}</MenuTitle>;
  }

  if (!children) {
    return (
      <MenuItem className="mb-0.5">
        <Link
          href={url ?? ""}
          to={url ?? ""}
          className={cn("hover:bg-base-content/15", {
            "bg-base-content/10": selected,
          })}>
          <div className="flex items-center gap-2">
            {icon && <Icon icon={icon} fontSize={18} />}
            {label}
          </div>
        </Link>
      </MenuItem>
    );
  }

  return (
    <MenuItem className="mb-0.5">
      <MenuDetails
        open={selected}
        label={
          <div className="flex items-center gap-2">
            {icon && <Icon icon={icon} fontSize={18} />}
            {label}
          </div>
        }>
        {children.map((item, index) => (
          <LeftMenuItem menuItem={item} key={index} selected={selected} />
        ))}
      </MenuDetails>
    </MenuItem>
  );
};

const Leftbar = ({ hide, menuItems, activated }: { hide?: boolean; menuItems: IMenuItem[], activated: string }) => {
  return (
    <div
      className={cn("leftmenu-wrapper sticky bottom-0 top-0 h-screen min-w-60 border-e-[1px] border-base-200 bg-leftmenu-background", {
        hide: hide,
      })}>
      <div className="flex h-16 items-center justify-center">
        <h1 class="text-bold text-xl">Galaxy</h1>
      </div>
      <SimpleBar className="h-[calc(100vh-64px)] lg:h-[calc(100vh-230px)] ">
        <Menu className="mb-6">
          {menuItems.map((item: IMenuItem, index) => (
            <LeftMenuItem menuItem={item} key={index} activated={item.url == activated} />
          ))}
        </Menu>
      </SimpleBar>
    </div>
  );
};

export default Leftbar;
