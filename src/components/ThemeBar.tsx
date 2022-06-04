import React from 'react'
import { ThemeSelect } from './ThemeSelect'

export const ThemeBar = ({ themes, theme, gameStarted, clickHandler }: ThemeBarProps) => (
  <div className="theme-btn-wrapper">
    {themes.map(({ id, logo, name }: { id: number; logo: string; name: string }) => (
      <ThemeSelect
        key={id}
        id={id}
        logo={logo}
        themeName={name}
        disabled={gameStarted}
        theme={theme}
        clickHandler={clickHandler}
      />
    ))}
  </div>
)

type ThemeBarProps = {
  themes: []
  theme: number
  gameStarted: boolean
  clickHandler: () => void
}
