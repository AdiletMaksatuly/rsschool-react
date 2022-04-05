import React from 'react';
import CardList from '../components/CardList';
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
  };

  constructor(props: unknown) {
    super(props);
  }

  componentDidMount() {
    this.fetchCharacters();
  }

  fetchCharacters = async () => {
    try {
      const response = await fetch(
        `https://rickandmortyapi.com/api/character/?page=${this.state.pageInfo.currentPage}&name=${this.state.searchQuery}`
      );

      const { results: cardsData, info } = await response.json();

      console.log(cardsData);

      this.setState({
        cards: cardsData,
        pageInfo: { ...this.state.pageInfo, totalPages: info.pages },
      });
    } catch (error) {
      console.log(error);
    }
  };

  searchCharacters = () => {
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

  render() {
    return (
      <main className="page">
        <div className="page__content container">
          <h1>Home page</h1>
          <SearchBar
            // onChange={this.updateSearchQuery}
            onChange={(value) => this.setState({ searchQuery: value })}
            onReset={this.searchResetHandler}
            onSubmit={this.searchCharacters}
          />
          <CardList cards={this.state.cards} />
        </div>
      </main>
    );
  }
}

export default Home;
