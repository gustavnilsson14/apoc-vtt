import { bindable } from "aurelia";
import { ICustomListIndex, ICustomListSettings } from "../../../../../../contracts/list";
import { getValueFromPath } from "../../../../../../shared/object-parser"

export class CustomListItem {
  @bindable item: any;
  @bindable settings: ICustomListSettings;
  @bindable tooltipVisible = false;
  @bindable expanded: boolean;
  getCellValue(index: ICustomListIndex) {
    return getValueFromPath(this.item, index.path);
  }
  onClick(): void {
    this.handleExpand();
    if (this.settings.onClick == null) return;
    this.settings.onClick(this.item.id);
  }
  handleExpand() {
    if (!this.settings.expandable) return;
    this.expanded = !this.expanded;
  }
  setTooltipVisibility(value: boolean):void{
    this.tooltipVisible = value;
  }
}
