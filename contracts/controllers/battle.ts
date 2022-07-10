import { ICharacter } from './../models/character';
import { CharacterController } from './character';
import { ITile, GridHandler } from './../../shared/grid';
import { BattleState, IBattle, RoundState, TurnState, ICombatant, ICombatantMessageData, ActionType, MovementType, BattleFactory } from './../models/battle';
import { Guid } from './../../shared/guid';
import { IBase } from './../base';
import { MessageFactory, MessageType } from './../message';
import { IUserSession } from './user';
import { BaseController } from './../controller';
import { IMessage } from "../message";
import { ISession } from '../../shared/session';
import { UserType } from '../models/user';
import { LoaderModuleType } from '../loader';
import { EventPipeline } from '../../shared/event';

export enum BattleMessageType{
    SET_TILE_DATA = "SET_TILE_DATA",
    SET_BATTLE_STATE = "SET_BATTLE_STATE",
    SET_ROUND_STATE = "SET_ROUND_STATE",
    PLACE_CHARACTER = "PLACE_CHARACTER",
    SELECT_TACTICAL_ACTION = "SELECT_TACTICAL_ACTION",
    SELECT_ACTION = "SELECT_ACTION",
    SELECT_MOVEMENT = "SELECT_MOVEMENT",
}
export interface IBattleStateChange extends IBase{
    battleState?: BattleState,
    roundState?: RoundState
}
export interface ICharacterPlacement extends IBase{
    tileId: string,
    characterId: string,
}
export interface IBattleMessage extends IMessage{
    battleId: string,
    battleMessageType: BattleMessageType;
}
export class BattleMessageFactory{
    public static battleMessage(battleId: string, battleMessageType: BattleMessageType, data: IBase): IBattleMessage{
        return {
            timestamp: new Date(),
            type: MessageType.BATTLE,
            battleId: battleId,
            battleMessageType: battleMessageType,
            handler: LoaderModuleType.CONTROLLER,
            handlerName: BattleController.name,
            data: data,
        };
    }
    public static setTileData(battleId: string, data: IBase): IBattleMessage{
        return BattleMessageFactory.battleMessage(battleId, BattleMessageType.SET_TILE_DATA, data);
    }
    public static placeCharacter(battleId: string, data: IBase): IBattleMessage{
        return BattleMessageFactory.battleMessage(battleId, BattleMessageType.PLACE_CHARACTER, data);
    }
    public static setBattleState(battleId: string, data: IBase): IBattleMessage{
        return BattleMessageFactory.battleMessage(battleId, BattleMessageType.SET_BATTLE_STATE, data);
    }
    public static setRoundState(battleId: string, data: IBase): IBattleMessage{
        return BattleMessageFactory.battleMessage(battleId, BattleMessageType.SET_ROUND_STATE, data);
    }
    public static selectTacticalAction(battleId: string, data: IBase): IBattleMessage{
        return BattleMessageFactory.battleMessage(battleId, BattleMessageType.SELECT_TACTICAL_ACTION, data);
    }
    public static selectAction(battleId: string, data: IBase): IBattleMessage{
        return BattleMessageFactory.battleMessage(battleId, BattleMessageType.SELECT_ACTION, data);
    }
    public static selectMovement(battleId: string, data: IBase): IBattleMessage{
        return BattleMessageFactory.battleMessage(battleId, BattleMessageType.SELECT_MOVEMENT, data);
    }
}

export class BattleController extends BaseController{
    public add(session: ISession, message: IMessage): IMessage {
        const userSession = session as IUserSession;
        if (userSession.user.userType != UserType.GM) return MessageFactory.error("Cannot create battle as player", message, this);
        return super.add(session, message);
    }
    public handleMessage(message: IMessage, session: ISession): IMessage {
        if (message.type == MessageType.BATTLE) return this.handleBattleMessage(message as IBattleMessage,session);
        return super.handleMessage(message, session);
    }
    handleBattleMessage(message: IBattleMessage, session: ISession): IMessage {
        const battle: IBattle | undefined = this.collection.find(x=>x.id == message.battleId) as IBattle;
        if (battle == undefined) return MessageFactory.error("Cannot find battle", message, this);
        if (!this.verifyPlayerAvailability(session, battle)) return MessageFactory.error("Cannot take action, wait for GM", message, this);
        let result: IMessage;
        switch(message.battleMessageType){
            case BattleMessageType.SET_TILE_DATA:
                result = this.setTileData(message, session, battle);
                break;
            case BattleMessageType.SET_BATTLE_STATE:
                result = this.setBattleState(message, session, battle);
                break;
            case BattleMessageType.SET_ROUND_STATE:
                result = this.setRoundState(message, session, battle);
                break;
            case BattleMessageType.PLACE_CHARACTER:
                result = this.placeCharacter(message, session, battle);
                break;
            default:
                result = this.handleCombatantMessage(message, session, battle);
                break;
        }
        EventPipeline.I.publish(this.constructor.name, this.collection);
        return result;
    }
    placeCharacter(message: IBattleMessage, session: ISession, battle: IBattle): IMessage {
        if (!this.loaderObject) return MessageFactory.error("Loaderobject is null", message, this);
        if (!battle.grid) return MessageFactory.error("Battle has no grid", message, this);
        const characterPlacement = message.data as ICharacterPlacement;
        const existingCombatant = this.getCombatant(characterPlacement.characterId, session as IUserSession, battle);
        if (existingCombatant != null) {
            this.removeCombatant(existingCombatant, battle);
        }
        const characterController = this.loaderObject.getModule(LoaderModuleType.CONTROLLER, CharacterController.name) as CharacterController;
        const character: ICharacter = characterController.getItem(characterPlacement.characterId) as ICharacter;
        const combatant: ICombatant = BattleFactory.createCombatantFromCharacter(character, session as IUserSession);
        const tile = battle.grid.tiles.find(x => x.id == characterPlacement.tileId);
        if (!tile) return MessageFactory.error("Tile does not exist", message, this);
        if (tile.combatant) return MessageFactory.error("Tile is occupied", message, this);
        tile.combatant = combatant;
        return MessageFactory.response(this,{id:""});
    }
    handleCombatantMessage(message: IBattleMessage, session: ISession, battle: IBattle): IMessage{
        let result: IMessage;
        const id = (message.data as ICombatantMessageData).combatant.id;
        const combatant: ICombatant | undefined = this.getCombatant(id, session as IUserSession, battle);
        if(combatant == undefined) return MessageFactory.error("Combatant not found", message, this);

        switch(message.battleMessageType){
            case BattleMessageType.SELECT_TACTICAL_ACTION:
                result = this.selectTacticalAction(message, session, battle, combatant);
            case BattleMessageType.SELECT_ACTION:
                result = this.selectAction(message, session, battle, combatant);
            case BattleMessageType.SELECT_MOVEMENT:
                result = this.selectMovement(message, session, battle, combatant);
            default:
                result = MessageFactory.error("BattleMessageType not implemented", message, this);
        }
        return result;
    }
    setTileData(message: IBattleMessage, session: ISession, battle: IBattle): IMessage {
        if(!battle.grid) return MessageFactory.error("Battle grid not setup", message, this);
        GridHandler.replaceTile(battle.grid, message.data as ITile);
        return MessageFactory.response(this,{id:Guid.newGuid()});
    }
    setBattleState(message: IBattleMessage, session: ISession, battle: IBattle): IMessage {
        battle.battleState = (message.data as IBattleStateChange).battleState;
        this.handleBattleStateChange(battle);
        return MessageFactory.response(this,{id:Guid.newGuid()});
    }
    setRoundState(message: IBattleMessage, session: ISession, battle: IBattle): IMessage {
        battle.roundState = (message.data as IBattleStateChange).roundState;
        this.handleRoundStateChange(battle);
        return MessageFactory.response(this,{id:Guid.newGuid()});
    }
    selectTacticalAction(message: IBattleMessage, session: ISession, battle: IBattle, combatant: ICombatant): IMessage {
        combatant.activeTacticalAction = (message.data as ICombatantMessageData).combatant.activeTacticalAction;
        return MessageFactory.response(this,{id:Guid.newGuid()});
    }
    selectAction(message: IBattleMessage, session: ISession, battle: IBattle, combatant: ICombatant): IMessage {
        combatant.activeAction = (message.data as ICombatantMessageData).combatant.activeAction;
        return MessageFactory.response(this,{id:Guid.newGuid()});
    }
    selectMovement(message: IBattleMessage, session: ISession, battle: IBattle, combatant: ICombatant): IMessage {
        combatant.activeMovement = (message.data as ICombatantMessageData).combatant.activeMovement;
        return MessageFactory.response(this,{id:Guid.newGuid()});
    }

    getCombatant(id: string, session: IUserSession, battle: IBattle): ICombatant | undefined {
        return this.getCombatants(battle).find(x=>x.id == id && x.userId == session.user.id);
    }
    
    getCombatants(battle: IBattle): ICombatant[] {
        if(!battle.grid) return [];
        const tilesWithCombatants = battle.grid.tiles.filter(tile=> tile.combatant != undefined);
        if(tilesWithCombatants == undefined) return [];
        const combatants = tilesWithCombatants.map(tile => tile.combatant).filter(x => x != undefined) as ICombatant[];
        return combatants;
    }
 
    removeCombatant(existingCombatant: ICombatant, battle: IBattle) {
        if (!battle.grid) return;
        battle.grid.tiles = battle.grid.tiles.map(tile => {
            if (!tile.combatant) return tile;
            if (tile.combatant.id != existingCombatant.id) return tile;
            tile.combatant = undefined;
            return tile;
        });
    }   
    handleBattleStateChange(battle: IBattle) {
        switch(battle.battleState){
            
        }
    }
    handleRoundStateChange(battle: IBattle) {
        switch(battle.roundState){
            case RoundState.GM_SETUP:
                this.resetCombatantRoundDecisions(battle);
                break;
            case RoundState.LOOP:
                this.runRoundLoop(battle);
                break;
        }
    }
    runRoundLoop(battle: IBattle) {
        
    }
    resetCombatantRoundDecisions(battle: IBattle) {
        this.getCombatants(battle).forEach(combatant=>{
            combatant.activeAction = undefined;
            combatant.activeMovement = undefined;
            combatant.activeTacticalAction = undefined;
        });
    }
    verifyPlayerAvailability(session: ISession, battle: IBattle): boolean{
        if ((session as IUserSession).user.userType == UserType.GM) return true;
        if (battle.battleState == BattleState.GM_SETUP) return false;
        if (battle.roundState == RoundState.GM_SETUP) return false;
        if (battle.turnState == TurnState.GM_SETUP) return false;
        return true;
    }
}