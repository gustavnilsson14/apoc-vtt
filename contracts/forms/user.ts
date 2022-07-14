import { ILoaderModule } from "../../contracts/loader";
import { UserController } from "../controllers/user";
import { BaseForm, IFormSettings } from "../form";
import {
  IInputSettings,
  InputFactory,
  InputSubType,
  InputType,
} from "../input";
import { IMessage, MessageType } from "../message";

const fields: IInputSettings[] = [
  InputFactory.createDefaultInput({
    label: "Email",
    placeholder: "name@example.com",
    key: "email",
    type: InputType.INPUT,
    subType: InputSubType.TEXT,
    validation: (value: any) => {
      if (value == null) return "Please provide your email";
      if (value.length == 0) return "Please provide your email";
      return null;
    },
  }),
  InputFactory.createDefaultInput({
    label: "Password",
    key: "password",
    type: InputType.INPUT,
    subType: InputSubType.PASSWORD,
    validation: (value: any) => {
      if (value == null) return "Passwords should have a length of 3 or longer";
      if (value.length < 1)
        return "Passwords should have a length of 3 or longer";
      return null;
    },
  }),
];

export class LoginForm
  extends BaseForm
  implements ILoaderModule, IFormSettings
{
  messageType: MessageType = MessageType.LOGIN;
  controller: string = UserController.name;
  submitTitle: string = "Login";
  inputs: IInputSettings[] = [...fields];
  label: string = "Login";
  key: string = "loginForm";
  handleMessage(message: IMessage): IMessage {
    throw new Error("Method not implemented.");
  }
}
export class RegisterForm
  extends BaseForm
  implements ILoaderModule, IFormSettings
{
  messageType: MessageType = MessageType.ADD;
  controller: string = UserController.name;
  submitTitle: string = "Register";
  inputs: IInputSettings[] = [...fields];
  label: string = "Register";
  key: string = "registerForm";
  successText: string = "Registration Successful! :D";
  constructor() {
    super();
    const inviteInput = InputFactory.createDefaultInput({
      label: "Invite Code",
      key: "invite",
      type: InputType.INPUT,
      subType: InputSubType.TEXT,
      validation: (value: any) => {
        if (value != "p" && value != "g") return "Bad invite code";
        return null;
      },
    });
    this.inputs.push(inviteInput);
  }
  handleMessage(message: IMessage): IMessage {
    throw new Error("Method not implemented.");
  }
}

const profileFields: IInputSettings[] = [
  InputFactory.createDefaultInput({
    label: "Name",
    placeholder: "Your name please :)",
    key: "name",
    type: InputType.INPUT,
    subType: InputSubType.TEXT,
  }),
];
export class ProfileForm
  extends BaseForm
  implements ILoaderModule, IFormSettings
{
  messageType: MessageType = MessageType.EDIT;
  controller: string = UserController.name;
  submitTitle: string = "Update Profile";
  inputs: IInputSettings[] = [...profileFields];
  label: string = "Profile";
  key: string = "profileForm";
  successText: string = "Data updated";
  constructor() {
    super();
  }
  handleMessage(message: IMessage): IMessage {
    throw new Error("Method not implemented.");
  }
}
