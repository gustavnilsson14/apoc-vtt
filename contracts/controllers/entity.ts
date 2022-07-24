import { ICharacter } from "./../models/character";
import { IUser } from "./../models/user";
import { CharacterController } from "./character";
import { LoaderModuleType } from "./../loader";
import { UserController } from "./user";
import { IBase } from "../base";
import { BaseController } from "../controller";
import { EventPipeline } from "../../shared/event";

export class EntityController extends BaseController {
  constructor(loaderObject: any) {
    super(loaderObject);
    EventPipeline.I.subscribe("UserController", (key: string, data: any) => {
      this.broadcast(this.getAllItems());
    });
  }
  public getAllItems(): IBase[] {
    const userController: UserController = this.loaderObject.getModule(
      LoaderModuleType.CONTROLLER,
      UserController.name
    );
    const characterController: CharacterController =
      this.loaderObject.getModule(
        LoaderModuleType.CONTROLLER,
        CharacterController.name
      );
    const characters: ICharacter[] = [];
    characterController.collection.forEach((model) => {
      const character = model as ICharacter;
      userController.collection.forEach((model2) => {
        const user = model2 as IUser;
        if(!user.connected) return;
        if (user.selectedCharacterId != character.id) return;
        characters.push(character);
      });
    });
    const result = [...this.collection, ...characters];
    return result;
  }
}
