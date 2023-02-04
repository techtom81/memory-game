import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import React from 'react'

import { BackButton } from './BackButton'

describe('<BackButton />', () => {
  it('renders as expected', () => {
    const mockCallback = jest.fn()
    render(<BackButton clickHandler={mockCallback} />)

    const backButton = screen.getByTestId('back-button')

    expect(backButton).toBeInTheDocument()
  })

  it('calls the click handler when clicked', () => {
    const mockCallback = jest.fn()
    render(<BackButton clickHandler={mockCallback} />)

    const backButton = screen.getByTestId('back-button')
    userEvent.click(backButton)

    expect(mockCallback).toBeCalledTimes(1)
  })
})
