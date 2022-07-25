import { IBase } from "../contracts/base";
import { DiceType } from "../contracts/models/dice";

export interface ITacticalAction extends IBase {
  name: string;
  description: string;
  resultRoll?: DiceType[]
}

export const skillActions: ITacticalAction[] = [
  {
    id: "Hunker down",
    name: "Hunker down",
    description:
      "The combatant hunkers down, and cannot move during the round. During the round, the combatant takes no splash damage, and ranged attacks against them has no damage die.",
  },
  {
    id: "Knockback",
    name: "Knockback",
    description: "The combatant pushes one melee target backwards one tile",
  },
  {
    id: "Rage",
    name: "Rage",
    description: "This round, the combatants melee attacks deal 1d4 extra damage",
  },
  {
    id: "Pierce",
    name: "Pierce",
    description: "For each attack this round, if any or more attack dice are blocked by armor, choose one die to ignore armor",
  },
  {
    id: "Dash",
    name: "Dash",
    description: "Move a single tile",
  },
  {
    id: "Dual wield",
    name: "Dual wield",
    description: "The combatant may add the off-hand weapons damage dice to attacks. Will not work with larger weapons.",
  },
  {
    id: "Inspire",
    name: "Inspire",
    description: "The combatant inpires a companion, who may use their unique TA",
  },
  {
    id: "Careful usage",
    name: "Careful usage",
    description: "Reduces chance of armor and weapon breakage",
  },
  {
    id: "Relentless",
    name: "Relentless",
    description: "This round, an attack of the combatants choice gets advantage. Can be used after rolling.",
  },
  {
    id: "Hide",
    name: "Hide",
    description:
      "The combatant becomes untargetable until in melee with an enemy, moving, taking tactical, or regular action, except for the boost, and catch breath TA's. An enemy may spend their TA to scout for the character, and will reveal them on a successful WIL, cancelling the effect of hide.",
  },
  {
    id: "Action man",
    name: "Action man",
    description: "The combatant takes two tactical actions this round. Usable once each combat.",
  },
  {
    id: "Heavy smash",
    name: "Heavy smash",
    description: "When action is melee attack, the combatant will save all their attacks during the round for the final turn.",
  },
];
export const gambitActions: ITacticalAction[] = [
  {
    id: "Grapple",
    name: "Grapple",
    description: "This round, the combatant forces a melee target to use the stand ground movement on a failed STR",
  },

  {
    id: "Steal",
    name: "Steal",
    description: "The combatant may steal a belt, or pack item from a melee target on a failed DEX",
  },
  {
    id: "Goad",
    name: "Goad",
    description:
      "The combatant goads an opponent. On a failed WIL, this round when the target does not attack the combatant, all their die results are reduced by 1",
  },
  {
    id: "Break",
    name: "Break",
    description:
      "The combatant may target an enemy allowed by their current weaponry. On a successful STR, the target must choose an equipped armor or weapon which loses 1 durability",
  },
  {
    id: "Feign death",
    name: "Feign death",
    description: "On a successful DEX the combatant appears dead, and will appear so until moving, taking tactical, or regular action",
  },
  {
    id: "Intimidate",
    name: "Intimidate",
    description:
      "The combatant intimidates any target. This round, each turn on a failed WIL, the target cannot move towards the combatant. If they fail all the WIL checks during the round, their next TA will automatically be to try and escape.",
  },
  {
    id: "Disarm",
    name: "Disarm",
    description: "The combatant targets a melee opponent. On a failed STR, the combatant chooses an item held by the target that they drop.",
  },
  {
    id: "Suppression",
    name: "Suppression",
    description:
      "If the combatant is using the ranged attack action. This round, each turn, the ranged attack target loses their movement on a failed DEX",
  },
  {
    id: "Threaten",
    name: "Threaten",
    description: "The combatant chooses any target to threaten. The targets armor is reduced by 1 on a failed WIL",
  },
  {
    id: "Protect",
    name: "Protect",
    description: "On successful DEX, the combatant stands in the way of an ally on the same tile, taking all damage directed at the ally.",
  },
];
