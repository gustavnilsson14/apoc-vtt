import { IBase } from "../contracts/base";

export interface ISession extends IBase {
  socket: any;
  view: IView;
}
export interface IView {
  name: string;
  subViews?: IView[];
}
