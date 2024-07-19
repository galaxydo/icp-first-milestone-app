import filePlusIcon from "@iconify/icons-lucide/file-plus";
import folderPlusIcon from "@iconify/icons-lucide/folder-plus";
import foldersIcon from "@iconify/icons-lucide/folders";
import helpCircleIcon from "@iconify/icons-lucide/help-circle";
import keyboardIcon from "@iconify/icons-lucide/keyboard";
import layoutDashboardIcon from "@iconify/icons-lucide/layout-dashboard";
import searchIcon from "@iconify/icons-lucide/search";
import userIcon from "@iconify/icons-lucide/user";
import userPlusIcon from "@iconify/icons-lucide/user-plus";
import xIcon from "@iconify/icons-lucide/x";
import compareIcon from "@iconify/icons-lucide/git-compare";

import { useRef } from "react";

import { Button, Input, Menu, MenuItem, MenuTitle, Modal } from "@/components/daisyui";

import Icon from "@/components/Icon";

const CollectionButton = () => {
  const modalRef = useRef<HTMLDialogElement | null>(null);

  const openModal = () => {
    modalRef.current?.showModal();
  };

  const onClick = "add @open to <div[role='navigation'] dialog/> then add .modal-open to <div[role='navigation'] dialog/>"

  return (
    <>
      <Button
        _={`on click ${onClick}`}
        className="hidden h-9 w-48 items-center justify-start gap-3 border-base-content/20 hover:border-transparent hover:bg-base-content/20 sm:flex"
        variant={"outline"}
        size={"sm"}
        >
        <Icon icon={compareIcon} className="text-base-content/60" fontSize={15} />
        <span className="text-base-content/60">Personal Collection</span>
      </Button>
      <Button
        _="on click add @open to <div[role='navigation'] dialog/> then add .modal-open to <div[role='navigation'] dialog/>"
        className="flex border-base-content/20 hover:border-transparent hover:bg-base-content/20 sm:hidden"
        variant={"outline"}
        size={"sm"}
        shape={"circle"}
        onClick={openModal}>
        <Icon icon={compareIcon} className="text-base-content/60" fontSize={15} />
      </Button>
      <Modal ref={modalRef} backdrop className="p-0">
        <div className="form-control flex-row items-center rounded-box p-2 px-5">
          <Icon icon={compareIcon} className="text-base-content/70" fontSize={18} />
          <Input
            size="sm"
            placeholder="Search collections"
            bordered={false}
            borderOffset={false}
            className="w-full text-base focus:border-transparent focus:outline-0"
            autoFocus></Input>
          <form method="dialog">
            <Button
              _="on click remove @open from <dialog/> then remove .modal-open from <dialog/>"
              size={"sm"}
              shape={"circle"}
              color={"ghost"}
              startIcon={<Icon icon={xIcon} fontSize={16} />}
            />
          </form>
        </div>
        <div className="border-t border-base-content/10">
          <Menu>
            <MenuTitle>My Collections</MenuTitle>
            <MenuItem _="on click remove @open from <dialog/> then remove .modal-open from <dialog/>">
              <a>
                <Icon icon={foldersIcon} fontSize={18} />
                <p className="grow text-sm  ">Personal Collection</p>
              </a>
            </MenuItem>
            <hr className="-mx-2 mt-3 h-px border-base-content/10" />
            <MenuTitle>Actions</MenuTitle>
            <MenuItem disabled>
              <a>
                <Icon icon={folderPlusIcon} fontSize={18} />
                <p className="grow text-sm  ">Create Empty Collection</p>
              </a>
            </MenuItem>
            <MenuItem disabled>
              <a>
                <Icon icon={filePlusIcon} fontSize={18} />
                <p className="grow text-sm ">Import Existing Collection</p>
              </a>
            </MenuItem>
            <MenuItem disabled>
              <a>
                <Icon icon={userPlusIcon} fontSize={18} />
                <p className="grow text-sm ">Share Collection</p>
              </a>
            </MenuItem>
          </Menu>
        </div>
      </Modal>
    </>
  );
};

export default CollectionButton;
