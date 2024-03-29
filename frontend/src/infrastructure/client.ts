import { BasePage } from './view';
import { UserController } from './../../../contracts/controllers/user';
import { MessageFactory } from './../../../contracts/message';
import { IUser } from './../../../contracts/models/user';
import { EventAggregator, inject, observable } from "aurelia";
import { IUserSession } from "../../../contracts/controllers/user";
import { IMessage, MessageType } from "../../../contracts/message";
import { ICookieLogin } from "../../../contracts/models/user";
import { getCookie, setCookie } from "../../../shared/session";
import { asyncTimeout } from '../../../shared/async-timeout';

export enum ENV{
  "DEVELOPMENT",
  "PRODUCTION"
}

@inject(EventAggregator)
export class Client extends BasePage{
  public environment: ENV = ENV.DEVELOPMENT;
  private devHost: string = "localhost";
  private prodHost: string = "185.229.225.204";
  private port: number = 8080;
  private ignoreChanges: boolean = false;
  private webSocket: WebSocket;
  public userSession: IUserSession;

  @observable public user: IUser;
  newUser: IUser;

  constructor(private eventAggregator: EventAggregator) {
    super(null);
    this.client = this;
    this.eventAggregator.subscribe(`${MessageType.SESSION}_UserController`, (message: IMessage) => {
      this.userSession = message.data as IUserSession;
      if(!this.userSession.user) return;
      this.setUser(this.userSession.user);
      this.subscribeRemote("UserController", this.user.id);
      this.subscribeLocal(this.eventAggregator.subscribe(`${MessageType.PROVISION}_UserController_${this.user.id}`, (message: IMessage) => {
        this.setUser(message.data as IUser);
        this.eventAggregator.publish("ClientUserChanged");
      }));
      setCookie('cookie', this.userSession.user.cookie);
    });
  }
  async setUser(user: IUser):Promise<void>{
    this.ignoreChanges = true;
    this.user = user;
    await asyncTimeout(5);
    this.ignoreChanges = false;
  }
  async setNewUser(user: IUser){
    if(this.newUser) return;
    this.newUser = user;
    await this.setUser(user);
    this.newUser = null;
  }
  connect() {
    try {
      this.attachSocket();
    } catch (error) {
      console.log(`No connection, retrying`);
      setTimeout(()=>{
        this.connect();
      },1000);
    }
  }
  getHost():string{
    if(this.environment == ENV.DEVELOPMENT) return this.devHost;
    return this.prodHost;
  }
  attachSocket() {
    const cookie = getCookie('cookie');
    
    const host = this.getHost();
    
    this.webSocket = new WebSocket(`ws://${host}:${this.port}`);
    this.webSocket.onmessage = (event) => {
      const message: IMessage = JSON.parse(event.data);
      if (message.type == MessageType.ERROR) {
        console.error(message);
      }
      this.eventAggregator.publish(`${message.type}_${message.handlerName}`, message);
    };
    this.webSocket.onclose = () => {
      this.connect();
    }
    this.webSocket.onerror = function (event) {
      console.error("ERROR", event);
    };
    if(!cookie) return;// || this.environment == ENV.DEVELOPMENT) return;
    this.webSocket.onopen = () => {
      this.send({
        timestamp: new Date(),
        type: MessageType.LOGIN,
        handlerName: "UserController",
        data: {
          id: "",
          cookie: cookie
        } as ICookieLogin,
      } as IMessage);
    };
  }

  public userChanged():Promise<void>{
    if (this.ignoreChanges) {
      return;
    }
    this.send(MessageFactory.edit(UserController.name, this.user));
  }

  public send(message: IMessage) {
    this.webSocket.send(JSON.stringify(message));
  }
}
