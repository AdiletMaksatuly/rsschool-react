import React from 'react';
import CardList from '../components/CardList';
import Modal from '../components/Modal/Modal';
import SearchBar from '../components/SearchBar';
import { ICard } from '../types';

type HomeState = {
  cards: ICard[];
  pageInfo: {
    totalPages: number;
    currentPage: number;
  };
  searchQuery: string;
  prevSearchQuery: string;
  error: {
    isError: boolean;
    message?: string;
  };
  isLoading: boolean;
  modalData: ICard | null;
};

class Home extends React.Component<unknown, HomeState> {
  state: HomeState = {
    cards: [],
    searchQuery: '',
    prevSearchQuery: '',
    pageInfo: {
      totalPages: 1,
      currentPage: 1,
    },
    error: {
      isError: false,
    },
    isLoading: true,
    modalData: null,
  };

  constructor(props: unknown) {
    super(props);
  }

  componentDidMount() {
    this.fetchCharacters();
  }

  fetchCharacters = async () => {
    try {
      this.setState({ isLoading: true });

      const response = await fetch(
        `https://rickandmortyapi.com/api/character/?page=${this.state.pageInfo.currentPage}&name=${this.state.searchQuery}`
      );

      if (response.ok) {
        const { results: cardsData, info } = await response.json();

        console.log(cardsData);

        this.setState({
          cards: cardsData,
          pageInfo: { ...this.state.pageInfo, totalPages: info.pages },
        });
      } else {
        throw new Error(`${response.status}`);
      }
    } catch (error) {
      if ((error as Error).message === '404') {
        this.setState({ error: { isError: true, message: 'Not found' } });
      }
    } finally {
      this.setState({ isLoading: false });
    }
  };

  searchCharacters = () => {
    if (this.state.error.isError) {
      this.setState({ error: { isError: false, message: '' } });
    }

    this.fetchCharacters();
  };

  searchResetHandler = () => {
    this.setState({ searchQuery: '' }, () => this.searchCharacters());
  };

  componentDidUpdate = (_: unknown, prevState: HomeState) => {
    if (prevState.searchQuery !== this.state.searchQuery) {
      this.setState({ prevSearchQuery: prevState.searchQuery });
    }
  };

  showModal = (card: ICard) => {
    this.setState({ modalData: card });
  };

  closeModal = () => {
    this.setState({ modalData: null });
  };

  render() {
    return (
      <main className="page">
        <div className="page__content container">
          <h1>Home page</h1>
          <SearchBar
            onChange={(value) => this.setState({ searchQuery: value })}
            onReset={this.searchResetHandler}
            onSubmit={this.searchCharacters}
          />

          {this.state.error.isError ? (
            <div>Not found... Try to enter another search query</div>
          ) : this.state.isLoading ? (
            <div>Loading...</div>
          ) : (
            <CardList cards={this.state.cards} onClick={this.showModal} />
          )}

          {this.state.modalData ? (
            <Modal card={this.state.modalData} onClose={this.closeModal} />
          ) : (
            ''
          )}
        </div>
      </main>
    );
  }
}

export default Home;
