import React from 'react';
import { ICard, IUser } from '../../types';
import classes from './CardList.module.css';
import CharacterCard from '../CardItem/CharacterCard';
import UserCard from '../CardItem/UserCard';

interface CardListProps {
  cards: ICard[] | IUser[];
}

class CardList extends React.Component<CardListProps> {
  constructor(props: CardListProps) {
    super(props);
  }

  render() {
    return (
      <ul data-testid="cardList" className={classes['card-list']}>
        {this.props.cards.map((card) => {
          if ('origin' in card) {
            return <CharacterCard card={card} key={card.id} />;
          } else {
            return <UserCard card={card} key={card.id} />;
          }
        })}
      </ul>
    );
  }
}

export default CardList;
