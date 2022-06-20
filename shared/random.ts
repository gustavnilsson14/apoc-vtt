export function getRandomNumber(min: number, max: number) {
  return Math.floor(Math.random() * Math.floor(max - min)) + min;
}
export function getRandomInt(min: number, max: number) {
  return Math.floor(Math.random() * Math.floor(max + 1 - min)) + min;
}
export function getRandomIndex(list: any[]) {
  return getRandomNumber(0, list.length);
}
export function getRandomFrom(list: any[]) {
  var newList = [...list]
    .map((value) => {
      if (value instanceof WeightedValue) return Array(value.weight).fill(value.value);
      return value;
    })
    .flat();
  return newList[getRandomIndex(newList)];
}
class WeightedValue {
  constructor(public weight: number, public value: any) {}
}
