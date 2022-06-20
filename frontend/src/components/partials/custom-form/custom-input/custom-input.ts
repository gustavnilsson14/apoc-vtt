import { bindable } from "aurelia";
import { IInputSettings } from "../../../../../../contracts/input";

export class CustomInput {
  @bindable settings: IInputSettings;
  @bindable result: any;
  @bindable value: any;
  @bindable data: any;
  attached() {
    this.value = this.settings.getInputValue(this.data);
  }
  dataChanged(): void {
    this.value = this.settings.getInputValue(this.data);
  }
  valueChanged(): void {
    this.result[this.settings.key] = this.value;
    this.result = { ...this.result };
  }
}
