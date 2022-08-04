import { Guid } from "../../shared/guid";
import { ISession } from "../../shared/session";
import { BaseController } from "../controller";
import { IMessage, MessageFactory } from "../message";
import { CalendarDateType, ICalendarDate } from "../models/calendar-date";
export class CalendarDateController extends BaseController {
  public setCollection(collection: any[]): void {
    super.setCollection(collection);
    const now: ICalendarDate | undefined = this.collection.find(
      (x) => (x as ICalendarDate).type == CalendarDateType.NOW
    ) as ICalendarDate | undefined;
    if (now != undefined) return;
    this.collection.push({
      id: Guid.newGuid(),
      type: CalendarDateType.NOW,
      date: new Date("04 Dec 241"),
      time: -1,
    } as ICalendarDate);
  }
  public edit(session: ISession, message: IMessage): IMessage {
    if (!this.validateNow(session, message))
      return MessageFactory.error("Wrong id for NOW", message, this);
    return super.edit(session, message);
  }
  public validateNow(session: ISession, message: IMessage): boolean {
    const now = this.collection.find(
      (x) => (x as ICalendarDate).type == CalendarDateType.NOW
    );
    if (now == undefined) return false;
    return now.id == message.data.id;
  }
}
