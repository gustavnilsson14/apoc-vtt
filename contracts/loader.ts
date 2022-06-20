import { ISession } from "../shared/session";
import { IMessage } from "../contracts/message";
import { IBase } from "./base";
import { IModel } from "./model";
import { Guid } from "../shared/guid";
export enum LoaderModuleType {
  NONE = 0,
  CONTROLLER = 1,
  PROVIDER = 2,
  FORM = 3,
}

export interface ILoaderModule {
  name: string;
  loaderModuleType: LoaderModuleType;
  handleMessage(message: IMessage, session: ISession): IMessage;
}
export interface IController extends ILoaderModule {
  collection: IModel[];
  add(session: ISession, message: IMessage): IMessage;
  edit(session: ISession, message: IMessage): IMessage;
  remove(session: ISession, message: IMessage): IMessage;
  request(session: ISession, message: IMessage): IMessage;
  getItem(id: string): IBase | null;
}
export interface IProvider {
  subscribers: ISubscription[];
  subscribe(subscription: ISubscription, originalMessage: IMessage): IMessage;
  unSubsribe(subscription: ISubscription, originalMessage: IMessage): IMessage;
  unSubsribeAll(session: ISession): void;
  broadcast(key: string, data: any): void;
}
export interface ISubscription extends IBase {
  key: string;
  session: ISession;
}
export class SubscriptionFactory {
  public static subscription(key: string, session: ISession): ISubscription {
    return {
      id: Guid.newGuid(),
      key: key,
      session: session,
    };
  }
}
