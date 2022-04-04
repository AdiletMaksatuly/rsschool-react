import React from 'react';
import { ICard } from '../../types';
import classes from './CardItem.module.css';

interface MusicCardProps {
  card: ICard;
}

export default class MusicCard extends React.Component<MusicCardProps> {
  constructor(props: MusicCardProps) {
    super(props);
  }

  render() {
    return (
      <li className={classes['card-item']} data-testid="cardItem">
        <article className={classes['card']}>
          <img
            src={this.props.card.img}
            className={classes['card__img']}
            alt={this.props.card.title}
            width="300px"
            height="300px"
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
