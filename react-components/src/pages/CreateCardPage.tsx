import React from 'react';
import { IUser } from '../types';

interface CreateCardPageState {
  cards: IUser[];
}

class CreateCardPage extends React.Component<unknown, CreateCardPageState> {
  constructor(props: unknown) {
    super(props);

    this.state = {
      cards: [],
    };
  }

  render() {
    return (
      <main className="page">
        <div className="page__content container">
          <h1>CreateCardPage</h1>
        </div>
      </main>
    );
  }
}

export default CreateCardPage;
