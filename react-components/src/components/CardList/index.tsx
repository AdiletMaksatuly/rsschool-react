import React from 'react';
import CardItem from '../CardItem';
import { ICard, IUser } from '../../types';
import classes from './CardList.module.css';
import MusicCard from '../CardItem/MusicCard';
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
          if ('artist' in card) {
            return <MusicCard card={card} key={card.id} />;
          } else {
            return <UserCard card={card} key={card.id} />;
          }
        })}
      </ul>
    );
  }
}

export default CardList;
