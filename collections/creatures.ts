import { ICombatant } from "./../contracts/models/battle";
import { IItem } from "./items";
import { DamageType, IDamageType } from "./damageType";

export interface IAttack {
  name: string;
  damage: string;
  damageTypes: DamageType[];
}
export interface ICreatureAction {
  name: string;
  effect: string;
}
export interface ICreature extends ICombatant {
  description: string;
  attacks: IAttack[];
  actions: ICreatureAction[];
}
export const creaturesList: ICreature[] = [
  {
    id: "straker",
    name: "straker",
    description:
      "A creature close to the neural magic. Strakers are sadistic, silent, and prays on wanderers of the metro.",
    level: 2,
    strength: 5,
    dexterity: 9,
    will: 14,
    endurance: 90,
    av: 0,

    weaknesses: [
      DamageType.LIGHT,
      DamageType.CUT,
      DamageType.PAIN,
      DamageType.NUKE,
    ],
    attacks: [
      {
        name: "smack",
        damage: "2-2-2",
        damageTypes: [DamageType.SMASH],
      },
      {
        name: "surge",
        damage: "3-3-2",
        damageTypes: [DamageType.NEURAL, DamageType.PAIN],
      },
    ],
    actions: [
      {
        name: "psychic vortex",
        effect:
          "Creates a phychic vortex on a tile. Passing through, or ending a turn inside the vortex deals 2d4 neural damage. When damaged, on failed WIL, immediately stops, and cannot exit the vortex until spending a TA to exit. Recharges on a 4",
      },
      {
        name: "drain power",
        effect:
          "Target an enemy in melee, if they fail WIL, they lose all their spell charges. Restores 1d4 endurance per spell charge drained.",
      },
      {
        name: "Teleportation",
        effect: "Move to any tile. On a failed WIL, cannot teleport again.",
      },
      {
        name: "screech",
        effect:
          "All enemies. On failed WIL, they may not charge, and the straker may remove a dice from any attack they make.",
      },
    ],
  },
  {
    id: "moledog",
    name: "moledog",
    description:
      "A blind, subterranean dog which has strong claws for digging, a great sense of smell, and whiskers to navigate.",
    level: 1,
    strength: 8,
    dexterity: 8,
    will: 4,
    endurance: 40,
    av: 0,
    weaknesses: [
      DamageType.LIGHT,
      DamageType.SMASH,
      DamageType.STAB,
      DamageType.NUKE,
    ],
    attacks: [
      {
        name: "bite",
        damage: "2-1-1",
        damageTypes: [DamageType.PAIN, DamageType.STAB],
      },
      {
        name: "swipe",
        damage: "3-1-1",
        damageTypes: [DamageType.CUT],
      },
    ],
    actions: [
      {
        name: "blindsight",
        effect:
          "The moledog uses its heightened secondary senses to anticipate, and evade danger. It cannot attack, but ranged attacks deal one less dice of the dogs choosing",
      },
      {
        name: "burrow",
        effect:
          "If on soft soil, the moledog burrows into the ground, and escpaes from combat",
      },
      {
        name: "on the hunt",
        effect:
          "Mole dogs move twice as fast when charging if an enemy is retreating",
      },
    ],
  },
  {
    id: "Demon spider",
    name: "Demon spider",
    description:
      "An elusive menace, able to phase in and out of existance at will.",
    level: 1,
    strength: 4,
    dexterity: 14,
    will: 9,
    endurance: 42,
    av: 1,
    weaknesses: [
      DamageType.SMASH,
      DamageType.BLAST,
      DamageType.PAIN,
      DamageType.LIGHT,
    ],
    attacks: [
      {
        name: "Bite",
        damage: "2-2-1",
        damageTypes: [DamageType.PAIN, DamageType.NUKE],
      },
      {
        name: "Stinger",
        damage: "1-1-1",
        damageTypes: [DamageType.NUKE],
      },
    ],
    actions: [
      {
        name: "Spit",
        effect: "Allows melee attack to be ranged if stationary.",
      },
      {
        name: "Rappel",
        effect:
          "Allows moving anywhere on the battleground at the end of round, at the expense of no actions or movement",
      },
      {
        name: "Phase shift",
        effect:
          "When hit by Nuke, Ooze, Volt, Burst, or Gun, the spider phases out of existence, and is unharmed",
      },
      {
        name: "Poison gland",
        effect:
          "If the stinger deals damage, on failed STR victim becomes poisoned",
      },
    ],
  },
  {
    id: "Ooze Zombie",
    name: "Ooze Zombie",
    description: "A human being infested by ooze.",
    level: 1,
    strength: 7,
    dexterity: 3,
    will: 99,
    endurance: 30,
    av: 0,
    weaknesses: [
      DamageType.CUT,
      DamageType.PAIN,
      DamageType.SMASH,
      DamageType.BLAST,
      DamageType.LIGHT,
      DamageType.NUKE,
    ],
    attacks: [
      {
        name: "Bite",
        damage: "2-1-1",
        damageTypes: [DamageType.PAIN, DamageType.OOZE],
      },
      {
        name: "Punch",
        damage: "1-1-1",
        damageTypes: [DamageType.SMASH],
      },
    ],
    actions: [
      {
        name: "Ooze infection",
        effect: "Bites which deal damage, on failed STR cause sickness.",
      },
      {
        name: "Rush",
        effect: "Charge movement is doubled, cannot take action",
      },
    ],
  },
  {
    id: "City bear",
    name: "City bear",
    description:
      "A mutated, intelligent bear. Only hunts for human if they must.",
    level: 1,
    strength: 12,
    dexterity: 7,
    will: 5,
    endurance: 60,
    av: 1,
    weaknesses: [
      DamageType.STAB,
      DamageType.GUN,
      DamageType.BURST,
      DamageType.OOZE,
      DamageType.VOLT,
    ],
    attacks: [
      {
        name: "Bite",
        damage: "3-2-1",
        damageTypes: [DamageType.PAIN, DamageType.CUT],
      },
      {
        name: "Swipe",
        damage: "2-2-1",
        damageTypes: [DamageType.PAIN, DamageType.SMASH],
      },
      {
        name: "Bear Arbalest",
        damage: "3-2-1",
        damageTypes: [DamageType.STAB],
      },
    ],
    actions: [
      {
        name: "Roar",
        effect:
          "On a failed WIL enemies lose their movement and action in the first turn.",
      },
      {
        name: "Bear charge",
        effect:
          "All bears on the same tile charge, moving twice the first turn",
      },
      {
        name: "Sharpen claws",
        effect: "Swipe deals 1d6 extra damage, but bear cannot move",
      },
    ],
  },
  {
    id: "Evil Hornet",
    name: "Evil Hornet",
    description:
      "A giant evil flying insect. Evil hornets are still just hornets, but huge.",
    level: 1,
    strength: 4,
    dexterity: 16,
    will: 5,
    endurance: 34,
    av: 0,
    weaknesses: [DamageType.SMASH, DamageType.BLAST, DamageType.LIGHT],
    attacks: [
      {
        name: "Sting",
        damage: "3-1-1",
        damageTypes: [DamageType.PAIN, DamageType.NUKE],
      },
      {
        name: "Bite",
        damage: "2-2-1",
        damageTypes: [DamageType.PAIN],
      },
    ],
    actions: [
      {
        name: "Flight",
        effect:
          "Hornet moves anywhere on the map at the end of the round, but must stand ground during",
      },
      {
        name: "Ready poison",
        effect: "Sting attacks deal 1d4 extra damage",
      },
      {
        name: "Evasive",
        effect: "Ranged attacks deal only the level die",
      },
    ],
  },
  {
    id: "Gun hag",
    name: "Gun hag",
    description:
      "An elderly person, thoroughly corrupted by volt magic, with guns protruding from mouth, eyes, fingers, and knees",
    level: 1,
    strength: 14,
    dexterity: 5,
    will: 16,
    endurance: 142,
    av: 2,
    weaknesses: [
      DamageType.LIGHT,
      DamageType.SMASH,
      DamageType.PAIN,
      DamageType.STAB,
    ],
    attacks: [
      {
        name: "Mouth Shotgun",
        damage: "3-3-3",
        damageTypes: [DamageType.GUN, DamageType.BLAST],
      },
      {
        name: "Eye Barrels",
        damage: "3-3-3",
        damageTypes: [DamageType.GUN, DamageType.BURST],
      },
      {
        name: "Finger Teslas (melee)",
        damage: "5-1-3",
        damageTypes: [DamageType.VOLT, DamageType.PAIN],
      },
    ],
    actions: [
      {
        name: "Lightning Strike",
        effect:
          "Roll 1d4, usable on 4. At the end of the round, a lightning strikes a tile. Combatants on that tile, and adjacent ones take dealing 3d6 volt, and blast damage on a failed DEX.",
      },
      {
        name: "Stasis",
        effect:
          "On failed WIL, target cannot move, or take action for the round",
      },
      {
        name: "Shield",
        effect: "Ranged attacks against the gun hag deal only the damage die",
      },
      {
        name: "Static field",
        effect:
          "Roll 1d4, usable on 3. A single tile becomes filled with static electricity. At the start of turn, or when entering, combatants inside take 2d4 volt damage",
      },
    ],
  },
  {
    id: "Saurian",
    name: "Saurian",
    description:
      "A giant lizard walking upright, and able to use tools with their hands. Aggressive and carnivorous.",
    level: 1,
    strength: 8,
    dexterity: 10,
    will: 5,
    endurance: 48,
    av: 1,
    weaknesses: [
      DamageType.LIGHT,
      DamageType.SMASH,
      DamageType.PAIN,
      DamageType.STAB,
    ],
    attacks: [
      {
        name: "Spear",
        damage: "2-2-1",
        damageTypes: [DamageType.STAB],
      },
      {
        name: "Spear Throw",
        damage: "2-2-1",
        damageTypes: [DamageType.STAB],
      },
      {
        name: "Tail swipe",
        damage: "1-2-1",
        damageTypes: [DamageType.SMASH, DamageType.PAIN],
      },
    ],
    actions: [
      {
        name: "Constrict",
        effect: "An enemy in melee cannot move on a failed STR.",
      },
      {
        name: "Slither",
        effect: "Move twice when charging if at least one opponent retreats",
      },
      {
        name: "Venom spit",
        effect:
          "One ranged opponent, on a failed DEX they take 2d4 ooze damage",
      },
      {
        name: "Inner strength",
        effect: "Mitigate one weakness this round.",
      },
    ],
  },
  {
    id: "Owltopus",
    name: "Owltopus",
    description:
      "A flying owl-squid hybrid. Has innate neural powers, but is not an aggressive creature unless cornered",
    level: 1,
    strength: 3,
    dexterity: 16,
    will: 12,
    endurance: 32,
    av: 0,
    weaknesses: [
      DamageType.NUKE,
      DamageType.GUN,
      DamageType.BURST,
      DamageType.VOLT,
    ],
    attacks: [
      {
        name: "Beak",
        damage: "1-2-1",
        damageTypes: [DamageType.CUT, DamageType.PAIN],
      },
      {
        name: "Tentacles",
        damage: "1-2-1",
        damageTypes: [DamageType.SMASH, DamageType.PAIN],
      },
    ],
    actions: [
      {
        name: "Attach",
        effect:
          "Attach to a melee enemy on failed DEX, moving with them. Beak, and tentacle attacks have advantage, and enemy can only melee attack the owltopus.",
      },
      {
        name: "Hoot",
        effect:
          "On successful WIL, deal 2d4 neural damage to an enemy, and they lose their next Tactical action",
      },
      {
        name: "Hooooooooot",
        effect:
          "All enemies, on a failed WIL, lose their action, and move back on the first turn",
      },
      {
        name: "Fly",
        effect: "Move two tiles, ignoring enemies.",
      },
    ],
  },
  {
    id: "Roller Thug",
    name: "Roller Thug",
    description:
      "A thug on rollerblades. Extremely skilled, and able to skate on most surfaces.",
    level: 1,
    strength: 7,
    dexterity: 12,
    will: 5,
    endurance: 50,
    av: 1,
    weaknesses: [
      DamageType.STAB,
      DamageType.SMASH,
      DamageType.GUN,
      DamageType.BURST,
      DamageType.BLAST,
      DamageType.OOZE,
    ],
    attacks: [
      {
        name: "Baseball bat",
        damage: "1-3-1",
        damageTypes: [DamageType.SMASH],
      },
      {
        name: "Wrist cannon",
        damage: "1-2-1",
        damageTypes: [DamageType.SMASH],
      },
    ],
    actions: [
      {
        name: "Trick blades",
        effect:
          "On successful DEX, move twice each round when charging or retreating. when arriving at target, deal 1d8 extra melee damage. On fail, no move, or attack first turn.",
      },
      {
        name: "Superior dash",
        effect: "Move two tiles",
      },
    ],
  },
  {
    id: "Thug",
    name: "Thug",
    description: "A thug. Uses advanced tactics, prone to kidnapping.",
    level: 1,
    strength: 5,
    dexterity: 5,
    will: 5,
    endurance: 45,
    av: 0,
    weaknesses: [
      DamageType.PAIN,
      DamageType.SMASH,
      DamageType.GUN,
      DamageType.BURST,
      DamageType.BLAST,
      DamageType.NUKE,
    ],
    attacks: [
      {
        name: "Makeshift pistol",
        damage: "3-1-1",
        damageTypes: [DamageType.GUN],
      },
      {
        name: "Cutter ",
        damage: "3-1-1",
        damageTypes: [DamageType.CUT, DamageType.PAIN],
      },
    ],
    actions: [
      {
        name: "Cower",
        effect:
          "The combatant cannot move or attack, but suffers only the level die from ranged damage",
      },
      {
        name: "Relentless",
        effect:
          "This round, an attack of the combatants choice gets advantage, prior to rolling",
      },
    ],
  },
  {
    id: "Coeurl",
    name: "Coeurl",
    description:
      "A giant mutated cat with long, radioactive tentacles instead of whiskers.",
    image: "coeurl.png",
    level: 1,
    strength: 10,
    dexterity: 15,
    will: 4,
    endurance: 120,
    av: 1,
    weaknesses: [
      DamageType.STAB,
      DamageType.CUT,
      DamageType.BLAST,
      DamageType.VOLT,
      DamageType.NEURAL,
    ],
    attacks: [
      {
        name: "Shred",
        damage: "3-3-3",
        damageTypes: [DamageType.CUT, DamageType.PAIN],
      },
      {
        name: "Tentacle Clap",
        damage: "3-3-3",
        damageTypes: [DamageType.NUKE, DamageType.LIGHT],
      },
    ],
    actions: [
      {
        name: "Pounce",
        effect:
          "Move into melee with any enemy between 2 or 3 tiles away. On failed STR, enemy takes 1d10 pain damage and suffer knockback",
      },
      {
        name: "on the hunt",
        effect:
          "Coeurl move twice as fast when charging if an enemy is retreating",
      },
      {
        name: "Flash",
        effect:
          "Coeurk move twice as fast when charging if an enemy is retreating",
      },
    ],
  },
  {
    id: "Roidrat",
    name: "Roidrat",
    description:
      "A mutated, angry rat, with an overdeveloped muscular structure.",
    image: "rat2.png",
    level: 1,
    strength: 7,
    dexterity: 10,
    will: 2,
    endurance: 30,
    av: 0,
    weaknesses: [
      DamageType.CUT,
      DamageType.GUN,
      DamageType.BURST,
      DamageType.BLAST,
      DamageType.VOLT,
    ],
    attacks: [
      {
        name: DamageType.SMASH,
        damage: "2-1-1",
        damageTypes: [DamageType.SMASH],
      },
      {
        name: "Bite",
        damage: "2-1-1",
        damageTypes: [DamageType.PAIN],
      },
    ],
    actions: [
      {
        name: "Hulk jump",
        effect:
          "Move into melee with any enemy between 2 or 3 tiles away. On failed STR, enemy takes 1d4 smash damage and suffer knockback",
      },
      {
        name: "Frenzy",
        effect:
          "When using the stand ground movement, gain 1d6 extra melee damage. Recharges on a 4.",
      },
    ],
  },
  {
    id: "Zone eel",
    name: "Zone eel",
    description:
      "Zone eels are large, omnivorous beasts of the zone. They are commonly domesticated as mounts.",
    image: "eel.png",
    level: 1,
    strength: 10,
    dexterity: 12,
    will: 5,
    endurance: 80,
    av: 0,
    weaknesses: [
      DamageType.GUN,
      DamageType.BURST,
      DamageType.VOLT,
      DamageType.LIGHT,
    ],
    attacks: [
      {
        name: "Bite",
        damage: "3-2-2",
        damageTypes: [DamageType.PAIN],
      },
    ],
    actions: [
      {
        name: "Constrict",
        effect:
          "On successful STR, constrict the enemy, who can escape with successful STR as a TA. Constricted cannot move, and eel can only melee attack constricted, with advantage.",
      },
      {
        name: "Slither",
        effect: "Move twice.",
      },
      {
        name: "Mount",
        effect:
          "If mounted, the zone eel cannot take TA. When mounted, both rider and mount take damage to endurance. Unless mounted, the eel will act on instinct.",
      },
    ],
  },
  {
    id: "Agolvuz",
    name: "Agolvuz",
    description:
      "A giant mutated fly, carnivorous and vile, creeps up on you in guile, and dispatches you with style.",
    image: "agolvuz.png",
    level: 1,
    strength: 8,
    dexterity: 12,
    will: 4,
    endurance: 122,
    av: 0,
    weaknesses: [
      DamageType.GUN,
      DamageType.BURST,
      DamageType.CUT,
      DamageType.BLAST,
      DamageType.LIGHT,
    ],
    attacks: [
      {
        name: "Bite",
        damage: "3-3-2",
        damageTypes: [DamageType.PAIN, DamageType.OOZE],
      },
      {
        name: "Tendrils",
        damage: "1-2-2",
        damageTypes: [DamageType.PAIN, DamageType.STAB, DamageType.CUT],
      },
    ],
    actions: [
      {
        name: "Aggressive Flight",
        effect:
          "Triple movement when charging, takes 1d8 more ranged damage if moving.",
      },
      {
        name: "Tendril flurry",
        effect:
          "Target a melee enemy, and attack twice per turn with tendrils. Cannot set movement plan, but follows the target to always stay in melee range. Recharges on 4.",
      },
      {
        name: "Glare",
        effect:
          "On failed WIL, combatant is forced to retreat, and loses their skill die",
      },
      {
        name: "Hardened regeneration",
        effect:
          "Gain 2 armor, regenerate 1d10 endurance per turn. Usable once.",
      },
    ],
  },
  {
    id: "Lapagerien",
    name: "Lapagerien",
    description:
      "A mutated and sentient Lapageria rose bush. Has a vile, meaty, rotting inside and sludges forward like a snail on this ooze.",
    image: "lapagerien.png",
    level: 1,
    strength: 9,
    dexterity: 2,
    will: 4,
    endurance: 74,
    av: 0,
    weaknesses: [DamageType.CUT, DamageType.NUKE, DamageType.LIGHT],
    attacks: [
      {
        name: "Shoot Thorn",
        damage: "2-2-1",
        damageTypes: [DamageType.GUN, DamageType.STAB, DamageType.OOZE],
      },
      {
        name: "Slashing vines",
        damage: "2-2-1",
        damageTypes: [DamageType.PAIN, DamageType.CUT, DamageType.OOZE],
      },
    ],
    actions: [
      {
        name: "Vine pull",
        effect:
          "Target an enemy at range. On a failed DEX, that enemy is pull two tiles towards the Lapagerien",
      },
      {
        name: "Radioactive Slime",
        effect:
          "Any tile the Lapagerien starts its turn on is covered by slime. Any combatant susceptile to nuke damage, take 1d6 nuke damage when starting their turn on the slime.",
      },
    ],
  },
  {
    id: "Albino Boarian",
    name: "Albino Boarian",
    description:
      "A giant mutated albino boar. They are hornless, but have retractable bone spears on their front legs, which they also use as hands. They are omnivores",
    image: "boarians.jpg",
    level: 1,
    strength: 16,
    dexterity: 6,
    will: 4,
    endurance: 74,
    av: 2,
    weaknesses: [DamageType.CUT, DamageType.LIGHT],
    attacks: [
      {
        name: "Bone spear",
        damage: "3-2-2",
        damageTypes: [DamageType.PAIN, DamageType.STAB, DamageType.SMASH],
      },
      {
        name: "Headbutt",
        damage: "2-2-2",
        damageTypes: [DamageType.SMASH],
      },
    ],
    actions: [
      {
        name: "Trample",
        effect:
          "Can only be used if not in melee. Cannot take action. Increases charge speed to two tiles and allows the boarian to trample enemies the run over. Trampled enemies take 6d6 smash damage.",
      },
    ],
  },
  {
    id: "Sluggan",
    name: "Sluggan",
    description:
      "Snail people, 1.2m in height, weigh around 100kg, 125 with their shells. Has four tendrils it uses as arms. They communicate telepathically at short range.",
    image: "sluggan.png",
    level: 1,
    strength: 6,
    dexterity: 5,
    will: 12,
    endurance: 38,
    av: 2,
    weaknesses: [DamageType.SMASH, DamageType.NUKE, DamageType.LIGHT],
    attacks: [
      {
        name: "Spear",
        damage: "2-2-1",
        damageTypes: [DamageType.STAB],
      },
      {
        name: "Tendril slap",
        damage: "1-2-1",
        damageTypes: [DamageType.SMASH, DamageType.NEURAL],
      },
      {
        name: "Zap",
        damage: "2-2-1",
        damageTypes: [DamageType.VOLT, DamageType.NEURAL],
      },
    ],
    actions: [
      {
        name: "Vicious slappery",
        effect:
          "Their first melee attack, all enemies in melee make a DEX save except the original target. On fail they also take the damage.",
      },
      {
        name: "Roll shape",
        effect:
          "When charging or retreating, move twice per turn. Cannot take action.",
      },
      {
        name: "Mental surge",
        effect: "On failed WIL, enemy cannot assist or do ranged attack.",
      },
    ],
  },
  {
    id: "Squid",
    name: "Squid",
    description:
      "Squid are large amphibious apex predators, hunting alone along coastlines and mixed-water river deltas. It has elastic tentacles which stretch unnaturally.",
    image: "amphisquid.png",
    level: 1,
    strength: 20,
    dexterity: 8,
    will: 2,
    endurance: 182,
    av: 1,
    weaknesses: [
      DamageType.CUT,
      DamageType.VOLT,
      DamageType.NUKE,
      DamageType.LIGHT,
    ],
    attacks: [
      {
        name: "Slap",
        damage: "3-3-3",
        damageTypes: [DamageType.SMASH, DamageType.PAIN],
      },
    ],
    actions: [
      {
        name: "Grapple",
        effect:
          "The squid can grapple an opponent at range. Each turn while grappled, the victim is pulled towards the squid, and cannot take tactical action. At the start of each round, on successful DEX, the victim slithers loose. If the squid takes critical damage, its grip loosens, and the victim escapes. The squid can only grapple one opponent. Recharges on 4",
      },
      {
        name: "Devour",
        effect:
          "The squid consumes one melee opponent which is also grappled. The devoured victim becomes unconscious, and takes 2d4 ooze damage each turn. The squid regurgitates the devoured victim if it takes critical damage.",
      },
      {
        name: "Harden",
        effect: "Gain 1 armor, and mitigate 1 weakness.",
      },
      {
        name: "Massive slappery",
        effect:
          "When using slap, enemies on the same tile as the target, and the target, suffer knockback on a failed STR.",
      },
    ],
  },
  {
    id: "Great angler",
    name: "Great angler",
    description:
      "Great anglers are horrible monsters, mutated anglerfish which dwell in moist, semisubmerged caverns or pits. The enjoy human flesh, and eats any who stumbles into its lair. Usually only the light is seen, then the six legged and clawed monstrosity shows itself as its prey draws close",
    image: "angler.png",
    level: 1,
    strength: 30,
    dexterity: 4,
    will: 5,
    endurance: 224,
    av: 3,
    weaknesses: [
      DamageType.BURST,
      DamageType.BLAST,
      DamageType.VOLT,
      DamageType.LIGHT,
    ],
    attacks: [
      {
        name: "Rake",
        damage: "4-3-4",
        damageTypes: [DamageType.CUT, DamageType.PAIN],
      },
      {
        name: "Bite",
        damage: "5-3-4",
        damageTypes: [DamageType.STAB, DamageType.SMASH, DamageType.PAIN],
      },
    ],
    actions: [
      {
        name: "Dash",
        effect: "Move 3 tiles in any direction.",
      },
      {
        name: "Devour",
        effect: "Eats any unconscious enemy adjacent to them.",
      },
      {
        name: "Expunge",
        effect:
          "Releases a radioactive spray from its many pores on its back, extinguishing fire, and dealing 3d6 nuke damage within 2 tiles of the Great Angler.",
      },
    ],
  },
  {
    id: "Angoliant",
    name: "Angoliant",
    description:
      "Giant, amphibious angler fish, mutated in a manner which allows them to speak, and granting them a higher level of intelligence than most other creatures. Angoliants are considered evil by civilized folk. They enjoy human flesh, but also to toy with their prey.",
    image: "angolian.png",
    level: 1,
    strength: 30,
    dexterity: 3,
    will: 10,
    endurance: 208,
    av: 3,
    weaknesses: [
      DamageType.BURST,
      DamageType.BLAST,
      DamageType.VOLT,
      DamageType.LIGHT,
    ],
    attacks: [
      {
        name: "Rake",
        damage: "4-2-4",
        damageTypes: [DamageType.CUT, DamageType.PAIN],
      },
      {
        name: "Bite",
        damage: "5-2-4",
        damageTypes: [DamageType.STAB, DamageType.SMASH, DamageType.PAIN],
      },
    ],
    actions: [
      {
        name: "Dash",
        effect: "Move 2 tiles in any direction.",
      },
      {
        name: "Devour",
        effect: "Eats any unconscious enemy adjacent to them.",
      },
      {
        name: "Harden",
        effect: "Gain 1 armor, and mitigate 1 weakness.",
      },
      {
        name: "Roar",
        effect:
          "The Angoliant roars with otherworldly tone. All enemies save WIL, and on a fail they suffer 4d6 neural damage, and they are unable to move or attack the first turn.Recharges on a 4.",
      },
    ],
  },
  {
    id: "Service Bot",
    name: "Service Bot",
    description:
      "A service robot corrupted by the passage of time. Service bots have exceptionally creative AI's, and often use underhanded tactics, and trickery to lure their targets into traps. They speak softly, and were made for service professions originally.",
    image: "servicebot.png",
    level: 1,
    strength: 10,
    dexterity: 4,
    will: 8,
    endurance: 42,
    av: 2,
    weaknesses: [
      DamageType.GUN,
      DamageType.SMASH,
      DamageType.BURST,
      DamageType.BLAST,
      DamageType.VOLT,
    ],
    attacks: [
      {
        name: "Sawblade",
        damage: "3-1-1",
        damageTypes: [DamageType.CUT, DamageType.PAIN],
      },
      {
        name: "Throw stuff",
        damage: "1-1-1",
        damageTypes: [DamageType.SMASH],
      },
    ],
    actions: [
      {
        name: "Grovel",
        effect:
          "If the service bot controls itself, and is not remotely controlled, it will grovel if wounded, stand ground, and take the defend action.",
      },
      {
        name: "Feign Shutdown",
        effect:
          "On a successful DEX, the next damage to the Service Bot will cause it to feign shutdown. It may resume fighting as a tactical action.",
      },
      {
        name: "Shoot Tazer",
        effect:
          "Fires a tazer at an enemy combatant, dealing 1d6 volt damage. The target must use a tactical action to remove the tazer, or take an additional 1d6 volt damage for each tactical action they make. Usable once.",
      },
    ],
  },
  {
    id: "Clowndroid",
    name: "Clowndroid",
    description:
      "An android initially made for jolly entertainment, but deranged as the unmaintained AI evolved in a sinister direction. It has modified itself with weapons, and use them in a manic glee.",
    image: "clown.png",
    level: 1,
    strength: 8,
    dexterity: 14,
    will: 7,
    endurance: 108,
    av: 2,
    weaknesses: [
      DamageType.GUN,
      DamageType.BURST,
      DamageType.BLAST,
      DamageType.VOLT,
    ],
    attacks: [
      {
        name: "Sawblade",
        damage: "3-2-3",
        damageTypes: [DamageType.CUT, DamageType.PAIN],
      },
      {
        name: "Nail Barrage",
        damage: "3-2-3",
        damageTypes: [DamageType.STAB, DamageType.GUN],
      },
      {
        name: "Piston Kick",
        damage: "2-2-3",
        damageTypes: [DamageType.SMASH, DamageType.BLAST],
      },
    ],
    actions: [
      {
        name: "Chaos Footwork",
        effect:
          "When targeted by ranged attacks, and not in melee, on successful DEX the clown takes no damage",
      },
      {
        name: "Acrobatics",
        effect: "Move 2 tiles. Can move past enemy combatants.",
      },
      {
        name: "Electric Discharge",
        effect:
          "Enemies in melee save their STR. If they fail, they cannot move, and take 2d6 volt damage",
      },
      {
        name: "Noxious Grenade",
        effect:
          "Throws a grenade to a target tile, which deals 3d6 nuke damage to all combatants on the tile. Affected targets save STR, and on fail they suffer one mutation progress. Recharges on a 4.",
      },
    ],
  },
  {
    id: "Crackjaw",
    name: "Crackjaw",
    description:
      "A mutated honey badger, astride six legs with thick fur. Hunts in packs.",
    image: "badger.png",
    level: 1,
    strength: 8,
    dexterity: 10,
    will: 7,
    endurance: 32,
    av: 1,
    weaknesses: [
      DamageType.STAB,
      DamageType.GUN,
      DamageType.BURST,
      DamageType.LIGHT,
      DamageType.NUKE,
      DamageType.NEURAL,
    ],
    attacks: [
      {
        name: "Bite",
        damage: "2-2-1",
        damageTypes: [DamageType.STAB, DamageType.PAIN],
      },
      {
        name: "Rake",
        damage: "2-2-1",
        damageTypes: [DamageType.CUT, DamageType.PAIN],
      },
    ],
    actions: [
      {
        name: "Sprint",
        effect:
          "Increases movement speed to 2 while charging. First attack deals knockback on failed STR.",
      },
      {
        name: "Bond",
        effect:
          "Stick to an enemy in melee on a failed DEX, increasing melee damage by 1d6 to the bonded enemy, and increasing armor by 1 when attacked by the bonded enemy. All attacks from other enemies deal critical damage.",
      },
    ],
  },
  {
    id: "Borq",
    name: "Borq",
    description:
      'Warmongering, seafaring, mutated boar. Borq always bide their time, choosing the opportune moment to strike, thus minting the saying: "Never trust a Borq"',
    image: "borq.png",
    level: 1,
    strength: 9,
    dexterity: 6,
    will: 7,
    endurance: 40,
    av: 1,
    weaknesses: [
      DamageType.BURST,
      DamageType.LIGHT,
      DamageType.NUKE,
      DamageType.VOLT,
      DamageType.NEURAL,
    ],
    attacks: [
      {
        name: "Club",
        damage: "1-2-1",
        damageTypes: [DamageType.SMASH],
      },
      {
        name: "Gore",
        damage: "2-2-1",
        damageTypes: [DamageType.STAB, DamageType.PAIN],
      },
      {
        name: "Pipe gun",
        damage: "2-1-1",
        damageTypes: [DamageType.GUN],
      },
    ],
    actions: [
      {
        name: "Charging attack",
        effect:
          "Can only be done if an enemy is exactly 2 tiles away. The borq moves into melee, they make a club attack with 1d6 increased damage. On failed STR, the target suffers knockback.",
      },
      {
        name: "Screech",
        effect:
          "Can only be done when below 20 EN. The borq screeches and recieves a second wind, and gains 3 armor for the round. Usable once.",
      },
      {
        name: "Firing squad",
        effect:
          "Each borq using this TA adds 1 guarantueed damage to all borq using firing squad on the same tile.",
      },
    ],
  },
  {
    id: "Aspur",
    name: "Aspur",
    description: "Great serpen",
    image: "borq.png",
    level: 1,
    strength: 9,
    dexterity: 6,
    will: 7,
    endurance: 40,
    av: 1,
    weaknesses: [
      DamageType.BURST,
      DamageType.LIGHT,
      DamageType.NUKE,
      DamageType.VOLT,
      DamageType.NEURAL,
    ],
    attacks: [
      {
        name: "Club",
        damage: "1-2-1",
        damageTypes: [DamageType.SMASH],
      },
      {
        name: "Gore",
        damage: "2-2-1",
        damageTypes: [DamageType.STAB, DamageType.PAIN],
      },
      {
        name: "Pipe gun",
        damage: "2-1-1",
        damageTypes: [DamageType.GUN],
      },
    ],
    actions: [
      {
        name: "Charging attack",
        effect:
          "Can only be done if an enemy is exactly 2 tiles away. The borq moves into melee, they make a club attack with 1d6 increased damage. On failed STR, the target suffers knockback.",
      },
      {
        name: "Screech",
        effect:
          "Can only be done when below 20 EN. The borq screeches and recieves a second wind, and gains 3 armor for the round. Usable once.",
      },
      {
        name: "Firing squad",
        effect:
          "Each borq using this TA adds 1 guarantueed damage for the pipe gun to all borq using firing squad on the same tile.",
      },
    ],
  },
  {
    id: "Massive Landwhale",
    name: "Massive Landwhale",
    description:
      "Landwhales exist on a different foodchain, as they are monolithic creatures. Landwhales have an unnatural fear of humans, and if startled may trample or destroy huge swathes of land.",
    image: "landwhale.png",
    level: 1,
    strength: 20,
    dexterity: 8,
    will: 2,
    endurance: 182,
    av: 1,
    weaknesses: [
      DamageType.CUT,
      DamageType.VOLT,
      DamageType.NUKE,
      DamageType.LIGHT,
    ],
    attacks: [
      {
        name: "Slap",
        damage: "3-3-3",
        damageTypes: [DamageType.SMASH, DamageType.PAIN],
      },
    ],
    actions: [
      {
        name: "Grapple",
        effect:
          "The squid can grapple an opponent at range. Each turn while grappled, the victim is pulled towards the squid, and cannot take tactical action. At the start of each round, on successful DEX, the victim slithers loose. If the squid takes critical damage, its grip loosens, and the victim escapes. The squid can only grapple one opponent. Recharges on 4",
      },
      {
        name: "Devour",
        effect:
          "The squid consumes one melee opponent which is also grappled. The devoured victim becomes unconscious, and takes 2d4 ooze damage each turn. The squid regurgitates the devoured victim if it takes critical damage.",
      },
      {
        name: "Harden",
        effect: "Gain 1 armor, and mitigate 1 weakness.",
      },
      {
        name: "Massive slappery",
        effect:
          "When using slap, enemies on the same tile as the target, and the target, suffer knockback on a failed STR.",
      },
    ],
  },
  {
    id: "Sky Centipede",
    name: "Sky Centipede",
    description:
      "Giant flying centipedes which live up high seemingly defying gravity. The live sky centipede never lands, but crashes only as it dies. A dead sky centipede turns hollow quick as its meat rots swiftly, but its shell hardens immensely.",
    image: "skycentipede.png",
    level: 1,
    strength: 20,
    dexterity: 8,
    will: 2,
    endurance: 182,
    av: 1,
    weaknesses: [
      DamageType.CUT,
      DamageType.VOLT,
      DamageType.NUKE,
      DamageType.LIGHT,
    ],
    attacks: [
      {
        name: "Slap",
        damage: "3-3-3",
        damageTypes: [DamageType.SMASH, DamageType.PAIN],
      },
    ],
    actions: [
      {
        name: "Grapple",
        effect:
          "The squid can grapple an opponent at range. Each turn while grappled, the victim is pulled towards the squid, and cannot take tactical action. At the start of each round, on successful DEX, the victim slithers loose. If the squid takes critical damage, its grip loosens, and the victim escapes. The squid can only grapple one opponent. Recharges on 4",
      },
      {
        name: "Devour",
        effect:
          "The squid consumes one melee opponent which is also grappled. The devoured victim becomes unconscious, and takes 2d4 ooze damage each turn. The squid regurgitates the devoured victim if it takes critical damage.",
      },
      {
        name: "Harden",
        effect: "Gain 1 armor, and mitigate 1 weakness.",
      },
      {
        name: "Massive slappery",
        effect:
          "When using slap, enemies on the same tile as the target, and the target, suffer knockback on a failed STR.",
      },
    ],
  },
];
