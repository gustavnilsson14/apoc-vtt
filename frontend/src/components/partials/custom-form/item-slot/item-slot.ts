import { bindable, inject } from "aurelia";
import { ISelectableItem } from "../../../../../../collections/items";
import { IItemSlotInputSettings } from "../../../../../../contracts/input";
import { ISelectable, SelectionHandler } from "../../../../infrastructure/selection";

@inject(SelectionHandler)
export class ItemSlot implements ISelectable {
  @bindable public settings: IItemSlotInputSettings;
  @bindable result: any;
  @bindable public value: any;
  @bindable data: any;
  @bindable isSelected: boolean;
  public selectionGroup: string = "ItemSlot";
  constructor(private selectionHandler: SelectionHandler) {}

  public onClick(): void {
    if (this.selectionHandler.selected?.selectionGroup == "ItemSlot") this.handleMoveItem();
    if (this.selectionHandler.selected?.selectionGroup == "AllItems") this.handleNewItem();
    if (this.value) this.selectionHandler.select(this);
  }
  selectedChanged() {
    this.isSelected = this.selectionHandler.selected == this;
  }
  handleMoveItem() {
    if (this.selectionHandler.selected == this) return;
    const selectedItem: ItemSlot = this.selectionHandler.selected as ItemSlot;
    if (selectedItem.value == undefined) return;

    const newResult = { ...this.result };
    newResult[this.settings.key] = selectedItem.value;
    newResult[selectedItem.settings.key] = this.value;
    this.result = newResult;
    selectedItem.value = this.result[selectedItem.settings.key];
    this.value = this.result[this.settings.key];
  }

  handleNewItem() {
    if (this.value) return;
    this.value = { ...this.selectionHandler.selected };
    this.result[this.settings.key] = this.value;
    this.result = { ...this.result };
  }
  valueChanged(): void {
    this.result[this.settings.key] = this.value;
    this.result = { ...this.result };
  }
}
