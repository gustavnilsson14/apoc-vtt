import { allBackgroundsList } from './../../collections/backgrounds';
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
    validation: (value: any) => {
      if (value == null) return "You need a name for this new character!";
      return null;
    },
  }),
  InputFactory.createSelectInput({
    label: "background",
    labelIndex: "occupation",
    key: "background",
    options: allBackgroundsList,
    type: InputType.SELECT,
    group: "base-info",
    isTemplate: false,
    tooltipSource: TooltipSourceType.PATH,
    tooltipPaths: ["tribe", "occupationDescription"]
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
    labelIndex: "name",
    key: "weaknesses",
    options: damageTypes,
    type: InputType.MULTIPLESELECT,
    group: "traits",
    listSettings: {
      headers: false,
      indexes: [{ label: "weakness", path: "name" }],
      tooltipPaths: ["description"],
      tooltipSource: TooltipSourceType.PATH,
    },
  }),
  InputFactory.createMultipleSelectInput({
    label: "Select skills",
    labelIndex: "name",
    key: "skills",
    options: skillActions,
    type: InputType.MULTIPLESELECT,
    group: "traits",
    listSettings: {
      headers: false,
      indexes: [{ label: "skill", path: "name" }],
      tooltipPaths: ["description"],
      tooltipSource: TooltipSourceType.PATH,
    },
  }),
  InputFactory.createMultipleSelectInput({
    label: "Select gambits",
    labelIndex: "name",
    key: "gambit",
    options: gambitActions,
    type: InputType.MULTIPLESELECT,
    group: "traits",
    listSettings: {
      headers: false,
      indexes: [{ label: "gambit", path: "name" }],
      tooltipPaths: ["description"],
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
