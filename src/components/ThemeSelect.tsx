import React, { memo } from 'react'

export const ThemeSelect = memo(({ id, clickHandler, logo, theme, themeName }: ThemeSelectProps) => (
  <button className={'theme-select-btn' + (id === theme ? ' is-active' : '')} id={id.toString()} onClick={clickHandler}>
    <img src={logo} alt={themeName} draggable="false" />
  </button>
))

type ThemeSelectProps = {
  id: number
  logo: string
  theme: number
  themeName: string
  clickHandler: React.MouseEventHandler<HTMLButtonElement> | undefined
}
