import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../helper/renderWithRouter';

describe('Conjunto de teste relacionados as rota em App', () => {
  test('Se existem elementos com os textos Home, About e Favorite Pokémons na tag nav',
    () => {
      renderWithRouter(<App />);
      const navElements = screen.getByRole('navigation');
      expect(navElements).toHaveTextContent(/Home/i);
      expect(navElements).toHaveTextContent(/About/i);
      expect(navElements).toHaveTextContent(/Favorite Pokémons/i);
    });
  test('Verifica se ao clicar em Home a página é redirecionada para a url "/', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/about');
    const linksElements = screen.getAllByRole('link');
    userEvent.click(linksElements[0]);
    const titleOfHome = screen.getByRole('heading', {
      name: /Encountered pokémons/i,
      level: 2,
    });
    expect(titleOfHome).toBeInTheDocument();
  });
  test('Verifica se ao clicar em About a página é redirecionada para a url "/about',
    () => {
      renderWithRouter(<App />);
      const linksElements = screen.getAllByRole('link');
      userEvent.click(linksElements[1]);
      const titleOfAbout = screen.getByRole('heading', {
        name: /About Pokédex/i,
        level: 2,
      });
      expect(titleOfAbout).toBeInTheDocument();
    });
  test('Verifica se ao clicar em About a página é redirecionada para a url "/favorites',
    () => {
      renderWithRouter(<App />);
      const linksElements = screen.getAllByRole('link');
      userEvent.click(linksElements[2]);
      const titleOfFavorites = screen.getByRole('heading', {
        name: /Favorite pokémons/i,
        level: 2,
      });
      expect(titleOfFavorites).toBeInTheDocument();
    });
  test('Verifica se page not found é funcional',
    () => {
      const { history } = renderWithRouter(<App />);
      history.push('/page-not-found');
      const titleOfFavorites = screen.getByRole('heading', {
        name: /Page requested not found/i,
        level: 2,
      });
      expect(titleOfFavorites).toBeInTheDocument();
    });
});
