import { IHasStats } from "./../../../../contracts/stats";
import { IGameEntity } from "./../../../../contracts/models/entity";
import { inject, EventAggregator } from "aurelia";
import { IInputSettings } from "../../../../contracts/input";
import { IRollable, RollableHandler } from "../../../../shared/random";
import { DiceType } from "../../../../contracts/models/dice";
import { IItem, ItemType, StatType } from "../../../../collections/items";
import { IHenchman } from "../../../../contracts/models/asset";

@inject(EventAggregator, RollableHandler)
export class DiceHelper {
  handleCustomRoll(entity: string, action: string, dice: DiceType[]) {
    this.eventAggregator.publish(
      "DIE_ROLL",
      this.rollableHandler.rollDefault( {
        name: `${entity} ${action}`,
        getBaseDice: (): DiceType[] => dice,
      })
    );
  }
  constructor(
    private eventAggregator: EventAggregator,
    private rollableHandler: RollableHandler
  ) {}
  public handleStatRoll(settings: IInputSettings, result: any) {
    this.eventAggregator.publish("CONTEXT_MENU_SET", [
      {
        label: "Roll",
        callback: () => {
          this.handleDefaultStatRoll(settings, result);
        },
      },
      {
        label: "Roll with advantage",
        callback: () => {
          this.handleAdvantageStatRoll(settings, result);
        },
      },
      {
        label: "Roll with disadvantage",
        callback: () => {
          this.handleDisadvantageStatRoll(settings, result);
        },
      },
    ]);
  }
  public handleDefaultStatRoll(settings: IInputSettings, result: any) {
    this.eventAggregator.publish(
      "DIE_ROLL",
      this.rollableHandler.rollCheck(this.getStatRollable(settings, result))
    );
  }
  public handleAdvantageStatRoll(settings: IInputSettings, result: any) {
    this.eventAggregator.publish(
      "DIE_ROLL",
      this.rollableHandler.rollCheckWithAdvantage(
        this.getStatRollable(settings, result)
      )
    );
  }
  public handleDisadvantageStatRoll(settings: IInputSettings, result: any) {
    this.eventAggregator.publish(
      "DIE_ROLL",
      this.rollableHandler.rollCheckWithDisdvantage(
        this.getStatRollable(settings, result)
      )
    );
  }
  public getStatRollable(settings: IInputSettings, result: any): IRollable {
    return {
      name: `${result.name} ${settings.key}`,
      difficulty: result[settings.key] as number,
    };
  }
  handleItemRoll(
    item: IItem,
    entity: IGameEntity & IHasStats
  ) {
    if (item.type == ItemType.MAGIC) {
      this.handleMagicRoll(item, entity);
      return;
    }
    this.handleWeaponItemRoll(item, entity);
  }
  handleWeaponItemRoll(item: IItem, entity: IGameEntity & IHasStats) {
    this.eventAggregator.publish("CONTEXT_MENU_SET", [
      {
        label: "Roll",
        callback: () => {
          this.defaultItemRoll(entity, item);
        },
      },
      {
        label: "Roll critical damage",
        callback: () => {
          this.criticalItemRoll(entity, item);
        },
      },
    ]);
  }
  handleMagicRoll(item: IItem, entity: IGameEntity & IHasStats) {
    this.eventAggregator.publish("CONTEXT_MENU_SET", [
      {
        label: "Roll 1D8",
        callback: () => {
          this.magicItemRoll(entity, item, 1);
        },
      },
      {
        label: "Roll 2D8",
        callback: () => {
          this.magicItemRoll(entity, item, 2);
        },
      },
      {
        label: "Roll 3D8",
        callback: () => {
          this.magicItemRoll(entity, item, 3);
        },
      },
      {
        label: "Roll 4D8",
        callback: () => {
          this.magicItemRoll(entity, item, 4);
        },
      },
      {
        label: "Roll 5D8",
        callback: () => {
          this.magicItemRoll(entity, item, 5);
        },
      },
      {
        label: "Roll 6D8",
        callback: () => {
          this.magicItemRoll(entity, item, 6);
        },
      },
      {
        label: "Roll 7D8",
        callback: () => {
          this.magicItemRoll(entity, item, 7);
        },
      },
      {
        label: "Roll 8D8",
        callback: () => {
          this.magicItemRoll(entity, item, 8);
        },
      },
    ]);
  }
  defaultItemRoll(entity: IGameEntity & IHasStats, item: IItem) {
    this.eventAggregator.publish(
      "DIE_ROLL",
      this.rollableHandler.rollDefault(this.getItemRollable(entity, item))
    );
  }
  criticalItemRoll(entity: IGameEntity & IHasStats, item: IItem) {
    this.eventAggregator.publish(
      "DIE_ROLL",
      this.rollableHandler.rollWithCritical(this.getItemRollable(entity, item))
    );
  }
  magicItemRoll(entity: IGameEntity & IHasStats, item: IItem, amount: number) {
    this.eventAggregator.publish(
      "DIE_ROLL",
      this.rollableHandler.rollDefault(this.getMagicRollable(entity, item, amount))
    );
  }
  getItemRollable(entity: IGameEntity & IHasStats, item: IItem): IRollable {
    return {
      name: `${entity.name} ${item.name}`,
      getBaseDice: (): DiceType[] => this.getBaseDice(item, entity),
    };
  }
  getMagicRollable(entity: IGameEntity & IHasStats, item: IItem, amount: number): IRollable {
    return {
      name: `${entity.name} ${item.name}`,
      getBaseDice: (): DiceType[] => Array(amount).fill(DiceType.D8),
    };
  }

  getBaseDice(item: IItem, owner: IHasStats): DiceType[] {
    const result: DiceType[] = [];
    if (item.hasSkill && item.skill) {
      result.push(this.rollableHandler.numberToDieType(item.skill));
    }
    result.push(this.rollableHandler.numberToDieType(owner.level));
    let diceType: DiceType = DiceType.NONE;

    item.stats.forEach((statType, index) => {
      if (statType == StatType.DURABILITY) return;
      if (statType == StatType.EFFECT) {
        diceType = this.rollableHandler.advanceDiceType(diceType);
        return;
      }
      const statPosition = item.stats.length - index - 1;
      if (item.filledSlots > statPosition) return;
      diceType = this.rollableHandler.advanceDiceType(diceType);
    });
    result.push(diceType);
    if (item.type == ItemType.EXPLOSIVE) result.push(diceType);
    return result;
  }
}
