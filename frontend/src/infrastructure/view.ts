import { MessageFactory } from './../../../contracts/message';
import { Client } from './client';
import { inject } from "aurelia";

export enum ModelViewState {
  LIST = "list",
  FORM = "form",
  ADD = "add",
  EDIT = "edit",
}

@inject(Client)
export class BasePage{
  localSubscriptions: any[] = [];
  remoteSubscriptions: any[] = [];

  constructor(public client: Client){}
  public detaching(){
    this.unSubscribeLocal();
    this.unSubscribeRemote();
  }
  public subscribeLocal(subscription: any){
    this.localSubscriptions.push(subscription);
  }
  public subscribeRemote(key: string){
    this.client.send(MessageFactory.subscribe(key));
    this.remoteSubscriptions.push(key);
  }
  public unSubscribeLocal() {
    this.localSubscriptions.forEach(subscription=>{
      subscription.dispose();
    });
    this.localSubscriptions = [];
  }
  public unSubscribeRemote() {
    this.remoteSubscriptions.forEach(remoteSubscription => {
      this.client.send(MessageFactory.unsubscribe(remoteSubscription));
    });
  }
}