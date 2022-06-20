import { bindable, inject } from "aurelia";
import { IFormSettings } from "../../../../../contracts/form";
import { ProfileForm } from "../../../../../contracts/forms/user";
import { Client } from "../../../infrastructure/client";

@inject(Client)
export class Profile {
  @bindable profileFormResult: any = {};
  @bindable profileFormData: any = {};
  @bindable profileSettings: IFormSettings = new ProfileForm();
  constructor(private client: Client) {}
  attached() {
    setTimeout(() => {
      this.profileFormData = this.client.userSession.user;
    }, 1);
  }
}
