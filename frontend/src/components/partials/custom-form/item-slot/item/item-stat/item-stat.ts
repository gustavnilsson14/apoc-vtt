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
  @bindable position: number;
  binding(){
    this.setPosition()
  }
  valueChanged(){
    this.setPosition()
  }
  setPosition() {
    if (!this.getItem()) return;
    this.position = this.getItem().stats.length - this.index - 1;
    this.checked = (this.getItem().filledSlots > this.position);
  }
  onClick(e): void {
    if (!this.editable) return;
    e.stopPropagation();
    this.toggle();
    this.setItem(this.getItem());
  }
  toggle() {
    if(this.getItem().filledSlots > this.position){
      this.getItem().filledSlots = this.position;
      return;
    }
    this.getItem().filledSlots = this.position + 1;
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
