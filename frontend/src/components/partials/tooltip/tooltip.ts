import { IHasToolTip, TooltipSourceType } from './../../../infrastructure/tooltip';
import { bindable } from "aurelia";
import { getValueFromPath } from '../../../../../shared/object-parser';
import { IHydratedController, LifecycleFlags } from '@aurelia/runtime-html';

export class Tooltip {
  @bindable tooltip: IHasToolTip;
  @bindable data;
  @bindable tooltipTextFromPath: string;
  @bindable visible: boolean = false;
  @bindable innerNode: HTMLElement;
  @bindable pos: any;
  visibleChanged():void{
    this.pos = this.getBounds();
    this.setTooltipText();
  }
  setTooltipText():void{
    if (this.tooltip.tooltipSource != TooltipSourceType.PATH) return;
    if (!this.tooltip.tooltipPath) return;
    this.tooltipTextFromPath = getValueFromPath(this.data, this.tooltip.tooltipPath);
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
