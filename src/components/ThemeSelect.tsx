import React, { memo } from 'react'

export const ThemeSelect = memo(({ id, disabled, clickHandler, logo, theme, themeName }: ThemeSelectProps) => (
  <button
    className={'theme-select-btn' + (id === theme ? ' is-active' : '')}
    id={id.toString()}
    disabled={disabled}
    onClick={clickHandler}>
    <img src={logo} alt={themeName} draggable="false" />
  </button>
))

type ThemeSelectProps = {
  id: number
  disabled: boolean
  logo: string
  theme: number
  themeName: string
  clickHandler: React.MouseEventHandler<HTMLButtonElement> | undefined
}
