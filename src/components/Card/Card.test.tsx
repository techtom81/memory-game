import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import React from 'react'

import { Card } from './Card'

const renderCard = (mockCallback: React.MouseEventHandler<HTMLButtonElement>) => {
  render(
    <Card
      clickHandler={mockCallback}
      id={'0'}
      set={'a'}
      cardFlipped={false}
      cardMatched={false}
      backSrc={'/back-image.png'}
      frontSrc={'/front-image.png'}
    />
  )
}

describe('<Card />', () => {
  it('renders as expected', () => {
    const mockCallback = jest.fn()
    renderCard(mockCallback)

    const card = screen.getByTestId('card')
    const button = screen.getByRole('button')
    const cardImage = screen.getAllByRole('img')

    expect(card).toBeInTheDocument()
    expect(button).toHaveAttribute('aria-label', 'click to flip card')
    expect(cardImage[0]).toHaveAttribute('src', '/back-image.png')
    expect(cardImage[1]).toHaveAttribute('src', '/front-image.png')
  })

  it('calls the click handler when clicked', () => {
    const mockCallback = jest.fn()
    renderCard(mockCallback)

    const button = screen.getByRole('button')
    userEvent.click(button)

    expect(mockCallback).toBeCalledTimes(1)
  })
})
