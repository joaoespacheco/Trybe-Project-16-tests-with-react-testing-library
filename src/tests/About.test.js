import React from 'react';
import { screen } from '@testing-library/react';
import { About } from '../pages';
import renderWithRouter from '../helper/renderWithRouter';

describe('Conjunto de teste relacionados a rota About', () => {
  test('Verifica se a página contém informações sobre a pokédex', () => {
    renderWithRouter(<About />);
    const firstDescription = screen.getByText(/This application simulates a Pokédex/i);
    const secondDescription = screen.getByText(/One can filter Pokémons by type/i);
    expect(firstDescription).toBeInTheDocument();
    expect(secondDescription).toBeInTheDocument();
  });
  test('Verifica se existe uma tag h2 com o texto About Pokédex', () => {
    renderWithRouter(<About />);
    const title = screen.getByRole('heading', {
      name: /About pokédex/i,
      level: 2,
    });
    expect(title).toBeInTheDocument();
  });
  test('Verifica se a imagem possuí o url determinado', () => {
    renderWithRouter(<About />);
    const url = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
    const image = screen.getByRole('img', {
      name: 'Pokédex',
    });
    expect(image).toHaveAttribute('src', url);
  });
});
