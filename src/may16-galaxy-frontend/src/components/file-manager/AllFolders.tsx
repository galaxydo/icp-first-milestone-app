import arrowDownToLineIcon from "@iconify/icons-lucide/arrow-down-to-line";
import moreVerticalIcon from "@iconify/icons-lucide/more-vertical";
import penLineIcon from "@iconify/icons-lucide/pen-line";
import trashIcon from "@iconify/icons-lucide/trash";
import userRoundPlusIcon from "@iconify/icons-lucide/user-plus";

import { Card, CardBody, Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from "@/components/daisyui";

import Icon from "@/components/Icon";
import { cn } from "@/helpers/utils/cn";
import { IFileManagerFolder } from "@/types/apps/file-manager";

import { useFileManager, useFileManagerHook } from "@/hooks/use-file-manager";

const SingleFolder = ({ color, name, icon, files }: IFileManagerFolder) => {
    return (
        <Card className="cursor-pointer border border-base-content/10 bg-base-100 transition-all hover:border-base-content/15 active:border-base-content/25">
            <CardBody className="gap-0 p-3">
                <div className="flex items-center gap-2">
                    <div className={cn(`bg-${color} rounded-sm bg-opacity-5 text-${color} p-1`)}>
                        <Icon icon={icon} fontSize={20} />
                    </div>
                    <span className=" text-sm font-medium">{name}</span>
                    <div className="ms-auto">
                        <Dropdown horizontal={"left"}>
                            <DropdownToggle button={false} className="btn btn-circle btn-ghost btn-xs">
                                <Icon icon={moreVerticalIcon} fontSize={16} />
                            </DropdownToggle>
                            <DropdownMenu className="w-52 text-sm">
                                <DropdownItem anchor={false}>
                                    <div>
                                        <Icon icon={arrowDownToLineIcon} fontSize={16} className="" />
                                        Download
                                    </div>
                                </DropdownItem>
                                <DropdownItem anchor={false}>
                                    <div>
                                        <Icon icon={penLineIcon} fontSize={16} className="" />
                                        Rename
                                    </div>
                                </DropdownItem>
                                <DropdownItem anchor={false}>
                                    <div>
                                        <Icon icon={userRoundPlusIcon} fontSize={16} className="" />
                                        Share
                                    </div>
                                </DropdownItem>
                                <hr className="-mx-2 my-1 border-base-content/10" />
                                <DropdownItem className="text-error" anchor={false}>
                                    <div>
                                        <Icon icon={trashIcon} fontSize={16} className="" />
                                        Move to bin
                                    </div>
                                </DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                    </div>
                </div>
                <div className="mt-1 flex items-center">
                    <span className="text-sm text-base-content/70">{files} files</span>
                </div>
            </CardBody>
        </Card>
    );
};

const AllFolders = () => {
    const { folders } = useFileManagerHook();
    return (
        <>
            {folders.map((folder, index) => (
                <SingleFolder {...folder} key={index} />
            ))}
        </>
    );
};

export default AllFolders;
