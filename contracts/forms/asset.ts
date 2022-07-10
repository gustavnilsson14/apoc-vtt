import { vehicleList } from "./../../collections/vehicle";
import { AssetController } from "./../controllers/asset";
import { BaseForm } from "../form";
import { IMessage, MessageType } from "../message";
import {
  IInputSettings,
  InputFactory,
  InputSubType,
  InputType,
} from "../input";

const addVehicleFields: IInputSettings[] = [
  InputFactory.createSelectInput({
    label: "Vehicle",
    key: "vehicle",
    options: vehicleList,
    type: InputType.SELECT,
    group: "",
    isTemplate: true,
  }),
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

export class VehicleCreateForm extends BaseForm {
  messageType: MessageType = MessageType.ADD;
  controller: string = AssetController.name;
  submitTitle: string = "Create Vehicle";
  inputs: IInputSettings[] = addVehicleFields;
  label: string = "Create Vehicle";
  key: string = "addVehicleForm";
  handleMessage(message: IMessage): IMessage {
    return super.handleMessage(message);
  }
}
export class VehicleEditForm extends BaseForm {
  messageType: MessageType = MessageType.EDIT;
  controller: string = AssetController.name;
  submitTitle: string = "Edit Vehicle";
  inputs: IInputSettings[] = editVehicleFields;
  label: string = "Edit Vehicle";
  key: string = "editVehicleForm";
  displayLabel: boolean = false;
  autoSave: boolean = true;
  handleMessage(message: IMessage): IMessage {
    return super.handleMessage(message);
  }
}
