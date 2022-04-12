import React, { useEffect, useRef, useState } from 'react';
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
  shouldResetBtnInSearchInputBeDisabled: boolean;
};

const Home: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [pageInfo, setPageInfo] = useState({ totalPages: 1, currentPage: 1 });
  const [cards, setCards] = useState([]);
  const [error, setError] = useState({ isError: false, message: '' });
  const [modalData, setModalData] = useState<ICard | null>(null);
  const [shouldResetBtnInSearchInputBeDisabled, setShouldResetBtnInSearchInputBeDisabled] =
    useState(true);

  useEffect(() => {
    const savedValue = localStorage.getItem('searchQuery') || '';

    if (savedValue) {
      setShouldResetBtnInSearchInputBeDisabled(false);
    }
    setSearchQuery(savedValue);
    fetchCharacters(savedValue);
  }, []);

  useEffect(() => {
    localStorage.setItem('searchQuery', searchQuery);
  }, [searchQuery]);

  const fetchCharacters = async (query?: string) => {
    try {
      setIsLoading(true);

      const response = await fetch(
        `https://rickandmortyapi.com/api/character/?page=${pageInfo.currentPage}&name=${query}`
      );

      if (response.ok) {
        const { results: cardsData, info } = await response.json();

        setCards(cardsData);
        setPageInfo({ currentPage: pageInfo.currentPage, totalPages: info.pages });
      } else {
        throw new Error(`${response.status}`);
      }
    } catch (error) {
      if ((error as Error).message === '404') {
        setError({ isError: true, message: 'Not found' });
      }
    } finally {
      setIsLoading(false);
    }
  };

  const searchCharacters = (query: string = searchQuery) => {
    if (error.isError) {
      setError({ isError: false, message: '' });
    }

    fetchCharacters(query);
  };

  const searchResetHandler = () => {
    setSearchQuery('');
    searchCharacters('');
  };

  const showModal = (card: ICard) => {
    setModalData(card);
  };

  const closeModal = () => {
    setModalData(null);
  };

  const updateSearchQuery = (value: string) => {
    setSearchQuery(value);
  };

  return (
    <main className="page">
      <div className="page__content container">
        <h1>Home page</h1>
        <SearchBar
          value={searchQuery}
          onChange={updateSearchQuery}
          onReset={searchResetHandler}
          onSubmit={searchCharacters}
          isResetBtnDisabled={shouldResetBtnInSearchInputBeDisabled}
        />

        {error.isError ? (
          <div>Not found... Try to enter another search query</div>
        ) : isLoading ? (
          <div>Loading...</div>
        ) : (
          <CardList cards={cards} onClick={showModal} />
        )}

        {modalData ? <Modal card={modalData} onClose={closeModal} /> : ''}
      </div>
    </main>
  );
};

export default Home;
