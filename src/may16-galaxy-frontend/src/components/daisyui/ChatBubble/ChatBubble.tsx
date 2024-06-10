import { HTMLAttributes, ReactElement, forwardRef } from "react";
import { twMerge } from "tailwind-merge";

import { IComponentBaseProps } from "../types";

export type ChatBubbleProps = HTMLAttributes<HTMLDivElement> &
    IComponentBaseProps & {
        end?: boolean;
    };

const ChatBubble = forwardRef<HTMLDivElement, ChatBubbleProps>(
    ({ end = false, color, dataTheme, className, children, ...props }, ref): ReactElement => (
        <div
            {...props}
            data-theme={dataTheme}
            className={twMerge("chat", `chat-${end ? "end" : "start"}`, className)}
            ref={ref}>
            {children}
        </div>
    ),
);

ChatBubble.displayName = "ChatBubble";

export default ChatBubble;
