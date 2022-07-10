import { EventAggregator, inject } from "aurelia";
import { MessageType } from "../../contracts/message";
import { ISession, IView } from "../../shared/session";
import { Client } from "./infrastructure/client";

@inject(Client, EventAggregator)
export class MyApp {
  private webSocket: WebSocket;
  private session: ISession;
  private view: IView;
  constructor(private client: Client, private eventAggregator: EventAggregator) {
    this.eventAggregator.subscribe(`${MessageType.SESSION}_UserController`, (session: ISession) => {
      this.session = session;
      this.view = session.view;
    });
    client.connect();
  }
}
