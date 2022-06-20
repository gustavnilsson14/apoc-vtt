import { IMessage } from "./message";

export interface IBase {
  id: string;
  lastChanged?: Date;
}
export interface IError extends IBase {
  error: string;
  originalMessage: IMessage;
}
export interface IRequestResponse extends IBase {
  collection: IBase[];
}
