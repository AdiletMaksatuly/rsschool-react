import React from 'react';
import { ICard } from '../../types/types';
import classes from './CardItem.module.css';

interface CardItemProps {
  card: ICard;
  key: number;
}

class CardItem extends React.Component<CardItemProps> {
  constructor(props: CardItemProps) {
    super(props);
  }

  render() {
    return (
      <li className={classes['card-item']}>
        <article className={classes['card']}>
          <img
            src={this.props.card.img}
            className={classes['card__img']}
            alt={this.props.card.title}
          />
          <h3 className={classes['card__title']}>
            <span>{this.props.card.id} </span>
            {this.props.card.title}
          </h3>
          <span>{this.props.card.artist}</span>
          <p>{this.props.card.body}</p>
        </article>
      </li>
    );
  }
}

export default CardItem;
