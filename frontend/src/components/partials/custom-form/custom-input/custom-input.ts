import { bindable } from "aurelia";
import {
  IInputSettings,
  InputType,
  ISelectInputSettings,
} from "../../../../../../contracts/input";
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
  dataChanged(): void {
    this.setValue();
  }
  setValue(): void {
    this.ignoreChange = true;
    this.value = this.settings.getInputValue(this.data);
    this.ignoreChange = false;
  }
  valueChanged(): void {
    if (this.ignoreChange) return;
    switch (this.settings.type) {
      case InputType.SELECT:
        if (!(this.settings as ISelectInputSettings).isTemplate) break;
        this.result = this.value;
        return;
    }
    this.result[this.settings.key] = this.value;
    this.result = { ...this.result };
  }
  setTooltipVisibility(value: boolean): void {
    if (!this.settings.tooltipPaths && !this.settings.tooltipText) return;
    this.tooltipVisible = value;
  }
  getSelectOptionValue(option: any) {
    const selectInputSettings: ISelectInputSettings = this
      .settings as ISelectInputSettings;
    return getValueFromPath(option, selectInputSettings.labelIndex);
  }
  private onInputClick(e): void {
    if (!this.settings.hasInputClickCallback) return;
    if (e.preventDefault) e.preventDefault();
    if (!this.onInputClickCallback) return;
    this.onInputClickCallback({
      settings: this.settings,
      result: this.result,
    });
  }
  private onInputContext(e): void {
    if (!this.settings.hasInputContextCallback) return;
    if (e.preventDefault) e.preventDefault();
    if (!this.onInputContextCallback) return;
    this.onInputContextCallback({
      settings: this.settings,
      result: this.result,
    });
  }
  private onItemSlotInputContext(e): void {
    if (!this.onInputContextCallback) return;
    
    this.onInputContextCallback({
      settings: this.settings,
      result: { owner: this.result, item: e.result },
    });
  }
  private onLabelClick(e): void {
    if (!this.settings.hasLabelClickCallback) return;
    if (e.preventDefault) e.preventDefault();
    if (!this.onLabelClickCallback) return;
    this.onLabelClickCallback({
      settings: this.settings,
      result: this.result,
    });
  }
  private onLabelContext(e): void {
    if (!this.settings.hasLabelContextCallback) return;
    if (e.preventDefault) e.preventDefault();
    if (!this.onLabelContextCallback) return;
    this.onLabelContextCallback({
      settings: this.settings,
      result: this.result,
    });
  }
}
