export const isLink = (exp: string, got: string): boolean => {
  return exp === got;
};

export const ifEquals = (a: string, b: string): boolean => {
  return a === b;
};

export const isLower = (v1: number,v2: number): boolean => {
  return v1 < v2;
};

export const ifEqual = (a: number, b: number,extra: number): boolean => {
  return a === (b+extra);
};

export const ifDifferent = (a: number, b: number): boolean => {
  return a !== b;
};

export const contains = (a: string, b:string): boolean => {
  return a.includes(b);
}