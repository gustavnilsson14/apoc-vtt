import { EventPipeline } from "../../shared/event";
import { Guid } from "../../shared/guid";
import { IMessage, MessageFactory } from "../message";
import { IRollableResultData } from "../models/dice";
import { MyController } from "./mycontroller";
import { IUserSession } from "./user";
export class DiceController extends MyController {
  public override handleMessage(message: IMessage, session: IUserSession): IMessage {
    const broadcastData: IRollableResultData = { ...(message.data as IRollableResultData) };
    if (broadcastData == null) return MessageFactory.error("Nice dice pendeho", message, this);
    broadcastData.userId = session.id;
    broadcastData.userName = session.user.name;
    EventPipeline.I.publish(this.constructor.name, broadcastData);
    return MessageFactory.response(this, { id: Guid.newGuid() });
  }
}
