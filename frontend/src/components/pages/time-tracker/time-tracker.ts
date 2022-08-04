import { bindable, EventAggregator, inject } from "aurelia";
import { BasePage } from "../../../infrastructure/view";
import { CalendarDateController } from "../../../../../contracts/controllers/calendar-date";
import { Client } from "../../../infrastructure/client";
import {
  IMessage,
  MessageFactory,
  MessageType,
} from "../../../../../contracts/message";
import {
  CalendarDateType,
  ICalendarDate,
} from "../../../../../contracts/models/calendar-date";

@inject(Client, EventAggregator)
export class TimeTracker extends BasePage {
  @bindable now: ICalendarDate;
  @bindable allDates: ICalendarDate[];
  @bindable timeSlots = Array(8);
  @bindable currentTime: number = -1;
  @bindable date: Date = new Date("04 Dec 241");
  @bindable dateString = "";
  @bindable timeTitles: string[] = [
    "Dawn",
    "Morning",
    "Noon",
    "Afternoon",
    "Late afternoon",
    "Evening",
    "Dusk",
    "Night",
    "Midnight",
  ];
  constructor(public client: Client, private eventAggregator: EventAggregator) {
    super(client);
  }
  binding(): void {
    this.eventAggregator.subscribeOnce(
      `${MessageType.RESPONSE}_${CalendarDateController.name}`,
      (message: IMessage) => {
        this.handleNewDates((message.data as any).collection);
      }
    );

    this.client.send(
      MessageFactory.request(CalendarDateController.name, { id: "" })
    );
    this.subscribeLocal(
      this.eventAggregator.subscribe(
        `${MessageType.PROVISION}_${CalendarDateController.name}`,
        (message: IMessage) => {
          this.handleNewDates(message.data as any);
        }
      )
    );
    this.subscribeRemote(CalendarDateController.name);

  }
  handleNewDates(data: ICalendarDate[]) {
    this.allDates = data;
    this.now = this.allDates.find((x) => x.type == CalendarDateType.NOW);
  }
  nowChanged(): void {
    this.currentTime = this.now.time;
    this.date = new Date(this.now.date);
  }
  dateChanged():void{
    this.dateString = this.getDateString();
  }
  getDateString(): string {
    const weekday = new Intl.DateTimeFormat("en-GB", {
      day: "numeric",
      weekday: "long",
    }).format(this.date);
    const monthAndYear = new Intl.DateTimeFormat("en-GB", {
      month: "long",
      year: "numeric",
    }).format(this.date);
    return `${weekday} ${monthAndYear.replace(/(^| )0+/g, "$1")} PC`;
  }
  setTime(time: number): void {
    if (this.currentTime >= time) {
      this.currentTime = time - 1;
      if (this.currentTime == -1) {
        this.incrementDate();
        this.sendNewNow();
      }
      return;
    }
    this.currentTime = time;
    this.sendNewNow();
  }
  sendNewNow():void{
    const newNow = {...this.now};
    newNow.time = this.currentTime;
    newNow.date = this.date;
    this.client.send(MessageFactory.edit(CalendarDateController.name, newNow));
  }
  incrementDate() {
    this.date.setDate(this.date.getDate() + 1);
  }
}
