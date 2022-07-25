import { IHenchman } from './../../../../../contracts/models/asset';
import { IItem } from './../../../../../collections/items';
import { bindable, EventAggregator, inject } from "aurelia";
import { AssetController } from "../../../../../contracts/controllers/asset";
import { IFormSettings } from "../../../../../contracts/form";
import { AssetCreateForm, VehicleEditForm, HenchmanEditForm } from "../../../../../contracts/forms/asset";
import { IInputSettings } from "../../../../../contracts/input";
import { ICustomListSettings } from "../../../../../contracts/list";
import { IMessage, MessageType } from "../../../../../contracts/message";
import { ICharacter } from "../../../../../contracts/models/character";
import { IGameEntity, GameEntityType } from "../../../../../contracts/models/entity";
import { Client } from "../../../infrastructure/client";
import { DiceHelper } from "../../../infrastructure/helpers/diceHelper";
import { BasePage } from "../../../infrastructure/view";
import { ContextMenu } from "../../partials/context-menu/context-menu";

@inject(Client, EventAggregator, ContextMenu, DiceHelper)
export class Assets extends BasePage {
  @bindable selectedCharacter: ICharacter;
  @bindable characterFormResult: any;
  @bindable createAssetFormSettings: IFormSettings = new AssetCreateForm();
  @bindable createAssetFormResult: any = {};
  @bindable assetsListSettings: ICustomListSettings = {
    indexes: [
      { label: "Name", path: "name" },
      { label: "Type", path: "type" },
    ],
    controller: AssetController.name,
    expandable: true,
    noProvision: true,
    itemClassKey: 'gameEntityType',
    getExpansionFormSettings: (value: any): IFormSettings => {
      let form;
      switch ((value as IGameEntity).gameEntityType) {
        case GameEntityType.VEHICLE:
          return new VehicleEditForm();
        case GameEntityType.HENCHMAN:
          form = new HenchmanEditForm();
          form.onLabelContext = (inputSettings: IInputSettings, item: any) => {
            this.diceHelper.handleStatRoll(inputSettings, item);
          }
          form.onInputContext = (inputSettings: IInputSettings, item: any) => {
            this.onHenchmanItemRoll(inputSettings, item);
          }
          return form;
        default:
          return null;
      }
    },
  };
  @bindable assetIds: string[] = [];
  @bindable assetsListExpanded: string[] = [];
  
  constructor(
    public client: Client,
    private eventAggregator: EventAggregator,
    private contextMenu: ContextMenu,
    private diceHelper: DiceHelper
  ) {
    super(client);
  }
  onAssetCreation() {
    this.eventAggregator.subscribeOnce(
      `${MessageType.RESPONSE}_${AssetController.name}`,
      (message: IMessage) => {
        this.characterFormResult.assetIds.push(message.data.id);
        this.characterFormResult = { ...this.characterFormResult };
      }
    );
  }
  onHenchmanItemRoll(inputSettings: IInputSettings, value: any):void{
    const item: IItem = value.item;
    const henchman: IHenchman = value.owner;
    this.diceHelper.handleItemRoll(item, henchman);
  }
}
