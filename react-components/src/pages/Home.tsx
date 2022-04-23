import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CardList from '../components/CardList';
import Modal from '../components/Modal/Modal';
import SearchBar from '../components/SearchBar';
import { RootContext } from '../context';
import { RootAction } from '../context/types';
import { useActions } from '../hooks/useActions';
import { ICard } from '../types';

const Home: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [pageInfo, setPageInfo] = useState<{ totalPages: number; currentPage: number }>({
    totalPages: 1,
    currentPage: 1,
  });
  const [error, setError] = useState<{
    isError: boolean;
    message?: string;
  }>({ isError: false, message: '' });
  const [modalData, setModalData] = useState<ICard | null>(null);
  const [disableResetBtn, setDisableResetBtn] = useState<boolean>(true);

  const [state, dispatch] = useContext(RootContext);
  const { cards } = state;
  const { setCards } = useActions();

  const navigate = useNavigate();

  useEffect(() => {
    const savedValue = localStorage.getItem('searchQuery') || '';

    if (savedValue) {
      setDisableResetBtn(false);
    }

    setSearchQuery(savedValue);

    if (state.cards.length) {
      dispatch(setCards(state.cards) as RootAction);
      setIsLoading(false);

      return;
    }

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

        dispatch(setCards(cardsData) as RootAction);
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
          disableResetBtn={disableResetBtn}
        />

        {error.isError ? (
          <div>Not found... Try to enter another search query</div>
        ) : isLoading ? (
          <div>Loading...</div>
        ) : (
          <CardList cards={cards} onClick={(id: number) => navigate('/cards/' + id)} />
        )}

        {modalData ? <Modal card={modalData} onClose={closeModal} /> : ''}
      </div>
    </main>
  );
};

export default Home;
