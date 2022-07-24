import { IFormSettings } from './form';
import { IHasToolTip } from './../frontend/src/infrastructure/tooltip';
interface IGetExpansionFormSettings{
  (value: any): IFormSettings;
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
  valueConverter?: Function;
  itemClassKey?: string;
  getExpansionFormSettings?: IGetExpansionFormSettings;
}
export interface ICustomListIndex {
  label: string;
  path: string;
}
