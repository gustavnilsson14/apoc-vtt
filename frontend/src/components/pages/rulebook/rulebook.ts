export class Rulebook {
  getImage(path: string): any {
    return require(`../../../assets/${path}`);
  }
}
