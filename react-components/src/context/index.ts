import { createContext, Dispatch, useContext } from 'react';
import { RootAction, RootActionEnum, RootState } from './types';

export const initialState = {
  cards: [],
};

export default function rootReducer(
  state: RootState = initialState,
  action: RootAction
): RootState {
  switch (action.type) {
    case RootActionEnum.SET_CARDS:
      return { ...state, cards: action.payload };
    default:
      return state;
  }
}

export const RootContext = createContext<[RootState, Dispatch<RootAction> | null]>([
  initialState,
  null,
]);
