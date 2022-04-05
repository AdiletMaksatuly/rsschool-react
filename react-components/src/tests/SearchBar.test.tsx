import { screen } from '@testing-library/react';
import { renderWithRouter } from '../helpers/renderWithRouter';
import userEvent from '@testing-library/user-event';
import Navbar from '../components/Navbar';
import { findLinkFromNavbar } from './utils';
import { fakeLocalStorage } from './mocks';
import Home from '../pages/Home';

window.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ rates: { CAD: 1.42 } }),
  })
) as jest.Mock;

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
