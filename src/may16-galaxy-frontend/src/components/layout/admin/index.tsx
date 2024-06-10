import { Suspense, useEffect } from "react";
import { useLocation } from "react-router-dom";

import { Drawer } from "@/components/daisyui";

import Leftbar from "@/components/layout/admin/slots/Leftbar";
import Topbar from "@/components/layout/admin/slots/Topbar";
import { adminMenuItems } from "@/data/layout/admin";
import { useLayoutContext } from "@/states/layout";

const AdminLayout = ({ children }: { children: any }) => {
    const {
        state: { leftbar },
        toggleLeftbarDrawer,
    } = useLayoutContext();

    const { pathname } = useLocation();

    useEffect(() => {
        toggleLeftbarDrawer(false);
    }, [pathname]);

    return (
        <>
            {
                <div className="size-full">
                    <div className="flex overflow-hidden">
                        <div className="block lg:hidden">
                            <Drawer
                                open={leftbar.drawerOpen}
                                onClickOverlay={() => toggleLeftbarDrawer(false)}
                                className={`z-20 `}
                                side={<Leftbar menuItems={adminMenuItems} />}></Drawer>
                        </div>
                        <div className="hidden lg:block">
                            <Leftbar menuItems={adminMenuItems} hide={leftbar.hide} />
                        </div>
                        <div className="main-wrapper overflow-auto">
                            <div className="flex h-full flex-col ">
                                <Topbar />
                                <div className="content-wrapper">
                                    <Suspense>{children}</Suspense>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </>
    );
};

export default AdminLayout;
