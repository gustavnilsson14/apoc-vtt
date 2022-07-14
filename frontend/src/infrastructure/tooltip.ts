export enum TooltipSourceType{
    TEXT = "TEXT",
    PATH = "PATH",
}

export interface IHasToolTip{
    tooltipSource?: TooltipSourceType;
    tooltipText?: string;
    tooltipPaths?: string[];
    tooltipVisible?: boolean;
}