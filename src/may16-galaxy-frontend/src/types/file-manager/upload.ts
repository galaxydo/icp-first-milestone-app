export type IFileManagerUploadProcess = {
    name: string;
    percent: number;
    size: number;
    state?: "play" | "pause";
};
