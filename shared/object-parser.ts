export function getValueFromPath(obj: unknown, valuePath: string):any{
    if (typeof obj === "undefined" || obj === null) return;
    if(valuePath == ".") return obj;
    const path = valuePath.split(/[\.\[\]\"\']{1,2}/);
    for (let i = 0, l = path.length; i < l; i++) {
      if (path[i] === "") continue;
      obj = obj[path[i]];
      if (typeof obj === "undefined" || obj === null) return;
    }
    return obj;
}