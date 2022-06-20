export class HexMap {
  getImage(path: string): any {
    return require(`../../../assets/${path}`);
  }
}
