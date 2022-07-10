import { RoundState } from './../../../../../../../contracts/models/battle';
import { Guid } from "./../../../../../../../shared/guid";
import {
  BattleMessageFactory,
  IBattleStateChange,
} from "./../../../../../../../contracts/controllers/battle";
import {
  BattleState,
  IBattle,
} from "../../../../../../../contracts/models/battle";
import { bindable } from "aurelia";
import {
  IBattleMessage,
} from "../../../../../../../contracts/controllers/battle";

export class BattleStateControl {
  @bindable battle: IBattle;
  @bindable message: IBattleMessage;

  onBattleStateClick(newState: BattleState) {
    const data: IBattleStateChange = {
      id: Guid.newGuid(),
      battleState: newState,
    };
    this.message = BattleMessageFactory.setBattleState(this.battle.id, data);
  }
  onRoundStateClick(newState: RoundState) {
    const data: IBattleStateChange = {
      id: Guid.newGuid(),
      roundState: newState,
    };
    this.message = BattleMessageFactory.setRoundState(this.battle.id, data);
  }
}
