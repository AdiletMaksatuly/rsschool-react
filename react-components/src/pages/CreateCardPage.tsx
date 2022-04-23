import React, { useContext } from 'react';
import CardList from '../components/CardList';
import CreateForm from '../components/CreateForm';
import { RootContext } from '../context';
import { RootAction } from '../context/types';
import { useActions } from '../hooks/useActions';
import { IUser } from '../types';

const CreateCardPage: React.FC = () => {
  const [state, dispatch] = useContext(RootContext);
  const { formCards: cards } = state;
  const { setFormCards: setCards } = useActions();

  const addUser = (userData: IUser) => {
    dispatch(setCards([...cards, userData]) as RootAction);
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
