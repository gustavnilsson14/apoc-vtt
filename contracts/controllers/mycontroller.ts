import { ISession } from "../../shared/session";
import { IBase } from "../base";
import { BaseController } from "../controller";
import { IMessage } from "../message";
import { IOwnedItem, UserType } from "../models/user";
import { IUserSession } from "./user";
export class MyController extends BaseController {
  public getItemsForRequest(session: ISession, message: IMessage): IBase[] {
    const userSession = session as IUserSession;
    const collection = super.getItemsForRequest(session, message);
    return collection.filter((item) => {
      const ownedItem: IOwnedItem = item as IOwnedItem;
      if (userSession.user.userType == UserType.GM) return true;
      return userSession.user.id == ownedItem.userId;
    });
  }
}
