import { getEnduranceDescription, IHasStats } from "./../stats";
import { EntityController } from "./../controllers/entity";
import { ILoaderModule } from "../../contracts/loader";
import { BaseForm, IFormSettings } from "../form";
import {
  IInputSettings,
  InputFactory,
  InputSubType,
  InputType,
} from "../input";
import { IMessage, MessageType } from "../message";
import { TooltipSourceType } from "../../frontend/src/infrastructure/tooltip";

const statFields: IInputSettings[] = [
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
];
const rollableStatFields: IInputSettings[] = [...statFields].map(x=> {
  const y = {...x};
  y.hasLabelContextCallback = true;
  y.getInputValue = x.getInputValue;
  return y;
});

const prefixFields: IInputSettings[] = [
  InputFactory.createDefaultInput({
    label: "name",
    key: "name",
    hasLabel: false,
    readonly: true,
    type: InputType.INPUT,
    subType: InputSubType.TEXT,
    getInputValue: (data: any) => {
      if(data.background) return `${data.name} the ${data.background.occupation}`;
      return data.name;
    },
  }),
];
const prefixFieldsEditable: IInputSettings[] = [...prefixFields].map(x=>{
  const y = {...x};
  y.readonly = false;
  y.getInputValue = x.getInputValue;
  return y;
});
const suffixFields: IInputSettings[] = [
  InputFactory.createDefaultInput({
    label: "state",
    key: "State",
    hasLabel: false,
    readonly: true,
    type: InputType.INPUT,
    subType: InputSubType.TEXT,
    getInputValue: (data: IHasStats): string => {
      if (data.endurance == null) return "";
      if (data.maxEndurance == null) return "";
      return getEnduranceDescription(data);
    },
  }),
];

const playerCharacterFields: IInputSettings[] = [
  ...prefixFields,
  ...statFields,
  InputFactory.createDefaultInput({
    label: "Health",
    key: "health",
    type: InputType.INPUT,
    subType: InputSubType.TEXT,
  }),
  ...suffixFields,
];
const playerCreatureFields: IInputSettings[] = [
  ...prefixFields,
  ...suffixFields,
];
const gmCreatureFields: IInputSettings[] = [
  ...prefixFieldsEditable,
  ...rollableStatFields,
  InputFactory.createDefaultInput({
    label: "endurance",
    key: "endurance",
    type: InputType.INPUT,
    subType: InputSubType.NUMBER,
  }),
  InputFactory.createDefaultInput({
    label: "weaknesses",
    key: "weaknesses",
    type: InputType.INPUT,
    subType: InputSubType.TEXT,
    readonly: true
  }),
  ...suffixFields,
];

export class CharacterEntityFormSettings
  extends BaseForm
  implements ILoaderModule, IFormSettings
{
  messageType: MessageType = MessageType.EDIT;
  controller: string = EntityController.name;
  submitTitle: string = "Login";
  inputs: IInputSettings[] = playerCharacterFields;
  label: string = "";
  key: string = "entityForm";
  noSave?: boolean = true;
  noSubscription?: boolean = true;
  handleMessage(message: IMessage): IMessage {
    throw new Error("Method not implemented.");
  }
}
export class PlayerEnemyFormSettings
  extends BaseForm
  implements ILoaderModule, IFormSettings
{
  messageType: MessageType = MessageType.EDIT;
  controller: string = EntityController.name;
  submitTitle: string = "Login";
  inputs: IInputSettings[] = playerCreatureFields;
  label: string = "";
  key: string = "entityForm";
  autoSave?: boolean = true;
  handleMessage(message: IMessage): IMessage {
    throw new Error("Method not implemented.");
  }
}
export class GMEnemyFormSettings
  extends BaseForm
  implements ILoaderModule, IFormSettings
{
  messageType: MessageType = MessageType.EDIT;
  controller: string = EntityController.name;
  submitTitle: string = "Login";
  inputs: IInputSettings[] = gmCreatureFields;
  label: string = "";
  key: string = "entityForm";
  autoSave?: boolean = true;
  handleMessage(message: IMessage): IMessage {
    throw new Error("Method not implemented.");
  }
}
