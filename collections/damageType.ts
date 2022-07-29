import { IBase } from "./../contracts/base";
export enum DamageType {
  SMASH = "SMASH",
  CUT = "CUT",
  STAB = "STAB",
  PAIN = "PAIN",
  GUN = "GUN",
  BURST = "BURST",
  BLAST = "BLAST",
  OOZE = "OOZE",
  NUKE = "NUKE",
  LIGHT = "LIGHT",
  NEURAL = "NEURAL",
  VOLT = "VOLT",
}
export interface IDamageType extends IBase {
  damageType: DamageType;
  name: string;
  description: string;
}
export const damageTypes: IDamageType[] = [
  {
    id: "SMASH",
    damageType: DamageType.SMASH,
    name: "Smash",
    description: "Blunt force trauma",
  },
  {
    id: "CUT",
    damageType: DamageType.CUT,
    name: "Cut",
    description: "Sharp edge lacerations",
  },
  {
    id: "STAB",
    damageType: DamageType.STAB,
    name: "Stab",
    description: "Pierce and puncture wounds",
  },
  {
    id: "PAIN",
    damageType: DamageType.PAIN,
    name: "Pain",
    description: "Skin ripping, bites and gores",
  },
  {
    id: "GUN",
    damageType: DamageType.GUN,
    name: "Gun",
    description: "Bullet shock damage",
  },
  {
    id: "BURST",
    damageType: DamageType.BURST,
    name: "Burst",
    description: "Multiple rapid bullet shocks",
  },
  {
    id: "BLAST",
    damageType: DamageType.BLAST,
    name: "Blast",
    description: "Wide area or explosive",
  },
  {
    id: "OOZE",
    damageType: DamageType.OOZE,
    name: "Ooze",
    description: "Putrid, infectious or fungal",
  },
  {
    id: "NUKE",
    damageType: DamageType.NUKE,
    name: "Nuke",
    description: "Radiation or decay damage",
  },
  {
    id: "LIGHT",
    damageType: DamageType.LIGHT,
    name: "Light",
    description: "Purifying, or heat damage",
  },
  {
    id: "NEURAL",
    damageType: DamageType.NEURAL,
    name: "Neural",
    description: "Emotional, or brain damage",
  },
  {
    id: "VOLT",
    damageType: DamageType.VOLT,
    name: "Volt",
    description: "Shock, or circuit damage",
  },
];
