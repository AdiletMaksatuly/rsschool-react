import { screen } from '@testing-library/react';

export const findLinkFromNavbar = (text: string) => {
  const linkElements = screen.getAllByRole('link');

  return linkElements.find((linkElement) => linkElement.textContent?.toLowerCase().includes(text));
};

export const findHeading = (type: string) => {
  const headings = screen.getAllByRole('heading');

  return headings.find((heading) => heading.tagName === type.toUpperCase());
};
