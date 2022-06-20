import { bindable, EventAggregator, inject } from "aurelia";
import { LoaderModuleType } from "../../../../../contracts/loader";
import { IMessage, MessageType } from "../../../../../contracts/message";
import { User } from "../../../../../contracts/models/user";
import { Guid } from "../../../../../shared/guid";
import { Client } from "../../../infrastructure/client";

@inject(Client, EventAggregator)
export class Main {
  @bindable private users: User[];
  @bindable private activeTab: string = "user-profile";
  constructor(private client: Client, private eventAggregator: EventAggregator) {
    client.send({
      timestamp: new Date(),
      type: MessageType.SUBSCRIBE,
      handler: LoaderModuleType.PROVIDER,
      handlerName: "UserController",
      data: {
        id: Guid.newGuid(),
      },
    });
    this.eventAggregator.subscribe(`${MessageType.PROVISION}_UserController`, (data: IMessage) => {
      this.users = data.data as unknown as User[];
    });
  }
  onNav(target: string): void {
    this.activeTab = target;
  }
}
