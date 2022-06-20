import { bindable } from "aurelia";
import { LoginForm, RegisterForm } from "../../../../../contracts/forms/user";
import { IFormSettings } from "../../../../../contracts/form";

export class Login {
  @bindable loginFormResult: any = {};
  @bindable registerFormResult: any = {};
  @bindable loginSettings: IFormSettings = new LoginForm();
  @bindable registerSettings: IFormSettings = new RegisterForm();
}
