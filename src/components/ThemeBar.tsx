import React from 'react'
import { ThemeSelect } from './ThemeSelect'

export const ThemeBar = ({ themes, theme, clickHandler }: ThemeBarProps) => (
  <div className="theme-btn-wrapper">
    {themes.map(({ id, name }: { id: number; name: string }) => {
      const logo = `./images/themes/${name}/${name}.png`

      return <ThemeSelect key={id} id={id} logo={logo} themeName={name} theme={theme} clickHandler={clickHandler} />
    })}
  </div>
)

type ThemeBarProps = {
  themes: {
    id: number
    name: string
    grid: number
  }[]
  theme: number
  clickHandler: React.MouseEventHandler<HTMLButtonElement> | undefined
}
