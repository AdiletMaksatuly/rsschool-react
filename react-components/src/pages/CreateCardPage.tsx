import React, { useState } from 'react';
import CardList from '../components/CardList';
import CreateForm from '../components/CreateForm';
import { IUser } from '../types';

const CreateCardPage: React.FC = () => {
  const [cards, setCards] = useState<IUser[]>([]);

  const addUser = (userData: IUser) => {
    setCards([...cards, userData]);
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
