import React from 'react';
import { getByRole, render, screen } from '@testing-library/react';
import App from '../App';
import { renderWithRouter } from '../helpers/renderWithRouter';
import userEvent from '@testing-library/user-event';
import Navbar from '../components/Navbar';
import CardList from '../components/CardList';
import Home from '../pages/Home';
import SearchBar from '../components/SearchBar';

const findLinkFromNavbar = (text: string) => {
  const linkElements = screen.getAllByRole('link');

  return linkElements.find(linkElement => linkElement.textContent?.toLowerCase().includes(text));
};

const findHeading = (type: string) => {
  const headings = screen.getAllByRole('heading');

  return headings.find(heading =>heading.tagName === type.toUpperCase());
}

// const fakeLocalStorage = (function() {
//   let store: {[key: string]: string} = {};

//   return {
//     getItem: function(key: string) {
//       return store[key] || null;
//     },
//     setItem: function(key: string, value: string) {
//       store[key] = value.toString();
//     },
//     removeItem: function(key: string) {
//       delete store[key];
//     },
//     clear: function() {
//       store = {};
//     }
//   };
// })();

const fakeLocalStorage = (function() {
  let store: {[key: string]: string} = {};

  return {
    getItem: jest.fn((key: string) => {
      return store[key] || null;
    }),
    setItem: jest.fn((key: string, value: string) => {
      store[key] = value.toString();
    }),
    removeItem: function(key: string) {
      delete store[key];
    },
    clear: function() {
      store = {};
    }
  };
})();

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
})

describe('navbar testing', () => {
  test('renders navbar', () => {
    renderWithRouter(<Navbar />);
    const linkElements = screen.getAllByRole('link');

    linkElements.forEach(linkElement => {
      expect(linkElement).toBeInTheDocument();
    });
    expect(linkElements.length).toBeGreaterThanOrEqual(2);
  });

  test('home link click testing', () => {
    renderWithRouter(<Navbar />);
    const homeLink = findLinkFromNavbar('home');
    
    userEvent.click(homeLink!);
    expect(findLinkFromNavbar('home')).toHaveClass('active');
  })

  test('about us link click testing', () => {
    renderWithRouter(<Navbar />);
    const aboutUsLink = findLinkFromNavbar('about us');
    
    userEvent.click(aboutUsLink!);
    expect(findLinkFromNavbar('about us')).toHaveClass('active');
  })
});

describe('searchbar testing', () => {
  beforeAll(() => {
    Object.defineProperty(window, 'localStorage', {
      value: fakeLocalStorage
    });
  });

  test('searchbar value getting from local storage when mounting and setting when unmounting', () => {
    const {unmount} = renderWithRouter(<Home />);

    expect(localStorage.getItem).toHaveBeenCalledTimes(1);

    const searchInput = screen.getByRole('searchbox');

    const randomTextUserWillType = 'some-random-text';
    userEvent.type(searchInput, randomTextUserWillType);

    unmount();

    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(localStorage.setItem).toHaveBeenCalledWith("searchQuery", randomTextUserWillType);
    
    // ошибка
    // expect(localStorage.getItem('searchQuery')).toBe(randomTextUserWillType);
  });
});

describe('cards list testing', () => {

  test('cards list rendering', async () => {
    renderWithRouter(<Home />);
    const cardsListElement = screen.getByTestId('cardList');
    expect(cardsListElement).toHaveClass('card-list');
  
    await expect(cardsListElement.children.length).toBeGreaterThanOrEqual(1);
  });

  test('card item rendering', async () => {
    renderWithRouter(<Home />);
    const cardItemElements = screen.getAllByTestId('cardItem');
    cardItemElements.forEach(cardItemElement => {
      expect(cardItemElement).toBeInTheDocument();
    });
  });
});
