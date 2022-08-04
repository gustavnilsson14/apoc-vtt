import { henchmanList, vehicleList } from "../../collections/asset";
import { AssetController } from "./../controllers/asset";
import { BaseForm, IOnMouseInteraction } from "../form";
import { IMessage, MessageType } from "../message";
import {
  IInputSettings,
  InputFactory,
  InputSubType,
  InputType,
} from "../input";
import { IItem, ItemType, StatType } from "../../collections/items";

const addAssetFields: IInputSettings[] = [
  InputFactory.createSelectInput({
    label: "Asset",
    labelIndex: "name",
    key: "asset",
    options: [{name:"VEHICLES"}, ...vehicleList, {name:"HENCHMEN"}, ...henchmanList],
    type: InputType.SELECT,
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
    key: "hardpoints",
    hasLabel: false,
    type: InputType.ITEMSLOTS,
    itemSlots: [],
    group: "hardpoints",
  }),
  InputFactory.createItemSlotsInput({
    label: "",
    key: "itemSlots",
    hasLabel: false,
    type: InputType.ITEMSLOTS,
    itemSlots: [],
    group: "itemSlots",
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
    label: "strength",
    key: "strength",
    type: InputType.INPUT,
    subType: InputSubType.NUMBER,
    group: "",
    hasLabelContextCallback: true
  }),
  InputFactory.createDefaultInput({
    label: "experience",
    key: "experience",
    type: InputType.INPUT,
    subType: InputSubType.NUMBER,
    group: ""
  }),
  InputFactory.createDefaultInput({
    label: "dexterity",
    key: "dexterity",
    type: InputType.INPUT,
    subType: InputSubType.NUMBER,
    group: "",
    hasLabelContextCallback: true
  }),
  InputFactory.createDefaultInput({
    label: "endurance",
    key: "endurance",
    type: InputType.INPUT,
    subType: InputSubType.NUMBER,
    group: "",
    getInputValue: (data: any): any => {
      if(data.endurance > data.maxEndurance) return data.maxEndurance;
      return data.endurance;
    }
  }),
  InputFactory.createDefaultInput({
    label: "will",
    key: "will",
    type: InputType.INPUT,
    subType: InputSubType.NUMBER,
    group: "",
    hasLabelContextCallback: true
  }),
  InputFactory.createDefaultInput({
    label: "av",
    key: "av",
    type: InputType.INPUT,
    subType: InputSubType.NUMBER,
    group: "",
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
    label: "weaknesses",
    key: "weaknesses",
    readonly: true,
    type: InputType.INPUT,
    subType: InputSubType.TEXT,
    group: "",
  }),
  InputFactory.createItemSlotsInput({
    label: "",
    key: "itemSlots",
    type: InputType.ITEMSLOTS,
    itemSlots: [],
    hasInputContextCallback: true
  })
];

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
