import { DamageType } from './../collections/damageType';

export interface INamedObject{
    name: string;
    description?: string;
    image?: string;
}
export enum WoundState{
    HEALTHY = "HEALTHY",
    WOUNDED = "WOUNDED",
    UNCONSCIOUS = "UNCONSCIOUS",
    DEAD = "DEAD",
}
export interface IHasStats{
    level: number;
    experience?: number;
    strength: number;
    dexterity: number;
    will: number;
    endurance: number;
    maxEndurance: number;
    av?: number;
    weaknesses: DamageType[];
    health?: WoundState;
}

export function getEnduranceDescription(character: IHasStats):string{
    const percentageLeft: number = (character.endurance / character.maxEndurance);
    if(percentageLeft == 1) return "Vigorous";
    if(percentageLeft > 0.8) return "Fresh";
    if(percentageLeft > 0.6) return "Determined";
    if(percentageLeft > 0.4) return "Tired";
    if(percentageLeft > 0.2) return "Wavering";
    if(percentageLeft > 0) return "Holding on";
    return "Fallen";
  }