import { IHasToolTip, TooltipSourceType } from './../../../infrastructure/tooltip';
import { bindable } from "aurelia";
import { getValueFromPath } from '../../../../../shared/object-parser';

export class Tooltip {
  @bindable tooltip: IHasToolTip;
  @bindable data;
  @bindable tooltipTextsFromPath: string[] = [];
  @bindable visible: boolean = false;
  @bindable innerNode: HTMLElement;
  @bindable pos: any;
  visibleChanged():void{
    this.pos = this.getBounds();
    this.setTooltipText();
  }
  setTooltipText():void{
    if (this.tooltip.tooltipSource != TooltipSourceType.PATH) return;
    if (!this.tooltip.tooltipPaths) return;
    
    this.tooltipTextsFromPath = [];
    this.tooltip.tooltipPaths.forEach(tooltipPath=>{
      this.tooltipTextsFromPath.push(getValueFromPath(this.data, tooltipPath));
    });
  }
  getBounds(): DOMRect{
    let current = this.innerNode.parentElement;
    let rect: DOMRect = current.getBoundingClientRect();
    let iterations = 5;
    while(iterations > 0 && rect.x + rect.y + rect.width + rect.height == 0 ){
      iterations--;
      current = current.parentElement;
      rect = current.children[0].getBoundingClientRect();
    }
    return rect;
  }
}
