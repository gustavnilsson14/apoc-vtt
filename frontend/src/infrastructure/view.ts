import { MessageFactory } from './../../../contracts/message';
import { Client } from './client';
import { EventAggregator, inject } from "aurelia";

export enum ModelViewState {
  LIST = "list",
  FORM = "form",
  ADD = "add",
  EDIT = "edit",
}

export interface IRemoteSubscription{
  handlerName:string;
id?:string;
}

export class BasePage{
  localSubscriptions: any[] = [];
  remoteSubscriptions: IRemoteSubscription[] = [];

  constructor(public client: Client){}
  public detaching(){
    this.unSubscribeLocal();
    this.unSubscribeRemote();
  }
  public subscribeLocal(subscription: any){
    this.localSubscriptions.push(subscription);
  }
  public subscribeRemote(handlerName: string, id: string = null){
    this.client.send(MessageFactory.subscribe(handlerName, id));
    this.remoteSubscriptions.push({handlerName:handlerName, id: id});
  }
  public unSubscribeLocal() {
    this.localSubscriptions.forEach(subscription=>{
      subscription.dispose();
    });
    this.localSubscriptions = [];
  }
  public unSubscribeRemote() {
    this.remoteSubscriptions.forEach(sub => {
      this.client.send(MessageFactory.unsubscribe(sub.handlerName, sub.id));
    });
  }
}