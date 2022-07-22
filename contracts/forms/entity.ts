import { getEnduranceDescription, IHasStats } from './../stats';
import { EntityController } from './../controllers/entity';
import { Tooltip } from './../../frontend/src/components/partials/tooltip/tooltip';
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
import { TooltipSourceType } from '../../frontend/src/infrastructure/tooltip';

const baseFields: IInputSettings[] = [
  InputFactory.createDefaultInput({
    label: "name",
    key: "name",
    hasLabel: false,
    readonly: true,
    type: InputType.INPUT,
    subType: InputSubType.TEXT,
  }),
  InputFactory.createDefaultInput({
    label: "state",
    key: "State",
    hasLabel: false,
    readonly: true,
    type: InputType.INPUT,
    subType: InputSubType.TEXT,
    getInputValue: (data: IHasStats): string=>{
      if(data.endurance == null) return "";
      if(data.maxEndurance == null) return "";
      return getEnduranceDescription(data);
    }
  }),
];
const statsFields: IInputSettings[] = [
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
];

const detailFields: IInputSettings[] = [
  InputFactory.createDefaultInput({
    label: "name",
    key: "name",
    hasLabel: false,
    readonly: true,
    type: InputType.INPUT,
    subType: InputSubType.TEXT,
    tooltipPaths: ["description"],
    tooltipSource: TooltipSourceType.PATH
  }),
  InputFactory.createDefaultInput({
    label: "Armor",
    key: "av",
    readonly: true,
    type: InputType.INPUT,
    subType: InputSubType.NUMBER,
  }),
];

export class CharacterEntityFormSettings
  extends BaseForm
  implements ILoaderModule, IFormSettings
{
  messageType: MessageType = MessageType.EDIT;
  controller: string = EntityController.name;
  submitTitle: string = "Login";
  inputs: IInputSettings[] = [...baseFields, ...statsFields];
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
  inputs: IInputSettings[] = [...baseFields];
  label: string = "";
  key: string = "entityForm";
  autoSave?: boolean = true;
  noSubscription?: boolean = true;
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
  inputs: IInputSettings[] = [...detailFields, ...statsFields];
  label: string = "";
  key: string = "entityForm";
  autoSave?: boolean = true;
  noSubscription?: boolean = true;
  handleMessage(message: IMessage): IMessage {
    throw new Error("Method not implemented.");
  }
}
