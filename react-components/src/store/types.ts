import { FormInputs, ICard, IUser } from '../types';

export enum RootActionEnum {
  SET_CARDS = 'SET_CARDS',
  SET_SEARCH_VALUE = 'SET_SEARCH_VALUE',
  SET_FORM_VALUES = 'SET_FORM_VALUES',
  SET_FORM_CARDS = 'SET_FORM_CARDS',
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

export interface SetFormCardsAction {
  type: RootActionEnum.SET_FORM_CARDS;
  payload: IUser[];
}

export interface RootState {
  cards: ICard[];
  searchValue: string;
  formValues: FormInputs;
  formCards: IUser[];
}

export type RootAction =
  | SetCardsAction
  | SetSearchValueAction
  | SetFormValuesAction
  | SetFormCardsAction;
