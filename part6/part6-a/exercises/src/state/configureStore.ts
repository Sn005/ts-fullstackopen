import { createStore, combineReducers } from "redux";
import counter from "./counter";
// import reducers from "./domain";

export default function configureStore(initialState = {}) {
  const rootReducer = combineReducers({counter});
  return createStore(
    rootReducer
    // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );
}
