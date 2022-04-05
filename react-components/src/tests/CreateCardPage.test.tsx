import React from 'react';
import { screen } from '@testing-library/react';
import { renderWithRouter } from '../helpers/renderWithRouter';
import userEvent from '@testing-library/user-event';
import CreateCardPage from '../pages/CreateCardPage';

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
