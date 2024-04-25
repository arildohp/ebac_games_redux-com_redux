import { screen } from '@testing-library/react'

import Header from '..'

import { rendenrizaComProvider } from '../../../utils/tests'

describe('Testes para o componente header', () => {
  test('Deve redenrizar corretamente', () => {
    rendenrizaComProvider(<Header />)
    expect(screen.getByText('EBAC Games')).toBeInTheDocument()
  })

  test('deve redenrizar com 2 itens no carrinho', () => {
    rendenrizaComProvider(<Header />, {
      preloadedState: {
        carrinho: {
          itens: [
            {
              id: 1,
              categoria: 'RPG',
              imagem: '',
              plataformas: ['nintendo wii'],
              preco: 140.9,
              precoAntigo: 199.9,
              titulo: 'Zelda'
            },
            {
              id: 2,
              categoria: 'AÇÃO',
              imagem: '',
              plataformas: ['nintendo wii', 'PS5'],
              preco: 140.9,
              precoAntigo: 199.9,
              titulo: 'Farcry 4'
            }
          ]
        }
      }
    })

    expect(screen.getByTestId('qtd-carrinho').innerHTML).toContain('2 itens')
  })
})
