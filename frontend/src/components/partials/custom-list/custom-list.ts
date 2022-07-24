import { BasePage } from './../../../infrastructure/view';
import { IBatchRequest } from './../../../../../contracts/message';
import { bindable, EventAggregator, inject } from "aurelia";
import { IRequestResponse } from "../../../../../contracts/base";
import { IMessage, MessageFactory, MessageType } from "../../../../../contracts/message";
import { Client } from "../../../infrastructure/client";
import { ICustomListSettings } from "../../../../../contracts/list";

@inject(Client, EventAggregator)
export class CustomList extends BasePage {
  @bindable data: any[] = [];
  @bindable displayData: any[] = [];
  @bindable batchIds: string[];
  @bindable expandedIds: string[] = [];
  @bindable settings: ICustomListSettings;
  constructor(client: Client, private eventAggregator: EventAggregator) {
    super(client);
  }
  binding(){
    this.registerSubscriptions();
    this.setDisplayData();
    if (this.settings.controller == null) return;
    if (this.settings.ignoreLoadOnAttached == true) return;
    const message: IMessage = this.getRequestMessage();
    this.client.send(message);
  }
  async dataChanged():Promise<void>{
    this.setDisplayData();
  }
  async setDisplayData(){
    if(!this.settings.valueConverter){
      this.displayData = this.data;
      return;
    }
    this.displayData = this.settings.valueConverter(this.data);
  }
  getRequestMessage():IMessage{
    if (this.batchIds != null) return MessageFactory.batchRequest(this.settings.controller, { id: null, ids: this.batchIds } as IBatchRequest);
    return MessageFactory.request(this.settings.controller, { id: null });
  }
  batchIdsChanged():void{
    const message: IMessage = MessageFactory.batchRequest(this.settings.controller, { id: null, ids: this.batchIds } as IBatchRequest);
    this.responseSubscription();
    this.client.send(message);
  }
  registerSubscriptions(): void {
    if (this.settings.controller == null) return;
    
    this.responseSubscription();
    if(this.settings.noProvision) return;
    this.subscribeRemote(this.settings.controller);
    this.subscribeLocal(this.eventAggregator.subscribe(`${MessageType.PROVISION}_${this.settings.controller}`, (message: IMessage) => {
      this.data = message.data as unknown as any[];
    }));
  }
  responseSubscription(): void{
    this.subscribeLocal(this.eventAggregator.subscribeOnce(`${MessageType.RESPONSE}_${this.settings.controller}`, (message: IMessage) => {
      this.data = (message.data as IRequestResponse).collection;
    }));
  }
  getItemClass(item: any): string{
    if (this.settings.itemClassKey) return item[this.settings.itemClassKey].toLowerCase();
    return "";
  }
}
