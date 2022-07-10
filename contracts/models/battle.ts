import { IHasStats } from './../stats';
import { ICharacter } from './character';
import { IIcon } from '../base';
import { Guid } from './../../shared/guid';
import { IOwnedItem } from './user';
import { ITacticalAction } from './../../collections/tacticalAction';
import { IItem } from './../../collections/items';
import { DamageType } from './../../collections/damageType';
import { IGrid, GridFactory } from './../../shared/grid';
import { IBase } from './../base';
import { IUserSession } from '../controllers/user';
export enum BattleType{
    NONE = "NONE",
    THEATRE_OF_THE_MIND = "THEATRE_OF_THE_MIND",
    TACTICAL_1D = "TACTICAL_1D",
    TACTICAL_2D = "TACTICAL_2D",
}
export enum BattleState{
    NONE = "NONE",
    GM_SETUP = "GM_SETUP",
    PLAYER_POSITIONING = "PLAYER_POSITIONING",
    LOOP = "LOOP",
    VICTORY = "VICTORY",
    DEFEAT = "DEFEAT",
    CLEANUP = "CLEANUP"
}
export enum RoundState{
    NONE = "NONE",
    GM_SETUP = "GM_SETUP",
    INITIATIVE = "INITIATIVE",
    TACTICAL_ACTIONS = "TACTICAL_ACTIONS",
    MOVEMENT_CHOICE = "MOVEMENT_CHOICE",
    ACTION_CHOICE = "ACTION_CHOICE",
    LOOP = "LOOP",
    END_OF_ROUND = "END_OF_ROUND",
    CLEANUP = "CLEANUP"
}
export enum TurnState{
    NONE = "NONE",
    GM_SETUP = "GM_SETUP",
    MOVEMENT = "MOVEMENT",
    ACTION = "ACTION",
    CLEANUP = "CLEANUP"
}
export enum MovementType{
    STAND_GROUND = "STAND_GROUND",
    CHARGE = "CHARGE",
    RETREAT = "RETREAT",
    MOVE_TO_TILE = "MOVE_TO_TILE",
}
export enum ActionType{
    MELEE = "MELEE",
    RANGED = "RANGED",
    DEFEND = "DEFEND",
    ASSIST = "ASSIST",
}
export enum CombatantSide{
    NONE = "NONE",
    PLAYER = "PLAYER",
    ALLY = "ALLY",
    ENEMY = "ENEMY",
}
export interface IMovement extends IBase{
    movementType: MovementType,
}
export interface IAction extends IBase{
    actionType: ActionType,
}
export interface IBattle extends IBase{
    type?: BattleType
    grid?: IGrid;
    battleState?: BattleState;
    roundState?: RoundState;
    turnState?: TurnState;
}

export interface ICombatantMessageData extends IBase{
    combatant: ICombatant;
}
export class BaseBattle implements IBattle{
    battleState?: BattleState = BattleState.NONE;
    roundState?: RoundState = RoundState.NONE;
    turnState?: TurnState = TurnState.NONE;
    grid?: IGrid;
    type?: BattleType;
    id: string;
    lastChanged?: Date;
}

export interface ICombatant extends IBase, IHasStats, IOwnedItem{
  name: string;
  weaknesses: DamageType[];
  av: number;
  image?: string;
  side?: CombatantSide;
  currentWeapon?: IItem;
  activeTacticalAction?: ITacticalAction;
  activeAction?: IAction;
  activeMovement?: IMovement;
}
export class BattleFactory{
    public static createDefaultBattle(): BaseBattle{
        const battle: BaseBattle = new BaseBattle();
        battle.id = Guid.newGuid();
        battle.battleState = BattleState.NONE;
        battle.roundState = RoundState.NONE;
        battle.turnState = TurnState.NONE;
        battle.grid = GridFactory.createSquareGrid({x:10,y:10});
        return battle;
    }
    public static createCombatantFromCharacter(character: ICharacter, session: IUserSession): ICombatant{
        const combatant: ICombatant = {
            id: character.id,
            name: character.name,
            level: character.level,
            strength: character.strength,
            dexterity: character.dexterity,
            will: character.will,
            endurance: character.endurance,
            weaknesses: character.weaknesses.map(x=>x.damageType),
            av: 1,
            side: CombatantSide.PLAYER,
            userId: session.user.id
        };
        return combatant;
    }
}