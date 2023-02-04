import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import React from 'react'
import { mockThemes } from './fixtures'

import { ThemeBar } from './ThemeBar'

describe('<ThemeBar />', () => {
  it('renders a button for each theme', () => {
    render(<ThemeBar themes={mockThemes} clickHandler={undefined} />)

    expect(screen.getByTestId('themebar')).toBeInTheDocument()
    expect(screen.getAllByRole('button')).toHaveLength(mockThemes.length)
  })

  it('calls the click handler when a theme button is clicked', () => {
    const mockCallback = jest.fn()

    render(<ThemeBar themes={mockThemes} clickHandler={mockCallback} />)

    const firstThemeButton = screen.getAllByRole('button')[0]
    userEvent.click(firstThemeButton)

    expect(mockCallback).toBeCalledTimes(1)
  })
})
