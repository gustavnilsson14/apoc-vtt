import { IModel } from "../model";
export enum CalendarDateType{
  NOW = "NOW",
  PAST = "PAST",
  FUTURE = "FUTURE"
}
export interface ICalendarDate extends IModel {
  type: CalendarDateType;
  date: Date;
  time: number;
}
