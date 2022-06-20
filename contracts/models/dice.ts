import { IModel } from "../model";
import { IOwnedItem } from "./user";

export enum DiceType {
  D4 = "D4",
  D6 = "D6",
  D8 = "D8",
  D10 = "D10",
  D12 = "D12",
  D20 = "D20",
}
export interface IDiceResult extends IModel, IOwnedItem {
  diceRolled: DiceType[];
  results: number[];
  totalResult: number;
}
