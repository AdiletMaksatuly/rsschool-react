import { createContext, Dispatch, useContext } from 'react';
import { ICard } from '../types';
import { RootAction, RootActionEnum, RootState } from './types';

export const initialState = {
  cards: [] as ICard[],
  searchValue: '',
  formValues: {
    username: '',
    birthDate: '',
    birthPlace: '',
    sex: '',
    img: [],
    agreement: false,
  },
  formCards: [],
};

export default function rootReducer(
  state: RootState = initialState,
  action: RootAction
): RootState {
  switch (action.type) {
    case RootActionEnum.SET_CARDS:
      return { ...state, cards: action.payload };
    case RootActionEnum.SET_SEARCH_VALUE:
      return { ...state, searchValue: action.payload };
    case RootActionEnum.SET_FORM_VALUES:
      return { ...state, formValues: action.payload };
    case RootActionEnum.SET_FORM_CARDS:
      return { ...state, formCards: action.payload };
    default:
      return state;
  }
}

export const RootContext = createContext<[RootState, Dispatch<RootAction>]>([
  initialState,
  () => null,
]);
