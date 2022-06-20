import { bindable, EventAggregator, inject } from "aurelia";
import { IItem, ISelectableItem, itemList } from "../../../../../collections/items";
import { SelectionHandler } from "../../../infrastructure/selection";

@inject(EventAggregator, SelectionHandler)
export class AllItems {
  @bindable allItems: ISelectableItem[];
  constructor(private eventAggregator: EventAggregator, private selectionHandler: SelectionHandler) {
    this.allItems = itemList.map((item) => {
      return {
        ...item,
        isSelected: false,
        selectionGroup: "AllItems",
      };
    });
  }
  itemClicked(item: ISelectableItem) {
    this.selectionHandler.select(item);
  }
}
