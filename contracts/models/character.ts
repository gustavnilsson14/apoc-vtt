import { GameEntityType, IGameEntity } from "./entity";
import {
  IBackground,
  allBackgroundsList,
} from "./../../collections/backgrounds";
import { bodies, BodySize, IBodyTemplate } from "./../../collections/body";
import { IHasStats, INamedObject, WoundState } from "./../stats";
import { IModel } from "../model";
import { IOwnedItem } from "./user";
import {
  DamageType,
} from "../../collections/damageType";
import {
  maleFirstNames,
  femaleFirstNames,
  lastNames,
} from "../../collections/names";
import { getRandomInt, getRandomFrom } from "../../shared/random";
import { ITacticalAction } from "../../collections/tacticalAction";
import { ItemType } from "../../collections/items";

export interface ICharacter
  extends IModel,
    INamedObject,
    IHasStats,
    IGameEntity,
    IBodyTemplate,
    IOwnedItem {
  name: string;
  maxEndurance: number;
  background: IBackground;
  skills: ITacticalAction[];
  gambits: ITacticalAction[];
  assetIds: string[];
}
export class CharacterFactory {
  public static random(): ICharacter {
    const strength = this.getRandomStat();
    const dexterity = this.getRandomStat();
    const will = this.getRandomStat();
    let character: ICharacter = {
      id: "",
      name: getRandomName(),
      background: getRandomFrom(allBackgroundsList),
      level: 1,
      experience: 0,
      strength: strength,
      dexterity: dexterity,
      will: will,
      endurance: 0,
      maxEndurance: 0,
      weaknesses: getRandomWeaknesses(),
      skills: [],
      gambits: [],
      assetIds: [],
      bodyName: "",
      size: BodySize.MEDIUM,
      itemSlots: [],
      gameEntityType: GameEntityType.CHARACTER,
      health: WoundState.HEALTHY
    };
    character.maxEndurance = this.calculateMaxEndurance(character);
    character.endurance = character.maxEndurance;
    character = Object.assign(
      character,
      bodies.find((x) => x.bodyName == "Human")
    );
    return character;
  }
  public static getRandomStat(): number {
    const raw: number[] = [
      getRandomInt(1, 6),
      getRandomInt(1, 6),
      getRandomInt(1, 6),
    ].sort();
    raw.splice(0, 1);
    const result = raw.reduce((sum, a) => sum + a, 0);
    return result;
  }
  public static calculateMaxEndurance(character: ICharacter): number {
    let injuries = 0;
    character.itemSlots.forEach((slot)=>{
      if (slot.item?.type == ItemType.INJURY) injuries++;
    });
    return (
      (parseInt(character.strength.toString()) +
      parseInt(character.dexterity.toString()) +
      parseInt(character.will.toString()) +
      (character.level * 10) +
      20) - injuries * 8
    );
  }
}
export function getRandomWeaknesses(): DamageType[] {
  const raw: number[] = [
    getRandomInt(1, 12),
    getRandomInt(1, 12),
    getRandomInt(1, 12),
    getRandomInt(1, 12),
    getRandomInt(1, 12),
    getRandomInt(1, 12),
  ].filter((x, index, list) => list.indexOf(x) === index);
  return Object.values(DamageType).filter((damageType, index) =>
    raw.find((x) => x == index)
  );
}
export function getRandomName(): string {
  let firstNames = maleFirstNames;
  if (getRandomInt(1, 10) > 5) {
    firstNames = femaleFirstNames;
  }
  return `${getRandomFrom(firstNames)} ${getRandomFrom(lastNames)}`;
}
