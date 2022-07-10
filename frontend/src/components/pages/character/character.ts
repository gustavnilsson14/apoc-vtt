import { IInputSettings } from './../../../../../contracts/input';
import { DiceType } from './../../../../../contracts/models/dice';
import { ItemSlot } from './../../partials/custom-form/item-slot/item-slot';
import { IAsset } from './../../../../../contracts/models/asset';
import { IBatchRequest } from './../../../../../contracts/message';
import { AssetController } from './../../../../../contracts/controllers/asset';
import { VehicleCreateForm, VehicleEditForm } from './../../../../../contracts/forms/asset';
import { HasStatsHandler, IHasStats } from './../../../../../contracts/stats';
import { IRollable, RollableHandler } from './../../../../../shared/random';
import { UserController } from './../../../../../contracts/controllers/user';
import { bindable, EventAggregator, inject } from "aurelia";
import { IRequestResponse } from "../../../../../contracts/base";
import { CharacterController } from "../../../../../contracts/controllers/character";
import { IFormSettings } from "../../../../../contracts/form";
import { CharacterForm } from "../../../../../contracts/forms/character";
import { LoaderModuleType } from "../../../../../contracts/loader";
import { IMessage, MessageFactory, MessageType } from "../../../../../contracts/message";
import { CharacterFactory, ICharacter } from "../../../../../contracts/models/character";
import { Client } from "../../../infrastructure/client";
import { ModelViewState } from "../../../infrastructure/view";
import { ICustomListSettings } from "../../../../../contracts/list";

@inject(Client, EventAggregator, RollableHandler, HasStatsHandler)
export class Character {
  @bindable modelViewState: ModelViewState = ModelViewState.LIST;
  @bindable operation: MessageType = MessageType.NONE;
  @bindable selectedCharacter: ICharacter;
  @bindable characterFormResult: any = {};
  @bindable characterFormSettings: IFormSettings = new CharacterForm();
  @bindable characterListSettings: ICustomListSettings = {
    indexes: [
      { label: "name", path: "name" },
      { label: "background", path: "background" },
      { label: "level", path: "level" },
    ],
    controller: CharacterController.name,
    onClick: (id: string) => {
      this.displayCharacter(id);
    },
  };
  @bindable createVehicleFormSettings: IFormSettings = new VehicleCreateForm();
  @bindable createVehicleFormResult: any = {};
  @bindable selectedCharacterAssets: IAsset[];
  @bindable selectedCharacterAssetsListSettings: ICustomListSettings = {
    indexes: [
      { label: "Name", path: "name" },
      { label: "Type", path: "type" },
    ],
    controller: AssetController.name,
    ignoreLoadOnAttached: true,
    expandable: true,
    expansionFormSettings: new VehicleEditForm(),
    noProvision: true
  };
  @bindable selectedCharacterAssetIds: string[] = [];
  constructor(private client: Client, private eventAggregator: EventAggregator, private rollableHandler: RollableHandler, private hasStatsHandler: HasStatsHandler) {}
  private displayCharacter(id: string): void {
    this.eventAggregator.subscribeOnce(`${MessageType.RESPONSE}_${CharacterController.name}`, (message: IMessage) => {
      const collection = (message.data as IRequestResponse).collection;
      if (collection.length == 0) return;
      
      const character = (message.data as IRequestResponse).collection[0] as ICharacter;
      this.selectedCharacter = character;
      this.characterFormResult = { ...character };
      
      this.operation = MessageType.EDIT;
      this.modelViewState = ModelViewState.FORM;
      this.client.userSession.user.selectedCharacterId = this.selectedCharacter.id;
      this.client.send(MessageFactory.clientMessage(MessageType.EDIT, LoaderModuleType.CONTROLLER, UserController.name, this.client.userSession.user));
      this.getAssets();
    });
    this.eventAggregator.subscribe(`${MessageType.PROVISION}_${CharacterController.name}_${id}`, (message: IMessage) => {
      this.characterFormSettings.ignoreChange = true;
      const character = message.data as ICharacter;
      
      this.selectedCharacter = character;
      
      this.characterFormSettings.ignoreChange = false;
    });
    this.client.send(MessageFactory.subscribe(`${CharacterController.name}_${id}`));
    this.client.send(MessageFactory.request(CharacterController.name, { id: id }));
  }
  private onNew(): void {
    this.selectedCharacter = null;
    this.operation = MessageType.ADD;
    this.modelViewState = ModelViewState.FORM;
  }
  private onSave(): void {
    this.saveCharacter(MessageType.ADD, this.characterFormResult);
    setTimeout(() => {
      this.operation = MessageType.NONE;
      this.modelViewState = ModelViewState.LIST;
    }, 1);
  }
  private onCancel(): void {
    this.operation = MessageType.NONE;
    this.modelViewState = ModelViewState.LIST;
  }
  characterFormResultChanged(): void {
    if (this.characterFormSettings.ignoreChange) return;
    if (this.operation != MessageType.EDIT) return;
    if (!this.selectedCharacter) return;
    const character = this.characterFormResult;
    character.id = this.selectedCharacter.id;
    this.saveCharacter(MessageType.EDIT, character);
    this.getAssets();
  }
  saveCharacter(messageType: MessageType, character: any): void {
    const message = MessageFactory.clientMessage(messageType, LoaderModuleType.CONTROLLER, CharacterController.name, character);
    this.client.send(message);
  }
  private onRandom(): void {
    this.selectedCharacter = CharacterFactory.random();
    this.characterFormResult = this.selectedCharacter;
    this.operation = MessageType.ADD;
    this.modelViewState = ModelViewState.FORM;
  }
  onVehicleCreation(){
    this.eventAggregator.subscribeOnce(`${MessageType.RESPONSE}_${AssetController.name}`, (message:IMessage) => {
      this.selectedCharacter.assetIds.push(message.data.id);
      this.characterFormResult = this.selectedCharacter;
      this.selectedCharacterAssetIds = this.selectedCharacter.assetIds;
      
    });
  }
  getAssets(): void {
    this.eventAggregator.subscribeOnce(`${MessageType.RESPONSE}_${AssetController.name}`,(message:IMessage)=>{
      this.selectedCharacterAssets = (message.data as IRequestResponse).collection as IAsset[];
    });
    this.client.send(MessageFactory.request(AssetController.name, { id: "", ids: this.selectedCharacter.assetIds } as IBatchRequest));
  }
  @bindable onItemSlotClick(itemSlot: ItemSlot): void{
    const newRollable: IRollable = {
      name: `${this.selectedCharacter.name} ${itemSlot.name}`,
      getBaseDice: () : DiceType[]=>{
        return itemSlot.getBaseDice(this.rollableHandler, this.selectedCharacter)
      }
    }
    this.eventAggregator.publish("DIE_ROLL", this.rollableHandler.rollDefault(newRollable));
  }
  @bindable onLabelClick(settings: IInputSettings, value: any){
    const newRollable: IRollable = {
      name: `${this.selectedCharacter.name} ${settings.label}`,
      difficulty: value as number
    }
    this.eventAggregator.publish("DIE_ROLL", this.rollableHandler.rollCheck(newRollable));
  }
}
