import { IFormSettings } from './../../../../../../contracts/form';
import { bindable, inject } from "aurelia";
import { ICustomListSettings } from "../../../../../../contracts/list";
import { getValueFromPath } from "../../../../../../shared/object-parser"
import { Client } from '../../../../infrastructure/client';
import { MessageFactory } from '../../../../../../contracts/message';

@inject(Client)
export class CustomListItem {
  @bindable item: any;
  @bindable data: any[];
  @bindable cellValues: string[];
  @bindable index: number;
  @bindable settings: ICustomListSettings;
  @bindable tooltipVisible = false;
  @bindable expandedIds: string[] = [];
  isExpanded: boolean;
  @bindable toolTipData: any;
  constructor(private client: Client){}
  attached() {
    this.setExpanded();
  }
  binding():void{
    this.itemChanged();
  }
  itemChanged(): void {
    this.cellValues = [];
    this.settings.indexes.forEach(index => {
      this.cellValues.push(getValueFromPath(this.item, index.path));
    });
    
    this.cellValues = [...this.cellValues];
    this.toolTipData = this.getTooltipData();
  }
  getTooltipData(): any {
    if(!this.settings.tooltipDataFunction) return this.item;
    return this.settings.tooltipDataFunction(this.item);
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
  onDelete(e: Event):void{
    e.stopPropagation();
    this.client.send(MessageFactory.remove(this.settings.controller,{
      id: this.item.id
    }));
  }
  handleExpand() {
    if (!this.settings.expandable) return;
    this.toggleExpandedIds();
    this.expandedIds = [...this.expandedIds];
    this.setExpanded();
  }
  getExpansionFormSettings(): IFormSettings{
    return this.settings.getExpansionFormSettings(this.item);
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
