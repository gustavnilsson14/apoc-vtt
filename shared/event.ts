import { Guid } from "./guid";

interface EventSubscription {
  key: string;
  callback: Function;
}
export class EventPipeline {
  public static I: EventPipeline;
  private subscriptions: EventSubscription[] = [];
  constructor() {
    EventPipeline.I = this;
  }
  public subscribe(key: string, callback: Function): void {
    this.subscriptions.push({
      key: key,
      callback: callback,
    });
  }
  public publish(key: string, data: any): void {
    this.subscriptions
      .filter((subscription) => subscription.key == key)
      .forEach((subscription) => {
        subscription.callback(key, data);
      });
  }
}
