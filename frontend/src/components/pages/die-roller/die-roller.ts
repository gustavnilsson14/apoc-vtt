import { bindable, EventAggregator, inject } from "aurelia";
import { IMessage, MessageFactory, MessageType } from "../../../../../contracts/message";
import { getRandomInt } from "../../../../../shared/random";
import { Client } from "../../../infrastructure/client";
import { Guid } from "../../../../../shared/guid";
import { LoaderModuleType } from "../../../../../contracts/loader";
import { DiceController } from "../../../../../contracts/controllers/dice";
import { DiceType, IDiceResult } from "../../../../../contracts/models/dice";

@inject(Client, EventAggregator)
export class DieRoller {
  @bindable dice: DiceType[] = [];
  @bindable results: number[] = [];
  @bindable totalResult: number = 0;
  @bindable othersResults: IDiceResult[] = [];
  interval: any;
  constructor(private client: Client, private eventAggregator: EventAggregator) {
    this.client.send(MessageFactory.subscribe(DiceController.name));
    this.eventAggregator.subscribe(`${MessageType.PROVISION}_${DiceController.name}`, (message: IMessage) => {
      this.othersResults.unshift(message.data as IDiceResult);
      this.othersResults = this.othersResults.slice(0, 5);
    });
  }
  addDie(diceType: DiceType): void {
    this.dice = [...this.dice, diceType];
    this.results = [...this.results, 1];
  }
  clear(): void {
    this.results = [];
    this.dice = [];
  }
  rollAll(): void {
    clearInterval(this.interval);
    let i: number = 10;
    this.interval = setInterval(() => {
      const newResults = [];
      this.dice.forEach((x) => {
        newResults.push(this.rollDie(x));
      });
      this.results = newResults;
      i--;
      if (i <= 0) this.rollDone();
    }, 80);
  }
  rollDone() {
    clearInterval(this.interval);
    const result: IDiceResult = {
      id: Guid.newGuid(),
      diceRolled: this.dice,
      results: this.results,
      totalResult: this.totalResult,
    };
    const message = MessageFactory.clientMessage(MessageType.BROADCAST, LoaderModuleType.CONTROLLER, DiceController.name, result);
    this.client.send(message);
  }
  rollDie(diceType: DiceType): number {
    switch (diceType) {
      case DiceType.D4:
        return getRandomInt(1, 4);
      case DiceType.D6:
        return getRandomInt(1, 6);
      case DiceType.D8:
        return getRandomInt(1, 8);
      case DiceType.D10:
        return getRandomInt(1, 10);
      case DiceType.D12:
        return getRandomInt(1, 12);
      case DiceType.D20:
        return getRandomInt(1, 20);
    }
  }
  getDieImage(die: DiceType): any {
    return require(`../../../assets/img/dice/${die.toLowerCase()}.png`);
  }
  resultsChanged(): void {
    this.totalResult = this.results.reduce((a, b) => {
      return a + b;
    }, 0);
  }
}
