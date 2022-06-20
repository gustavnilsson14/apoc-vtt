import { EventPipeline } from "../shared/event";
import { ISession } from "../shared/session";
import { ILoaderModule, IProvider, ISubscription, LoaderModuleType, SubscriptionFactory } from "./loader";
import { IMessage, MessageFactory, MessageType } from "./message";
import { Guid } from "../shared/guid";

export class BaseProvider implements ILoaderModule, IProvider {
  public name: string;
  public subscribers: ISubscription[] = [];
  public loaderModuleType: LoaderModuleType;
  public static iLoaderModuleType: LoaderModuleType = LoaderModuleType.PROVIDER;

  constructor() {
    this.name = this.constructor.name;
  }
  handleMessage(message: IMessage, session: ISession): IMessage {
    const providedSubscription: ISubscription = SubscriptionFactory.subscription(message.handlerName, session);
    switch (message.type) {
      case MessageType.SUBSCRIBE:
        return this.subscribe(providedSubscription, message);
      case MessageType.UNSUBSCRIBE:
        return this.unSubsribe(providedSubscription, message);
    }
    return MessageFactory.error("Wrong message type for Provider", message, this);
  }
  subscribe(subscription: ISubscription, originalMessage: IMessage): IMessage {
    subscription.id = EventPipeline.I.subscribe(subscription.key, originalMessage.handlerName, this.broadcast.bind(this));
    this.subscribers.push(subscription);
    return MessageFactory.response(this, {
      id: Guid.newGuid(),
    });
  }
  unSubsribe(subscription: ISubscription, originalMessage: IMessage): IMessage {
    console.log("subscription", subscription);
    const subToRemove: ISubscription | undefined = this.subscribers.find((subscriber) => {
      return subscriber.key == subscription.key && subscriber.session.id == subscription.session.id;
    });
    console.log("subToRemove", subToRemove);

    if (subToRemove == undefined) return MessageFactory.error("No such subscription", originalMessage, this);
    this.subscribers = this.subscribers.filter((s) => s.id != subToRemove.id);
    return MessageFactory.response(this, {
      id: Guid.newGuid(),
    });
  }
  unSubsribeAll(session: ISession): void {
    this.subscribers = this.subscribers.filter((subscriber) => subscriber.session.id != session.id);
  }
  broadcast(key: string, data: any): void {
    const message: IMessage = MessageFactory.provide(key, data);
    this.subscribers
      .filter((s) => s.key == key)
      .forEach((subscriber) => {
        subscriber.session.socket.send(JSON.stringify(message));
      });
  }
}
