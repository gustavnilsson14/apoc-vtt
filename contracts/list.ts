import { IFormSettings } from './form';
import { IHasToolTip } from './../frontend/src/infrastructure/tooltip';
export interface ICustomListSettings extends IHasToolTip {
  indexes: ICustomListIndex[];
  headers?: boolean;
  controller?: string;
  onClick?: Function;
  onContext?: Function;
  ignoreLoadOnAttached?: boolean;
  expandable?: boolean;
  expansionFormSettings?: IFormSettings;
  noProvision?: boolean;
  valueConverter?: Function;
}
export interface ICustomListIndex {
  label: string;
  path: string;
}
