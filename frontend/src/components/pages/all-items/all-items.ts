import { IItem } from './../../../../../collections/items';
import { bindable, EventAggregator, inject } from "aurelia";
import { itemList } from "../../../../../collections/items";
import { BasePage } from '../../../infrastructure/view';
import { ItemSettingController } from '../../../../../contracts/controllers/item-setting';
import { Client } from '../../../infrastructure/client';
import { IMessage, MessageType } from '../../../../../contracts/message';
import { IItemSetting, ItemSettingAvailability, matchItemType } from '../../../../../contracts/models/item';
import { asyncTimeout } from '../../../../../shared/async-timeout';

@inject(Client, EventAggregator)
export class AllItems extends BasePage {
  @bindable allItems: IItem[];
  @bindable visibleItems: IItem[];
  @bindable searchText: string;
  @bindable itemSettings: IItemSetting[];
  constructor(public client: Client, private eventAggregator: EventAggregator) {
    super(client);
    this.allItems = itemList.map((item) => {
      return {
        ...item,
        isSelected: false,
        selectionGroup: "AllItems",
        filledSlots: 0
      };
    });
    this.visibleItems = this.allItems;
    this.subscribeRemote(ItemSettingController.name);
    this.subscribeLocal(this.eventAggregator.subscribe(`${MessageType.PROVISION}_${ItemSettingController.name}`, (message: IMessage) => {
      this.itemSettings = message.data as any as IItemSetting[];
    }));
  }
  itemSettingsChanged() {
    this.allItems = [...this.allItems];
    this.visibleItems = this.allItems;
    this.searchTextChanged();
  }
  itemAllowed(item: IItem): boolean {
    if (!this.itemSettings) return true;
    let itemTypeResult = true;
    let itemNameResult: any = null;
    this.itemSettings.forEach(setting=>{
      if (setting) {
        const result = setting.availability != ItemSettingAvailability.BANNED;
        if (matchItemType(item, setting.itemType)) itemTypeResult = result;
        if (item.name == setting.item?.name) itemNameResult = result;
      }
    });
    if(itemNameResult == false) return false;
    if(itemNameResult == true) return true;
    return itemTypeResult;
  }
  searchTextChanged(): void {
    if(!this.searchText) return;
    this.visibleItems = this.allItems.filter(item => {
      const results: boolean[] = [];
      results.push(item.name.toLowerCase().indexOf(this.searchText.toLowerCase()) != -1);
      results.push(item.type.toLowerCase().indexOf(this.searchText.toLowerCase()) != -1);
      if (item.damageTypes) {
        results.push(item.damageTypes.filter(damageType => {
          return damageType.toLowerCase().indexOf(this.searchText.toLowerCase()) != -1;
        }).length > 0);
      }
      return results.filter(x => x == true).length > 0;
    });
  }
}
