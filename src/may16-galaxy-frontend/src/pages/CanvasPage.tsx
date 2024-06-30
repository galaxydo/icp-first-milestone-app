import { h } from 'preact';

import Topbar from '@/components/Topbar';
import { Button, Drawer } from '@/components/daisyui';
import Leftbar from '@/components/Leftbar';
import { menuItems } from './menu';

export default function CanvasPage(props: { theme: string; }) {
	return <div class="size-full">
		<div class="flex overflow-hidden">
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

