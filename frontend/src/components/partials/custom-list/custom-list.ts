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
  @bindable batchIds: string[];
  @bindable expandedIds: string[] = [];
  @bindable settings: ICustomListSettings;
  constructor(client: Client, private eventAggregator: EventAggregator) {
    super(client);
  }
  binding(){
    this.registerSubscriptions();
    if (this.settings.controller == null) return;
    if (this.settings.ignoreLoadOnAttached == true) return;
    const message: IMessage = this.getRequestMessage();
    this.client.send(message);
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
      this.setData(message.data as unknown as any[]);
    }));
  }
  setData(newData: any[]) {
    console.log("HEY");
    
    if(this.settings.alwaysUpdate == true || this.data == undefined){
      this.data = newData;
      return;
    }
    if (newData == undefined) return;
    if (newData.length == this.data.length) return;
    this.data = newData;
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
