import { ILoaderModule } from "../../contracts/loader";
import { CharacterController } from "../controllers/character";
import { BaseForm, IFormSettings } from "../form";
import {
  IInputSettings,
  InputFactory,
  InputSubType,
  InputType,
} from "../input";
import { IMessage, MessageType } from "../message";
import { damageTypes } from "../../collections/damageType";
import { skillActions, gambitActions } from "../../collections/tacticalAction";
import { TooltipSourceType } from "../../frontend/src/infrastructure/tooltip";

const fields: IInputSettings[] = [
  InputFactory.createDefaultInput({
    label: "name",
    placeholder: "",
    key: "name",
    type: InputType.INPUT,
    subType: InputSubType.TEXT,
    group: "base-info",
  }),
  InputFactory.createDefaultInput({
    label: "background",
    placeholder: "",
    key: "background",
    type: InputType.INPUT,
    subType: InputSubType.TEXT,
    group: "base-info",
  }),
  InputFactory.createDefaultInput({
    label: "level",
    placeholder: "",
    key: "level",
    type: InputType.INPUT,
    subType: InputSubType.NUMBER,
    group: "attributes",
  }),
  InputFactory.createDefaultInput({
    label: "experience",
    placeholder: "",
    key: "experience",
    type: InputType.INPUT,
    subType: InputSubType.NUMBER,
    group: "attributes",
  }),
  InputFactory.createDefaultInput({
    label: "strength",
    placeholder: "",
    key: "strength",
    type: InputType.INPUT,
    subType: InputSubType.NUMBER,
    group: "attributes",
  }),
  InputFactory.createDefaultInput({
    label: "dexterity",
    placeholder: "",
    key: "dexterity",
    type: InputType.INPUT,
    subType: InputSubType.NUMBER,
    group: "attributes",
  }),
  InputFactory.createDefaultInput({
    label: "will",
    placeholder: "",
    key: "will",
    type: InputType.INPUT,
    subType: InputSubType.NUMBER,
    group: "attributes",
  }),
  InputFactory.createDefaultInput({
    label: "endurance",
    placeholder: "",
    key: "endurance",
    type: InputType.INPUT,
    subType: InputSubType.NUMBER,
    hasLabel: false,
    group: "endurance",
  }),
  InputFactory.createDefaultInput({
    label: "maxEndurance",
    placeholder: "",
    key: "maxEndurance",
    type: InputType.INPUT,
    subType: InputSubType.NUMBER,
    hasLabel: false,
    group: "endurance",
  }),
  InputFactory.createDefaultInput({
    label: "optionalTacticalActions",
    placeholder: "",
    key: "optionalTacticalActions",
    type: InputType.INPUT,
    subType: InputSubType.TEXT,
  }),
  InputFactory.createMultipleSelectInput({
    label: "Select weaknesses",
    key: "weaknesses",
    options: damageTypes,
    type: InputType.MULTIPLESELECT,
    group: "traits",
    listSettings: {
      headers: false,
      indexes: [{ label: "weakness", path: "name" }],
      tooltipPath: "description",
      tooltipSource: TooltipSourceType.PATH,
    },
  }),
  InputFactory.createMultipleSelectInput({
    label: "Select skills",
    key: "skills",
    options: skillActions,
    type: InputType.MULTIPLESELECT,
    group: "traits",
    listSettings: {
      headers: false,
      indexes: [{ label: "skill", path: "name" }],
      tooltipPath: "description",
      tooltipSource: TooltipSourceType.PATH,
    },
  }),
  InputFactory.createMultipleSelectInput({
    label: "Select gambits",
    key: "gambit",
    options: gambitActions,
    type: InputType.MULTIPLESELECT,
    group: "traits",
    listSettings: {
      headers: false,
      indexes: [{ label: "gambit", path: "name" }],
      tooltipPath: "description",
      tooltipSource: TooltipSourceType.PATH,
    },
  }),
  InputFactory.createItemSlotsInput({
    label: "",
    key: "itemSlots",
    hasLabel: false,
    type: InputType.ITEMSLOTS,
    itemSlots: [],
    group: "itemSlots"
  })
];

export class CharacterForm
  extends BaseForm
  implements ILoaderModule, IFormSettings
{
  name: string;
  messageType: MessageType = MessageType.ADD;
  controller: string = CharacterController.name;
  submitTitle: string = "Create";
  inputs: IInputSettings[] = fields;
  label: string = "Create character";
  key: string = "loginForm";
  handleMessage(message: IMessage): IMessage {
    return super.handleMessage(message);
  }
}
