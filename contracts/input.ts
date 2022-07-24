import { IHasToolTip } from './../frontend/src/infrastructure/tooltip';
import { IItem, ItemType } from "../collections/items";
import { ICustomListSettings } from "./list";

export interface ILabeledKey {
  label: string;
  key: string;
}
export enum InputType {
  INPUT = "INPUT",
  SELECT = "SELECT",
  MULTIPLESELECT = "MULTIPLESELECT",
  ITEMSLOT = "ITEMSLOT",
  ITEMSLOTS = "ITEMSLOTS",
}
export enum InputSubType {
  TEXT = "text",
  NUMBER = "number",
  PASSWORD = "password",
  TEXTAREA = "TEXTAREA"
}
type Validator = (value: any) => string | null;
export interface IInputSettings extends ILabeledKey, IHasToolTip {
  type: InputType;
  subType?: InputSubType;
  readonly?: boolean;
  hasLabel?: boolean;
  validation?: Validator;
  group?: string;
  dataField?: boolean;
  getInputValue?(data: any): any;
  hasLabelClickCallback?: boolean;
  hasInputClickCallback?: boolean;
  hasLabelContextCallback?: boolean;
  hasInputContextCallback?: boolean;
}
export interface IDefaultInputSettings extends IInputSettings {
  placeholder?: string;
}
export interface ISelectInputSettings extends IInputSettings {
  labelIndex: string;
  options: any[];
  isTemplate: boolean;
}
export interface IMultipleSelectInputSettings extends IInputSettings {
  labelIndex: string;
  options: any[];
  listSettings: ICustomListSettings;
}

export interface IItemSlot {
  name: string;
  allowedTypes: ItemType[];
  item?: IItem;
  holdsOwnedItem?: boolean;
  group?: string;
  rollable?: boolean;
}
export interface IItemSlotsInputSettings extends IInputSettings {
  itemSlots: IItemSlot[];
}
export interface IItemSlotInputSettings extends IInputSettings {
  itemSlot: IItemSlot;
}
export class BaseInput implements IInputSettings {
  public type: InputType;
  public readonly?: boolean;
  public hasLabel?: boolean;
  public validation?: any;
  public group?: string;
  public dataField?: boolean;
  public label: string;
  public key: string;
  public getInputValue(data: any): any {
    if (!data) return null;
    if (!data.hasOwnProperty(this.key)) return null;
    return data[this.key];
  }
}
export class DefaultInput extends BaseInput implements IDefaultInputSettings {
  public placeholder?: string;
}
export class SelectInput extends BaseInput implements ISelectInputSettings {
  labelIndex: string;
  options: any[];
  isTemplate: boolean;
  public getInputValue(data: any): any {
    if (!data) return null;
    if (!data.hasOwnProperty(this.key)) return null;
    const item: any = this.options.find(x => JSON.stringify(data[this.key]) == JSON.stringify(x));
    return item;
  }
}
export class MultipleSelectInput extends BaseInput implements IMultipleSelectInputSettings {
  labelIndex: string;
  options: any[];
  listSettings: ICustomListSettings;
}
export class ItemSlotInput extends BaseInput implements IItemSlotInputSettings {
  itemSlot: IItemSlot;
  subType?: InputSubType;
}
export class ItemSlotsInput extends BaseInput implements IItemSlotsInputSettings{
  itemSlots: IItemSlot[];
  subType?: InputSubType;
  public getInputValue(data: any): any {
    if (!data) return null;
    if (!data.hasOwnProperty(this.key)) return null;
    return data[this.key];
  }
}
export class InputFactory {
  public static createDefaultInput(settings: IDefaultInputSettings): DefaultInput {
    return Object.assign(new DefaultInput(), settings);
  }
  public static createSelectInput(settings: ISelectInputSettings): SelectInput {
    return Object.assign(new SelectInput(), settings);
  }
  public static createMultipleSelectInput(settings: IMultipleSelectInputSettings): MultipleSelectInput {
    return Object.assign(new MultipleSelectInput(), settings);
  }
  public static createItemSlot(settings: IItemSlotInputSettings): ItemSlotInput {
    return Object.assign(new ItemSlotInput(), settings);
  }
  public static createItemSlotsInput(settings: IItemSlotsInputSettings): ItemSlotsInput {
    return Object.assign(new ItemSlotsInput(), settings);
  }
}
