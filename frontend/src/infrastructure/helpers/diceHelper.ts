import { IHasStats } from './../../../../contracts/stats';
import { IGameEntity } from './../../../../contracts/models/entity';
import { inject, EventAggregator } from "aurelia";
import { IInputSettings } from "../../../../contracts/input";
import { IRollable, RollableHandler } from "../../../../shared/random";
import { ItemSlot } from "../../components/partials/custom-form/item-slot/item-slot";
import { DiceType } from '../../../../contracts/models/dice';

@inject(EventAggregator, RollableHandler)
export class DiceHelper{
  constructor(private eventAggregator: EventAggregator, private rollableHandler: RollableHandler){}
  public handleDefaultStatRoll(settings: IInputSettings, result: any) {
    this.eventAggregator.publish(
      "DIE_ROLL",
      this.rollableHandler.rollCheck(this.getStatRollable(settings, result))
    );
  }
  public handleAdvantageStatRoll(settings: IInputSettings, result: any) {
    this.eventAggregator.publish(
      "DIE_ROLL",
      this.rollableHandler.rollCheckWithAdvantage(this.getStatRollable(settings, result))
    );
  }
  public handleDisadvantageStatRoll(settings: IInputSettings, result: any) {
    this.eventAggregator.publish(
      "DIE_ROLL",
      this.rollableHandler.rollCheckWithDisdvantage(this.getStatRollable(settings, result))
    );
  }
  public getStatRollable(settings: IInputSettings, result: any): IRollable {
    return {
      name: `${result.name} ${settings.key}`,
      difficulty: result[settings.key] as number,
    };
  }
  handleDefaultItemRoll(entity: IGameEntity & IHasStats, itemSlot: ItemSlot) {
    this.eventAggregator.publish(
      "DIE_ROLL",
      this.rollableHandler.rollDefault(this.getSlotRollable(entity, itemSlot))
    );
  }
  handleCriticalItemRoll(entity: IGameEntity & IHasStats, itemSlot: ItemSlot) {
    this.eventAggregator.publish(
      "DIE_ROLL",
      this.rollableHandler.rollWithCritical(this.getSlotRollable(entity, itemSlot))
    );
  }
  getSlotRollable(entity: IGameEntity & IHasStats, itemSlot: ItemSlot): IRollable {
    return {
      name: `${entity.name} ${itemSlot.name}`,
      getBaseDice: (): DiceType[] => {
        return itemSlot.getBaseDice(
          this.rollableHandler,
          entity
        );
      },
    };
  }
}
  