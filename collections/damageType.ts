export enum DamageType{
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
export interface IDamageType {
  damageType: DamageType,
  name: string;
  description: string;
}
export const damageTypes: IDamageType[] = [
  {
    damageType: DamageType.SMASH,
    name: "Smash",
    description: "Blunt force trauma",
  },
  {
    damageType: DamageType.CUT,
    name: "Cut",
    description: "Sharp edge lacerations",
  },
  {
    damageType: DamageType.STAB,
    name: "Stab",
    description: "Pierce and puncture wounds",
  },
  {
    damageType: DamageType.PAIN,
    name: "Pain",
    description: "Skin ripping, bites and gores",
  },
  {
    damageType: DamageType.GUN,
    name: "Gun",
    description: "Bullet shock damage",
  },
  {
    damageType: DamageType.BURST,
    name: "Burst",
    description: "Multiple rapid bullet shocks",
  },
  {
    damageType: DamageType.BLAST,
    name: "Blast",
    description: "Wide area or explosive",
  },
  {
    damageType: DamageType.OOZE,
    name: "Ooze",
    description: "Putrid, infectious or fungal",
  },
  {
    damageType: DamageType.NUKE,
    name: "Nuke",
    description: "Radiation or decay damage",
  },
  {
    damageType: DamageType.LIGHT,
    name: "Light",
    description: "Purifying, or heat damage",
  },
  {
    damageType: DamageType.NEURAL,
    name: "Neural",
    description: "Emotional, or brain damage",
  },
  {
    damageType: DamageType.VOLT,
    name: "Volt",
    description: "Shock, or circuit damage",
  },
];
