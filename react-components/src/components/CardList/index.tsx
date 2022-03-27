import React from 'react';
import CardItem from '../CardItem';
import { ICard } from '../../types/types';
import classes from './CardList.module.css';

interface CardListProps {
  cards: ICard[];
}

class CardList extends React.Component<CardListProps> {
  constructor(props: CardListProps) {
    super(props);
  }

  render() {
    return (
      <ul data-testid="cardList" className={classes['card-list']}>
        {this.props.cards.map((card) => (
          <CardItem card={card} key={card.id} />
        ))}
      </ul>
    );
  }
}

export default CardList;
