import { ILoaderModule } from "../../contracts/loader";
import { UserController } from "../controllers/user";
import { BaseForm, IFormSettings } from "../form";
import {
  IInputSettings,
  InputFactory,
  InputSubType,
  InputType,
} from "../input";
import { IMessage, MessageType } from "../message";

const fields: IInputSettings[] = [
  InputFactory.createDefaultInput({
    label: "name",
    key: "name",
    hasLabel: false,
    readonly: true,
    type: InputType.INPUT,
    subType: InputSubType.TEXT,
  }),
  InputFactory.createDefaultInput({
    label: "strength",
    key: "strength",
    readonly: true,
    type: InputType.INPUT,
    subType: InputSubType.NUMBER,
  }),
  InputFactory.createDefaultInput({
    label: "dexterity",
    key: "dexterity",
    readonly: true,
    type: InputType.INPUT,
    subType: InputSubType.NUMBER,
  }),
  InputFactory.createDefaultInput({
    label: "will",
    key: "will",
    readonly: true,
    type: InputType.INPUT,
    subType: InputSubType.NUMBER,
  }),
  InputFactory.createDefaultInput({
    label: "endurance",
    key: "endurance",
    type: InputType.INPUT,
    subType: InputSubType.NUMBER,
  }),
  InputFactory.createDefaultInput({
    label: "av",
    key: "av",
    readonly: true,
    type: InputType.INPUT,
    subType: InputSubType.NUMBER,
  }),
];

export class EntityFormSettings
  extends BaseForm
  implements ILoaderModule, IFormSettings
{
  messageType: MessageType = MessageType.LOGIN;
  controller: string = UserController.name;
  submitTitle: string = "Login";
  inputs: IInputSettings[] = [...fields];
  label: string = "";
  key: string = "loginForm";
  noSave: boolean = true;
  handleMessage(message: IMessage): IMessage {
    throw new Error("Method not implemented.");
  }
}