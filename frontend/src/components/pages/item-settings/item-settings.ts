import { inject, EventAggregator, bindable } from "aurelia";
import { ItemSettingController } from "../../../../../contracts/controllers/item-setting";
import { IFormSettings } from "../../../../../contracts/form";
import { ItemSettingForm } from "../../../../../contracts/forms/item-setting";
import { ICustomListSettings } from "../../../../../contracts/list";
import { BasePage } from "../../../infrastructure/view";


@inject(EventAggregator)
export class ItemSettings extends BasePage {
  @bindable public addItemSettingFormSettings: IFormSettings = new ItemSettingForm();
  @bindable public addItemSettingFormResult: any = {};
  @bindable itemSettingListSettings: ICustomListSettings = {
    indexes: [
      { label: "Availability", path: "availability" },
      { label: "Item", path: "item.name" },
      { label: "Item type", path: "itemType" },
    ],
    controller: ItemSettingController.name,
    alwaysUpdate: false,
    hasDeleteButton: true
  };
}
