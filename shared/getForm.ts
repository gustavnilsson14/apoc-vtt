import { loginForms } from "../contracts/login";
import { IFormSettings } from "./form";

const forms: IFormSettings[] = [...loginForms];
export function getForm(key): IFormSettings {
  return forms.find((form) => form.key == key);
}
