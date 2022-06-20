export interface ICustomListSettings {
  indexes: ICustomListIndex[];
  headers?: boolean;
  controller?: string;
  onClick?: Function;
}
export interface ICustomListIndex {
  label: string;
  path: string;
}
