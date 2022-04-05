import React from 'react';
import { ICard } from '../../types';
import classes from './CardItem.module.css';

interface CharacterCardProps {
  card: ICard;
  onClick?: (card: ICard) => void;
}

export default class CharacterCard extends React.Component<CharacterCardProps> {
  constructor(props: CharacterCardProps) {
    super(props);
  }

  onClickHandler = () => {
    if (this.props.onClick) {
      this.props.onClick(this.props.card);
    }
  };

  render() {
    return (
      <li className={classes['card-item']} data-testid="cardItem" onClick={this.onClickHandler}>
        <article className={classes['card']}>
          <img
            src={this.props.card.image}
            className={classes['card__img']}
            alt={this.props.card.name}
            width="300px"
            height="300px"
          />
          <h3 className={classes['card__title']}>
            <span>{this.props.card.id} </span>
            {this.props.card.name}
          </h3>
          <span>Species: {this.props.card.species}</span>
          <p>Origin: {this.props.card.origin.name}</p>
          <p>Gender: {this.props.card.gender}</p>
          <p>Status: {this.props.card.status}</p>
        </article>
      </li>
    );
  }
}
