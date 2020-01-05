import { types } from "./types";

export const increment = () => ({
  type: types.INCREMENT
});
export const decrement = () => ({
  type: types.DECREMENT
});
export const add = (amount: number) => ({
  type: types.ADD,
  payload: { amount }
});
export const reset = () => ({
  type: types.RESET
});

export default {
  increment,
  decrement,
  add,
  reset
};

export type Actions =
  | ReturnType<typeof increment>
  | ReturnType<typeof decrement>
  | ReturnType<typeof add>
  | ReturnType<typeof reset>;
