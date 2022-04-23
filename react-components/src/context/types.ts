import { FormInputs, ICard } from '../types';

export enum RootActionEnum {
  SET_CARDS = 'SET_CARDS',
  SET_SEARCH_VALUE = 'SET_SEARCH_VALUE',
  SET_FORM_VALUES = 'SET_FORM_VALUES',
}

export interface SetCardsAction {
  type: RootActionEnum.SET_CARDS;
  payload: ICard[];
}

export interface SetSearchValueAction {
  type: RootActionEnum.SET_SEARCH_VALUE;
  payload: string;
}

export interface SetFormValuesAction {
  type: RootActionEnum.SET_FORM_VALUES;
  payload: FormInputs;
}

export interface RootState {
  cards: ICard[];
  searchValue: string;
  formValues: FormInputs;
}

export type RootAction = SetCardsAction | SetSearchValueAction | SetFormValuesAction;
