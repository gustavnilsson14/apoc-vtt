
import { DiceType } from "./../contracts/models/dice";
export function getRandomNumber(min: number, max: number) {
  return Math.floor(Math.random() * Math.floor(max - min)) + min;
}
export function getRandomInt(min: number, max: number) {
  return Math.floor(Math.random() * Math.floor(max + 1 - min)) + min;
}
export function getRandomIndex(list: any[]) {
  return getRandomNumber(0, list.length);
}
export function getRandomFrom(list: any[]) {
  var newList = [...list]
    .map((value) => {
      if (value instanceof WeightedValue)
        return Array(value.weight).fill(value.value);
      return value;
    })
    .flat();
  return newList[getRandomIndex(newList)];
}
class WeightedValue {
  constructor(public weight: number, public value: any) {}
}
export interface IRollable {
  name: string;
  difficulty?: number;
  getBaseDice?(rollableHandler: RollableHandler | null): DiceType[];
}
export interface IRollableResult {
  rollable: IRollable;
  dieResults: IDieResult[];
  totalResult: number;
  advantage?: boolean;
  critical?: boolean;
}
export interface IDieResult {
  diceType: DiceType;
  result: number;
}
export class RollableHandler {
  roll(diceType: DiceType): number {
    switch (diceType) {
      case DiceType.D4:
        return getRandomInt(1, 4);
      case DiceType.D6:
        return getRandomInt(1, 6);
      case DiceType.D8:
        return getRandomInt(1, 8);
      case DiceType.D10:
        return getRandomInt(1, 10);
      case DiceType.D12:
        return getRandomInt(1, 12);
      case DiceType.D12_1:
        return getRandomInt(2, 13);
      case DiceType.D12_2:
        return getRandomInt(3, 14);
      case DiceType.D12_3:
        return getRandomInt(4, 15);
      case DiceType.D20:
        return getRandomInt(1, 20);
      default:
        return 0;
    }
  }
  rollAll(dice: DiceType[]): IDieResult[] {
    let result: IDieResult[] = [];
    dice.forEach((diceType) => {
      result.push({
        result: this.roll(diceType),
        diceType: diceType,
      });
    });
    return result;
  }
  rollDefault(rollable: IRollable): IRollableResult | null {
    if (!rollable) return null;
    if(rollable.getBaseDice == null) return null;
    const dice: DiceType[] = rollable.getBaseDice(this);
    const dieResults = this.rollAll(dice);
    return {
      rollable: rollable,
      dieResults: dieResults,
      totalResult: this.getTotalResult(dieResults)
    };
  }
  rollCheck(rollable: IRollable): any {
    if (!rollable) return null;
    const dieResults = this.rollAll([DiceType.D20]);
    return {
      rollable: rollable,
      dieResults: dieResults,
      totalResult: this.getTotalResult(dieResults)
    };
  }
  rollCheckWithAdvantage(rollable: IRollable): any {
    if (!rollable) return null;
    const dieResults = this.rollAll([DiceType.D20, DiceType.D20]);
    return {
      rollable: rollable,
      dieResults: dieResults,
      totalResult: Math.min(...dieResults.map(x => x.result))
    };
  }
  rollCheckWithDisdvantage(rollable: IRollable): any {
    if (!rollable) return null;
    const dieResults = this.rollAll([DiceType.D20, DiceType.D20]);
    return {
      rollable: rollable,
      dieResults: dieResults,
      totalResult: Math.max(...dieResults.map(x => x.result))
    };
  }
  rollWithCritical(rollable: IRollable): IRollableResult | null {
    if(rollable.getBaseDice == null) return null;
    let dice: DiceType[] = rollable.getBaseDice(this);
    
    const values = Object.values(DiceType);
    dice.sort((x,y)=>{
      return values.indexOf(x) < values.indexOf(y) ? 1 : -1;
    });
    dice.push(dice[0]);
    dice.sort((x,y)=>{
      return values.indexOf(x) > values.indexOf(y) ? 1 : -1;
    });
    const dieResults = this.rollAll(dice);
    return {
      rollable: rollable,
      dieResults: dieResults,
      totalResult: this.getTotalResult(dieResults),
      critical: true,
    };
  }
  rollWithAdvantage(rollable: IRollable): IRollableResult | null {
    if(rollable.getBaseDice == null) return null;
    const dieResults: IDieResult[] = [];
    const dice: DiceType[] = rollable.getBaseDice(this);
    
    dice.forEach((die) => {
      const dieResult = this.rollAll([die, die]);
      const max = Math.max(...dieResult.map((x) => x.result));
      dieResults.push({
        result: max,
        diceType: die,
      });
    });
    return {
      rollable: rollable,
      dieResults: dieResults,
      totalResult: this.getTotalResult(dieResults),
      advantage: true
    };
  }
  getDiceFromList(rollables: IRollable[]): DiceType[]{
    let result: DiceType[] = [];
    rollables.forEach(rollable=>{
      if(!rollable.getBaseDice) return;
      result = [...result, ...rollable.getBaseDice(this)];
    });
    return result;
  }
  getTotalResult(results: IDieResult[]): number {
    return results.reduce((x, y) => x + y.result, 0);
  }
  advanceDiceType(diceType: DiceType): DiceType {
    switch (diceType) {
      case DiceType.D4:
        return DiceType.D6;
      case DiceType.D6:
        return DiceType.D8;
      case DiceType.D8:
        return DiceType.D10;
      case DiceType.D10:
        return DiceType.D12;
      case DiceType.D12:
        return DiceType.D12_1;
      case DiceType.D12_1:
        return DiceType.D12_2;
      case DiceType.D12_2:
        return DiceType.D12_3;
      case DiceType.D12_3:
        return DiceType.D20;
      default:
        return DiceType.D4;
    }
  }
  numberToDieType(n: number): DiceType{
    return Object.values(DiceType)[n] as DiceType;
  }
}
