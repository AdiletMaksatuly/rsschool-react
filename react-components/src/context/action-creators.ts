import { ICard } from '../types';
import { RootActionEnum } from './types';

export const RootActionCreators = {
  setCards: (cards: ICard[]) => {
    return {
      type: RootActionEnum.SET_CARDS,
      payload: cards,
    };
  },
};

export const allActionCreators = {
  ...RootActionCreators,
};
