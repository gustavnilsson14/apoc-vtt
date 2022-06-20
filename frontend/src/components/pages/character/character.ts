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

@inject(Client, EventAggregator)
export class Character {
  @bindable modelViewState: ModelViewState = ModelViewState.LIST;
  @bindable operation: MessageType = MessageType.NONE;
  @bindable selectedCharacter: ICharacter;
  @bindable characterFormResult: any = {};
  @bindable characterSettings: IFormSettings = new CharacterForm();
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
  constructor(private client: Client, private eventAggregator: EventAggregator) {}
  private displayCharacter(id: string): void {
    this.eventAggregator.subscribeOnce(`${MessageType.RESPONSE}_${CharacterController.name}`, (message: IMessage) => {
      const collection = (message.data as IRequestResponse).collection;
      if (collection.length == 0) return;
      this.selectedCharacter = (message.data as IRequestResponse).collection[0] as ICharacter;
      this.operation = MessageType.EDIT;
      this.modelViewState = ModelViewState.FORM;
    });
    const message: IMessage = MessageFactory.request(CharacterController.name, { id: id });
    this.client.send(message);
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
    if (this.operation != MessageType.EDIT) return;
    const character = this.characterFormResult;
    character.id = this.selectedCharacter.id;
    this.saveCharacter(MessageType.EDIT, character);
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
}
