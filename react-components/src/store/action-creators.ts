import { FormInputs, ICard, IUser } from '../types';
import { RootActionEnum } from './types';

export const RootActionCreators = {
  setCards: (cards: ICard[]) => {
    return {
      type: RootActionEnum.SET_CARDS,
      payload: cards,
    };
  },
  setSearchValue: (searchValue: string) => {
    return {
      type: RootActionEnum.SET_SEARCH_VALUE,
      payload: searchValue,
    };
  },
  setFormValues: (formValues: FormInputs) => {
    return {
      type: RootActionEnum.SET_FORM_VALUES,
      payload: formValues,
    };
  },
  setFormCards: (formCards: IUser[]) => {
    return {
      type: RootActionEnum.SET_FORM_CARDS,
      payload: formCards,
    };
  },
};

export const allActionCreators = {
  ...RootActionCreators,
};
