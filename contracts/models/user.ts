import { IBase } from './../base';
import { IModel } from "../model";

export enum UserType {
  NONE = "NONE",
  PLAYER = "PLAYER",
  GM = "GM",
}
export interface ICookieLogin extends IBase{
  cookie: string;
}
export interface IUser extends IModel {
  name: string;
  password: string;
  email: string;
  userType: UserType;
  cookie?: string;
  cookieExpiry?: Date;
  selectedCharacterId?: string;
  connected: boolean;
}

export class User implements IUser {
  name: string;
  password: string;
  email: string;
  userType: UserType;
  selectedCharacterId?: string;
  notes: string;
  id: string;
  lastChanged?: Date;
  cookie?: string;
  cookieExpiry?: Date;
  connected: boolean = true;
}
export interface IOwnedItem {
  userId?: string;
  userName?: string;
}
