import { bodies, BodySize, IBodyTemplate } from './../../collections/body';
import { IAsset } from './asset';
import { IHasStats } from './../stats';
import { RollableHandler } from './../../shared/random';
import { Character } from './../../frontend/src/components/pages/character/character';
import { OwnedItem } from './../../collections/items';
import { IIcon } from './../base';
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

export interface ICharacter extends IModel, IHasStats, IOwnedItem, IBodyTemplate {
  name: string;
  maxEndurance: number;
  background: BackgroundType;
  weaknesses: IDamageType[];
  skills: ITacticalAction[];
  gambits: ITacticalAction[];
  assetIds: string[];
}
export class CharacterFactory {
  public static random(): ICharacter {
    const strength = this.getRandomStat();
    const dexterity = this.getRandomStat();
    const will = this.getRandomStat();
    const endurance = strength + dexterity + will + 10;
    let character: ICharacter = {
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
      assetIds: [],
      bodyName: '',
      size: BodySize.TINY,
      itemSlots: []
    };
    character = Object.assign(character, bodies.find(x => x.bodyName == "Human"));
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
