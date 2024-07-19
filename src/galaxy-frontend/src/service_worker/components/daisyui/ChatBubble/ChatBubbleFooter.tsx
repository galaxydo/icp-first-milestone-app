import { HTMLAttributes, forwardRef } from "react";
import { twMerge } from "tailwind-merge";

import { IComponentBaseProps } from "../types";

export type ChatBubbleFooterProps = HTMLAttributes<HTMLDivElement> & IComponentBaseProps;

const ChatBubbleFooter = forwardRef<HTMLDivElement, ChatBubbleFooterProps>(({ className, ...props }, ref) => (
    <div {...props} className={twMerge("chat-footer opacity-50", className)} ref={ref} />
));

ChatBubbleFooter.displayName = "Chat Bubble Footer";

export default ChatBubbleFooter;
