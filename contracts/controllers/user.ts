import { IMessage, MessageFactory, MessageType } from "../message";
import { BaseController } from "../controller";
import { IOwnedItem, IUser, User, UserType } from "../models/user";
import { ISession } from "../../shared/session";
import { IError } from "../base";

export interface IUserError extends IError {}

export interface IUserSession extends ISession {
  user: User;
}

export class UserController extends BaseController {
  public override handleMessage(message: IMessage, session: IUserSession): IMessage {
    if (message.type == MessageType.LOGIN) {
      return this.login(message, session);
    }
    const response: IMessage = super.handleMessage(message, session);
    session.user = this.collection.find((user) => user.id == response.data.id) as User;
    return response;
  }
  public add(session: ISession, message: IMessage): IMessage {
    (message.data as IUser).userType = this.getPlayerType(message);
    return super.add(session, message);
  }
  getPlayerType(message: IMessage): UserType {
    const invite: string = (message.data as any).invite;
    if (invite == "p") return UserType.PLAYER;
    if (invite == "g") return UserType.GM;
    return UserType.NONE;
  }
  private login(message: IMessage, session: IUserSession): IMessage {
    const user: User = this.collection.find((model) => {
      const user: User = model as User;
      if (user.password != (message.data as any).password) return false;
      if (user.email != (message.data as any).email) return false;
      return true;
    }) as User;
    if (user == undefined) {
      return MessageFactory.error("No such user/pass pair", message, this);
    }
    session.user = user;
    session.view = {
      name: "main",
    };
    console.log(MessageFactory.message(MessageType.SESSION, this, { ...session }));
    
    return MessageFactory.message(MessageType.SESSION, this, { ...session });
  }
  public static verifyOwnerShip(session: IUserSession, item: IOwnedItem): boolean {
    return session.user.id == item.userId;
  }
}
