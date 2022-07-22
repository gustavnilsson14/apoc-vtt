import { BasePage } from './../../../infrastructure/view';
import { bindable, EventAggregator, inject } from "aurelia";
import { IFormSettings } from "../../../../../contracts/form";
import { ProfileForm } from "../../../../../contracts/forms/user";
import { Client } from "../../../infrastructure/client";

@inject(Client, EventAggregator)
export class Profile extends BasePage {
  @bindable profileFormResult: any = {};
  @bindable profileFormData: any = {};
  @bindable profileSettings: IFormSettings = new ProfileForm();
  binding():void{
    setTimeout(() => {
      this.profileFormResult = { ...this.client.user };
      this.profileFormData = { ...this.client.user };
      this.profileSettings = { ...this.profileSettings };
    }, 5);
  }
}
