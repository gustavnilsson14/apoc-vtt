import { EventAggregator, inject } from "aurelia";

export interface ISelectable {
  isSelected: boolean;
  element: Element;
  selectionGroup: string;
}
@inject(EventAggregator)
export class SelectionHandler {
  public selected: ISelectable;
  public selectedPath: string;
  constructor(private eventAggregator: EventAggregator){}
  public isSelected(selectable: ISelectable):boolean{
    return this.getCssPath(selectable) == this.selectedPath;
  }
  public select(selectable: ISelectable): void {
    const newSelectedPath = this.getCssPath(selectable);
    if(this.selectedPath != newSelectedPath){
      console.log(this.selectedPath, newSelectedPath, this.selectedPath == newSelectedPath);
      
      this.setSelected(selectable);
      return;
    }
    this.deselect();
  }
  public getSelected(): ISelectable{
    const base: any = document.querySelector(this.selectedPath)
    if(!base) return null;
    const au: any = base["$au"];
    if(!au) return null;
    const selected = au["au:resource:custom-element"].viewModel as ISelectable;
    return selected;
  }
  public setSelected(selectable: ISelectable): void{
    this.selected = selectable;
    this.selectedPath = this.getCssPath(this.selected);
    this.eventAggregator.publish("SELECTION_CHANGED", this.selected);
  }
  public deselect() {
    this.selectedPath = "";
    this.selected = null;
    console.log("this.selectedPath", this.selectedPath);
    
    this.eventAggregator.publish("SELECTION_CHANGED", null);
  }
  getCssPath(selectable: ISelectable): string{
    let current: Element = selectable.element;
    let path: string[] = [];
    while(current != null){
      if(current.parentElement == null){
        current = null;
        continue;
      }
      const index = Array.from(current.parentNode.children).indexOf(current) + 1;
      const currentPath = `${current.nodeName.toLowerCase()}:nth-child(${index})`;
      path = [currentPath, ...path];
      current = current.parentElement;
    }
    return path.join('>');
  }
}
