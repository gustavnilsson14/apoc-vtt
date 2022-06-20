import { Guid } from "../shared/guid";
import { IBase, IError } from "./base";
import { ILoaderModule, LoaderModuleType } from "./loader";

export enum MessageType {
  NONE = "NONE",
  ADD = "ADD",
  EDIT = "EDIT",
  REMOVE = "REMOVE",
  LOGIN = "LOGIN",
  RESPONSE = "RESPONSE",
  SESSION = "SESSION",
  SUBSCRIBE = "SUBSCRIBE",
  UNSUBSCRIBE = "UNSUBSCRIBE",
  PROVISION = "PROVISION",
  ERROR = "ERROR",
  REQUEST = "REQUEST",
  BROADCAST = "BROADCAST",
}
export interface IMessage {
  timestamp: Date;
  type: MessageType;
  handler: LoaderModuleType;
  handlerName: string;
  validatorName?: string;
  data: IBase;
}
export class MessageFactory {
  public static clientMessage(messageType: MessageType, loaderModuleType: LoaderModuleType, handlerName: string, data: IBase): IMessage {
    return {
      timestamp: new Date(),
      type: messageType,
      handler: loaderModuleType,
      handlerName: handlerName,
      data: data,
    };
  }
  public static message(messageType: MessageType, loaderModule: ILoaderModule, data: IBase): IMessage {
    return MessageFactory.clientMessage(messageType, loaderModule.loaderModuleType, loaderModule.name, data);
  }
  public static response(loaderModule: ILoaderModule, data: IBase): IMessage {
    return MessageFactory.message(MessageType.RESPONSE, loaderModule, data);
  }
  public static provide(handlerName: string, data: IBase): IMessage {
    return MessageFactory.clientMessage(MessageType.PROVISION, LoaderModuleType.PROVIDER, handlerName, data);
  }
  public static error(text: string, originalMessage: IMessage, loaderModule: ILoaderModule): IMessage {
    const error: IError = {
      id: Guid.newGuid(),
      error: text,
      originalMessage: originalMessage,
    } as IError;
    return MessageFactory.message(MessageType.ERROR, loaderModule, error);
  }

  public static request(handlerName: string, data: IBase): IMessage {
    return MessageFactory.clientMessage(MessageType.REQUEST, LoaderModuleType.CONTROLLER, handlerName, data);
  }
  public static subscribe(handlerName: string): IMessage {
    return MessageFactory.clientMessage(MessageType.SUBSCRIBE, LoaderModuleType.PROVIDER, handlerName, { id: "" });
  }
  public static unsubscribe(handlerName: string): IMessage {
    return MessageFactory.clientMessage(MessageType.UNSUBSCRIBE, LoaderModuleType.PROVIDER, handlerName, { id: "" });
  }
  public static broadcast(handlerName: string, data: IBase): IMessage {
    return MessageFactory.clientMessage(MessageType.BROADCAST, LoaderModuleType.PROVIDER, handlerName, data);
  }
}
