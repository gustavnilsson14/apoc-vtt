import { Guid } from "./guid";

interface EventSubscription {
  id: string;
  key: string;
  group: string;
  callback: Function;
}
export class EventPipeline {
  public static I: EventPipeline;
  private subscriptions: EventSubscription[] = [];
  constructor() {
    EventPipeline.I = this;
  }
  public subscribe(key: string, group: string, callback: Function): string {
    const existing = this.subscriptions.find((sub) => sub.key == key && sub.group == group);
    if (existing != null) {
      return existing.id;
    }
    const id = Guid.newGuid();
    this.subscriptions.push({
      id: id,
      key: key,
      group: group,
      callback: callback,
    });
    return id;
  }
  public unSubscribe(id: string) {
    this.subscriptions = this.subscriptions.filter((s) => s.id != id);
  }
  public publish(key: string, data: any): void {
    this.subscriptions
      .filter((subscription) => subscription.key == key)
      .forEach((subscription) => {
        subscription.callback(key, data);
      });
  }
}
