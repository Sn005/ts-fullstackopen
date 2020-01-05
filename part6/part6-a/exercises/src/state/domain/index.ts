import counter, { counterState } from "./counter";
export default {
  counter
};

export interface States {
  counter: counterState.State;
}

// export const initialStates = {
//   counter: counterState.initialState
// };
