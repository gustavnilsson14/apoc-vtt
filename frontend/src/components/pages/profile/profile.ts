import { BasePage } from './../../../infrastructure/view';
import { bindable, EventAggregator, inject } from "aurelia";
import { IFormSettings } from "../../../../../contracts/form";
import { ProfileForm } from "../../../../../contracts/forms/user";
import { Client } from "../../../infrastructure/client";
import { asyncTimeout } from '../../../../../shared/async-timeout';

@inject(Client, EventAggregator)
export class Profile extends BasePage {
  @bindable profileFormResult: any = {};
  @bindable profileFormData: any = {};
  @bindable profileSettings: IFormSettings = new ProfileForm();
  async binding():Promise<void>{
    await asyncTimeout(5);
    this.profileFormResult = { ...this.client.user };
    this.profileFormData = { ...this.client.user };
    this.profileSettings = { ...this.profileSettings };
  }
}
