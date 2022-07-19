import React from 'react';
import { screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../helper/renderWithRouter';

describe('Conjunto de teste relacionados a rota Not Found', () => {
  test('Verifica se a página mostra uma h2 com o texto "Page requested not found 😭"',
    () => {
      const { history } = renderWithRouter(<App />);
      history.push('/not-found');
      const textMessage = screen.getByRole('heading', {
        name: /Page requested not found/i,
        level: 2,
      });
      expect(textMessage).toBeInTheDocument();
    });
  test('Verifica se a imagem possuí o url determinado', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/not-found');
    const url = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
    const image = screen.getByRole('img', {
      name: 'Pikachu crying because the page requested was not found',
    });
    expect(image).toHaveAttribute('src', url);
  });
});
