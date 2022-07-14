import { bindable, EventAggregator, inject } from "aurelia";
import { IUserSession } from "../../../../../contracts/controllers/user";
import { IFormSettings } from "../../../../../contracts/form";
import { ProfileForm } from "../../../../../contracts/forms/user";
import { IMessage, MessageType } from "../../../../../contracts/message";
import { Client } from "../../../infrastructure/client";

@inject(Client, EventAggregator)
export class Profile {
  @bindable profileFormResult: any = {};
  @bindable profileFormData: any = {};
  @bindable profileSettings: IFormSettings = new ProfileForm();
  constructor(private client: Client, private eventAggregator: EventAggregator) {}
  binding():void{
    setTimeout(() => {
      this.profileFormResult = { ...this.client.userSession.user };
      this.profileFormData = { ...this.client.userSession.user };
      this.profileSettings = { ...this.profileSettings };
    }, 5);
  }
}
