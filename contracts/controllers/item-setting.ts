import { BaseController } from "../controller";
import { IMessage, MessageFactory, MessageType } from "../message";
import { UserType } from "../models/user";
import { IUserSession } from "./user";

export class ItemSettingController extends BaseController {
  public override handleMessage(
    message: IMessage,
    session: IUserSession
  ): IMessage {
    if (!session.user)  return MessageFactory.error("No user", message, this);
    if(message.type == MessageType.SUBSCRIBE) return super.handleMessage(message, session);
    if(message.type == MessageType.PROVISION) return super.handleMessage(message, session);
    if(message.type == MessageType.REQUEST) return super.handleMessage(message, session);
    if (session.user.userType != UserType.GM) return MessageFactory.error("GM exclusive controls", message, this);
    return super.handleMessage(message, session);
  }
  
}
