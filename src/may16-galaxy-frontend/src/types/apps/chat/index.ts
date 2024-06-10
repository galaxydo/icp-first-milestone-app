export type IChatMessage = {
    message: string;
    send_at: Date;
    from_me: boolean;
};

export type IChat = {
    id: number;
    image: string;
    name: string;
    messages: IChatMessage[];
    unreads?: number;
};
