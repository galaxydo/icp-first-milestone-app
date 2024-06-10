import { h } from 'preact';

import folderKanbanIcon from "@iconify/icons-lucide/folder-kanban";

import Topbar from './components/layout/admin/slots/Topbar';
import { Button, Drawer } from './components/daisyui';
import Leftbar from './components/layout/admin/slots/Leftbar';

import { adminMenuItems } from "@/data/layout/admin";

import AllFiles from "./components/file-manager/AllFiles";

import Overview from "./components/file-manager/Overview";
import UploadButton from "./components/file-manager/UploadButton";
import Icon from './components/Icon';

export default function CanvasPage(props: { theme: string; }) {
	return <div class="size-full">
		<div class="flex overflow-hidden">
			<div className="block">
				<Drawer
					role="leftDrawer"
					open={false}
					// onClickOverlay={() => toggleLeftbarDrawer(false)}
					className={`z-20 `}
					side={<Leftbar menuItems={adminMenuItems} />}></Drawer>
			</div>
			<div class="main-wrapper overflow-auto">
				<div class="flex h-full flex-col ">
					<Topbar theme={props.theme} />
					<div class="content-wrapper grow bg-content-background p-6 transition-all">
						<div>
							<div className="grid grid-cols-1 gap-6">
								<div className="col-span-1">
									<div className="flex items-center justify-between">
										<h3 className="text-lg font-medium">Whiteboards</h3>
									</div>
									<h3 className="mt-6 text-base font-medium">My Canvas</h3>
									<div className="mt-3">
											<div id="app"></div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
}

