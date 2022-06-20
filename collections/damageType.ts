import { IBase } from "../contracts/base";

export interface IDamageType extends IBase {
  name: string;
  description: string;
}
export const damageTypes: IDamageType[] = [
  {
    id: "Smash",
    name: "Smash",
    description: "Blunt force trauma",
  },
  {
    id: "Cut",
    name: "Cut",
    description: "Sharp edge lacerations",
  },
  {
    id: "Stab",
    name: "Stab",
    description: "Pierce and puncture wounds",
  },
  {
    id: "Pain",
    name: "Pain",
    description: "Skin ripping, bites and gores",
  },
  {
    id: "Gun",
    name: "Gun",
    description: "Bullet shock damage",
  },
  {
    id: "Burst",
    name: "Burst",
    description: "Multiple rapid bullet shocks",
  },
  {
    id: "Blast",
    name: "Blast",
    description: "Wide area or explosive",
  },
  {
    id: "Ooze",
    name: "Ooze",
    description: "Putrid, infectious or fungal",
  },
  {
    id: "Nuke",
    name: "Nuke",
    description: "Radiation or decay damage",
  },
  {
    id: "Light",
    name: "Light",
    description: "Purifying, or heat damage",
  },
  {
    id: "Neural",
    name: "Neural",
    description: "Emotional, or brain damage",
  },
  {
    id: "Volt",
    name: "Volt",
    description: "Shock, or circuit damage",
  },
];
