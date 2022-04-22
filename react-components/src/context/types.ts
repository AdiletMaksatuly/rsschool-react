import { ICard } from '../types';

export enum RootActionEnum {
  SET_CARDS = 'SET_CARDS',
}

export interface SetCardsAction {
  type: RootActionEnum.SET_CARDS;
  payload: ICard[];
}

export interface RootState {
  cards: ICard[];
}

export type RootAction = SetCardsAction;
