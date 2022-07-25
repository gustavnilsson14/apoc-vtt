import { IBase } from './../base';
import { IRollableResult } from './../../shared/random';
import { IOwnedItem } from "./user";

export enum DiceType {
  NONE = "NONE",
  D4 = "D4",
  D6 = "D6",
  D8 = "D8",
  D10 = "D10",
  D12 = "D12",
  D12_1 = "D12_1",
  D12_2 = "D12_2",
  D12_3 = "D12_3",
  D12_4 = "D12_4",
  D12_5 = "D12_5",
  D12_6 = "D12_6",
  D20 = "D20",
}
export interface IRollableResultData extends IRollableResult, IOwnedItem, IBase {}
