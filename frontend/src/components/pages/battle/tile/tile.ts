import { ICharacter } from './../../../../../../contracts/models/character';
import { CharacterController } from "./../../../../../../contracts/controllers/character";
import { IMessage, MessageFactory, MessageType } from "./../../../../../../contracts/message";
import {
  IBattleMessage,
  BattleMessageFactory,
  ICharacterPlacement,
} from "./../../../../../../contracts/controllers/battle";
import {
  BattleState,
  IBattle,
} from "./../../../../../../contracts/models/battle";
import { Guid } from "./../../../../../../shared/guid";
import { ICreature } from "./../../../../../../collections/creatures";
import { bindable, EventAggregator, inject } from "aurelia";
import {
  ISelectable,
  SelectionHandler,
} from "./../../../../infrastructure/selection";
import { ITile, TileUtilityTags } from "./../../../../../../shared/grid";
import { ControlIcon } from "../battle-hud/control-icon/control-icon";
import { Client } from "../../../../infrastructure/client";
import { UserType } from "../../../../../../contracts/models/user";

@inject(Client, EventAggregator, SelectionHandler, Element)
export class Tile implements ISelectable {
  id: string = Guid.newGuid();
  isSelected: boolean;
  selectionGroup: string = "TILE";
  @bindable tile: ITile;
  @bindable battle: IBattle;
  @bindable message: IBattleMessage;
  constructor(
    private client: Client,
    private eventAggregator: EventAggregator,
    private selectionHandler: SelectionHandler,
    public element: Element
  ) {}
  onClick(): void {
    if (this.handlePlayerPositioning()) return;
    if (this.handleControlIconClick()) return;
    if (this.handleMoveClick()) return;
    this.selectionHandler.select(this);
  }
  handlePlayerPositioning(): boolean {
    if (this.battle.battleState != BattleState.PLAYER_POSITIONING) return false;
    if (this.client.userSession.user.userType != UserType.PLAYER) return false;
    if (!this.client.userSession.user.selectedCharacterId) return false;
    if (this.tile.utilityTags.indexOf(TileUtilityTags.START_POSITION) == -1)
      return false;
    const data: ICharacterPlacement = {
        id: "",
        tileId: this.tile.id,
        characterId: this.client.userSession.user.selectedCharacterId
    };
    this.client.send(BattleMessageFactory.placeCharacter(this.battle.id, data));
    return true;
  }
  handleMoveClick(): boolean {
    if (!this.selectionHandler.selected) return false;
    if (this.selectionHandler.selected.selectionGroup != this.selectionGroup)
      return false;
    const otherTile: ITile = (this.selectionHandler.selected as Tile).tile;
    if (!otherTile.combatant) return false;
    this.moveCreature(otherTile);
    return true;
  }
  handleControlIconClick(): boolean {
    if (this.client.userSession.user.userType != UserType.GM) return false;
    if (!this.selectionHandler.selected) return false;
    if (this.selectionHandler.selected.selectionGroup != "ControlIcon")
      return false;
    this.handleControlIcon(this.selectionHandler.selected as ControlIcon);
    return true;
  }
  handleControlIcon(controlIcon: ControlIcon) {
    switch (controlIcon.iconType) {
      case "creature":
        this.addCreature(controlIcon.data as ICreature);
        break;
      case "utilityTag":
        this.toggleUtilityTag(controlIcon.data as TileUtilityTags);
        break;
    }
    this.message = BattleMessageFactory.setTileData(this.battle.id, this.tile);
  }
  toggleUtilityTag(tag: TileUtilityTags) {
    if (this.tile.utilityTags.indexOf(tag) == -1) {
      this.tile.utilityTags.push(tag);
      return;
    }
    this.tile.utilityTags = this.tile.utilityTags.filter((x) => x != tag);
  }
  addCreature(creature: ICreature) {
    this.tile.combatant = creature;
  }
  moveCreature(otherTile: ITile) {
    const myCombatant = this.tile.combatant ? { ...this.tile.combatant } : null;
    const otherCombatant = otherTile.combatant
      ? { ...otherTile.combatant }
      : null;
    this.tile.combatant = otherCombatant;
    otherTile.combatant = myCombatant;
    this.message = BattleMessageFactory.setTileData(this.battle.id, this.tile);
    this.message = BattleMessageFactory.setTileData(this.battle.id, otherTile);
    this.selectionHandler.deselect();
  }
  getIconMask(): string {
    return `-webkit-mask:url(${this.getIconImage()};mask: url(${this.getIconImage()});`;
  }
  getIconImage(): any {
    return null;
  }
  getIconColor(): string {
    return null;
  }
}
