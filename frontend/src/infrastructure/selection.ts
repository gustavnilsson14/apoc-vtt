import { EventAggregator, inject } from "aurelia";

export interface ISelectable {
  isSelected: boolean;
  selectionGroup: string;
}
@inject(EventAggregator)
export class SelectionHandler {
  public selected: ISelectable;
  constructor(private eventAggregator: EventAggregator){}
  public select(selectable: ISelectable): void {
    if (this.selected == selectable) {
      this.selected.isSelected = false;
      this.selected = null;
      this.eventAggregator.publish("SELECTION_CHANGED", this.selected);
      return;
    }
    if (this.selected != selectable && this.selected) {
      this.selected.isSelected = false;
    }
    this.selected = selectable;
    this.selected.isSelected = true;
    
    this.eventAggregator.publish("SELECTION_CHANGED", this.selected);
  }
  public deselect() {
    if (!this.selected) return;
    this.selected.isSelected = false;
    this.selected = null;
    this.eventAggregator.publish("SELECTION_CHANGED", this.selected);
  }
}
