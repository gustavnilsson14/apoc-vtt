import { bindable } from "aurelia";
import { ICustomListIndex, ICustomListSettings } from "../../../../../../contracts/list";

export class CustomListItem {
  @bindable item: any;
  @bindable settings: ICustomListSettings;

  getCellValue(index: ICustomListIndex) {
    let obj: unknown = this.item;
    if (typeof obj === "undefined" || obj === null) return;
    const path = index.path.split(/[\.\[\]\"\']{1,2}/);
    for (var i = 0, l = path.length; i < l; i++) {
      if (path[i] === "") continue;
      obj = obj[path[i]];
      if (typeof obj === "undefined" || obj === null) return;
    }
    return obj;
  }
  onClick(): void {
    if (this.settings.onClick == null) return;
    this.settings.onClick(this.item.id);
  }
}
