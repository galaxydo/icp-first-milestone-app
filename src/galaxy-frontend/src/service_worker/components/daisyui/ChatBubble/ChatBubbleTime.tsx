import { TimeHTMLAttributes, forwardRef } from "react";
import { twMerge } from "tailwind-merge";

import { IComponentBaseProps } from "../types";

export type ChatBubbleTimeProps = TimeHTMLAttributes<HTMLTimeElement> & IComponentBaseProps;

const ChatBubbleTime = forwardRef<HTMLTimeElement, ChatBubbleTimeProps>(({ className, ...props }, ref) => (
    <time {...props} className={twMerge("text-xs opacity-50", className)} ref={ref} />
));

ChatBubbleTime.displayName = "Chat Bubble Time";

export default ChatBubbleTime;
