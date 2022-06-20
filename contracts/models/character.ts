import { IModel } from "../model";
import { IOwnedItem } from "./user";
import { IItem, itemList } from "../../collections/items";
import { damageTypes, IDamageType } from "../../collections/damageType";
import { maleFirstNames, femaleFirstNames, lastNames } from "../../collections/names";
import { getRandomInt, getRandomFrom } from "../../shared/random";
import { ITacticalAction } from "../../collections/tacticalAction";
export enum BackgroundType {
  SCAVENGER = 1,
  ZONE = 2,
  SWAMPER = 3,
  WASTELANDER = 4,
  ANDROID = 5,
  SYNTHETIC = 6,
}

export interface ICharacter extends IModel, IOwnedItem {
  name: string;
  background: BackgroundType;
  level: number;
  experience: number;
  strength: number;
  dexterity: number;
  will: number;
  endurance: number;
  maxEndurance: number;
  weaknesses: IDamageType[];
  skills: ITacticalAction[];
  gambits: ITacticalAction[];
  mainHand: IItem | undefined;
  offHand: IItem | undefined;
  upperBody: IItem | undefined;
  lowerBody: IItem | undefined;
  belt: IItem | undefined;
  legs: IItem | undefined;
  pack1: IItem | undefined;
  pack2: IItem | undefined;
  pack3: IItem | undefined;
  pack4: IItem | undefined;
  pack5: IItem | undefined;
  pack6: IItem | undefined;
}
export class CharacterFactory {
  public static random(): ICharacter {
    const strength = this.getRandomStat();
    const dexterity = this.getRandomStat();
    const will = this.getRandomStat();
    const endurance = strength + dexterity + will + 10;
    const character = {
      id: "",
      name: getRandomName(),
      background: BackgroundType.ANDROID,
      level: 1,
      experience: 0,
      strength: strength,
      dexterity: dexterity,
      will: will,
      endurance: endurance,
      maxEndurance: endurance,
      weaknesses: getRandomWeaknesses(),
      skills: [],
      gambits: [],
      mainHand: itemList.find((item) => item.name == "CROWBAR"),
      offHand: undefined,
      upperBody: undefined,
      lowerBody: undefined,
      belt: undefined,
      legs: undefined,
      pack1: undefined,
      pack2: undefined,
      pack3: undefined,
      pack4: undefined,
      pack5: undefined,
      pack6: undefined,
    };
    return character;
  }
  public static getRandomStat(): number {
    const raw: number[] = [getRandomInt(1, 6), getRandomInt(1, 6), getRandomInt(1, 6)].sort();
    raw.splice(0, 1);
    const result = raw.reduce((sum, a) => sum + a, 0);
    return result;
  }
}
function getRandomWeaknesses(): IDamageType[] {
  const raw: number[] = [
    getRandomInt(1, 12),
    getRandomInt(1, 12),
    getRandomInt(1, 12),
    getRandomInt(1, 12),
    getRandomInt(1, 12),
    getRandomInt(1, 12),
  ].filter((x, index, list) => list.indexOf(x) === index);
  return damageTypes.filter((damageType, index) => raw.find((x) => x == index));
}
function getRandomName(): string {
  let firstNames = maleFirstNames;
  if (getRandomInt(1, 10) > 5) {
    firstNames = femaleFirstNames;
  }
  return `${getRandomFrom(firstNames)} ${getRandomFrom(lastNames)}`;
}
