import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../helper/renderWithRouter';

describe('Conjunto de teste relacionados a rota "/"', () => {
  test('Verifica se a page possuí uma h2 com o texto "Encountered pokémons" ', () => {
    renderWithRouter(<App />);
    const titleMessage = screen.getByRole('heading', {
      name: /Encountered pokémons/i,
      level: 2,
    });
    expect(titleMessage).toBeInTheDocument();
  });
  test('Verifica se o botão pŕoximo pokémon funciona', () => {
    renderWithRouter(<App />);
    const button = screen.getByTestId('next-pokemon');
    const pokemonCard = screen.getAllByTestId('pokemon-name');
    expect(pokemonCard[0]).toHaveTextContent('Pikachu');
    expect(pokemonCard.length).toBe(1);
    userEvent.click(button);
    expect(pokemonCard[0]).toHaveTextContent('Charmander');
    expect(pokemonCard.length).toBe(1);
  });
  test('Verifica se existem 08 botoẽs de filtro', () => {
    renderWithRouter(<App />);
    const numberOfButtons = 7;
    const buttonsPerType = screen.getAllByTestId('pokemon-type-button');
    const buttonAll = screen.getByRole('button', {
      name: /All/i,
    });
    expect(buttonsPerType.length).toBe(numberOfButtons);
    expect(buttonsPerType[0]).toHaveTextContent('Electric');
    expect(buttonsPerType[1]).toHaveTextContent('Fire');
    expect(buttonsPerType[2]).toHaveTextContent('Bug');
    expect(buttonsPerType[3]).toHaveTextContent('Poison');
    expect(buttonsPerType[4]).toHaveTextContent('Psychic');
    expect(buttonsPerType[5]).toHaveTextContent('Normal');
    expect(buttonsPerType[6]).toHaveTextContent('Dragon');
    expect(buttonAll).toBeInTheDocument();
  });
  test('Verifica se os botoẽs de filtro funcionam', () => {
    renderWithRouter(<App />);
    const buttonsPerType = screen.getAllByTestId('pokemon-type-button');
    const buttonAll = screen.getByRole('button', {
      name: /All/i,
    });
    const pokemonCard = screen.getByTestId('pokemon-name');
    userEvent.click(buttonsPerType[1]);
    expect(pokemonCard).toHaveTextContent('Charmander');
    userEvent.click(buttonsPerType[2]);
    expect(pokemonCard).toHaveTextContent('Caterpie');
    userEvent.click(buttonAll);
    expect(pokemonCard).toHaveTextContent('Pikachu');
  });
});
