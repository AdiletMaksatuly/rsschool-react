import React from 'react';
import CreateForm from '../components/CreateForm';
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

  addUser(userData: IUser) {
    this.setState({
      cards: [...this.state.cards, userData],
    });
  }

  render() {
    return (
      <main className="page">
        <div className="page__content container">
          <h1>CreateCardPage</h1>
          <CreateForm onCreate={this.addUser.bind(this)} />
        </div>
      </main>
    );
  }
}

export default CreateCardPage;
