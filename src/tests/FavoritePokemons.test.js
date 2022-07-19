import React from 'react';
import { screen } from '@testing-library/react';
import { FavoritePokemons } from '../pages';
import renderWithRouter from '../helper/renderWithRouter';

describe('Conjunto de teste relacionados a rota Favorite Pokemons', () => {
  test('Verifica se é exibido na tela a mensagem "no favorite pokemons"', () => {
    renderWithRouter(<FavoritePokemons />);
    const message = screen.getByText(/No favorite pokemon found/i);
    expect(message).toBeInTheDocument();
  });
});
