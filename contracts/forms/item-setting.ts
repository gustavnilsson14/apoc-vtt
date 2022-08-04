import { itemList, ItemType } from "../../collections/items";
import { ItemSettingController } from "../controllers/item-setting";
import { BaseForm, IFormSettings } from "../form";
import { IInputSettings, InputFactory, InputType, InputSubType } from "../input";
import { ILoaderModule } from "../loader";
import { MessageType, IMessage } from "../message";
import { ItemSettingAvailability } from "../models/item";

const fields: IInputSettings[] = [
    InputFactory.createSelectInput({
        label: "ItemType",
        key: "itemType",
        type: InputType.SELECT,
        labelIndex: ".",
        group: "is",
        options: Object.values(ItemType),

    }),
    InputFactory.createSelectInput({
        label: "Availability",
        key: "availability",
        type: InputType.SELECT,
        labelIndex: ".",
        group: "is",
        options: Object.values(ItemSettingAvailability),
    }),
    InputFactory.createSelectInput({
        label: "Specific item",
        key: "item",
        type: InputType.SELECT,
        labelIndex: "name",
        group: "is",
        options: [{
          name: 'NONE'
        }, ...itemList],
    }),
];
export class ItemSettingForm
  extends BaseForm
  implements ILoaderModule, IFormSettings
{
  messageType: MessageType = MessageType.ADD;
  controller: string = ItemSettingController.name;
  submitTitle: string = "Create";
  inputs: IInputSettings[] = [...fields];
  label: string = "Item Settings";
  key: string = "addItemSettingForm";
  handleMessage(message: IMessage): IMessage {
    throw new Error("Method not implemented.");
  }
}