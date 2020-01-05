import { Reducer } from "redux";
import { Actions } from "./actions";
import { types } from "./types";
import { State, initialState } from "./states";

const reducer: Reducer<State, Actions> = (
  state: State = initialState,
  action: Actions
): State => {
  switch (action.type) {
    case types.INCREMENT:
      return {
        ...state,
        count: state.count + 1
      };
    case types.DECREMENT:
      return {
        ...state,
        count: state.count - 1
      };
    case types.ADD:
      return {
        ...state,
        count: state.count + (action.payload.amount || 0)
      };
    case types.RESET:
      return {
        ...state,
        count: 0
      };
    default:
      // if none of the above matches, code comes here
      return state;
  }
};

export default reducer;
