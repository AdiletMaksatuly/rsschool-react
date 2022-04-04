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

class UserCard extends React.Component<UserCardProps> {
  countries: ICountries = {
    kz: 'Kazakhstan',
    ru: 'Russia',
    ua: 'Ukraine',
  };

  constructor(props: UserCardProps) {
    super(props);
  }

  render() {
    return (
      <li className={classes['card-item']} data-testid="cardItem">
        <article className={classes['card']}>
          <img
            src={
              `${this.props.card.img}` ||
              'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'
            }
            className={classes['card__img']}
            alt={this.props.card.name}
            width="300px"
            height="300px"
          />
          <h3 className={classes['card__title']}>{this.props.card.name}</h3>
          <p>Date of Birth: {this.props.card.birthDate}</p>
          <p>Birth place: {this.countries[this.props.card.birthPlace as keyof ICountries]}</p>
          <p>Sex: {this.props.card.sex}</p>
        </article>
      </li>
    );
  }
}

export default UserCard;
