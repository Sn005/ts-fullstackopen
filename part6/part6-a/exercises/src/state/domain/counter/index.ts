import reducer from "./reducers";
import * as counterSelectors from "./selectors";
import * as counterActions from "./actions";
import * as counterType from "./types";
import * as counterState from "./states";

export {
  counterSelectors,
  counterActions,
  counterType,
  counterState
  // counterOperations,
};

export default reducer;

// export * from "./actions";
// export * from "./selectors";
// export * from "./states";
