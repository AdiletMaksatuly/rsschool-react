import React from 'react';
import CardList from '../components/CardList';
import illmaticCover from '../assets/img/illmatic.jpeg';
import mmfoodCover from '../assets/img/mmfood.jpeg';
import gkmcCover from '../assets/img/kendrick.jpeg';
import kssCover from '../assets/img/kids-see-ghosts.jpeg';
import wutangCover from '../assets/img/wu-tang.jpeg';
import eminemshowCover from '../assets/img/eminemshow.jpeg';
import donutsCover from '../assets/img/donuts.jpeg';
import tletCover from '../assets/img/the-low-end-theory.jpeg';
import liquidswordsCover from '../assets/img/liquid-swords.jpeg';

class Home extends React.Component {
  constructor(props) {
    super(props);

    this.cards = [
      {
        id: 1,
        title: 'Illmatic',
        artist: 'Nas',
        body: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aut non ullam illo nisi molestiae, incidunt dolore dolorum? Quis, tempora debitis!',
        img: illmaticCover,
      },
      {
        id: 2,
        title: 'The Eminem Show',
        artist: 'Eminem',
        body: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aut non ullam illo nisi molestiae, incidunt dolore dolorum? Quis, tempora debitis!',
        img: eminemshowCover,
      },
      {
        id: 3,
        title: 'Liquid Swords',
        artist: 'GZA',
        body: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aut non ullam illo nisi molestiae, incidunt dolore dolorum? Quis, tempora debitis!',
        img: liquidswordsCover,
      },
      {
        id: 4,
        title: 'The Low End Theory',
        artist: 'A Tribe Called Quest',
        body: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aut non ullam illo nisi molestiae, incidunt dolore dolorum? Quis, tempora debitis!',
        img: tletCover,
      },
      {
        id: 5,
        title: 'Donuts',
        artist: 'J Dilla',
        body: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aut non ullam illo nisi molestiae, incidunt dolore dolorum? Quis, tempora debitis!',
        img: donutsCover,
      },
      {
        id: 6,
        title: 'Enter the Wu-Tang: 36 Chambers',
        artist: 'Wu-Tang Clan',
        body: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aut non ullam illo nisi molestiae, incidunt dolore dolorum? Quis, tempora debitis!',
        img: wutangCover,
      },
      {
        id: 7,
        title: 'MM..FOOD',
        artist: 'MF DOOM',
        body: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aut non ullam illo nisi molestiae, incidunt dolore dolorum? Quis, tempora debitis!',
        img: mmfoodCover,
      },
      {
        id: 8,
        title: 'good.kid.maad.city',
        artist: 'Kendrick Lamar',
        body: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aut non ullam illo nisi molestiae, incidunt dolore dolorum? Quis, tempora debitis!',
        img: gkmcCover,
      },
      {
        id: 9,
        title: 'Kids See Ghosts',
        artist: 'KIDS SEE GHOSTS',
        body: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aut non ullam illo nisi molestiae, incidunt dolore dolorum? Quis, tempora debitis!',
        img: kssCover,
      },
    ];
  }

  render() {
    return (
      <main className="page">
        <div className="page__content container">
          <h1>Home page</h1>
          <CardList cards={this.cards} />
        </div>
      </main>
    );
  }
}

export default Home;
