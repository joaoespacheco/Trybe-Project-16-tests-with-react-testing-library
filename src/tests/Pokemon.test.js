import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../helper/renderWithRouter';

describe('Conjunto de teste relacionados a rota "pokemon:id"', () => {
  test('Verifica as informações do card do pokemon e se o link more details funciona',
    () => {
      const { history } = renderWithRouter(<App />);
      const pokemonName = screen.getByTestId('pokemon-name');
      const pokemonType = screen.getByTestId('pokemon-type');
      const pokemonWeight = screen.getByTestId('pokemon-weight');
      const pokemonImage = screen.getByRole('img', {
        name: 'Pikachu sprite',
      });
      const url = 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png';
      const linkDetail = screen.getByRole('link', {
        name: 'More details',
      });

      expect(pokemonName).toHaveTextContent('Pikachu');
      expect(pokemonType).toHaveTextContent('Electric');
      expect(pokemonWeight).toHaveTextContent('Average weight: 6.0 kg');
      expect(pokemonImage).toHaveAttribute('src', url);
      expect(linkDetail).toBeInTheDocument();
      userEvent.click(linkDetail);
      const title = screen.getByRole('heading', {
        name: 'Pikachu Details',
        level: 2,
      });
      expect(title).toBeInTheDocument();
      expect(history.location.pathname).toBe('/pokemons/25');
    });
  test('Verifica se o icone de favorito funciona', () => {
    renderWithRouter(<App />);
    const moreDetail = screen.getByRole('link', {
      name: 'More details',
    });
    userEvent.click(moreDetail);
    const checkFavorite = screen.getByLabelText('Pokémon favoritado?', {
      selector: 'input',
    });
    userEvent.click(checkFavorite);
    const favoriteIcon = screen.getByRole('img', {
      name: 'Pikachu is marked as favorite',
    });
    expect(favoriteIcon).toHaveAttribute('src', '/star-icon.svg');
  });
});
