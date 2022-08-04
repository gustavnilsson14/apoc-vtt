import { UserController, IUserSession } from './../../contracts/controllers/user';
import * as WebSocket from "ws";
import { ILoaderModule, LoaderModuleType } from "../../contracts/loader";
import { IMessage, MessageFactory, MessageType } from "../../contracts/message";
import { MyLoader } from "./loader";
import { ISession } from "../../shared/session";
import { Guid } from "../../shared/guid";
import { IFormSettings } from "../../contracts/form";
import { BaseController } from '../../contracts/controller';
import { IError } from '../../contracts/base';

export class App {
  public clients: ISession[] = [];
  public sessionHandler: ILoaderModule;
  public user: any;
  constructor() {
    const sessionHandler = MyLoader.I.getModule(LoaderModuleType.CONTROLLER, "UserController");
    if (sessionHandler == null) return;
    this.sessionHandler = sessionHandler;
  }

  public addClient(ws: WebSocket) {
    const session: ISession = {
      id: Guid.newGuid(),
      socket: ws,
      view: {
        name: "login",
      },
    };
    this.clients.push(session);
    const message: IMessage = MessageFactory.message(MessageType.SESSION, this.sessionHandler, { ...session });
    this.send(session, message);

    ws.on("message", async (data, isBinary: boolean) => {
      const message: any = JSON.parse(data.toString());
      const session: ISession | undefined = this.clients.find((s) => s.socket == ws);
      if (session == undefined) return;
      await this.messageRecieved(session, message as IMessage);
    });
    ws.on("close", (event) => {
      const session: ISession | undefined = this.clients.find((s) => s.socket == ws);
      if (session == undefined) return;
      this.connectionClosed(session);
      this.clients = this.clients.filter((s) => s != session);
    });
  }
  private async messageRecieved(session: ISession, message: IMessage) {
    const iLoaderModule: ILoaderModule | null = MyLoader.I.getModule(LoaderModuleType.CONTROLLER, message.handlerName);
    
    if (iLoaderModule == null) {
      console.log(`iLoaderModule == null, ${JSON.stringify(message)}`);
      const error: IMessage = {
        timestamp: new Date(),
        type: message.type,
        handlerName: message.handlerName,
        data: {
          id: Guid.newGuid(),
          error: "No such module",
          originalMessage: message,
        } as IError,
      };
      await this.send(session, error);
      return;
    }
    const validationResult: IMessage | null = this.validate(message, iLoaderModule);
    
    if (validationResult != null) {
      this.send(session, validationResult);
      return;
    }
    const response: IMessage = iLoaderModule.handleMessage(message, session)
    await this.send(session, response);
    MyLoader.I.saveAll();
  }
  validate(message: IMessage, iLoaderModule: ILoaderModule): IMessage | null {
    if (!message.validatorName) return null;
    const form: IFormSettings | null = MyLoader.I.getModule(LoaderModuleType.FORM, message.validatorName) as IFormSettings | null;
    if (form == null) return null;
    const errors: string[] = form.validate(message);
    if (errors.length == 0) return null;
    return MessageFactory.error(errors.join(", "), message, iLoaderModule);
  }
  private connectionClosed(session: ISession): void {
    const userController: UserController | null = MyLoader.I.getModule(LoaderModuleType.CONTROLLER, "UserController") as UserController | null;
    if(!userController) return;
    userController.setConnectedStatus(session as IUserSession, false);
  }
  private send(session: ISession, message: IMessage | null): void {
    if (message == null) return;
    if ((message.data as ISession).socket != null) {
      (message.data as ISession).socket = null;
    }
    session.socket.send(JSON.stringify(message));
  }
}
