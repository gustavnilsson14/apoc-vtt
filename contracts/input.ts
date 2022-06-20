import { ICustomListSettings } from "./list";

export interface ILabeledKey {
  label: string;
  key: string;
}
export enum InputType {
  TEXT = "text",
  NUMBER = "number",
  CHECKBOX = "checkbox",
  SELECT = "select",
  EMAIL = "text",
  PASSWORD = "password",
  MULTIPLESELECT = "multipleselect",
  ITEMSLOT = "itemslot",
}
type Validator = (value: any) => string | null;
export interface IInputSettings extends ILabeledKey {
  type: InputType;
  hasLabel?: boolean;
  validation?: Validator;
  group?: string;
  dataField?: boolean;
  getInputValue?(data: any): any;
}
export interface IDefaultInputSettings extends IInputSettings {
  placeholder?: string;
}
export interface IMultipleSelectInputSettings extends IInputSettings {
  options: any[];
  listSettings: ICustomListSettings;
}
export interface IItemSlotInputSettings extends IInputSettings {}
export class BaseInput implements IInputSettings {
  public type: InputType;
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
export class MultipleSelectInput extends BaseInput implements IMultipleSelectInputSettings {
  options: any[];
  listSettings: ICustomListSettings;
}
export class ItemSlotInput extends BaseInput implements IItemSlotInputSettings {}
export class InputFactory {
  private static applyBaseInput(input: BaseInput, settings: IInputSettings): void {
    input.type = settings.type;
    input.hasLabel = settings.hasLabel;
    input.validation = settings.validation;
    input.group = settings.group;
    input.label = settings.label;
    input.key = settings.key;
    input.dataField = settings.dataField;
  }
  public static createDefaultInput(settings: IDefaultInputSettings): DefaultInput {
    const input: DefaultInput = new DefaultInput();
    this.applyBaseInput(input, settings);
    input.placeholder = settings.placeholder;
    return input;
  }
  public static createMultipleSelectInput(settings: IMultipleSelectInputSettings): MultipleSelectInput {
    const input: MultipleSelectInput = new MultipleSelectInput();
    this.applyBaseInput(input, settings);
    input.options = settings.options;
    input.listSettings = settings.listSettings;
    return input;
  }
  public static createItemSlot(settings: IItemSlotInputSettings): ItemSlotInput {
    const input: ItemSlotInput = new ItemSlotInput();
    this.applyBaseInput(input, settings);
    return input;
  }
}
