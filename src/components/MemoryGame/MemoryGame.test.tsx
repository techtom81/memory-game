import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import { useParams } from 'react-router-dom'
import React from 'react'
import { reducer } from '../../reducers'
import { initialState, StateProvider } from '../../store'

import { MemoryGame } from './MemoryGame'

jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn(),
  useParams: jest.fn(),
}))

const mockUseParams = useParams as jest.MockedFunction<typeof useParams>

const renderTheme = (id: string) => {
  mockUseParams.mockReturnValue({ themeId: id })

  render(
    <StateProvider initialState={initialState} reducer={reducer}>
      <MemoryGame />
    </StateProvider>
  )
}

describe('<MemoryGame />', () => {
  it('renders Frozen theme with correct number of cards', () => {
    renderTheme('0')

    expect(screen.getByTestId('frozen')).toBeInTheDocument()
    expect(screen.getAllByTestId('card')).toHaveLength(12)
  })

  it('renders Lego theme with correct number of cards', () => {
    renderTheme('1')

    expect(screen.getByTestId('lego')).toBeInTheDocument()
    expect(screen.getAllByTestId('card')).toHaveLength(12)
  })

  it('renders Masha theme with correct number of cards', () => {
    renderTheme('2')

    expect(screen.getByTestId('masha')).toBeInTheDocument()
    expect(screen.getAllByTestId('card')).toHaveLength(12)
  })

  it('renders Ariel theme with correct number of cards', () => {
    renderTheme('3')

    expect(screen.getByTestId('ariel')).toBeInTheDocument()
    expect(screen.getAllByTestId('card')).toHaveLength(12)
  })

  it('renders Hulk theme with correct number of cards', () => {
    renderTheme('4')

    expect(screen.getByTestId('hulk')).toBeInTheDocument()
    expect(screen.getAllByTestId('card')).toHaveLength(12)
  })

  it('renders LOL theme with correct number of cards', () => {
    renderTheme('5')

    expect(screen.getByTestId('lol')).toBeInTheDocument()
    expect(screen.getAllByTestId('card')).toHaveLength(20)
  })

  it('renders the last theme when the theme id does not exist', () => {
    renderTheme('100')

    expect(screen.getByTestId('lol')).toBeInTheDocument()
    expect(screen.getAllByTestId('card')).toHaveLength(20)
  })

  it('renders the last theme when the theme id is not a valid id', () => {
    renderTheme('qwerty')

    expect(screen.getByTestId('lol')).toBeInTheDocument()
    expect(screen.getAllByTestId('card')).toHaveLength(20)
  })
})
