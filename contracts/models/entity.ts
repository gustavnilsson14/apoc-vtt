import { IModel } from "./../model";
export enum GameEntityType {
  CHARACTER = "CHARACTER",
  ENEMY = "ENEMY",
  VEHICLE = "VEHICLE",
}
export interface IGameEntity extends IModel {
  gameEntityType: GameEntityType;
  enduranceDescription?: string;
}
