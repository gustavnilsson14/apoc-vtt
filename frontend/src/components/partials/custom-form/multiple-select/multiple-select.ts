import { ComputedWatcher } from "@aurelia/runtime-html";
import { bindable } from "aurelia";
import { IMultipleSelectInputSettings } from "../../../../../../contracts/input";

export class MultipleSelect {
  @bindable settings: IMultipleSelectInputSettings;
  @bindable data: any;
  @bindable result: any;
  @bindable selected: any;
  @bindable value: any[] = [];
  attached(): void {
    if (this.data == null) return;
    if (this.data[this.settings.key] == null) return;
    this.value = this.data[this.settings.key];
    this.settings.listSettings.onClick = (id: string) => {
      this.removeFromValue(id);
    };
  }
  valueChanged(): void {
    if (this.result[this.settings.key] == null) this.result[this.settings.key] = [];
    this.result[this.settings.key] = this.value;
    this.result = { ...this.result };
  }
  selectedChanged(): void {
    if (!this.value) this.value = [];
    const newValue = this.settings.options.find((x) => x.name == this.selected);
    if (!newValue) return;
    if (this.value.find((x) => x == newValue)) return;
    this.value = [...this.value, newValue];
  }
  removeFromValue(id: string): void {
    this.value = [...this.value.filter((item) => item.id != id)];
  }
}
