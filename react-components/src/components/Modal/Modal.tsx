import React from 'react';
import { ICard } from '../../types';
import classes from './Modal.module.css';

interface ModalProps {
  card: ICard;
  onClose: () => void;
}

class Modal extends React.Component<ModalProps, unknown> {
  constructor(props: ModalProps) {
    super(props);
  }

  componentDidMount() {
    document.addEventListener('keydown', this.closeOnEsc);
  }

  closeOnEsc = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      this.onCloseHandler();
    }
  };

  async componentWillUnmount() {
    document.removeEventListener('keydown', this.closeOnEsc);
  }

  onCloseHandler = async () => {
    this.props.onClose();
  };

  render() {
    return (
      <div className={classes.modal}>
        <div className={classes['modal__overlay']} onClick={this.onCloseHandler}></div>
        <button className={classes['modal__close']} onClick={this.onCloseHandler}>
          x
        </button>
        <div className={classes['modal__content']}>
          <article className={[classes['modal__card'], classes['modal-card']].join(' ')}>
            <img
              src={this.props.card.image}
              className={classes['modal-card__image']}
              alt={this.props.card.name}
              width="300px"
              height="300px"
            />
            <div className={classes['modal-card__info']}>
              <h3 className={classes['modal-card__title']}>{this.props.card.name}</h3>
              <p
                className={[
                  classes['modal-card__status'],
                  this.props.card.status === 'Alive'
                    ? classes['modal-card__status--alive']
                    : classes['modal-card__status--dead'],
                ].join(' ')}
              >
                {this.props.card.status} - {this.props.card.species}
              </p>

              <p className={classes['modal-card__text']}>
                Last known location:
                <p>{this.props.card.location.name}</p>
              </p>
              <p className={classes['modal-card__text']}>
                Gender:
                <p>{this.props.card.gender}</p>
              </p>
            </div>
          </article>
        </div>
      </div>
    );
  }
}

export default Modal;
