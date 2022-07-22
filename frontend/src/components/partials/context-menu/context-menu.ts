import { MouseHandler } from "./../../../infrastructure/mouse";
import { bindable, EventAggregator, inject } from "aurelia";
import { Vector2 } from "./../../../../../shared/grid";

export interface IContextMenuButton {
  label: string;
  callback: any;
}

@inject(EventAggregator, MouseHandler)
export class ContextMenu {
  @bindable buttons: IContextMenuButton[] = [];
  @bindable position: Vector2 = new Vector2(0, 0);
  timeout: NodeJS.Timeout;
  constructor(
    private eventAggregator: EventAggregator,
    private mouseHandler: MouseHandler
  ) {}

  binding() {
    this.eventAggregator.subscribe(
      "CONTEXT_MENU_SET",
      (buttons: IContextMenuButton[]) => {
        this.setContextMenu(buttons);
      }
    );
  }
  public setContextMenu(buttons: IContextMenuButton[]): void {
    this.buttons = [...buttons];
    this.position = {
      x: this.mouseHandler.position.x - 40,
      y: this.mouseHandler.position.y - 20,
    };
  }
  onMouseOut():void{
    
    this.timeout = setTimeout(() => {
      this.remove();
    }, 500);
  }
  onMouseOver():void{
    if(this.timeout) clearTimeout(this.timeout);
  }
  remove(){
    this.setContextMenu([]);
  }
  onClick(e, button: IContextMenuButton) {
    button.callback();
    this.remove();
  }
}
