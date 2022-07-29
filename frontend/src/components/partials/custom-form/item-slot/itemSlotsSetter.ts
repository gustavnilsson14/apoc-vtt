import { BasePage } from './../../../../infrastructure/view';
import { bindable } from "aurelia";
import { IItem } from "../../../../../../collections/items";
import { IItemSlot } from "../../../../../../contracts/input";

export class ItemSlotsSetter extends BasePage {
  @bindable public value: IItemSlot[];
  @bindable index: number;

  public getItemSlot(): IItemSlot {
    if (this.value == null) return null;
    if (this.value[this.index] == null) return null;
    return this.value[this.index];
  }
  public getItem(): IItem {
    return this.getItemSlot().item;
  }
  public setItem(item: IItem): void {
    this.value[this.index].item = item;
    this.value = [...this.value];
  }
}
