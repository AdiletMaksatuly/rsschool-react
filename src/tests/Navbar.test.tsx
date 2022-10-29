import React from 'react';
import { screen } from '@testing-library/react';
import { renderWithRouter } from '../helpers/renderWithRouter';
import userEvent from '@testing-library/user-event';
import Navbar from '../components/Navbar';
import { findLinkFromNavbar } from './utils';

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
