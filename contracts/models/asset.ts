import { IBodyTemplate } from './../../collections/body';
import { IHasStats } from './../stats';
import { IModel } from './../model';
import { IItemSlot } from '../input';
import { IGameEntity } from './entity';
export enum AssetType{
    VEHICLE = "VEHICLE",
    ESTATE = "ESTATE",
    HENCHMAN = "HENCHMAN",
}
export interface IAsset extends IModel{
    name: string;
    type: AssetType;
}
export interface IVehicle extends IAsset, IGameEntity {
    itemSlots: IItemSlot[],
    hardpoints?: IItemSlot[],
    integrity: number;
    maxFuel: number;
    fuel?: number;
    seats: number;
}
export interface IEstate extends IAsset {

}
export interface IHenchman extends IAsset, IHasStats, IGameEntity, IBodyTemplate {}