import { IModel } from "./../model";
export enum GameEntityType {
  CHARACTER = "CHARACTER",
  ENEMY = "ENEMY",
  VEHICLE = "VEHICLE",
  HENCHMAN = "HENCHMAN"
}
export interface IGameEntity extends IModel {
  name: string;
  gameEntityType: GameEntityType;
  enduranceDescription?: string;
}
