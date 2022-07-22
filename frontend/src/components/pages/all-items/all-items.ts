import { IItem } from './../../../../../collections/items';
import { bindable, EventAggregator, inject } from "aurelia";
import { itemList } from "../../../../../collections/items";

@inject(EventAggregator)
export class AllItems {
  @bindable allItems: IItem[];
  @bindable visibleItems: IItem[];
  @bindable searchText: string;
  constructor(private eventAggregator: EventAggregator) {
    this.allItems = itemList.map((item) => {
      return {
        ...item,
        isSelected: false,
        selectionGroup: "AllItems",
        filledSlots: 0
      };
    });
    this.visibleItems = this.allItems;
  }
  searchTextChanged():void{
    this.visibleItems = this.allItems.filter(item => {
      const results: boolean[] = [];
      results.push(item.name.toLowerCase().indexOf(this.searchText.toLowerCase()) != -1);
      results.push(item.type.toLowerCase().indexOf(this.searchText.toLowerCase()) != -1);
      if(item.damageTypes){
        results.push(item.damageTypes.filter(damageType =>{
          return damageType.toLowerCase().indexOf(this.searchText.toLowerCase()) != -1;
        }).length > 0);
      }
      return results.filter(x => x == true).length > 0;
    });
  }
}
