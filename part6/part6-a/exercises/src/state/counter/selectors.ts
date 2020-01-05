import { States } from "../states";

export const getCount = (state: States) => {
  return state.counter.count;
};
