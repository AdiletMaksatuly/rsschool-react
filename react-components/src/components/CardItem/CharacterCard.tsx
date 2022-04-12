import React from 'react';
import { ICard } from '../../types';
import classes from './CardItem.module.css';

interface CharacterCardProps {
  card: ICard;
  onClick?: (card: ICard) => void;
}

const CharacterCard: React.FC<CharacterCardProps> = ({ card, onClick }) => {
  const onClickHandler = () => {
    if (onClick) {
      onClick(card);
    }
  };

  return (
    <li className={classes['card-item']} data-testid="cardItem" onClick={onClickHandler}>
      <article className={classes['card']}>
        <img
          src={card.image}
          className={classes['card__img']}
          alt={card.name}
          width="300px"
          height="300px"
        />
        <h3 className={classes['card__title']}>
          <span>{card.id} </span>
          {card.name}
        </h3>
        <p>Species: {card.species}</p>
        <button className={[classes['card__btn'], 'btn', 'btn--primary'].join(' ')}>
          READ MORE...
        </button>
      </article>
    </li>
  );
};

export default CharacterCard;
