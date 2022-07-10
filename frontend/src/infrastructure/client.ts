import { EventAggregator, inject } from "aurelia";
import { IUserSession } from "../../../contracts/controllers/user";
import { IMessage, MessageType } from "../../../contracts/message";

@inject(EventAggregator)
export class Client {
  private webSocket: WebSocket;
  public userSession: IUserSession;
  constructor(private eventAggregator: EventAggregator) {
    this.eventAggregator.subscribe(`${MessageType.SESSION}_UserController`, (message: IMessage) => {
      this.userSession = message.data as IUserSession;
    });
  }
  connect() {
    this.webSocket = new WebSocket("ws://localhost:8080");
    this.webSocket.onmessage = (event) => {
      const message: IMessage = JSON.parse(event.data);

      if (message.type == MessageType.ERROR) {
        console.error(message);
      }
      this.eventAggregator.publish(`${message.type}_${message.handlerName}`, message);
    };

    this.webSocket.onerror = function (event) {
      console.log("ERROR", event);
    };
  }

  public send(message: IMessage) {
    console.log(message);
    
    this.webSocket.send(JSON.stringify(message));
  }
}
