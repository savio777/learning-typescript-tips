/*
export interface User {
  name: string;
  age: number;
}

export interface Address {
  street: string;
  zipCode: string;
}
*/

export type User = {
  name: string;
  age: number;
};

export type Address = {
  street: string;
  zipCode: string;
};

// generic joining of types
export function mergeTypes<First, Second>(
  obj1: First,
  obj2: Second
): First & Second {
  return { ...obj1, ...obj2 };
}
