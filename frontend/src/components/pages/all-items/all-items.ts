import { RollableHandler } from './../../../../../shared/random';
import { bindable, EventAggregator, inject } from "aurelia";
import { ISelectableItem, itemList } from "../../../../../collections/items";
import { SelectionHandler } from "../../../infrastructure/selection";

@inject(EventAggregator, SelectionHandler, RollableHandler)
export class AllItems {
  @bindable allItems: ISelectableItem[];
  @bindable visibleItems: ISelectableItem[];
  @bindable searchText: string;
  constructor(private eventAggregator: EventAggregator, private selectionHandler: SelectionHandler) {
    this.allItems = itemList.map((item) => {
      return {
        ...item,
        isSelected: false,
        selectionGroup: "AllItems",
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
  itemClicked(item: ISelectableItem) {
    this.selectionHandler.select(item);
  }
}
