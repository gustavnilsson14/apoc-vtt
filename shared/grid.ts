import { Guid } from "./guid";
import { IBase } from "./../contracts/base";
import { ICombatant } from "../contracts/models/battle";

export enum GridType {
  SQUARE = "SQUARE",
  HEX = "HEX",
}
export enum TileUtilityTags{
  START_POSITION = "START_POSITION"
}
export interface IVector2 {
  x: number;
  y: number;
}
export class Vector2 implements IVector2 {
  public x: number;
  public y: number;
  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }
}

export interface IGrid {
  tiles: ITile[];
  gridType: GridType;
  dimensions?: Vector2;
}
export class Grid implements IGrid {
  public tiles: ITile[] = [];
  public gridType: GridType;
  public dimensions?: Vector2;
  constructor(gridType: GridType) {
    this.gridType = gridType;
  }
}
export interface ITile extends IBase {
  pos: Vector2;
  utilityTags: TileUtilityTags[],
  combatant?: ICombatant;
}
export class GridFactory {
  public static createSquareGrid(dimensions: Vector2): Grid {
    const squareGrid = new Grid(GridType.SQUARE);
    GridHandler.generateGrid(squareGrid, dimensions);
    return squareGrid;
  }
}
export class GridHandler {
  public static squareNeighbors: IVector2[] = [
    new Vector2(0, -1),
    new Vector2(0, 1),
    new Vector2(-1, 0),
    new Vector2(1, 0),
    new Vector2(-1, 1),
    new Vector2(1, -1),
    new Vector2(-1, -1),
    new Vector2(1, 1),
  ];
  public static hexNeighbors: IVector2[] = [
    new Vector2(-1, 0),
    new Vector2(1, 0),
    new Vector2(-1, 1),
    new Vector2(1, -1),
    new Vector2(-1, -1),
    new Vector2(1, 1),
  ];

  public static generateGrid(grid: IGrid, dimensions: Vector2) {
    grid.dimensions = dimensions;
    if (grid.gridType == GridType.SQUARE) GridHandler.generateSquareGrid(grid,dimensions);
    if (grid.gridType == GridType.HEX) GridHandler.generateHexGrid(grid,dimensions);
  }
  public static generateSquareGrid(grid: IGrid, dimensions: Vector2) {
    for (let x = 0; x < dimensions.x; x++) {
      for (let y = 0; y < dimensions.y; y++) {
        grid.tiles.push({
          id: Guid.newGuid(),
          pos: {
            x: x,
            y: y,
          },
          utilityTags: [],
        });
      }
    }
  }
  public static generateHexGrid(grid: IGrid,dimensions: Vector2) {}
  public static getTileAt(grid: IGrid, pos: Vector2): ITile | undefined {
    throw new Error("Method not implemented.");
  }
  public static getTileById(grid: IGrid, id: string): ITile | undefined {
    return grid.tiles.find((tile) => tile.id == id);
  }
  public static replaceTile(grid: IGrid, tile: ITile): boolean {
    const existing = GridHandler.getTileById(grid, tile.id);
    if (!existing) return false;
    const index = grid.tiles.indexOf(existing);
    if (index == -1) return false;
    grid.tiles[index] = tile;
    return true;
  }
  public static getNeighbors(grid: IGrid, tile: ITile): ITile[] {
    let neighbors = this.squareNeighbors;
    if (grid.gridType == GridType.HEX) neighbors = this.hexNeighbors;

    return grid.tiles.filter(
      (x) =>
        neighbors
          .map((pos) => {
            return { x: pos.x + tile.pos.x, y: pos.y + tile.pos.y };
          })
          .find(
            (neighbor) => neighbor.x == tile.pos.x && neighbor.y == tile.pos.y
          ) != undefined
    );
  }
}
