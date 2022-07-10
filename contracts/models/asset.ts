import { IItem } from './../../collections/items';
import { ICharacter } from './character';
import { IModel } from './../model';
import { IItemSlot } from '../input';
export enum AssetType{
    VEHICLE = "VEHICLE",
    ESTATE = "ESTATE",
    HENCHMAN = "HENCHMAN",
}
export interface IAsset extends IModel{
    name: string;
    type: AssetType;
}
export interface IVehicle extends IAsset {
    itemSlots: IItemSlot[],
    integrity: number;
    maxFuel: number;
    fuel?: number;
}
export interface IEstate extends IAsset {

}
export interface IHenchman extends IAsset, ICharacter {}