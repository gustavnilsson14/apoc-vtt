import { bindable } from "aurelia";
import { IItem, IItemStat } from "../../../../../../../../../collections/items";

export class ItemStat {
  @bindable statType: IItemStat;
  @bindable checked: boolean = false;
  @bindable item: IItem;
  @bindable index: number;
  @bindable editable: boolean;
  attached() {
    if (this.item.filledSlots == null) this.item.filledSlots = [];
    if (this.item.filledSlots.indexOf(this.index) == -1) return;
    this.checked = true;
  }
  onClick(e): void {
    if (!this.editable) return;
    e.stopPropagation();
    this.toggle();
    this.item = { ...this.item };
  }
  toggle() {
    this.checked = !this.checked;
    if (!this.checked) {
      this.item.filledSlots = this.item.filledSlots.filter((x) => x != this.index);
      return;
    }
    this.item.filledSlots.push(this.index);
  }
}
