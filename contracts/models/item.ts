import { IItem, ItemType, mentalItemTypes, physicalItemTypes, StatType } from "../../collections/items";
import { IModel } from "./../model";
export enum ItemSettingAvailability {
    NONE = "NONE",
    ALLOWED = "ALLOWED",
    BANNED = "BANNED",
}
export interface IItemSetting extends IModel {
    item?: IItem;
    itemType?: ItemType;
    availability: ItemSettingAvailability;
}
export function matchItemType(item: IItem, itemType: ItemType): boolean{
    if (item.type == itemType) return true;
    if (itemType == ItemType.PHYSICAL && physicalItemTypes.includes(item.type)) return true;
    if (itemType == ItemType.MENTAL && mentalItemTypes.includes(item.type)) return true;
    if (itemType == ItemType.ANY) return true;
    return false;
}

export function getItemValue(item: IItem):number {
  let baseValue = 0;
  item.stats.forEach(stat => {
    baseValue += getItemStatValue(stat);
  });
  return getValueOnItemType(item, baseValue);
}
export function getValueOnItemType(item: IItem, baseValue: number): number {
  const val = item.damageTypes ? item.damageTypes.length : 0;
  if(item.type == ItemType.STUFF) return 2;
  if(item.type == ItemType.TOOL) return 4;
  if(item.type == ItemType.EXPLOSIVE) return Math.floor(baseValue / 2) + (val * 2);
  if(item.type == ItemType.CONSUMABLE) return Math.floor(baseValue / 2);
  if(item.type == ItemType.MELEE) return baseValue + val;
  if(item.type == ItemType.RANGED) return baseValue + val + 2;
  if(item.type == ItemType.MAGIC) return 10 + (val * 3);
  if(item.type == ItemType.ARMOR) return baseValue + (val * 2);
  if(item.type == ItemType.HEADGEAR) return baseValue + (val * 2);
  if(item.type == ItemType.SHIELD) return baseValue + (val * 1);
  if(item.type == ItemType.GOODS) return 5 + (baseValue * 2);
  if(item.type == ItemType.CYBERNETICS) return 10 + (baseValue * 3) + (val * 2);
  if(item.type == ItemType.ARTIFACT) return 20 + (baseValue * 5);
  if(item.type == ItemType.RELIC) return 10 + (val * 5) + (baseValue * 3);
  return baseValue + val;
}
export function getItemStatValue(stat: StatType): number {
  if(stat == StatType.DURABILITY) return 1;
  if(stat == StatType.EFFECT) return 3;
  if(stat == StatType.QUALITY) return 4;
  return 0;
}