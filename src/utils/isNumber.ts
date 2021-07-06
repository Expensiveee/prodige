export const isNumber = (arg: string): boolean => {
  const x = new Number(arg).valueOf();
  return x == x;
};
