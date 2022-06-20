import { bindable } from "aurelia";
import { ICustomListSettings } from "../../../../../../contracts/list";

export class CustomListHeader {
  @bindable settings: ICustomListSettings;
}
