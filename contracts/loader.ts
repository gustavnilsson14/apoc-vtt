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
  loaderObject: any;
  handleMessage(message: IMessage, session: ISession): IMessage;
}
export class BaseLoaderModule implements ILoaderModule{
  name: string;
  loaderModuleType: LoaderModuleType;
  loaderObject: any;
  constructor(loaderObject: any = null){
    this.loaderObject = loaderObject;
  }
  handleMessage(message: IMessage, session: ISession): IMessage {
    throw new Error("Method not implemented.");
  }

}
export interface IController extends ILoaderModule {
  collection: IModel[];
  add(session: ISession, message: IMessage): IMessage;
  edit(session: ISession, message: IMessage): IMessage;
  remove(session: ISession, message: IMessage): IMessage;
  request(session: ISession, message: IMessage): IMessage;
  getItem(id: string): IBase | null;
  setCollection(collection: any[]): void;
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
