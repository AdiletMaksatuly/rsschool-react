import React, { useEffect, useRef } from 'react';
import { ICard } from '../../types';
import classes from './Modal.module.css';

interface ModalProps {
  card: ICard;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ card, onClose }) => {
  useEffect(() => {
    document.addEventListener('keydown', (e) => {
      closeOnEsc(e);
    });

    return document.removeEventListener('keydown', (e) => {
      closeOnEsc(e);
    });
  }, []);

  const closeOnEsc = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      onCloseHandler();
    }
  };

  const onCloseHandler = async () => {
    onClose();
  };

  return (
    <div className={classes.modal}>
      <div className={classes['modal__overlay']} onClick={onCloseHandler}></div>
      <button className={classes['modal__close']} onClick={onCloseHandler}>
        x
      </button>
      <div className={classes['modal__content']}>
        <article className={[classes['modal__card'], classes['modal-card']].join(' ')}>
          <img
            src={card.image}
            className={classes['modal-card__image']}
            alt={card.name}
            width="300px"
            height="300px"
          />
          <div className={classes['modal-card__info']}>
            <h3 className={classes['modal-card__title']}>{card.name}</h3>
            <p
              className={[
                classes['modal-card__status'],
                card.status === 'Alive'
                  ? classes['modal-card__status--alive']
                  : classes['modal-card__status--dead'],
              ].join(' ')}
            >
              {card.status} - {card.species}
            </p>

            <p className={classes['modal-card__text']}>
              Last known location:
              <p>{card.location.name}</p>
            </p>
            <p className={classes['modal-card__text']}>
              Gender:
              <p>{card.gender}</p>
            </p>
          </div>
        </article>
      </div>
    </div>
  );
};

export default Modal;
