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
  BATCH_REQUEST = "BATCH_REQUEST",
  BATTLE = "BATTLE",
  SUCCESS = "SUCCESS"
}
export interface IBatchRequest extends IBase{
  ids: string[];
}
export interface IMessage {
  timestamp: Date;
  type: MessageType;
  handlerName: string;
  validatorName?: string;
  data: IBase;
}
export class MessageFactory {
  public static clientMessage(messageType: MessageType, handlerName: string, data: IBase): IMessage {
    return {
      timestamp: new Date(),
      type: messageType,
      handlerName: handlerName,
      data: data,
    };
  }
  public static add(handlerName: string, data: IBase): IMessage {
    return this.clientMessage(
      MessageType.ADD,
      handlerName,
      data,
    );
  }
  public static edit(handlerName: string, data: IBase): IMessage {
    return this.clientMessage(
      MessageType.EDIT,
      handlerName,
      data,
    );
  }
  public static remove(handlerName: string, data: IBase): IMessage {
    return this.clientMessage(
      MessageType.REMOVE,
      handlerName,
      data,
    );
  }
  public static message(messageType: MessageType, loaderModule: ILoaderModule, data: IBase): IMessage {
    return MessageFactory.clientMessage(messageType, loaderModule.name, data);
  }
  public static response(loaderModule: ILoaderModule, data: IBase): IMessage {
    return MessageFactory.message(MessageType.RESPONSE, loaderModule, data);
  }
  public static success(loaderModule: ILoaderModule): IMessage {
    return MessageFactory.message(MessageType.SUCCESS, loaderModule, {id:""});
  }
  public static provide(handlerName: string, data: IBase): IMessage {
    return MessageFactory.clientMessage(MessageType.PROVISION, handlerName, data);
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
    return MessageFactory.clientMessage(MessageType.REQUEST, handlerName, data);
  }
  public static batchRequest(handlerName: string, data: IBatchRequest): IMessage {
    return MessageFactory.clientMessage(MessageType.BATCH_REQUEST, handlerName, data);
  }
  public static subscribe(handlerName: string, id: string = ""): IMessage {
    return MessageFactory.clientMessage(MessageType.SUBSCRIBE, handlerName, { id: id });
  }
  public static unsubscribe(handlerName: string, id: string = ""): IMessage {
    return MessageFactory.clientMessage(MessageType.UNSUBSCRIBE,  handlerName, { id: id });
  }
}
