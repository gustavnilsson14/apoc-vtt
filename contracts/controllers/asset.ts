import { ICharacter } from './../models/character';
import { ISession } from '../../shared/session';
import { LoaderModuleType } from '../loader';
import { IMessage, MessageFactory } from '../message';
import { BaseController } from './../controller';
import { CharacterController } from './character';
import { IUserSession } from './user';

export class AssetController extends BaseController {
    getBroadcastMessage(session: ISession | null, data: any, id?: string): IMessage {
        if(!session) 
            return super.getBroadcastMessage(session,data,id);
        const characterController: CharacterController = this.loaderObject.getModule(
            LoaderModuleType.CONTROLLER,
            CharacterController.name
        );
        const user = (session as IUserSession).user;
        const character: ICharacter = characterController.collection.find(x => x.id == user.selectedCharacterId) as ICharacter;
        if (!id)
            return MessageFactory.provide(this.name, this.getAllItems().filter(x=> character.assetIds.indexOf(x.id) != -1) as any);
        return MessageFactory.provide(`${this.name}_${id}`, data);
    }
}