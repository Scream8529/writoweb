export function arrToString(arr: Array<string[]>) {
  const resulst: string = arr.map((arrItem) => arrItem.join(";")).join("\n");
  return resulst;
}
