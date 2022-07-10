import { ISelectInputSettings } from './../../../../../../contracts/input';
import { bindable } from "aurelia";
import { IInputSettings, InputType } from "../../../../../../contracts/input";

export class CustomInput {
  @bindable settings: IInputSettings;
  @bindable result: any;
  @bindable value: any;
  @bindable data: any;
  @bindable onClickCallback;
  @bindable onLabelClick;
  ignoreChange: boolean;
  binding(): void {
    this.ignoreChange = true;
    this.value = this.settings.getInputValue(this.data);
    this.ignoreChange = false;
  }
  valueChanged(): void {
    if(this.ignoreChange) return;
    let value: any;
    switch (this.settings.type) {
      case InputType.SELECT:
        value = (this.settings as ISelectInputSettings).options[this.value];
        if(value == null) break;
        if((this.settings as ISelectInputSettings).isTemplate){
          this.result = value;
          break;
        }
        this.result[this.settings.key] = value;
        break;
      default:
        this.result[this.settings.key] = this.value;
        break;
    }
    
    this.result = { ...this.result };
  }
}
