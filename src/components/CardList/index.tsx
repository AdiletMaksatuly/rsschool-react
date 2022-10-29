import React from 'react';
import { ICard, IUser } from '../../types';
import classes from './CardList.module.css';
import CharacterCard from '../CardItem/CharacterCard';
import UserCard from '../CardItem/UserCard';

interface CardListProps {
  cards: ICard[] | IUser[];
  onClick?: (id: number) => void;
}

const CardList: React.FC<CardListProps> = ({ cards, onClick }) => {
  return (
    <ul data-testid="cardList" className={classes['card-list']}>
      {cards.map((card) => {
        if ('origin' in card) {
          return <CharacterCard card={card} key={card.id} onClick={onClick} />;
        } else {
          return <UserCard card={card} key={card.id} />;
        }
      })}
    </ul>
  );
};

export default CardList;
