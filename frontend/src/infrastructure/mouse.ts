import { Vector2 } from "../../../shared/grid";

export class MouseHandler {
  public position: Vector2 = new Vector2(0, 0);
  constructor() {
    document.onmousemove = (e) => {
      this.position = new Vector2(e.clientX, e.clientY);
    };
  }
}
