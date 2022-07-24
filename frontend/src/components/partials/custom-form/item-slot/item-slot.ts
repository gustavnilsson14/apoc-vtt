import { Item } from "./item/item";
import { IHasStats } from "./../../../../../../contracts/stats";
import {
  IItemSlot,
  IItemSlotsInputSettings,
} from "./../../../../../../contracts/input";
import {
  IItem,
  ItemType,
  StatType,
  unMoveableItems,
} from "./../../../../../../collections/items";
import { RollableHandler } from "./../../../../../../shared/random";
import { bindable, EventAggregator, inject } from "aurelia";
import {
  ISelectable,
  SelectionHandler,
} from "../../../../infrastructure/selection";
import { ItemSlotsSetter } from "./itemSlotsSetter";
import { DiceType } from "../../../../../../contracts/models/dice";
import { Client } from "../../../../infrastructure/client";

@inject(EventAggregator, SelectionHandler, Element, Client)
export class ItemSlot extends ItemSlotsSetter implements ISelectable {
  @bindable public settings: IItemSlotsInputSettings;
  @bindable isSelected: boolean;
  public selectionGroup: string = "ItemSlot";
  @bindable public value: IItemSlot[];
  @bindable index: number;
  @bindable broken: boolean = false;

  @bindable onClickCallback;
  @bindable onContextCallback;
  name: string;
  constructor(
    private eventAggregator: EventAggregator,
    private selectionHandler: SelectionHandler,
    public element: Element,
    public client: Client
  ) {
    super(client);
  }

  binding() {
    this.isSelected = this.selectionHandler.isSelected(this);
    this.subscribeLocal(
      this.eventAggregator.subscribe("SELECTION_CHANGED", () => {
        this.isSelected = this.selectionHandler.isSelected(this);
      })
    );
    if (!this.getItem()) return;
    this.name = this.getItem().name;
  }
  valueChanged() {
    this.handleBreakage();
  }
  public onClick(): void {
    if (this.selectionHandler.getSelected()?.selectionGroup == "ItemSlot")
      this.handleMoveItem();
    if (this.selectionHandler.getSelected()?.selectionGroup == "AllItems")
      this.handleNewItem();
    if (this.getItem()) this.selectionHandler.select(this);
  }
  public onContext(e): void {
    if (this.value[this.index].rollable != true) return;
    if (this.getItem() == null) return;
    e.preventDefault();
    if (this.onContextCallback)
      this.onContextCallback({ settings: this.settings, value: this });

    //this.handleRollable();
  }
  handleRollable() {
    if (this.value[this.index].rollable != true)
      this.onContextCallback({ rollable: this });
  }
  equals(otherSlot: ItemSlot): boolean {
    if (!otherSlot) return false;
    if (otherSlot.index != this.index) return false;
    if (
      otherSlot.value[otherSlot.index].name != this.value[otherSlot.index].name
    )
      return true;
  }
  handleMoveItem() {
    const selectedItemSlot: ItemSlot =
      this.selectionHandler.getSelected() as ItemSlot;
    if (this.selectionHandler.equals(selectedItemSlot, this)) return;
    if (selectedItemSlot.getItem() == undefined) return;

    const myItem: IItem = this.getItem();
    const otherItem: IItem = selectedItemSlot.getItem();

    if (!this.validateItemType(otherItem)) return;
    if (!selectedItemSlot.validateItemType(myItem)) return;

    if (unMoveableItems.indexOf(myItem?.type) != -1) return;
    if (unMoveableItems.indexOf(otherItem?.type) != -1) return;

    selectedItemSlot.setItem(myItem);
    this.setItem(otherItem);
  }
  handleNewItem() {
    const item: IItem = (this.selectionHandler.getSelected() as Item).getItem();
    if (!this.validateItemType(item)) return;
    this.setItem({ ...item } as IItem);
  }
  public validateItemType(item: IItem): boolean {
    if (item == null) return true;
    return (
      this.value[this.index].allowedTypes.find(
        (x) => x == item.type || x == ItemType.ANY
      ) != null
    );
  }
  handleBreakage() {
    if (!this.getItem()) return;
    if (
      this.getItem().filledSlots >=
      this.getItem().stats.filter((x) => x != StatType.EFFECT).length
    ) {
      this.setItem(null);
    }
  }

  public getBaseDice(
    rollableHandler: RollableHandler | null,
    owner: IHasStats
  ): DiceType[] {
    if (!rollableHandler) return [];
    const item = this.getItem();
    if (!item) return [];
    if (item.type == ItemType.MAGIC)
      return this.getMagicBaseDice(item, owner, rollableHandler);
    return this.getRegularBaseDice(item, owner, rollableHandler);
  }
  getRegularBaseDice(
    item: IItem,
    owner: IHasStats,
    rollableHandler: RollableHandler
  ): DiceType[] {
    const result: DiceType[] = [];
    if (item.hasSkill && item.skill) {
      result.push(rollableHandler.numberToDieType(item.skill));
    }
    result.push(rollableHandler.numberToDieType(owner.level));
    let diceType: DiceType = DiceType.NONE;

    this.getItem().stats.forEach((statType, index) => {
      if (statType == StatType.DURABILITY) return;
      if (statType == StatType.EFFECT) {
        diceType = rollableHandler.advanceDiceType(diceType);
        return;
      }
      const statPosition = this.getItem().stats.length - index - 1;
      if (this.getItem().filledSlots > statPosition) return;
      diceType = rollableHandler.advanceDiceType(diceType);
    });
    result.push(diceType);
    return result;
  }
  getMagicBaseDice(
    item: IItem,
    owner: IHasStats,
    rollableHandler: RollableHandler
  ): DiceType[] {
    item.filledSlots++;
    this.setItem({ ...item } as IItem);
    return [DiceType.D8, DiceType.D8];
  }
}
