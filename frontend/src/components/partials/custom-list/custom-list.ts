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
  setData(newData: any[]) {
    if(this.settings.alwaysUpdate == true || this.data == undefined){
      this.data = newData;
      return;
    }
    if (newData == undefined) return;
    if (newData.length == this.data.length) return;
    this.data = newData;
  }
  getRequestMessage():IMessage{
    if (this.batchIds != null) return MessageFactory.batchRequest(this.settings.controller, { id: null, ids: this.batchIds } as IBatchRequest);
    return MessageFactory.request(this.settings.controller, { id: null });
  }
  batchIdsChanged():void{
    const message: IMessage = this.getRequestMessage();
    this.registerResponseSubscription();
    this.client.send(message);
  }
  registerSubscriptions(): void {
    if (this.settings.controller == null) return;
    
    this.registerResponseSubscription();
    if(this.settings.noProvision) return;
    this.registerProvisionSubscriptions();
  }
  registerResponseSubscription(): void{
    this.subscribeLocal(this.eventAggregator.subscribeOnce(`${MessageType.RESPONSE}_${this.settings.controller}`, (message: IMessage) => {
      this.data = (message.data as IRequestResponse).collection;
    }));
  }
  registerProvisionSubscriptions(): void{ 
    if (this.batchIds == null) {
      this.registerProvisionSubscription();
      return;
    }
    this.batchIds.forEach(id=>{
      this.registerProvisionSubscription(id);
    });
  }
  registerProvisionSubscription(id: string = null):void{
    let remoteSubscription = this.settings.controller;
    let localSubscription = `${MessageType.PROVISION}_${this.settings.controller}`;
    if (id) {
      remoteSubscription = `${remoteSubscription}_${id}`
      localSubscription = `${localSubscription}_${id}`
    }
    this.subscribeRemote(remoteSubscription);
    this.subscribeLocal(this.eventAggregator.subscribe(localSubscription, (message: IMessage) => {
      this.setData(message.data as unknown as any[]);
    }));
  }
  getItemClass(item: any): string{
    if (this.settings.itemClassKey) return item[this.settings.itemClassKey].toLowerCase();
    return "";
  }
  getItemGridLength():string{
    return (this.settings.indexes.length + (this.settings.hasDeleteButton ? 1 : 0)).toString();
  }
}
