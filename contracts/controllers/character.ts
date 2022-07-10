import { MyController } from "./mycontroller";
import { IMessage, MessageFactory } from "../message";
import { ICharacter } from "../../contracts/models/character";
import { ISession } from "../../shared/session";
import { IUserSession, UserController } from "./user";

export class CharacterController extends MyController {
  public override add(session: ISession, message: IMessage): IMessage {
    const character: ICharacter = message.data as ICharacter;
    character.userId = (session as IUserSession).user.id;
    message.data = character;
    return super.add(session, message);
  }
  public override edit(session: ISession, message: IMessage): IMessage {
    const character: ICharacter | null = this.getItem(message.data.id) as ICharacter;
    if (character == null) {
      return MessageFactory.error("Character does not exist", message, this);
    }
    if (!UserController.verifyOwnerShip(session as IUserSession, character)) {
      return MessageFactory.error("Character does not belong to you", message, this);
    }
    const submittedCharacter = message.data as ICharacter;
    this.clampEndurance(submittedCharacter, parseInt(character.maxEndurance.toString()));
    message.data = submittedCharacter;
    return super.edit(session, message);
  }
  public override remove(session: ISession, message: IMessage): IMessage {
    const character: ICharacter | null = this.getItem(message.data.id) as ICharacter;
    if (character == null) {
      return MessageFactory.error("Character does not exist", message, this);
    }
    if (!UserController.verifyOwnerShip(session as IUserSession, character)) {
      return MessageFactory.error("Character does not belong to you", message, this);
    }
    return super.remove(session, message);
  }
  public clampEndurance(character: ICharacter, maxEndurance: number){
    if(!character.endurance) return;
    const endurance = parseInt(character.endurance.toString());
    character.endurance = (endurance <= maxEndurance || !endurance) ? endurance : maxEndurance;
  }
}
