export enum TooltipSourceType{
    TEXT = "TEXT",
    PATH = "PATH",
}

export interface IHasToolTip{
    tooltipSource?: TooltipSourceType;
    tooltipText?: string;
    tooltipPath?: string;
    tooltipVisible?: boolean;
}