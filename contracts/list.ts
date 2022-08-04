import { IFormSettings } from './form';
import { IHasToolTip } from './../frontend/src/infrastructure/tooltip';
interface IGetExpansionFormSettings{
  (value: any): IFormSettings;
}
interface IGetTooltipData{
  (item: any): any;
}
export interface ICustomListSettings extends IHasToolTip {
  indexes: ICustomListIndex[];
  headers?: boolean;
  controller?: string;
  onClick?: Function;
  onContext?: Function;
  ignoreLoadOnAttached?: boolean;
  expandable?: boolean;
  noProvision?: boolean;
  itemClassKey?: string;
  alwaysUpdate?: boolean;
  hasDeleteButton?: boolean;
  tooltipDataFunction?: IGetTooltipData;
  getExpansionFormSettings?: IGetExpansionFormSettings;
}
export interface ICustomListIndex {
  label: string;
  path: string;
}
