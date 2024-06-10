import { forwardRef } from "react";
import { twMerge } from "tailwind-merge";

import { Avatar, AvatarProps } from "../Avatar";
import { IComponentBaseProps } from "../types";

export type ChatBubbleAvatarProps = AvatarProps & IComponentBaseProps;

const ChatBubbleAvatar = forwardRef<HTMLDivElement, ChatBubbleAvatarProps>(
    ({ size = "xs", shape = "circle", className, ...props }, ref) => (
        <Avatar size={size} shape={shape} {...props} className={twMerge("chat-image", className)} ref={ref} />
    ),
);

ChatBubbleAvatar.displayName = "Chat Bubble Avatar";

export default ChatBubbleAvatar;
