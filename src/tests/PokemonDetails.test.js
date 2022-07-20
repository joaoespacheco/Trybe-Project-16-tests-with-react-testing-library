import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../helper/renderWithRouter';

describe('Conjunto de teste relacionados a pokemonDetails', () => {
  const url = '/pokemons/25';
  test('Verifica as informações de detalhe do pokemon', () => {
    const { history } = renderWithRouter(<App />);
    history.push(url);
    const title = screen.getByRole('heading', {
      name: /Pikachu Details/i,
      level: 2,
    });
    const linkDetail = screen.queryByRole('link', {
      name: 'More details',
    });
    const summary = screen.queryByRole('heading', {
      name: 'Summary',
      level: 2,
    });
    const description = screen.getByText(
      /This intelligent Pokémon roasts hard berries with electricity/i,
    );
    expect(title).toBeInTheDocument();
    expect(linkDetail).not.toBeInTheDocument();
    expect(summary).toBeInTheDocument();
    expect(description).toBeInTheDocument();
  });
  test('Verifica a sessão dos mapas', () => {
    const { history } = renderWithRouter(<App />);
    history.push(url);
    const titleOfMaps = screen.getByRole('heading', {
      name: /Game Locations of Pikachu/i,
      level: 2,
    });
    const locations = screen.getAllByRole('img', {
      name: /Pikachu location/i,
    });

    expect(titleOfMaps).toBeInTheDocument();
    expect(locations[0]).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png');
    expect(locations[1]).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png');
  });
  test('Verifica se o icone de favorito funciona', () => {
    const { history } = renderWithRouter(<App />);
    history.push(url);
    const checkFavorite = screen.getByLabelText('Pokémon favoritado?', {
      selector: 'input',
    });
    userEvent.click(checkFavorite);
    const favoriteIcon = screen.queryByRole('img', {
      name: 'Pikachu is marked as favorite',
    });
    expect(favoriteIcon).toBeInTheDocument();
    userEvent.click(checkFavorite);
    expect(favoriteIcon).not.toBeInTheDocument();
  });
});
