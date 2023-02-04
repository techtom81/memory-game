import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import React from 'react'

import { ThemeButton } from './ThemeButton'

describe('<ThemeButton />', () => {
  it('renders a theme button as expected', () => {
    render(
      <ThemeButton id={0} logo={'/images/themes/frozen/frozen.png'} themeName={'frozen'} clickHandler={undefined} />
    )

    const image = screen.getByRole('img')

    expect(screen.getByTestId('theme-button')).toBeInTheDocument()
    expect(image).toHaveAttribute('src', '/images/themes/frozen/frozen.png')
    expect(image).toHaveAttribute('alt', 'frozen')
  })

  it('calls the click handler when the theme button is clicked', () => {
    const mockCallback = jest.fn()

    render(
      <ThemeButton id={0} logo={'/images/themes/frozen/frozen.png'} themeName={'frozen'} clickHandler={mockCallback} />
    )

    const button = screen.getByRole('button')
    userEvent.click(button)

    expect(mockCallback).toBeCalledTimes(1)
  })
})
