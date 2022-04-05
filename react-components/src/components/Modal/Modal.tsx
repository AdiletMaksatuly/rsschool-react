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
            <h3 className={classes['modal-card__title']}>
              <span>{this.props.card.id} </span>
              {this.props.card.name}
            </h3>
            <span>Species: {this.props.card.species}</span>
            <p>Origin: {this.props.card.origin.name}</p>
            <p>Gender: {this.props.card.gender}</p>
            <p>Status: {this.props.card.status}</p>
          </article>
        </div>
      </div>
    );
  }
}

export default Modal;
