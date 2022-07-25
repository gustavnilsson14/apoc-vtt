import { ITacticalAction } from './../../../../../collections/tacticalAction';
import { DiceHelper } from './../../../infrastructure/helpers/diceHelper';
import {
  IGameEntity,
  GameEntityType,
} from "./../../../../../contracts/models/entity";
import { EntityController } from "./../../../../../contracts/controllers/entity";
import {
  MessageFactory,
  MessageType,
  IMessage,
} from "./../../../../../contracts/message";
import { EventAggregator } from "aurelia";
import { IRollable } from "./../../../../../shared/random";
import { ICustomListSettings } from "./../../../../../contracts/list";
import {
  CharacterEntityFormSettings,
  GMEnemyFormSettings,
  PlayerEnemyFormSettings,
} from "./../../../../../contracts/forms/entity";
import { IFormSettings } from "./../../../../../contracts/form";
import { bindable, inject } from "aurelia";
import { IAttack, ICreature } from "./../../../../../collections/creatures";
import { BasePage } from "./../../../infrastructure/view";
import { TooltipSourceType } from "../../../infrastructure/tooltip";
import { RollableHandler } from "../../../../../shared/random";
import { Client } from "../../../infrastructure/client";
import { DiceType } from "../../../../../contracts/models/dice";
import { UserType } from "../../../../../contracts/models/user";
import { IInputSettings } from "../../../../../contracts/input";

@inject(Client, EventAggregator, DiceHelper, RollableHandler)
export class CurrentEntities extends BasePage {
  attackListSettings: ICustomListSettings = {
    indexes: [
      {
        label: "Attacks",
        path: "name",
      },
    ],
    ignoreLoadOnAttached: true,
    noProvision: true,
    tooltipSource: TooltipSourceType.PATH,
    tooltipPaths: ["damage", "damageTypes"],
  };
  actionListSettings: ICustomListSettings = {
    indexes: [
      {
        label: "Actions",
        path: "name",
      },
    ],
    ignoreLoadOnAttached: true,
    noProvision: true,
    tooltipSource: TooltipSourceType.PATH,
    tooltipPaths: ["description"],
  };
  gmEnemyFormSettings: IFormSettings = new GMEnemyFormSettings();
  playerEnemyFormSettings: IFormSettings = new PlayerEnemyFormSettings();
  enemyFormSettings: IFormSettings;
  characterEntityFormSettings: IFormSettings =
    new CharacterEntityFormSettings();

  @bindable enemyResult: any = {};
  @bindable enemyData: any = {};
  enemies: IGameEntity[] = [];

  characters: IGameEntity[] = [];

  constructor(
    public client: Client,
    private eventAggregator: EventAggregator,
    private diceHelper: DiceHelper,
    private rollableHandler: RollableHandler
  ) {
    super(client);
  }
  binding() {
    setTimeout(() => {
      this.enemyFormSettings = this.getEnemyFormByUserType();
    }, 100);

    this.eventAggregator.subscribeOnce(
      `${MessageType.RESPONSE}_${EntityController.name}`,
      (message: IMessage) => {
        this.setEntities((message.data as any).collection);
      }
    );
    this.subscribeLocal(
      this.eventAggregator.subscribe(
        `${MessageType.PROVISION}_${EntityController.name}`,
        (message: IMessage) => {
          this.setEntities(message.data as any);
        }
      )
    );
    this.subscribeRemote(EntityController.name);
    this.client.send(MessageFactory.request(EntityController.name, { id: "" }));
  }
  getEnemyFormByUserType(): IFormSettings {
    if (this.client.user.userType == UserType.PLAYER)
      return this.playerEnemyFormSettings;
    this.gmEnemyFormSettings.onLabelContext = (inputSettings: IInputSettings, item: any) => {
      this.diceHelper.handleStatRoll(inputSettings, item);
    }
    return this.gmEnemyFormSettings;
  }
  setEntities(collection: IGameEntity[]) {
    this.characters = collection.filter(
      (character) => character.gameEntityType == GameEntityType.CHARACTER
    );
    const enemies = collection.filter(
      (character) => character.gameEntityType == GameEntityType.ENEMY
    );
    this.enemies = enemies;
  }
  removeEnemy(index: number) {
    this.client.send(
      MessageFactory.remove(EntityController.name, this.enemies[index])
    );
  }
  onAttackContext(entity: IGameEntity, item: any) {
    const rollable: IRollable = {
      name: `${(entity as ICreature).name}:  ${item.name}`,
      getBaseDice: (): DiceType[] => {
        return [...item.damage];
      },
    };
    this.eventAggregator.publish("CONTEXT_MENU_SET", [
      {
        label: "Roll",
        callback: () => {
          this.handleDefaultItemRoll(rollable);
        },
      },
      {
        label: "Roll critical damage",
        callback: () => {
          this.handleCriticalItemRoll(rollable);
        },
      },
    ]);
  }
  handleDefaultItemRoll(rollable: IRollable) {
    this.eventAggregator.publish(
      "DIE_ROLL",
      this.rollableHandler.rollDefault(rollable)
    );
  }
  handleCriticalItemRoll(rollable: IRollable) {
    this.eventAggregator.publish(
      "DIE_ROLL",
      this.rollableHandler.rollWithCritical(rollable)
    );
  }
  getAttackListSettings(entity: IGameEntity): ICustomListSettings {
    return Object.assign(this.attackListSettings, {
      onContext: (attack: IAttack) => {
        this.onAttackContext(entity, attack);
      },
    });
  }
  getActionListSettings(entity: IGameEntity): ICustomListSettings {
    return Object.assign(this.actionListSettings, {
      onContext: (action: ITacticalAction) => {
        if (!action.resultRoll) return;
        this.diceHelper.handleCustomRoll(entity.name, action.name, action.resultRoll);
      },
    });
  }
}
