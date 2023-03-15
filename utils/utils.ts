export const randomInt = (minOrMax: number, max?: number): number => {
  return Math.floor(Math.random() * (max ? max - minOrMax : minOrMax) + (max ? minOrMax : 0));
};
