import { IItemSlot } from './../../../../../../../../contracts/input';
import { bindable } from "aurelia";
import { IItem, IItemStat } from "../../../../../../../../collections/items";
import { ItemSlotsSetter } from '../../itemSlotsSetter';

export class ItemStat extends ItemSlotsSetter {
  @bindable statType: IItemStat;
  @bindable checked: boolean = false;
  @bindable value: any;
  @bindable index: number;
  @bindable itemIndex: number;
  @bindable editable: boolean;
  @bindable isItemSlot: boolean = false;
  binding() {
    if (this.getItem().filledSlots == null) this.getItem().filledSlots = [];
    if (this.getItem().filledSlots.indexOf(this.index) == -1) return;
    this.checked = true;
  }
  onClick(e): void {
    if (!this.editable) return;
    e.stopPropagation();
    this.toggle();
    this.getItem().filledSlots = [...this.getItem().filledSlots];
    this.setItem(this.getItem());
  }
  toggle() {
    this.checked = !this.checked;
    if (!this.checked) {
      this.getItem().filledSlots = this.getItem().filledSlots.filter((x) => x != this.index);
      return;
    }
    this.getItem().filledSlots.push(this.index);
  }
  public getItem(): IItem {
    if(!this.isItemSlot) return this.value as any as IItem;
    return this.value[this.itemIndex].item;
  }
  public setItem(item: IItem): void {
    this.value[this.itemIndex].item = item;
    this.value = [...this.value];
  }
}
