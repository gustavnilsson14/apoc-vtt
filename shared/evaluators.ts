export function jsonEquals(a: any, b: any): boolean {
    if(a == null && b == null) return true;
    if(a == null || b == null) return false;
    return JSON.stringify(a) == JSON.stringify(b);
}