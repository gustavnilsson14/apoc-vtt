import { bindable } from "aurelia";
import { IItem } from "../../../../../../collections/items";
import { IItemSlot } from "../../../../../../contracts/input";

export class ItemSlotsSetter {
  @bindable public value: IItemSlot[];
  @bindable index: number;

  public getItem(): IItem {
    if (this.value == null) return null;
    if (this.value[this.index] == null) return null;
    return this.value[this.index].item;
  }
  public setItem(item: IItem): void {
    this.value[this.index].item = item;
    this.value = [...this.value];
  }
}
