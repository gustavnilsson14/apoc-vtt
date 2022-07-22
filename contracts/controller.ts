import {
  BaseLoaderModule,
  IController,
  ILoaderModule,
  LoaderModuleType,
} from "../contracts/loader";
import { EventPipeline } from "../shared/event";
import { Guid } from "../shared/guid";
import { ISession } from "../shared/session";
import { IBase, IRequestResponse } from "./base";
import {
  IBatchRequest,
  IMessage,
  MessageFactory,
  MessageType,
} from "./message";
import { IModel } from "./model";

export class Subscription{
  key: string;
  id: string;
  session: ISession;
}

export class BaseController
  extends BaseLoaderModule
  implements ILoaderModule, IController
{
  public static iLoaderModuleType: LoaderModuleType =
    LoaderModuleType.CONTROLLER;
  public collection: IModel[] = [];
  public subscriptions: Subscription[] = [];
  constructor(loaderObject: any = null) {
    super(loaderObject);
    this.name = this.constructor.name;
  }
  public handleMessage(message: IMessage, session: ISession): IMessage {
    let response: IMessage | null = null;
    switch (message.type) {
      case MessageType.ADD:
        response = this.add(session, message);
        break;
      case MessageType.EDIT:
        response = this.edit(session, message);
        break;
      case MessageType.REMOVE:
        response = this.remove(session, message);
        break;
      case MessageType.REQUEST:
        response = this.request(session, message);
        break;
      case MessageType.SUBSCRIBE:
        response = this.subscribe(session, message);
        break;
      case MessageType.UNSUBSCRIBE:
        response = this.unsubscribe(session, message);
        break;
    }
    if (response == null)
      return MessageFactory.error("invalid request", message, this);
    EventPipeline.I.publish(this.constructor.name, this.getAllItems());
    this.broadcast(this.getAllItems());
    return response;
  }
  public add(session: ISession, message: IMessage): IMessage {
    const existing: any = this.collection.find(
      (item) => message.data.id == item.id
    );
    if (existing) {
      return MessageFactory.error(
        `Item in ${this.name} collection already exists`,
        message,
        this
      );
    }
    message.data.id = Guid.newGuid();
    message.data.lastChanged = new Date();
    this.collection.push(message.data);
    return MessageFactory.response(this, message.data);
  }
  public edit(session: ISession, message: IMessage): IMessage {
    const existing: any | null = this.getItem(message.data.id);
    if (!existing) {
      return MessageFactory.error(
        `Item in ${this.name} collection does not exist, cannot edit`,
        message,
        this
      );
    }
    Object.keys(message.data).forEach((key) => {
      existing[key] = (message.data as any)[key];
    });
    existing.lastChanged = new Date();
    EventPipeline.I.publish(
      `${this.constructor.name}_${existing.id}`,
      existing
    );
    this.broadcast(existing, existing.id);
    return MessageFactory.response(this, existing);
  }
  public remove(session: ISession, message: IMessage): IMessage {
    const existing: any | null = this.getItem(message.data.id);
    if (!existing) {
      return MessageFactory.error(
        `Item in ${this.name} collection does not exist, cannot remove`,
        message,
        this
      );
    }
    this.collection = this.collection.filter(
      (item) => item.id != message.data.id
    );
    return MessageFactory.response(this, existing);
  }
  public request(session: ISession, message: IMessage): IMessage {
    const responseCollection: IBase[] = this.getItemsForRequest(
      session,
      message
    );
    const response: IMessage = MessageFactory.response(this, {
      id: Guid.newGuid(),
      collection: responseCollection,
    } as IRequestResponse);

    return response;
  }
  public getItem(id: string): IBase | null {
    const item: IBase | undefined = this.collection.find((x) => x.id == id);
    if (item == undefined) return null;
    return item;
  }
  public getItemsForRequest(session: ISession, message: IMessage): IBase[] {
    if (message.data.id == null || message.data.id == "") return this.getAllItems();
    if ((message.data as IBatchRequest).ids != null) {
      const batchRequest: IBatchRequest = message.data as IBatchRequest;
      const result: IBase[] = this.collection.filter(
        (x) => batchRequest.ids.indexOf(x.id) != -1
      );
      return result;
    }
    return this.collection.filter((x) => x.id == message.data.id);
  }
  public getAllItems(): IBase[] {
    return this.collection;
  }
  
  public getSubscriptionKey(session: ISession, id: string = ""):string{
    if(!id) return session.id;
    return `${session.id}_${id}`;
  }
  public subscribe(session: ISession, message: IMessage): IMessage {
    const key = this.getSubscriptionKey(session, message.data.id);
    const existing = this.subscriptions.find(x => x.key == key);
    if (existing) return MessageFactory.error(`Subscription ${key} exists`, message, this);
    this.subscriptions.push({
      key: key,
      session: session,
      id: message.data.id
    });
    return MessageFactory.success(this);
  }
  public unsubscribe(session: ISession, message: IMessage): IMessage | null {
    /*const key = this.getSubscriptionKey(session, message.data.id);
    const existing = this.subscriptions.find(x=> x.key == key);
    if (!existing) return MessageFactory.error(`Subscription ${key} does not exist`, message, this);
    this.subscriptions = this.subscriptions.filter(x => x.key != key);
    */
    return MessageFactory.success(this);
  }
  public broadcast(data: any, id: string = ""): void{
    const message: IMessage = this.getBroadcastMessage(data, id);
    this.subscriptions.filter(x => !x.id == !id).forEach(subscription => {
      subscription.session.socket.send(JSON.stringify(message));
    });
  }
  getBroadcastMessage(data: any, id?: string): IMessage {
    if (!id) return MessageFactory.provide(this.name, this.getAllItems() as any);
    return MessageFactory.provide(`${this.name}_${id}`, data);
  }
}
