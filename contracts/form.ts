import { BaseLoaderModule } from './loader';
import { IInputSettings, ILabeledKey } from "./input";
import { ILoaderModule, LoaderModuleType } from "../contracts/loader";
import { IMessage, MessageType } from "./message";

export interface IFormSettings extends ILabeledKey {
  messageType: MessageType;
  controller: string;
  submitTitle: string;
  clearOnSuccess?: boolean;
  successText?: string;
  displayLabel?: boolean;
  ignoreChange?: boolean;
  inputs: IInputSettings[];
  autoSave?: boolean;
  noSave?: boolean;
  getInputsByGroup(group: string): IInputSettings[];
  validate(message: IMessage): string[];
}

export class BaseForm extends BaseLoaderModule implements ILoaderModule, IFormSettings {
  public static iLoaderModuleType: LoaderModuleType = LoaderModuleType.FORM;
  public messageType: MessageType;
  public controller: string;
  public submitTitle: string;
  public inputs: IInputSettings[];
  public label: string;
  public key: string;
  constructor(loaderObject: any = null) {
    super(loaderObject);
    this.name = this.constructor.name;
  }
  handleMessage(message: IMessage): IMessage {
    throw new Error("Method not implemented.");
  }
  public getInputsByGroup(group: string): IInputSettings[] {
    return this.inputs.filter((input) => input.group == group);
  }
  validate(message: IMessage): string[] {
    let result: string[] = [];
    this.inputs.forEach((input) => {
      const submittedValue: any = (message.data as any)[input.key];
      if (!input.validation) return;
      const validationResult: string | null = input.validation(submittedValue);
      if (validationResult == null) return;
      result.push(validationResult);
    });
    return result;
  }
}
