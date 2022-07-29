import { Client } from "./../../../infrastructure/client";
import { BasePage } from "./../../../infrastructure/view";
import { bindable, EventAggregator, inject } from "aurelia";
import { NotesForm } from "../../../../../contracts/forms/user";
import { IFormSettings } from "../../../../../contracts/form";
import { asyncTimeout } from "../../../../../shared/async-timeout";

@inject(Client, EventAggregator)
export class Notes extends BasePage {
  @bindable notesFormResult: any = {};
  @bindable notesFormData: any = {};
  @bindable notesSettings: IFormSettings = new NotesForm();
  constructor(public client: Client, private eventAggregator: EventAggregator) {
    super(client);
  }
  async binding(): Promise<void> {
    await asyncTimeout(5);
    this.notesFormResult = { ...this.client.user };
    this.notesFormData = { ...this.client.user };
    this.notesSettings = { ...this.notesSettings };
  }
}
