import { bindable } from "aurelia";
import { IInputSettings, InputType, ISelectInputSettings } from "../../../../../../contracts/input";
import { getValueFromPath } from "../../../../../../shared/object-parser";

export class CustomInput {
  @bindable settings: IInputSettings;
  @bindable result: any;
  @bindable value: any;
  @bindable data: any;
  @bindable tooltipVisible = false;
  @bindable onLabelClickCallback;
  @bindable onInputClickCallback;
  @bindable onLabelContextCallback;
  @bindable onInputContextCallback;
  ignoreChange: boolean;
  binding(): void {
    this.setValue();
  }
  dataChanged():void{
    this.setValue();
  }
  setValue():void{
    this.ignoreChange = true;
    this.value = this.settings.getInputValue(this.data);
    this.ignoreChange = false;
  }
  valueChanged(): void {
    if(this.ignoreChange) return;
    switch (this.settings.type) {
      case InputType.SELECT:
        if(!(this.settings as ISelectInputSettings).isTemplate) break;
        this.result = this.value;
        return;
    }
    this.result[this.settings.key] = this.value;
    this.result = { ...this.result };
  }
  setTooltipVisibility(value: boolean):void{
    if (!this.settings.tooltipPaths && !this.settings.tooltipText) return;
    this.tooltipVisible = value;
  }
  
  getSelectOptionValue(option: any) {
    const selectInputSettings: ISelectInputSettings = (this.settings as ISelectInputSettings);
    return getValueFromPath(option, selectInputSettings.labelIndex);
  }
  private onLabelClick(e):void{
    e.preventDefault();
    if(this.onLabelClickCallback) this.onLabelClickCallback({settings: this.settings});
  }
  private onLabelContext(e):void{
    e.preventDefault();
    if(this.onLabelContextCallback) this.onLabelContextCallback({settings: this.settings});
  }
}
