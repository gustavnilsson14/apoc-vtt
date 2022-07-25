import { BasePage } from "./../../../infrastructure/view";
import { IRollableResultData } from "./../../../../../contracts/models/dice";
import { IRollableResult } from "./../../../../../shared/random";
import { bindable, EventAggregator, inject } from "aurelia";
import {
  IMessage,
  MessageFactory,
  MessageType,
} from "../../../../../contracts/message";
import { Client } from "../../../infrastructure/client";
import { Guid } from "../../../../../shared/guid";
import { DiceController } from "../../../../../contracts/controllers/dice";
import { DiceType } from "../../../../../contracts/models/dice";

@inject(Client, EventAggregator, Element)
export class DieRoller extends BasePage {
  @bindable dice: DiceType[] = [];
  @bindable otherResults: IRollableResultData[] = [];
  @bindable myResult: IRollableResult | null = null;
  constructor(
    client: Client,
    private eventAggregator: EventAggregator,
    private element: Element
  ) {
    super(client);
  }
  binding() {
    this.subscribeRemote(DiceController.name);
    this.subscribeLocal(
      this.eventAggregator.subscribe(
        `${MessageType.PROVISION}_${DiceController.name}`,
        (message: IMessage) => {
          this.otherResults = [];
          (message.data as any as IRollableResultData[]).forEach(result => {
            this.otherResults.unshift(result);
          });
          this.element.parentElement.scrollTop = 99999;
        }
      )
    );

    this.subscribeLocal(
      this.eventAggregator.subscribe(
        "DIE_ROLL", 
        (rollResult: IRollableResult) => this.sendDieRoll(rollResult)
      )
    );
  }
  sendDieRoll(rollResult: IRollableResult): void {
    this.myResult = rollResult;
    
    const resultData: IRollableResultData = {
      ...rollResult,
      userId: this.client.user.id,
      userName: this.client.user.name,
      id: Guid.newGuid(),
      lastChanged: new Date()
    };
    
    this.client.send(MessageFactory.add(DiceController.name, resultData));
  }

  getDieImage(die: DiceType): any {
    return require(`../../../assets/img/dice/${die.toLowerCase()}.png`);
  }
}
