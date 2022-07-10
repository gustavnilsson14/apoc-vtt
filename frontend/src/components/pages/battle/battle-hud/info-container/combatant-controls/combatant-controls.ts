import {
  ActionType,
  IBattle,
  ICombatant,
  MovementType,
} from "./../../../../../../../../contracts/models/battle";
import { bindable } from "aurelia";

export class CombatantControls {
  @bindable combatant: ICombatant;
  @bindable battle: IBattle;
  @bindable actionTypes: ActionType[];
  @bindable movementTypes: MovementType[];
  @bindable selectedActionType: ActionType;
  @bindable selectedMovementType: MovementType;
  constructor() {
    this.actionTypes = Object.values(ActionType).filter(
      (x) => typeof x != "number"
    );
    this.movementTypes = Object.values(MovementType).filter(
      (x) => typeof x != "number"
    );
  }
  onMovementChoice(type: MovementType) {
    console.log(type);
  }
  onActionChoice(type: ActionType) {
    console.log(type);
  }
  selectedActionTypeChanged(): void {
    console.log(this.selectedActionType);
  }
  selectedMovementTypeChanged(): void {
    console.log(this.selectedMovementType);
  }
}
