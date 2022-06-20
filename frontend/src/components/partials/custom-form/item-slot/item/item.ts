import { bindable } from "aurelia";
import { IItem } from "../../../../../../../collections/items";

export class Item {
  @bindable value: IItem;
  @bindable editable: boolean = false;

  public getImage(): any {
    const image = this.value.image;

    return require(`../../../../../assets/${this.value.image}`);
  }
  public getIcon(): any {
    return require(`../../../../../assets/img/icons/${this.value.type.toString().toLowerCase()}.svg`);
  }
  public getHeaderFontSize(): string {
    if (this.value.name.length > 14) return "smallest";
    if (this.value.name.length > 11) return "smaller";
    if (this.value.name.length > 8) return "small";
    return "";
  }
}
