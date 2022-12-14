import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useTypedDispatch, useTypedSelector } from '../../hooks/redux';
import { ICard } from '../../types';
import classes from './CharacterPage.module.css';

const CharacterPage = () => {
  const navigate = useNavigate();
  const params = useParams();

  const cards = useTypedSelector((state) => state.cards);

  const card = cards.find((card) => {
    if (params.id) {
      return card.id === +params.id;
    }
  });

  useEffect(() => {
    if (!card) navigate('/');
  }, []);

  return (
    <main className="page">
      <div className="page__content container">
        <h1>Character Page</h1>
        <button className="btn btn--primary" onClick={() => navigate(-1)}>
          Назад
        </button>

        {card && (
          <article
            style={{ marginTop: 20 }}
            className={[classes['card'], classes['card']].join(' ')}
          >
            <img
              src={card?.image}
              className={classes['card__image']}
              alt={card?.name}
              width="300px"
              height="300px"
            />
            <div className={classes['card__info']}>
              <h3 className={classes['card__title']}>{card?.name}</h3>
              <p
                className={[
                  classes['card__status'],
                  card?.status === 'Alive'
                    ? classes['card__status--alive']
                    : classes['card__status--dead'],
                ].join(' ')}
              >
                {card?.status} - {card?.species}
              </p>

              <p className={classes['card__text']}>
                Last known location:
                <br />
                <span>{card?.location.name}</span>
              </p>
              <p className={classes['card__text']}>
                Gender: <br />
                <span>{card?.gender}</span>
              </p>
            </div>
          </article>
        )}
      </div>
    </main>
  );
};

export default CharacterPage;
