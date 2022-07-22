import { IBase } from "../contracts/base";

export interface ISession extends IBase {
  socket: any;
  view: IView;
}
export interface IView {
  name: string;
  subViews?: IView[];
}
export const cookieTTL = 1;

export function setCookie(name: string, val: string) {
  const date = new Date();
  const value = val;
  date.setTime(date.getTime() + (cookieTTL * 24 * 60 * 60 * 1000));
  document.cookie = `${name}=${value}; expires=${date.toUTCString()}; path=/`;
}

export function getCookie(name: string) {
  const value: string = "; " + document.cookie;
  const parts: string[] = value.split("; " + name + "=");
  if (parts.length != 2) return "";
  return parts.pop().split(";").shift();
}