import { IInputSettings } from "./../../../../../contracts/input";
import { bindable, EventAggregator, inject } from "aurelia";
import { IError } from "../../../../../contracts/base";
import { BaseForm, IFormSettings } from "../../../../../contracts/form";
import {
  IMessage,
  MessageFactory,
  MessageType,
} from "../../../../../contracts/message";
import { Client } from "../../../infrastructure/client";
import { BasePage } from "../../../infrastructure/view";
import { asyncTimeout } from "../../../../../shared/async-timeout"

@inject(Client, EventAggregator)
export class CustomForm extends BasePage {
  @bindable settings: IFormSettings;
  @bindable result: any = {};
  @bindable newResult: any = {};
  @bindable data: any;
  @bindable errorText: string;
  @bindable successText: string;
  @bindable onSubmit: any;
  ignoreChanges: boolean = false;
  autoSaveFrequencyIntervalTimeout: NodeJS.Timeout;
  constructor(client: Client, private eventAggregator: EventAggregator) {
    super(client);
  }
  binding() {
    this.setResult(this.data);
    if (!this.result.id) return;
    if (this.settings.noSubscription) return;

    this.subscribeRemote(this.settings.controller, (this.result as any).id);
    this.subscribeLocal(
      this.eventAggregator.subscribe(
        `${MessageType.PROVISION}_${this.settings.controller}_${
          (this.result as any).id
        }`,
        (message: IMessage) => {
          this.data = message.data;
          this.setNewResult(this.data);
        }
      )
    );
  }
  async setResult(data: any): Promise<void> {
    this.ignoreChanges = true;
    this.result = { ...data };
    await asyncTimeout(1);
    this.ignoreChanges = false;
  }
  async setNewResult(data: any): Promise<void> {
    if (this.newResult) {
      /*
      EFFECTIVELY IGNORES NEW PACKAGES IF ANOTHER PACKAGE IS ALREADY PROCESSED
      THIS DOES DISCARD TO PACKAGE UNFORTUNATELY
      */
      return;
    }
    this.newResult = data;
    await this.setResult(data);
    this.newResult = null;
  }
  
  async resultChanged() {
    this.data = { ...this.result };
    if (this.ignoreChanges) return;
    if (this.settings.autoSave != true) return;
    if (this.handleFrequency()) return;
    this.submit();
  }
  handleFrequency(): boolean {
    if (!this.settings.autoSaveFrequency) return false;
    if (this.autoSaveFrequencyIntervalTimeout != null) return false;
    this.ignoreChanges = true;
    this.autoSaveFrequencyIntervalTimeout = setTimeout(() => {
      this.ignoreChanges = false;
      this.submit();
      this.autoSaveFrequencyIntervalTimeout = null;
    }, this.settings.autoSaveFrequency * 1000);
    return true;
  }
  submit(event: any = null): void {
    if (event) event.preventDefault();
    if (this.settings.noSave) return;
    this.subscribeOnceToResponse();
    const message: IMessage = MessageFactory.clientMessage(
      this.settings.messageType,
      this.settings.controller,
      this.result
    );
    if (this.onSubmit) this.onSubmit();
    message.validatorName = (this.settings as BaseForm).constructor.name;
    this.client.send(message);
  }
  subscribeOnceToResponse() {
    this.errorText = null;
    this.eventAggregator.subscribeOnce(
      `${MessageType.ERROR}_${this.settings.controller}`,
      (message: IMessage) => {
        this.errorText = (message.data as IError).error;
      }
    );
    this.eventAggregator.subscribeOnce(
      `${MessageType.RESPONSE}_${this.settings.controller}`,
      (message: IMessage) => {
        this.successText = this.settings.successText;
      }
    );
  }
  @bindable onInputClick(settings: IInputSettings, result: any): void {
    if (!this.settings.onInputClick) return;
    this.settings.onInputClick(settings, result);
  }
  @bindable onInputContext(settings: IInputSettings, result: any): void {
    if (!this.settings.onInputContext) return;
    this.settings.onInputContext(settings, result);
  }
  @bindable onLabelClick(settings: IInputSettings, result: any): void {
    if (!this.settings.onLabelClick) return;
    this.settings.onLabelClick(settings, result);
  }
  @bindable onLabelContext(settings: IInputSettings, result: any): void {
    if (!this.settings.onLabelContext) return;
    this.settings.onLabelContext(settings, result);
  }
}
