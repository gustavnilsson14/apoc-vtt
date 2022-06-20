import { IController, ILoaderModule, LoaderModuleType } from "../contracts/loader";
import { EventPipeline } from "../shared/event";
import { Guid } from "../shared/guid";
import { ISession } from "../shared/session";
import { IBase, IRequestResponse } from "./base";
import { IMessage, MessageFactory, MessageType } from "./message";
import { IModel } from "./model";

export class BaseController implements ILoaderModule, IController {
  public name: string;
  public loaderModuleType: LoaderModuleType;
  public static iLoaderModuleType: LoaderModuleType = LoaderModuleType.CONTROLLER;
  public collection: IModel[] = [];
  constructor() {
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
    }
    if (response == null) return MessageFactory.error("invalid request", message, this);
    EventPipeline.I.publish(this.constructor.name, this.collection);
    return response;
  }
  public add(session: ISession, message: IMessage): IMessage {
    const existing: any = this.collection.find((item) => message.data.id == item.id);
    if (existing) {
      return MessageFactory.error("User already exists", message, this);
    }
    message.data.id = Guid.newGuid();
    message.data.lastChanged = new Date();
    this.collection.push(message.data);
    return MessageFactory.response(this, message.data);
  }
  public edit(session: ISession, message: IMessage): IMessage {
    const existing: any | null = this.getItem(message.data.id);
    if (!existing) {
      return MessageFactory.error("User does not exist", message, this);
    }
    Object.keys(message.data).forEach((key) => {
      existing[key] = (message.data as any)[key];
    });
    existing.lastChanged = new Date();
    return MessageFactory.response(this, existing);
  }
  public remove(session: ISession, message: IMessage): IMessage {
    const existing: any | null = this.getItem(message.data.id);
    if (!existing) {
      return MessageFactory.error("User does not exist", message, this);
    }
    this.collection = this.collection.filter((item) => item.id != message.data.id);
    return MessageFactory.response(this, existing);
  }
  public request(session: ISession, message: IMessage): IMessage {
    return MessageFactory.response(this, {
      id: Guid.newGuid(),
      collection: this.getItemsForRequest(session, message),
    } as IRequestResponse);
  }
  public getItem(id: string): IBase | null {
    const item: IBase | undefined = this.collection.find((x) => x.id == id);
    if (item == undefined) return null;
    return item;
  }
  public getItemsForRequest(session: ISession, message: IMessage): IBase[] {
    if (message.data.id == null) return this.collection;
    return this.collection.filter((x) => x.id == message.data.id);
  }
}
