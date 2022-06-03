import { memo } from 'react'

export const ThemeSelect = memo(({ id, disabled, clickHandler, logo, theme, themeName }) => (
  <button
    className={'theme-select-btn' + (id === theme ? ' is-active' : '')}
    id={id}
    disabled={disabled}
    onClick={clickHandler}>
    <img src={logo} alt={themeName} draggable="false" />
  </button>
))
