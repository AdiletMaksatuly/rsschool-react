import React from 'react';
import { IUser } from '../../types';
import classes from './CardItem.module.css';

interface UserCardProps {
  card: IUser;
}

type ICountries = {
  kz: 'Kazakhstan';
  ru: 'Russia';
  ua: 'Ukraine';
};

const UserCard: React.FC<UserCardProps> = ({ card }) => {
  const countries: ICountries = {
    kz: 'Kazakhstan',
    ru: 'Russia',
    ua: 'Ukraine',
  };

  return (
    <li className={classes['card-item']} data-testid="cardItem">
      <article className={classes['card']}>
        <img
          src={
            `${card.img}` ||
            'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'
          }
          className={classes['card__img']}
          alt={card.name}
          width="300px"
          height="300px"
        />
        <h3 className={classes['card__title']}>{card.name}</h3>
        <p>Date of Birth: {card.birthDate}</p>
        <p>Birth place: {countries[card.birthPlace as keyof ICountries]}</p>
        <p>Sex: {card.sex}</p>
      </article>
    </li>
  );
};

export default UserCard;
