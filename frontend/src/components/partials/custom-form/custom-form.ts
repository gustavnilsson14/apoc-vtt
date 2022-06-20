import { bindable, EventAggregator, inject } from "aurelia";
import { IError } from "../../../../../contracts/base";
import { BaseForm, IFormSettings } from "../../../../../contracts/form";
import { LoaderModuleType } from "../../../../../contracts/loader";
import { IMessage, MessageFactory, MessageType } from "../../../../../contracts/message";
import { Client } from "../../../infrastructure/client";

@inject(Client, EventAggregator)
export class CustomForm {
  @bindable settings: IFormSettings;
  @bindable result: any;
  @bindable data: any;
  @bindable errorText: string;
  @bindable successText: string;
  constructor(private client: Client, private eventAggregator: EventAggregator) {}
  dataChanged() {
    this.result = { ...this.data };
  }
  submit(event): void {
    event.preventDefault();
    this.errorText = null;
    this.eventAggregator.subscribeOnce(`${MessageType.ERROR}_UserController`, (message: IMessage) => {
      this.errorText = (message.data as IError).error;
    });
    this.eventAggregator.subscribeOnce(`${MessageType.RESPONSE}_UserController`, (message: IMessage) => {
      this.successText = this.settings.successText;
    });
    const message: IMessage = MessageFactory.clientMessage(
      this.settings.messageType,
      LoaderModuleType.CONTROLLER,
      this.settings.controller,
      this.result
    );
    message.validatorName = (this.settings as BaseForm).constructor.name;
    this.client.send(message);
  }
}
