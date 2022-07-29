import { ItemType, IItem, StatType } from './../../collections/items';
import { WoundState } from "./../stats";
import { DamageType, IDamageType } from "./../../collections/damageType";
import { allBackgroundsList } from "./../../collections/backgrounds";
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
    tooltipPaths: ["background.tribe", "background.occupationDescription"],
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
    hasLabelContextCallback: true,
  }),
  InputFactory.createDefaultInput({
    label: "dexterity",
    placeholder: "",
    key: "dexterity",
    type: InputType.INPUT,
    subType: InputSubType.NUMBER,
    group: "attributes",
    hasLabelContextCallback: true,
  }),
  InputFactory.createDefaultInput({
    label: "will",
    placeholder: "",
    key: "will",
    type: InputType.INPUT,
    subType: InputSubType.NUMBER,
    group: "attributes",
    hasLabelContextCallback: true,
  }),
  InputFactory.createDefaultInput({
    label: "av",
    placeholder: "",
    key: "av",
    type: InputType.INPUT,
    subType: InputSubType.NUMBER,
    hasLabel: false,
    group: "endurance",
    readonly: true,
    getInputValue: (data: any): any => {
      let av = 0;
      data.itemSlots.forEach((slot: any) => {
        if (slot.item == null) return;
        const item = slot.item as IItem;
        const armorSlots = [
          "Upper Body",
          "Lower Body",
        ];
        const shieldSlots = [
          "Main hand",
          "Off hand",
        ];
        if (armorSlots.indexOf(slot.name) != -1) {
          if (item.type != ItemType.ARMOR && item.type != ItemType.HEADGEAR) return;
          av += item.stats.filter(x=>x!=StatType.DURABILITY).length;
        }
        if (shieldSlots.indexOf(slot.name) != -1) {
          if (item.type != ItemType.SHIELD) return;
          av += item.stats.filter(x=>x!=StatType.DURABILITY).length;
        }
      });
      return av;
    },
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
    readonly: true,
    type: InputType.INPUT,
    subType: InputSubType.NUMBER,
    hasLabel: false,
    group: "endurance",
  }),
  InputFactory.createSelectInput({
    label: "Health",
    hasLabel: false,
    labelIndex: ".",
    key: "health",
    options: Object.values(WoundState),
    type: InputType.SELECT,
    group: "health",
    isTemplate: false,
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
    labelIndex: ".",
    key: "weaknesses",
    options: Object.values(DamageType),
    type: InputType.MULTIPLESELECT,
    group: "traits",
    listSettings: {
      headers: false,
      indexes: [{ label: "weakness", path: "." }],
      tooltipPaths: ["description"],
      tooltipSource: TooltipSourceType.PATH,
      tooltipDataFunction: (damageTypeIdentifier: DamageType): IDamageType | undefined => {
        return damageTypes.find(
          (x) => damageTypeIdentifier == x.damageType
        );
      },
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
    group: "itemSlots",
  }),
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
