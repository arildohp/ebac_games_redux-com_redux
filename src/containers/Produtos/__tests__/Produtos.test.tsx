import { rest } from 'msw'
import { setupServer } from 'msw/node'

import Produtos from '..'
import { rendenrizaComProvider } from '../../../utils/tests'
import { screen, waitFor } from '@testing-library/react'

const mocks = [
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
  },
  {
    id: 3,
    categoria: 'AVENTURA',
    imagem: '',
    plataformas: ['nintendo wii', 'XBOX'],
    preco: 199.9,
    precoAntigo: 299.9,
    titulo: 'PUGB'
  },
  {
    id: 4,
    categoria: 'AÇÃO',
    imagem: '',
    plataformas: ['nintendo wii', 'PS5'],
    preco: 180.9,
    precoAntigo: 199.9,
    titulo: 'Black'
  }
]

const server = setupServer(
  rest.get('http://localhost:4000', (requisicao, resposta, contexto) => {
    return resposta(contexto.json(mocks))
  })
)

describe('testes para o container produtos', () => {
  beforeAll(() => server.listen())
  afterEach(() => server.resetHandlers())
  afterAll(() => server.close())

  test('Deve redenrizar corretamente com texto de carregamento', () => {
    rendenrizaComProvider(<Produtos />)
    expect(screen.getByText('Carregando...')).toBeInTheDocument()
  })

  test('Deve redenrizar corretamente com a listagem de jogos', async () => {
    rendenrizaComProvider(<Produtos />)
    await waitFor(() => {
      expect(screen.getByText(' Farcry 4')).toBeInTheDocument()
    })
  })
})
