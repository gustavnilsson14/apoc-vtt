import { IHasStats } from './../../../../../../contracts/stats';
import { ICharacter } from './../../../../../../contracts/models/character';
import { IItemSlot, IItemSlotsInputSettings } from './../../../../../../contracts/input';
import { IItem, ItemType, StatType } from './../../../../../../collections/items';
import { RollableHandler, IRollable } from './../../../../../../shared/random';
import { bindable, EventAggregator, inject } from "aurelia";
import { ISelectable, SelectionHandler } from "../../../../infrastructure/selection";
import { ItemSlotsSetter } from './itemSlotsSetter';
import { DiceType } from '../../../../../../contracts/models/dice';

@inject(EventAggregator, SelectionHandler)
export class ItemSlot extends ItemSlotsSetter implements ISelectable {
  @bindable public settings: IItemSlotsInputSettings;
  @bindable isSelected: boolean;
  public selectionGroup: string = "ItemSlot";
  @bindable public value: IItemSlot[];
  @bindable index: number;
  @bindable broken: boolean = false;
  @bindable onClickCallback;
  name: string;
  constructor(private eventAggregator: EventAggregator, private selectionHandler: SelectionHandler) {
    super();
  }
  binding(){
    this.handleBreakage();
    if(!this.getItem()) return;
    this.name = this.getItem().name;
  }
  public onClick(): void {
    this.handleRollable();
    if (this.selectionHandler.selected?.selectionGroup == "ItemSlot") this.handleMoveItem();
    if (this.selectionHandler.selected?.selectionGroup == "AllItems") this.handleNewItem();
    if (this.getItem()) this.selectionHandler.select(this);
  }
  handleRollable() {
    if (this.value[this.index].rollable != true) 
    if (this.getItem() == null) return;
    this.onClickCallback({ rollable: this });
  }
  equals(otherSlot: ItemSlot):boolean{
    if(!otherSlot) return false;
    if(otherSlot.index != this.index) return false;
    if(otherSlot.value[otherSlot.index].name != this.value[otherSlot.index].name)
    return true;
  }
  handleMoveItem() {
    const selectedItemSlot: ItemSlot = this.selectionHandler.selected as ItemSlot;
    if (this.equals(selectedItemSlot as ItemSlot)) return;
    if (selectedItemSlot.getItem() == undefined) return;
    
    const myItem: IItem = this.getItem();
    const otherItem: IItem = selectedItemSlot.getItem();
    
    if(!this.validateItemType(otherItem)) return;
    if(!selectedItemSlot.validateItemType(myItem)) return;
    
    selectedItemSlot.setItem(myItem);
    this.setItem(otherItem);
  }
  handleNewItem() {
    if(!this.validateItemType({...this.selectionHandler.selected} as any)) return;
    this.setItem({...this.selectionHandler.selected} as any);
  }
  public validateItemType(item: IItem): boolean {
    if (item == null) return true;
    return this.value[this.index].allowedTypes.find(x=>x == item.type || x == ItemType.ANY) != null;    
  }
  
  handleBreakage() {
    if (!this.getItem()) return;
    if (!this.getItem().filledSlots) return;
    if (this.getItem().filledSlots.length == this.getItem().stats.filter(x => x != StatType.EFFECT).length) {
      this.setItem(null);
    }
  }
  
  public getBaseDice(rollableHandler: RollableHandler | null, owner: IHasStats): DiceType[] {
    const result: DiceType[] = [];
    if(!this.getItem()) return result;
    if(!rollableHandler) return result;
    if (this.getItem().hasSkill && this.getItem().skill) {
      result.push(rollableHandler.numberToDieType(this.getItem().skill));
    }
    result.push(rollableHandler.numberToDieType(owner.level));
    let diceType: DiceType = DiceType.NONE;
    
    this.getItem().stats.forEach((statType, index) => {
      if (statType == StatType.DURABILITY) return;
      if (statType == StatType.EFFECT){
        diceType = rollableHandler.advanceDiceType(diceType);
        return;
      }
      if (!this.getItem().filledSlots) {
        diceType = rollableHandler.advanceDiceType(diceType);
        return;
      }
      if(this.getItem().filledSlots.indexOf(index) != -1) return;
      diceType = rollableHandler.advanceDiceType(diceType);
    });
    result.push(diceType);
    return result;
  }
}
