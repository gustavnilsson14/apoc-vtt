import {
  GameEntityType,
  IGameEntity,
} from "./../../../../../contracts/models/entity";
import { IUser } from "./../../../../../contracts/models/user";
import { WoundState } from "./../../../../../contracts/stats";
import {
  ContextMenu,
  IContextMenuButton,
} from "./../../partials/context-menu/context-menu";
import { BasePage } from "./../../../infrastructure/view";

import {
  IInputSettings,
  IItemSlotInputSettings,
} from "./../../../../../contracts/input";
import { ItemSlot } from "./../../partials/custom-form/item-slot/item-slot";
import { IAsset } from "./../../../../../contracts/models/asset";
import { IBatchRequest } from "./../../../../../contracts/message";
import { AssetController } from "./../../../../../contracts/controllers/asset";
import {
  AssetCreateForm,
  HenchmanEditForm,
  VehicleEditForm,
} from "./../../../../../contracts/forms/asset";
import { bindable, EventAggregator, inject } from "aurelia";
import { IRequestResponse } from "../../../../../contracts/base";
import { CharacterController } from "../../../../../contracts/controllers/character";
import { BaseForm, IFormSettings } from "../../../../../contracts/form";
import { CharacterForm } from "../../../../../contracts/forms/character";
import {
  IMessage,
  MessageFactory,
  MessageType,
} from "../../../../../contracts/message";
import {
  CharacterFactory,
  ICharacter,
} from "../../../../../contracts/models/character";
import { Client } from "../../../infrastructure/client";
import { ModelViewState } from "../../../infrastructure/view";
import { ICustomListSettings } from "../../../../../contracts/list";
import { bodies } from "../../../../../collections/body";
import { DiceHelper } from "../../../infrastructure/helpers/diceHelper";
import { IItem } from "../../../../../collections/items";

@inject(Client, EventAggregator, ContextMenu, DiceHelper)
export class Character extends BasePage {
  @bindable modelViewState: ModelViewState = ModelViewState.LIST;
  @bindable operation: MessageType = MessageType.NONE;
  @bindable selectedCharacter: ICharacter;
  @bindable characterFormResult: any = {};
  @bindable characterFormSettings: IFormSettings = new CharacterForm();
  @bindable characterListSettings: ICustomListSettings = {
    indexes: [
      { label: "name", path: "name" },
      { label: "background", path: "background.occupation" },
      { label: "level", path: "level" },
    ],
    controller: CharacterController.name,
    alwaysUpdate: true,
    onClick: (item: any) => {
      this.displayCharacter(item.id);
    },
  };
  @bindable createVehicleFormSettings: IFormSettings = new AssetCreateForm();
  @bindable createVehicleFormResult: any = {};
  @bindable selectedCharacterAssets: IAsset[];
  @bindable selectedCharacterAssetsListSettings: ICustomListSettings = {
    indexes: [
      { label: "Name", path: "name" },
      { label: "Type", path: "type" },
    ],
    controller: AssetController.name,
    expandable: true,
    getExpansionFormSettings: (value: any): IFormSettings => {
      switch ((value as IGameEntity).gameEntityType) {
        case GameEntityType.VEHICLE:
          return new VehicleEditForm();
        case GameEntityType.HENCHMAN:
          return new HenchmanEditForm();
        default:
          return null;
      }
    },
  };
  @bindable selectedCharacterAssetIds: string[] = [];
  @bindable selectedCharacterAssetsListExpanded: string[] = [];
  @bindable contextMenuButtons: IContextMenuButton[];

  constructor(
    public client: Client,
    private eventAggregator: EventAggregator,
    private contextMenu: ContextMenu,
    private diceHelper: DiceHelper
  ) {
    super(client);
  }
  binding() {
    setTimeout(() => {
      if (!this.client.user?.selectedCharacterId) return;
      this.displayCharacter(this.client.user.selectedCharacterId);
    }, 50);
  }
  private displayCharacter(id: string): void {
    this.eventAggregator.subscribeOnce(
      `${MessageType.RESPONSE}_${CharacterController.name}`,
      (message: IMessage) => {
        const collection = (message.data as IRequestResponse).collection;
        if (collection.length == 0) return;
        const character = (message.data as IRequestResponse)
          .collection[0] as ICharacter;
        this.selectedCharacter = character;
        this.characterFormSettings.ignoreChange = true;
        this.characterFormResult = { ...character };
        this.characterFormSettings.ignoreChange = false;
        this.operation = MessageType.EDIT;
        this.modelViewState = ModelViewState.FORM;
      }
    );
    this.subscribeRemote(CharacterController.name, id);
    this.subscribeLocal(
      this.eventAggregator.subscribe(
        `${MessageType.PROVISION}_${CharacterController.name}_${id}`,
        (message: IMessage) => {
          const character = message.data as ICharacter;
          this.characterFormSettings.ignoreChange = true;
          this.selectedCharacter = character;
          this.characterFormSettings.ignoreChange = false;
        }
      )
    );
    this.client.send(
      MessageFactory.request(CharacterController.name, { id: id })
    );
  }
  private onNew(): void {
    this.selectedCharacter = bodies.find(
      (body) => body.bodyName == "Human"
    ) as ICharacter;
    this.operation = MessageType.ADD;
    this.modelViewState = ModelViewState.FORM;
  }
  private onSave(): void {
    this.saveCharacter(MessageType.ADD, this.characterFormResult);
    setTimeout(() => {
      this.clearSelected();
    }, 1);
  }
  private onCancel(): void {
    this.clearSelected();
    this.unSubscribeLocal();
  }
  async selectedCharacterChanged(): Promise<void> {
    this.client.user.selectedCharacterId = this.selectedCharacter
      ? this.selectedCharacter.id
      : "";
    this.client.user = { ...this.client.user };
  }
  private clearSelected(): void {
    this.operation = MessageType.NONE;
    this.modelViewState = ModelViewState.LIST;
    this.selectedCharacter = null;
    this.characterFormResult = {};
  }
  characterFormResultChanged(): void {
    if (this.characterFormSettings.ignoreChange) return;
    if (this.operation != MessageType.EDIT) return;
    if (!this.selectedCharacter) return;
    const character = this.characterFormResult;
    character.id = this.selectedCharacter.id;
    this.saveCharacter(MessageType.EDIT, character);
    //this.getAssets();
  }
  saveCharacter(messageType: MessageType, character: any): void {
    const message = MessageFactory.clientMessage(
      messageType,
      CharacterController.name,
      character
    );
    message.validatorName = (
      this.characterFormSettings as BaseForm
    ).constructor.name;
    this.client.send(message);
  }
  private onRandom(): void {
    this.selectedCharacter = CharacterFactory.random();
    this.characterFormResult = this.selectedCharacter;
    this.operation = MessageType.ADD;
    this.modelViewState = ModelViewState.FORM;
  }
  @bindable onLabelContext(settings: IInputSettings, result: any) {
    this.diceHelper.handleStatRoll(settings, result);
  }

  @bindable onItemSlotContext(settings: IInputSettings, result: any): void {
    const item: IItem = result.item;
    this.diceHelper.handleItemRoll(item, this.selectedCharacter);
  }

  @bindable onWoundContext(e): void {
    e.preventDefault();
    this.eventAggregator.publish("CONTEXT_MENU_SET", [
      {
        label: "Heal",
        callback: () => {
          this.setWound(-1);
        },
      },
      {
        label: "Damage",
        callback: () => {
          this.setWound(+1);
        },
      },
    ]);
  }
  setWound(direction: number) {
    if (!this.selectedCharacter) return;
    let index: number =
      Object.values(WoundState).indexOf(this.selectedCharacter.health) +
      direction;
    if (index < 0) index = 0;
    if (index > Object.values(WoundState).length)
      index = Object.values(WoundState).length - 1;
    this.characterFormResult.health = Object.values(WoundState)[index];
    this.characterFormResult = { ...this.characterFormResult };
  }
}
