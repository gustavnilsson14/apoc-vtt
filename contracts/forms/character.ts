import { ILoaderModule } from "../../contracts/loader";
import { CharacterController } from "../controllers/character";
import { BaseForm, IFormSettings } from "../form";
import { IInputSettings, InputFactory, InputType } from "../input";
import { IMessage, MessageType } from "../message";
import { damageTypes } from "../../collections/damageType";
import { skillActions, gambitActions } from "../../collections/tacticalAction";

const fields: IInputSettings[] = [
  InputFactory.createDefaultInput({
    label: "name",
    placeholder: "",
    key: "name",
    type: InputType.TEXT,
    group: "base-info",
  }),
  InputFactory.createDefaultInput({
    label: "background",
    placeholder: "",
    key: "background",
    type: InputType.TEXT,
    group: "base-info",
  }),
  InputFactory.createDefaultInput({
    label: "level",
    placeholder: "",
    key: "level",
    type: InputType.NUMBER,
    group: "attributes",
  }),
  InputFactory.createDefaultInput({
    label: "experience",
    placeholder: "",
    key: "experience",
    type: InputType.NUMBER,
    group: "attributes",
  }),
  InputFactory.createDefaultInput({
    label: "strength",
    placeholder: "",
    key: "strength",
    type: InputType.NUMBER,
    group: "attributes",
  }),
  InputFactory.createDefaultInput({
    label: "dexterity",
    placeholder: "",
    key: "dexterity",
    type: InputType.NUMBER,
    group: "attributes",
  }),
  InputFactory.createDefaultInput({
    label: "will",
    placeholder: "",
    key: "will",
    type: InputType.NUMBER,
    group: "attributes",
  }),
  InputFactory.createDefaultInput({
    label: "endurance",
    placeholder: "",
    key: "endurance",
    type: InputType.NUMBER,
    hasLabel: false,
    group: "endurance",
  }),
  InputFactory.createDefaultInput({
    label: "maxEndurance",
    placeholder: "",
    key: "maxEndurance",
    type: InputType.NUMBER,
    hasLabel: false,
    group: "endurance",
  }),
  InputFactory.createDefaultInput({
    label: "optionalTacticalActions",
    placeholder: "",
    key: "optionalTacticalActions",
    type: InputType.TEXT,
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
    },
  }),
  InputFactory.createItemSlot({
    label: "Main Hand",
    key: "mainHand",
    group: "hands",
    type: InputType.ITEMSLOT,
  }),
  InputFactory.createItemSlot({
    label: "Off Hand",
    key: "offHand",
    group: "hands",
    type: InputType.ITEMSLOT,
  }),
  InputFactory.createItemSlot({
    label: "Upper Body",
    key: "upperBody",
    group: "body",
    type: InputType.ITEMSLOT,
  }),
  InputFactory.createItemSlot({
    label: "Lower Body",
    key: "lowerBody",
    group: "body",
    type: InputType.ITEMSLOT,
  }),
  InputFactory.createItemSlot({
    label: "Belt",
    key: "belt",
    group: "belt",
    type: InputType.ITEMSLOT,
  }),
  InputFactory.createItemSlot({
    label: "Legs",
    key: "legs",
    group: "belt",
    type: InputType.ITEMSLOT,
  }),
  InputFactory.createItemSlot({
    label: "#1",
    key: "pack1",
    group: "pack",
    type: InputType.ITEMSLOT,
  }),
  InputFactory.createItemSlot({
    label: "#2",
    key: "pack2",
    group: "pack",
    type: InputType.ITEMSLOT,
  }),
  InputFactory.createItemSlot({
    label: "#3",
    key: "pack3",
    group: "pack",
    type: InputType.ITEMSLOT,
  }),
  InputFactory.createItemSlot({
    label: "#4",
    key: "pack4",
    group: "pack",
    type: InputType.ITEMSLOT,
  }),
  InputFactory.createItemSlot({
    label: "#5",
    key: "pack5",
    group: "pack",
    type: InputType.ITEMSLOT,
  }),
  InputFactory.createItemSlot({
    label: "#6",
    key: "pack6",
    group: "pack",
    type: InputType.ITEMSLOT,
  }),
];

export class CharacterForm extends BaseForm implements ILoaderModule, IFormSettings {
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
