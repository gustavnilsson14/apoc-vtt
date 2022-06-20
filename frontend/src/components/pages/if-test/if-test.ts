export class IFTest {
  constructor() {
    console.log("constructor(){");
  }
  created(owningView: any, myView: any) {
    console.log("created(owningView: View, myView: View) {");
  }
  attached() {
    console.log("attached() {");
  }
  bind(bindingContext: Object, overrideContext: Object) {
    console.log("bind(bindingContext: Object,overrideContext: Object) {");
  }
  detached() {
    console.log("detached() {");
  }
  unbind() {
    console.log("unbind() {");
  }
}
