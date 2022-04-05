import React from 'react';
import CardList from '../components/CardList';
import SearchBar from '../components/SearchBar';
import illmaticCover from '../assets/img/illmatic.jpeg';
import mmfoodCover from '../assets/img/mmfood.jpeg';
import gkmcCover from '../assets/img/kendrick.jpeg';
import kssCover from '../assets/img/kids-see-ghosts.jpeg';
import wutangCover from '../assets/img/wu-tang.jpeg';
import eminemshowCover from '../assets/img/eminemshow.jpeg';
import donutsCover from '../assets/img/donuts.jpeg';
import tletCover from '../assets/img/the-low-end-theory.jpeg';
import liquidswordsCover from '../assets/img/liquid-swords.jpeg';
import { ICard } from '../types';

type HomeState = {
  cards: ICard[];
  totalPages: number;
  searchQuery: string;
};

class Home extends React.Component<unknown, HomeState> {
  state: HomeState = {
    cards: [],
    searchQuery: '',
    totalPages: 1,
  };

  async componentDidMount() {
    try {
      const response = await fetch('https://rickandmortyapi.com/api/character');
      const { results: cardsData, info } = await response.json();

      console.log(cardsData);

      this.setState({ cards: cardsData, totalPages: info.pages });
    } catch (error) {
      console.log(error);
    }
  }

  constructor(props: unknown) {
    super(props);
  }

  render() {
    return (
      <main className="page">
        <div className="page__content container">
          <h1>Home page</h1>
          <SearchBar onChange={(value) => this.setState({ searchQuery: value })} />
          <CardList cards={this.state.cards} />
        </div>
      </main>
    );
  }
}

export default Home;
