const fs = require("fs");

export enum DataStoreType {
  NONE = 1,
  LOCAL = 2,
}
export interface IDataStore {
  storeType: DataStoreType;
}
export interface ILocalDataStore extends IDataStore {
  path: string;
}

export class LocalDataStore implements ILocalDataStore {
  public path: string;
  public storeType: DataStoreType = DataStoreType.LOCAL;
  constructor(path: string) {
    this.path = path;
  }
}

export class DataStoreHandler {
  public static I: DataStoreHandler;
  public dataStore: IDataStore;
  constructor(dataStore: IDataStore) {
    DataStoreHandler.I = this;
    this.dataStore = dataStore;
  }
  public save(data: any): boolean {
    switch (this.dataStore.storeType) {
      case DataStoreType.LOCAL:
        this.saveLocal(data);
      default:
        break;
    }
    return true;
  }
  public load(): any {
    switch (this.dataStore.storeType) {
      case DataStoreType.LOCAL:
        return this.loadLocal();
      default:
        break;
    }
    return {};
  }
  private saveLocal(data: any) {
    fs.writeFileSync((this.dataStore as ILocalDataStore).path, JSON.stringify(data));
  }
  public loadLocal(): any {
    const path = (this.dataStore as ILocalDataStore).path;
    if (!fs.existsSync(path)) return;
    const data: string | null = fs.readFileSync(path, "utf8");
    return JSON.parse(fs.readFileSync((this.dataStore as ILocalDataStore).path, "utf8"));
  }
}
