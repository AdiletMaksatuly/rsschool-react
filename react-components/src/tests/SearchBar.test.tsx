import { screen } from '@testing-library/react';
import { renderWithRouter } from '../helpers/renderWithRouter';
import userEvent from '@testing-library/user-event';
import Home from '../pages/Home';

describe('searchbar testing', () => {
  test('searchbar value getting from local storage when mounting and setting when unmounting', () => {
    const { unmount } = renderWithRouter(<Home />);

    expect(localStorage.getItem).toHaveBeenCalledWith('searchQuery');

    const searchInput = screen.getByRole('searchbox');

    const randomTextUserWillType = 'some-random-text';
    userEvent.type(searchInput, randomTextUserWillType);

    unmount();

    expect(localStorage.setItem).toHaveBeenCalledTimes(randomTextUserWillType.length + 1);
    expect(localStorage.setItem).toHaveBeenCalledWith('searchQuery', randomTextUserWillType);
    expect(localStorage.getItem('searchQuery')).toBe(randomTextUserWillType);
  });
});
