import { AnyAction, CombinedState, combineReducers } from 'redux';

import { HYDRATE } from 'next-redux-wrapper';
import couter, { ICounterState } from './couter';

const rootReducer = (
  state: IState | undefined,
  action: AnyAction,
): CombinedState<any> => {};

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;

interface IState {
  counter: ICounterState;
}
