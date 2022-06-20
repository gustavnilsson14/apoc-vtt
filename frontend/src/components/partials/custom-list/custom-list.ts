import { bindable, EventAggregator, inject } from "aurelia";
import { IRequestResponse } from "../../../../../contracts/base";
import { IMessage, MessageFactory, MessageType } from "../../../../../contracts/message";
import { Client } from "../../../infrastructure/client";
import { ICustomListSettings } from "../../../../../contracts/list";

@inject(Client, EventAggregator)
export class CustomList {
  @bindable data: any[];
  @bindable settings: ICustomListSettings;
  constructor(private client: Client, private eventAggregator: EventAggregator) {}
  attached() {
    this.registerSubscriptions();
    if (this.settings.controller == null) return;
    const message: IMessage = MessageFactory.request(this.settings.controller, { id: null });
    this.client.send(message);
  }
  registerSubscriptions(): void {
    if (this.settings.controller == null) return;
    this.client.send(MessageFactory.subscribe(this.settings.controller));
    this.eventAggregator.subscribe(`${MessageType.RESPONSE}_${this.settings.controller}`, (message: IMessage) => {
      this.data = (message.data as IRequestResponse).collection;
    });
    this.eventAggregator.subscribe(`${MessageType.PROVISION}_${this.settings.controller}`, (message: IMessage) => {
      this.data = message.data as unknown as any[];
    });
  }
}
