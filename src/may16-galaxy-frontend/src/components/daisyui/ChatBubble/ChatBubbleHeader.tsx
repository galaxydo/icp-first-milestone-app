import { HTMLAttributes, forwardRef } from "react";
import { twMerge } from "tailwind-merge";

import { IComponentBaseProps } from "../types";

export type ChatBubbleHeaderProps = HTMLAttributes<HTMLDivElement> & IComponentBaseProps;

const ChatBubbleHeader = forwardRef<HTMLDivElement, ChatBubbleHeaderProps>(({ className, ...props }, ref) => (
    <div {...props} className={twMerge("chat-header", className)} ref={ref} />
));

ChatBubbleHeader.displayName = "Chat Bubble Header";

export default ChatBubbleHeader;
