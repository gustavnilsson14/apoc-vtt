import { bindable, EventAggregator, inject } from "aurelia";
import { IItem } from "../../../../../../../collections/items";
import { getItemValue } from "../../../../../../../contracts/models/item";
import { Client } from "../../../../../infrastructure/client";
import { ISelectable, SelectionHandler } from "../../../../../infrastructure/selection";
import { ItemSlotsSetter } from "../itemSlotsSetter";

@inject(Client, Element)
export class Item extends ItemSlotsSetter implements ISelectable {
  @bindable public selectionGroup: string = "AllItems";
  isSelected: boolean;
  statsValue: number;
  @bindable clickable: boolean = true;
  @bindable editable: boolean = false;
  @bindable icon: string;
  @bindable image: string;
  @bindable skillSlots: boolean[] = [false,false,false,false,false];
  @bindable value: any;
  @bindable index: number;
  @bindable isItemSlot: boolean = false;
  @bindable tooltipVisible: boolean;
  constructor(public client: Client, public element: Element, private selectionHandler: SelectionHandler, private eventAggregator: EventAggregator){
    super(client);
  }
  binding(){
    this.isSelected = this.selectionHandler.isSelected(this);
    this.subscribeLocal(this.eventAggregator.subscribe("SELECTION_CHANGED", () => {
      this.isSelected = this.selectionHandler.isSelected(this);
    }));
    this.setSkillSlots();
    this.statsValue = this.getItemStatsValue(this.getItem());
    this.image = this.getImage();
    this.icon = this.getIcon();
  }
  valueChanged(){
    if(!this.getItem()) return;
    this.setSkillSlots();
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
  onClick() {
    if(!this.clickable) return;
    this.selectionHandler.select(this);
  }
  setTooltipVisibility(value: boolean): void {
    if (this.selectionGroup == "AllItems") return;
    if (!this.getItem().tooltipPaths && !this.getItem().tooltipText) return;
    this.tooltipVisible = value;
  }
  getItemStatsValue(item: IItem): number {
    return getItemValue(item);
  }
}
