import { ICharacter } from './character';
import { IModel } from "../model";

export enum UserType {
  NONE = "NONE",
  PLAYER = "PLAYER",
  GM = "GM",
}
export interface IUser extends IModel {
  name: string;
  password: string;
  email: string;
  userType: UserType;
}

export class User implements IUser {
  name: string;
  password: string;
  email: string;
  userType: UserType;
  selectedCharacterId?: string;
  id: string;
  lastChanged?: Date;
}
export interface IOwnedItem {
  userId?: string;
  userName?: string;
}
