import { ICookieLogin } from "./../models/user";
import { IMessage, MessageFactory, MessageType } from "../message";
import { BaseController } from "../controller";
import { IOwnedItem, IUser, User, UserType } from "../models/user";
import { ISession } from "../../shared/session";
import { IError } from "../base";
import { Guid } from "../../shared/guid";

export interface IUserError extends IError {}

export interface IUserSession extends ISession {
  user: User;
}

export class UserController extends BaseController {
  public override handleMessage(
    message: IMessage,
    session: IUserSession
  ): IMessage {
    if (message.type == MessageType.LOGIN) {
      return this.login(message, session);
    }
    return super.handleMessage(message, session);
  }
  public add(session: ISession, message: IMessage): IMessage {
    const existingUser: IUser = this.collection.find(user=>{
      return (user as IUser).email == (message.data as IUser).email;
    }) as IUser;
    if (existingUser != null) 
      return MessageFactory.error("User already exists", message, this);
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
    const user: User = this.getUserForLogin(message);
    if (user == undefined) {
      return MessageFactory.error("No such user/pass pair", message, this);
    }
    user.cookie = Guid.newGuid();
    user.cookieExpiry = new Date();
    user.cookieExpiry.setDate(user.cookieExpiry.getDate() + 1);
    user.connected = true;
    session.user = user;
    session.view = {
      name: "main",
    };
    return MessageFactory.message(MessageType.SESSION, this, { ...session });
  }
  getUserForLogin(message: IMessage): User {
    if ((message.data as any).cookie) return this.getUserFromCookie(message);
    return this.collection.find((model) => {
      const user: User = model as User;
      if (user.password != (message.data as any).password) return false;
      if (user.email != (message.data as any).email) return false;
      return true;
    }) as User;
  }
  getUserFromCookie(message: IMessage): User {
    const now: Date = new Date();
    return this.collection.find((model) => {
      const user: User = model as User;
      if (!user.cookie == null || user.cookieExpiry == null) return false;
      if (user.cookie != (message.data as ICookieLogin).cookie) return false;
      if (new Date(user.cookieExpiry).getTime() < now.getTime()) return false;
      return true;
    }) as User;
  }
  setConnectedStatus(session: IUserSession, state: boolean) {
    if (!session.user) return;
    session.user.connected = state;
    this.internalPublish();
  }

  public static verifyOwnerShip(
    session: IUserSession,
    item: IOwnedItem
  ): boolean {
    return session.user.id == item.userId;
  }
}
