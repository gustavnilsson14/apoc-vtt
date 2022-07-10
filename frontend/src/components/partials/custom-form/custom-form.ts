import { bindable, EventAggregator, inject } from "aurelia";
import { IError } from "../../../../../contracts/base";
import { BaseForm, IFormSettings } from "../../../../../contracts/form";
import { LoaderModuleType } from "../../../../../contracts/loader";
import { IMessage, MessageFactory, MessageType } from "../../../../../contracts/message";
import { Client } from "../../../infrastructure/client";

@inject(Client, EventAggregator)
export class CustomForm {
  @bindable settings: IFormSettings;
  @bindable result: any = {};
  @bindable data: any;
  @bindable errorText: string;
  @bindable successText: string;
  @bindable onSubmit: any;
  ignoreChanges: boolean = false;
  constructor(private client: Client, private eventAggregator: EventAggregator) {}
  binding(){
    this.ignoreChanges = true;
    this.result = { ...this.data };
    this.ignoreChanges = false;
  }
  resultChanged() {
    if (this.ignoreChanges) return;
    if(this.settings.autoSave != true) return;
    this.submit();
  }
  submit(event: any = null): void {
    if(event) event.preventDefault();
    this.errorText = null;
    this.eventAggregator.subscribeOnce(`${MessageType.ERROR}_${this.settings.controller}`, (message: IMessage) => {
      this.errorText = (message.data as IError).error;
    });
    this.eventAggregator.subscribeOnce(`${MessageType.RESPONSE}_${this.settings.controller}`, (message: IMessage) => {
      this.successText = this.settings.successText;
    });
    const message: IMessage = MessageFactory.clientMessage(
      this.settings.messageType,
      LoaderModuleType.CONTROLLER,
      this.settings.controller,
      this.result
    );
    if(this.onSubmit) this.onSubmit();
    message.validatorName = (this.settings as BaseForm).constructor.name;    
    this.client.send(message);
  }
}
