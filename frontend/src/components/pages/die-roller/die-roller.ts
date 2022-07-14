import { BasePage } from './../../../infrastructure/view';
import { IRollableResultData } from './../../../../../contracts/models/dice';
import { IRollableResult } from './../../../../../shared/random';
import { bindable, EventAggregator, inject } from "aurelia";
import { IMessage, MessageFactory, MessageType } from "../../../../../contracts/message";
import { Client } from "../../../infrastructure/client";
import { Guid } from "../../../../../shared/guid";
import { LoaderModuleType } from "../../../../../contracts/loader";
import { DiceController } from "../../../../../contracts/controllers/dice";
import { DiceType } from "../../../../../contracts/models/dice";

@inject(Client, EventAggregator)
export class DieRoller extends BasePage {
  @bindable dice: DiceType[] = [];
  @bindable otherResults: IRollableResultData[] = [];
  @bindable myResult: IRollableResult | null = null;
  constructor(client: Client, private eventAggregator: EventAggregator) {
    super(client);
  }
  binding(){
    this.subscribeRemote(DiceController.name);
    this.subscribeLocal(this.eventAggregator.subscribe(`${MessageType.PROVISION}_${DiceController.name}`, (message: IMessage) => {
      this.otherResults.unshift(message.data as IRollableResultData);
      this.otherResults = this.otherResults.slice(0, 25);
    }));

    this.subscribeLocal(this.eventAggregator.subscribe("DIE_ROLL", (rollResult: IRollableResult) => {
      this.myResult = rollResult;
      const resultData: IRollableResultData = {
        ...rollResult,
        userId: this.client.userSession.user.id,
        userName: this.client.userSession.user.name,
        id: Guid.newGuid()
      };
      this.client.send(MessageFactory.clientMessage(MessageType.BROADCAST, LoaderModuleType.CONTROLLER, DiceController.name, resultData));
    }));
  }
  getDieImage(die: DiceType): any {
    return require(`../../../assets/img/dice/${die.toLowerCase()}.png`);
  }
}
