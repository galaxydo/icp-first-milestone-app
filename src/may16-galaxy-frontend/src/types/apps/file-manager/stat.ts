import { IColor } from "@/types/theme";

export type IFileManagerProviderStat = {
    image: string;
    name: string;
    total: number;
    used: number;
    color: IColor;
};
