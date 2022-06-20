const fs = require("fs");
import { BaseController } from "../../contracts/controller";
import { BaseProvider } from "../../contracts/provider";
import { BaseForm } from "../../contracts/form";
import { IController, ILoaderModule, LoaderModuleType } from "../../contracts/loader";
import { DataStoreHandler } from "./data";

export class MyLoader {
  public static I: MyLoader;
  public loaderModules: ILoaderModule[] = [];

  constructor() {
    MyLoader.I = this;
    this.loadDirectory("../../contracts/");
    this.loadAll();
  }
  public getModule(type: LoaderModuleType, name: string): ILoaderModule | null {
    name = name.split("_").slice(-1)[0];
    switch (type) {
      case LoaderModuleType.CONTROLLER:
        return this.loaderModules.find((m) => name == (m as BaseController).constructor.name) as BaseController;
      case LoaderModuleType.FORM:
        return this.loaderModules.find((m) => name == (m as BaseForm).constructor.name) as BaseForm;
      case LoaderModuleType.PROVIDER:
        return this.loaderModules.find((m) => m.loaderModuleType == LoaderModuleType.PROVIDER) as BaseProvider;
    }
    return null;
  }
  public getAllModulesOfType(loaderModuleType: LoaderModuleType): ILoaderModule[] {
    return this.loaderModules.filter((m) => m.loaderModuleType == loaderModuleType);
  }
  public loadDirectory(path: string): void {
    var normalizedPath = require("path").join(__dirname, path);
    this.loaderModules = this.requirePath(normalizedPath);
  }
  private requirePath(path: string): ILoaderModule[] {
    let modules: ILoaderModule[] = [];
    fs.readdirSync(path).forEach((innerPath: string) => {
      const subPath: string = `${path}${innerPath}`;
      if (this.isDirectory(`${subPath}`)) {
        modules = [...modules, ...this.requirePath(subPath + "/")];
        return;
      }
      modules = [...modules, ...this.requireFile(subPath)];
    });
    return modules;
  }
  private requireFile(path: string): ILoaderModule[] {
    const result: ILoaderModule[] = [];
    const modules: NodeModule[] = require(path);
    Object.keys(modules).forEach((key) => {
      const moduleType = this.getLoaderModuleType((modules as any)[key]);
      if (moduleType == undefined) return;
      const module = new (modules as any)[key]();
      module.loaderModuleType = moduleType;
      result.push(module);
    });
    return result;
  }
  private getLoaderModuleType(obj: any): any {
    return obj?.iLoaderModuleType;
  }
  private isDirectory(path: string): boolean {
    if (!fs.existsSync(path)) return false;
    if (!fs.lstatSync(path).isDirectory()) return false;
    return true;
  }
  public saveAll(): void {
    const data: any = {};
    this.getAllModulesOfType(LoaderModuleType.CONTROLLER).forEach((module) => {
      const controller: IController = module as IController;
      data[controller.constructor.name] = controller.collection;
    });
    DataStoreHandler.I.save(data);
  }
  public loadAll(): void {
    const data: any = DataStoreHandler.I.load();
    if (data == null) return;
    this.getAllModulesOfType(LoaderModuleType.CONTROLLER).forEach((module) => {
      const controller: IController = module as IController;
      controller.collection = data[controller.constructor.name];
    });
  }
}
