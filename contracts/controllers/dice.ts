import { EventPipeline } from "../../shared/event";
import { Guid } from "../../shared/guid";
import { ISession } from "../../shared/session";
import { IMessage, MessageFactory } from "../message";
import { IRollableResultData } from "../models/dice";
import { MyController } from "./mycontroller";
import { IUserSession } from "./user";
export class DiceController extends MyController {
  public add(session: ISession, message: IMessage): IMessage {
    this.collection = (this.collection as any[]).filter((result: IRollableResultData)=>{
      if(!result.lastChanged) return false;
      return new Date(result.lastChanged).getTime() + (5 * 60 * 1000) > new Date().getTime(); 
    });
    return super.add(session, message);
  }
}
