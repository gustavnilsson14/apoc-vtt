import { henchmanList, vehicleList } from "../../collections/asset";
import { AssetController } from "./../controllers/asset";
import { BaseForm } from "../form";
import { IMessage, MessageType } from "../message";
import {
  IInputSettings,
  InputFactory,
  InputSubType,
  InputType,
} from "../input";

const addAssetFields: IInputSettings[] = [
  InputFactory.createSelectInput({
    label: "Asset",
    labelIndex: "name",
    key: "asset",
    options: ["VEHICLES",...vehicleList, "HENCHMEN", ...henchmanList],
    type: InputType.SELECT,
    group: "",
    isTemplate: true,
  }),
];
const baseAssetFields: IInputSettings[] = [
];
const editVehicleFields: IInputSettings[] = [
  InputFactory.createDefaultInput({
    label: "Name",
    key: "name",
    readonly: true,
    type: InputType.INPUT,
    subType: InputSubType.TEXT,
    group: "",
  }),
  InputFactory.createDefaultInput({
    label: "Type",
    key: "type",
    readonly: true,
    type: InputType.INPUT,
    subType: InputSubType.TEXT,
    group: "",
  }),
  InputFactory.createDefaultInput({
    label: "Seats",
    key: "seats",
    readonly: true,
    type: InputType.INPUT,
    subType: InputSubType.NUMBER,
    group: "",
  }),
  InputFactory.createDefaultInput({
    label: "Hull integrity",
    key: "integrity",
    type: InputType.INPUT,
    subType: InputSubType.NUMBER,
    group: "",
  }),
  InputFactory.createDefaultInput({
    label: "Fuel",
    key: "fuel",
    type: InputType.INPUT,
    subType: InputSubType.NUMBER,
    group: "",
  }),
  InputFactory.createItemSlotsInput({
    label: "",
    key: "itemSlots",
    type: InputType.ITEMSLOTS,
    itemSlots: []
  })
];
const editHenchmanFields: IInputSettings[] = [
  InputFactory.createDefaultInput({
    label: "Name",
    key: "name",
    type: InputType.INPUT,
    subType: InputSubType.TEXT,
    group: "",
  }),
  InputFactory.createDefaultInput({
    label: "Type",
    key: "type",
    readonly: true,
    type: InputType.INPUT,
    subType: InputSubType.TEXT,
    group: "",
  }),
  InputFactory.createDefaultInput({
    label: "level",
    key: "level",
    type: InputType.INPUT,
    subType: InputSubType.NUMBER,
    group: "",
  }),
  InputFactory.createDefaultInput({
    label: "experience",
    key: "experience",
    type: InputType.INPUT,
    subType: InputSubType.NUMBER,
    group: "",
  }),
  InputFactory.createDefaultInput({
    label: "strength",
    key: "strength",
    type: InputType.INPUT,
    subType: InputSubType.NUMBER,
    group: "",
  }),
  InputFactory.createDefaultInput({
    label: "dexterity",
    key: "dexterity",
    type: InputType.INPUT,
    subType: InputSubType.NUMBER,
    group: "",
  }),
  InputFactory.createDefaultInput({
    label: "will",
    key: "will",
    type: InputType.INPUT,
    subType: InputSubType.NUMBER,
    group: "",
  }),
  InputFactory.createDefaultInput({
    label: "endurance",
    key: "endurance",
    type: InputType.INPUT,
    subType: InputSubType.NUMBER,
    group: "",
  }),
  InputFactory.createDefaultInput({
    label: "maxEndurance",
    key: "maxEndurance",
    type: InputType.INPUT,
    subType: InputSubType.NUMBER,
    group: "",
  }),
  InputFactory.createDefaultInput({
    label: "av",
    key: "av",
    type: InputType.INPUT,
    subType: InputSubType.NUMBER,
    group: "",
  }),
  InputFactory.createDefaultInput({
    label: "health",
    key: "health",
    type: InputType.INPUT,
    subType: InputSubType.NUMBER,
    group: "",
  }),
  InputFactory.createDefaultInput({
    label: "weaknesses",
    key: "weaknesses",
    type: InputType.INPUT,
    subType: InputSubType.TEXT,
    group: "",
  }),
  InputFactory.createItemSlotsInput({
    label: "",
    key: "itemSlots",
    type: InputType.ITEMSLOTS,
    itemSlots: []
  })
];

/*
    level: number;
    experience?: number;
    strength: number;
    dexterity: number;
    will: number;
    endurance: number;
    maxEndurance: number;
    av?: number;
    weaknesses: DamageType[];
    health?: WoundState;
*/

export class AssetCreateForm extends BaseForm {
  messageType: MessageType = MessageType.ADD;
  controller: string = AssetController.name;
  submitTitle: string = "Create Asset";
  inputs: IInputSettings[] = addAssetFields;
  label: string = "Create Asset";
  key: string = "addAssetForm";
  handleMessage(message: IMessage): IMessage {
    return super.handleMessage(message);
  }
}
export class VehicleEditForm extends BaseForm {
  messageType: MessageType = MessageType.EDIT;
  controller: string = AssetController.name;
  submitTitle: string = "Edit Vehicle";
  inputs: IInputSettings[] = [...baseAssetFields, ...editVehicleFields];
  label: string = "Edit Vehicle";
  key: string = "editVehicleForm";
  displayLabel: boolean = false;
  autoSave: boolean = true;
  noSubscription: boolean = true;
  handleMessage(message: IMessage): IMessage {
    return super.handleMessage(message);
  }
}
export class HenchmanEditForm extends BaseForm {
  messageType: MessageType = MessageType.EDIT;
  controller: string = AssetController.name;
  submitTitle: string = "Edit Vehicle";
  inputs: IInputSettings[] = [...baseAssetFields, ...editHenchmanFields];
  label: string = "Edit Vehicle";
  key: string = "editVehicleForm";
  displayLabel: boolean = false;
  autoSave: boolean = true;
  noSubscription: boolean = true;
  handleMessage(message: IMessage): IMessage {
    return super.handleMessage(message);
  }
}
