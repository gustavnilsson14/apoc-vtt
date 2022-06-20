export interface ISelectable {
  isSelected: boolean;
  selectionGroup: string;
}
export class SelectionHandler {
  public selected: ISelectable;
  public select(selectable: ISelectable): void {
    if (this.selected == selectable) {
      this.selected.isSelected = false;
      this.selected = null;
      return;
    }
    if (this.selected != selectable && this.selected) {
      this.selected.isSelected = false;
    }
    this.selected = selectable;
    this.selected.isSelected = true;
  }
}
