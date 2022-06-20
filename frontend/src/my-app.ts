import { EventAggregator, inject } from "aurelia";
import { MessageType } from "../../contracts/message";
import { ISession, IView } from "../../shared/session";
import { Client } from "./infrastructure/client";

@inject(Client, EventAggregator)
export class MyApp {
  private webSocket: WebSocket;
  private session: ISession;
  private view: IView;
  iftest: boolean = false;
  constructor(private client: Client, private eventAggregator: EventAggregator) {
    this.eventAggregator.subscribe(`${MessageType.SESSION}_UserController`, (session: ISession) => {
      this.session = session;
      this.view = session.view;
    });
    client.connect();
  }
  created(owningView, myView) {
    // Invoked once the component is created...
  }

  attached(argument) {
    // Invoked once the component is attached to the DOM...
  }

  detached(argument) {
    // Invoked when component is detached from the dom
  }

  unbind(argument) {
    // Invoked when component is unbound...
  }
}
