export const sumArray = (arr: number[]) => arr.reduce((a, b) => a + b, 0);

export const multiplyArray = (arr: number[]) =>
  arr.length > 0 ? arr.reduce((a, b) => a * b, 1) : 0;
