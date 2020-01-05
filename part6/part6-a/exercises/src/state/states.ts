import counter, { State as CounterState } from "./counter";

export interface States {
  counter: CounterState;
  // counter: ReturnType<typeof counter>;
}
