import React from 'react';
import { screen } from '@testing-library/react';
import App from '../App';
import { renderWithRouter } from '../helpers/renderWithRouter';
import Home from '../pages/Home';
import { findHeading, findLinkFromNavbar } from './utils';

describe('routes testing', () => {
  test('home page rendering', () => {
    renderWithRouter(<App />);
    const homeLink = findLinkFromNavbar('home');
    const homeHeading = findHeading('h1');

    expect(homeLink).toBeInTheDocument();
    expect(homeLink).toHaveClass('active');
    expect(homeHeading).toBeInTheDocument();
  });

  test('about us page rendering', () => {
    renderWithRouter(<App />, '/aboutus');
    const aboutLink = findLinkFromNavbar('about');
    const aboutHeading = findHeading('h1');

    expect(aboutLink).toBeInTheDocument();
    expect(aboutLink).toHaveClass('active');
    expect(aboutHeading).toBeInTheDocument();
  });

  test('not found page rendering', () => {
    renderWithRouter(<App />, '/not-existing-route');
    const notFoundText = screen.getByText(/404/i);

    expect(notFoundText).toBeInTheDocument();
  });

  test('create card page rendering', () => {
    renderWithRouter(<App />, '/create-card');
    const createCardLink = findLinkFromNavbar('create card');
    const createCardHeading = findHeading('h1');

    expect(createCardLink).toHaveClass('active');
    expect(createCardHeading).toBeInTheDocument();
  });
});

describe('cards list testing', () => {
  test('cards list rendering', async () => {
    renderWithRouter(<Home />);
    const cardsListElement = await screen.findByTestId('cardList');
    expect(cardsListElement).toHaveClass('card-list');

    expect(cardsListElement.children.length).toBeGreaterThanOrEqual(1);
  });

  test('card item rendering', async () => {
    renderWithRouter(<Home />);
    const cardItemElements = await screen.findAllByTestId('cardItem');
    cardItemElements.forEach((cardItemElement) => {
      expect(cardItemElement).toBeInTheDocument();
    });
  });
});
