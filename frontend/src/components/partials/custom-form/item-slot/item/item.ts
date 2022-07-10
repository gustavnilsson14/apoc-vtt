import { bindable } from "aurelia";
import { IItem } from "../../../../../../../collections/items";
import { ItemSlotsSetter } from "../itemSlotsSetter";


export class Item extends ItemSlotsSetter {
  @bindable editable: boolean = false;
  @bindable icon: string;
  @bindable image: string;
  @bindable skillSlots: boolean[] = [false,false,false,false,false];
  @bindable value: any;
  @bindable index: number;
  @bindable isItemSlot: boolean = false;
  binding(){
    this.setSkillSlots();
    this.image = this.getImage();
    this.icon = this.getIcon();
  }
  setSkillSlots() {
    if(!this.getItem().hasSkill) return;
    const skillSlots: boolean[] = [false,false,false,false,false];
    for (let i = 0; i < this.getItem().skill; i++) {
      skillSlots[i] = true;
    }
    this.skillSlots = skillSlots;
  }
  setSkill(e: any, value: number){
    if (!this.editable) return;
    e.stopPropagation();
    if(!this.getItem().hasSkill) return;
    if (this.skillSlots.filter(x=>x==true).length > value) {
      this.getItem().skill = value;
      this.setItem(this.getItem());
      return;
    }
    this.getItem().skill = value + 1;
    this.setItem(this.getItem());
  }
  public getImage(): any {
    return require(`../../../../../assets/${this.getItem().image}`);
  }
  public getIcon(): any {
    return require(`../../../../../assets/img/icons/${this.getItem().type.toString().toLowerCase()}.svg`);
  }
  public getHeaderFontSize(): string {
    if (this.getItem().name.length > 14) return "smallest";
    if (this.getItem().name.length > 11) return "smaller";
    if (this.getItem().name.length > 8) return "small";
    return "";
  }
  public getItem(): IItem {
    if(!this.isItemSlot) return this.value as any as IItem;
    return this.value[this.index].item;
  }
}
