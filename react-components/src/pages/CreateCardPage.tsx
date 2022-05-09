import React, { useContext } from 'react';
import CardList from '../components/CardList';
import CreateForm from '../components/CreateForm';
import { useTypedDispatch, useTypedSelector } from '../hooks/redux';
import { useActions } from '../hooks/useActions';
import { IUser } from '../types';

const CreateCardPage: React.FC = () => {
  const cards = useTypedSelector((state) => state.formCards);
  const dispatch = useTypedDispatch();
  const { setFormCards: setCards } = useActions();

  const addUser = (userData: IUser) => {
    dispatch(setCards([...cards, userData]));
  };

  return (
    <main className="page">
      <div className="page__content container">
        <h1>CreateCardPage</h1>
        <CreateForm onCreate={addUser} />
        <CardList cards={cards} />
      </div>
    </main>
  );
};

export default CreateCardPage;
