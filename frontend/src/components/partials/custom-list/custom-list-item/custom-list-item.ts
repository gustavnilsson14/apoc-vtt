import { bindable } from "aurelia";
import { ICustomListIndex, ICustomListSettings } from "../../../../../../contracts/list";
import { getValueFromPath } from "../../../../../../shared/object-parser"

export class CustomListItem {
  @bindable item: any;
  @bindable displayData: any;
  @bindable index: number;
  @bindable settings: ICustomListSettings;
  @bindable tooltipVisible = false;
  @bindable expandedIds: string[] = [];
  isExpanded: boolean;
  attached() {
    this.setExpanded();
  }
  getCellValue(index: ICustomListIndex) {
    return getValueFromPath(this.displayData, index.path);
  }
  onClick(): void {
    this.handleExpand();
    if (this.settings.onClick == null) return;
    this.settings.onClick(this.item);
  }
  onContext(e): void {
    if (this.settings.onContext == null) return;
    e.preventDefault();
    this.settings.onContext(this.item, this.index);
  }
  handleExpand() {
    if (!this.settings.expandable) return;
    this.toggleExpandedIds();
    this.expandedIds = [...this.expandedIds];
    this.setExpanded();
  }
  toggleExpandedIds() {
    if (!this.settings.expandable) return;
    if (this.expandedIds.find(expandedId => expandedId == this.item.id)) {
      this.expandedIds = this.expandedIds.filter(id => id != this.item.id)
      return;
    }
    this.expandedIds.push(this.item.id);
  }
  setExpanded(): void{
    if (!this.settings.expandable) return;
    if (this.expandedIds.find(expandedId => expandedId == this.item.id)) {
      this.isExpanded = true;
      return;
    }
    this.isExpanded = false;
  }
  setTooltipVisibility(value: boolean):void{
    this.tooltipVisible = value;
  }
}
