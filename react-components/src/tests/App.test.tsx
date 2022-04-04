import React from 'react';
import { getByRole, render, screen } from '@testing-library/react';
import App from '../App';
import { renderWithRouter } from '../helpers/renderWithRouter';
import userEvent from '@testing-library/user-event';
import Navbar from '../components/Navbar';
import CardList from '../components/CardList';
import Home from '../pages/Home';
import SearchBar from '../components/SearchBar';
import CreateCardPage from '../pages/CreateCardPage';

const findLinkFromNavbar = (text: string) => {
  const linkElements = screen.getAllByRole('link');

  return linkElements.find((linkElement) => linkElement.textContent?.toLowerCase().includes(text));
};

const findHeading = (type: string) => {
  const headings = screen.getAllByRole('heading');

  return headings.find((heading) => heading.tagName === type.toUpperCase());
};

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

const fakeLocalStorage = (function () {
  let store: { [key: string]: string } = {};

  return {
    getItem: jest.fn((key: string) => {
      return store[key] || null;
    }),
    setItem: jest.fn((key: string, value: string) => {
      store[key] = value.toString();
    }),
    removeItem: function (key: string) {
      delete store[key];
    },
    clear: function () {
      store = {};
    },
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

  test('create card page rendering', () => {
    renderWithRouter(<App />, '/create-card');
    const createCardLink = findLinkFromNavbar('create card');
    const createCardHeading = findHeading('h1');

    expect(createCardLink).toHaveClass('active');
    expect(createCardHeading).toBeInTheDocument();
  });
});

describe('navbar testing', () => {
  test('renders navbar', () => {
    renderWithRouter(<Navbar />);
    const linkElements = screen.getAllByRole('link');

    linkElements.forEach((linkElement) => {
      expect(linkElement).toBeInTheDocument();
    });
    expect(linkElements.length).toBeGreaterThanOrEqual(2);
  });

  test('home link click testing', () => {
    renderWithRouter(<Navbar />);
    const homeLink = findLinkFromNavbar('home');

    userEvent.click(homeLink!);
    expect(findLinkFromNavbar('home')).toHaveClass('active');
  });

  test('about us link click testing', () => {
    renderWithRouter(<Navbar />);
    const aboutUsLink = findLinkFromNavbar('about us');

    userEvent.click(aboutUsLink!);
    expect(findLinkFromNavbar('about us')).toHaveClass('active');
  });

  test('create-card-page link click testing', () => {
    renderWithRouter(<Navbar />);
    const createCardLink = findLinkFromNavbar('create card');

    userEvent.click(createCardLink!);
    expect(findLinkFromNavbar('create card')).toHaveClass('active');
  });
});

describe('searchbar testing', () => {
  beforeAll(() => {
    Object.defineProperty(window, 'localStorage', {
      value: fakeLocalStorage,
    });
  });

  test('searchbar value getting from local storage when mounting and setting when unmounting', () => {
    const { unmount } = renderWithRouter(<Home />);

    expect(localStorage.getItem).toHaveBeenCalledTimes(1);

    const searchInput = screen.getByRole('searchbox');

    const randomTextUserWillType = 'some-random-text';
    userEvent.type(searchInput, randomTextUserWillType);

    unmount();

    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(localStorage.setItem).toHaveBeenCalledWith('searchQuery', randomTextUserWillType);

    // ошибка
    // expect(localStorage.getItem('searchQuery')).toBe(randomTextUserWillType);
  });
});

describe('cards list testing', () => {
  test('cards list rendering', () => {
    renderWithRouter(<Home />);
    const cardsListElement = screen.getByTestId('cardList');
    expect(cardsListElement).toHaveClass('card-list');

    expect(cardsListElement.children.length).toBeGreaterThanOrEqual(1);
  });

  test('card item rendering', async () => {
    renderWithRouter(<Home />);
    const cardItemElements = screen.getAllByTestId('cardItem');
    cardItemElements.forEach((cardItemElement) => {
      expect(cardItemElement).toBeInTheDocument();
    });
  });
});

describe('create card form working', () => {
  test('form rendering', () => {
    renderWithRouter(<CreateCardPage />);
    const form = screen.getByTestId('form');

    expect(form).toBeInTheDocument();
  });

  test('form submitting', async () => {
    renderWithRouter(<CreateCardPage />);
    const nameInput = screen.getByTestId('name');
    const birthDateInput = screen.getByTestId('birthDate');
    const sexInput = screen.getByTestId('sex');
    const birthPlaceSelect: HTMLSelectElement = screen.getByTestId('birthPlace');
    const fileInput: HTMLInputElement = screen.getByTestId('file');
    const submitBtn = screen.getByTestId('submit');
    const agreement = screen.getByTestId('agreement');

    const userData = {
      name: 'Adilet',
      birthDate: '2020-01-02',
      birthPlace: 'kz',
    };

    expect(submitBtn).toBeDisabled();

    userEvent.type(nameInput, userData.name);
    expect(submitBtn).not.toBeDisabled();

    userEvent.type(birthDateInput, userData.birthDate);
    userEvent.click(sexInput);

    expect(sexInput).toBeChecked();

    userEvent.selectOptions(birthPlaceSelect, [userData.birthPlace]);
    expect(birthPlaceSelect.value).toBe(userData.birthPlace);

    const file = new File(['hello'], 'hello.png', { type: 'image/png' });
    userEvent.upload(fileInput, file);
    expect(fileInput.files![0]).toStrictEqual(file);
    expect(fileInput.files?.item(0)).toStrictEqual(file);
    expect(fileInput.files).toHaveLength(1);

    userEvent.click(agreement);
    expect(agreement).toBeChecked();

    userEvent.click(submitBtn);

    const successAlert = await screen.findByTestId('alert-success');
    expect(successAlert).toBeVisible();

    const cardList = await screen.findByTestId('cardList');
    expect(cardList).toBeInTheDocument();

    const headingOfNewCard = screen.getByText(userData.name);
    expect(headingOfNewCard).toBeInTheDocument();
  });
});
